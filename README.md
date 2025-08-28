# Paymongo Fn

Transport-agnostic PayMongo SDK for TypeScript. No axios, no tRPC. Bring your own HTTP stack or use the built-in fetch client.

- Works in Node, Bun, and modern browsers
- Zod-validated schemas with full TypeScript inference
- Minimal, composable HTTP client interface
- Robust default fetch-based client with normalized errors
- Tree-shakeable, zero axios runtime dependency

Key source links:
- Factory: [Paymongo()](src/sdk/index.ts:71)
- Default client: [createFetchClient()](src/http/fetch-client.ts:1)
- HTTP contracts: [HttpClient](src/http/types.ts:14), [RequestOptions](src/http/types.ts:3), [ResponseEnvelope](src/http/types.ts:10), [HttpError](src/http/types.ts:22)
- Library entrypoint: [src/index.ts](src/index.ts:1)

## Install

```zsh
# bun as the package manager
bun add @re-up/paymongo-fn
```

## Quick start (default fetch client)

```ts
import { Paymongo } from "@re-up/paymongo-fn";

// NEVER expose your secret key in the browser.
// The SDK guards against usage of "sk_" in the browser.
const p = Paymongo(process.env.PAYMONGO_SK!);

// Examples (types are fully inferred)
const pm = await p.paymentMethod.create({
  data: {
    type: "gcash",
    details: { /* ... */ },
  },
});

const intent = await p.paymentIntent.create({
  data: {
    attributes: {
      amount: 10000,
      currency: "PHP",
      payment_method_allowed: ["gcash", "card"],
    },
  },
});
```

- Factory: [Paymongo()](src/sdk/index.ts:71) constructs the SDK with a default fetch client and Basic Authorization header using base64("sk_xxx:").

## Custom HTTP stack (bring your own client)

Inject your own transport (e.g., node-http, ky, custom fetch wrapper, retrier). Implement the [HttpClient](src/http/types.ts:14) interface.

```ts
import {
  Paymongo,
  type HttpClient,
  type RequestOptions,
  type ResponseEnvelope,
  HttpError,
} from "@re-up/paymongo-fn";

const client: HttpClient = {
  async get<T>(path: string, options?: Omit<RequestOptions, "body">): Promise<ResponseEnvelope<T>> {
    // ... perform request with your stack
    return { data: {} as T };
  },
  async post<T>(path: string, options?: RequestOptions): Promise<ResponseEnvelope<T>> {
    // ...
    return { data: {} as T };
  },
  async put<T>(path: string, options?: RequestOptions): Promise<ResponseEnvelope<T>> {
    // ...
    return { data: {} as T };
  },
  async patch<T>(path: string, options?: RequestOptions): Promise<ResponseEnvelope<T>> {
    // ...
    return { data: {} as T };
  },
  async delete<T>(path: string, options?: Omit<RequestOptions, "body">): Promise<ResponseEnvelope<T>> {
    // ...
    return { data: {} as T };
  },
};

const p = Paymongo(process.env.PAYMONGO_SK!, { client });

try {
  const res = await p.checkout.create({
    data: { attributes: { /* ... */ } },
  });
} catch (err) {
  if (err instanceof HttpError) {
    console.error("HTTP error", err.status, err.code, err.details);
  }
  throw err;
}
```

- Create your own transport using [HttpClient](src/http/types.ts:14).
- Reuse error helpers from [HttpError](src/http/types.ts:22) or define your own normalization in the client layer.

## API surface

SDK factory: [Paymongo()](src/sdk/index.ts:71)

- paymentMethod: [src/sdk/payment-methods.ts](src/sdk/payment-methods.ts:1)
  - create(params)
  - retrieve(params)
- paymentIntent: [src/sdk/payment-intent.ts](src/sdk/payment-intent.ts:1)
  - create(params)
  - retrieve(params)
  - attach(params)
- source: [src/sdk/source.ts](src/sdk/source.ts:1)
  - create(params)
  - retrieve(params)
- payment: [src/sdk/payments.ts](src/sdk/payments.ts:1)
  - create(params)
  - retrieve(params)
  - list(params)
- checkout: [src/sdk/checkout.ts](src/sdk/checkout.ts:1)
  - create(params)
  - retrieve(params)
  - expire(params)
- refund: [src/sdk/refund.ts](src/sdk/refund.ts:1)
  - create(params)
  - retrieve(params)
- customer: [src/sdk/customer.ts](src/sdk/customer.ts:1)
  - create(params)
  - retrieve(params)
  - edit(params)
  - delete(params)
- webhook: [src/sdk/webhooks.ts](src/sdk/webhooks.ts:1)
  - create(params)
  - retrieve(params)
  - list()
  - enable(params)
  - disable(params)
  - update(params)
- link: [src/sdk/link.ts](src/sdk/link.ts:1)
  - create(params)
  - retrieve(params)
  - getByReferenceNumber(params)
  - archive(params)
  - unarchive(params)

All functions return typed resources (Zod-inferred) wrapped by the SDK; the default client unwraps the JSON { data: T } envelope for you.

## Server vs Browser

- Secret key (sk_...) usage:
  - The SDK throws if you attempt to construct [Paymongo()](src/sdk/index.ts:71) with a secret key in the browser.
  - Use the server (Node/Bun) to perform secret operations.
- Public key (pk_...) usage:
  - For client-side flows, inject a public key on the server (if needed) and ensure no sensitive operations or secrets are present on the client.

## Error handling

The default fetch client throws [HttpError](src/http/types.ts:22) for non-2xx responses, including:
- status: number
- code?: string (when provided by PayMongo)
- details?: unknown (raw error payload portion)

Example:

```ts
import { Paymongo, HttpError } from "@re-up/paymongo-fn";

try {
  const p = Paymongo(process.env.PAYMONGO_SK!);
  await p.payment.create({ data: { /* ... */ } });
} catch (err) {
  if (err instanceof HttpError) {
    console.error(err.status, err.code, err.details);
  }
}
```

## Authorization

The SDK constructs a Basic Authorization header as base64("${key}:") in [createFetchClient()](src/http/fetch-client.ts:1) via the factory [Paymongo()](src/sdk/index.ts:71). This matches HTTP Basic semantics and PayMongo expectations.

## Build, typecheck, lint

```zsh
bun run build
bun run typecheck
bun run lint
```

Pre-publish checks:
- [package.json](package.json:1) defines "prepublishOnly": runs typecheck, lint, and build.

## Notes

- No axios or tRPC runtime dependencies.
- Default HTTP client uses global fetch and works in Node 18+, Bun, and modern browsers.
- You can override the client per environment (e.g., add retries, timeouts, custom logging).
- All code is strict TypeScript with no any.
