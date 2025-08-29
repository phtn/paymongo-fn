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
bun add paymongo-fn
```

## Quick start (default fetch client)

```ts
import { Paymongo } from "paymongo-fn";

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

## Configuration (override baseUrl and headers)

You can override the default API base URL and/or add custom headers when constructing the SDK. If you pass a custom `client`, that transport takes full control and the `baseUrl`/`headers` options are not used.

```ts
import { Paymongo } from "paymongo-fn";

// Defaults to https://api.paymongo.com/v1 and includes Basic Authorization header.
// You can override the base URL (e.g., for staging) and attach extra headers.
const p = Paymongo(process.env.PAYMONGO_SK!, {
  baseUrl: "https://api.paymongo.com/v1", // default; override if needed
  headers: {
    "X-Client": "my-app/1.2.3",
    // Any additional headers to send along with requests
  },
});
```

Precedence:
- If `client` is provided: it is used directly and you are responsible for base URL, headers, and authorization.
- Otherwise: a default fetch-based client is created with the provided `baseUrl` and `headers` merged with Basic Authorization.
## Custom HTTP stack (bring your own client)

Inject your own transport (e.g., node-http, ky, custom fetch wrapper, retrier). Implement the [HttpClient](src/http/types.ts:14) interface.

```ts
import {
  Paymongo,
  type HttpClient,
  type RequestOptions,
  type ResponseEnvelope,
  HttpError,
} from "paymongo-fn";

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
import { Paymongo, HttpError } from "paymongo-fn";

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

## Next.js App Router examples (server-only)

Prerequisites
- Install: bun add paymongo-fn
- Server env: PAYMONGO_SK=sk_test_...
- Create a server-only SDK instance once:
  - [lib/paymongo.ts](lib/paymongo.ts:1)
```ts
// lib/paymongo.ts

import "server-only";
import {
  Paymongo,
  createFetchClient,
  type CheckoutParams,
  type CheckoutResource,
} from "paymongo-fn";

const sk = process.env.PAYMONGO_SK;
if (!sk) {
  throw new Error(
    "PAYMONGO_SK environment variable is not set. Configure your PayMongo secret key on the server.",
  );
}

const authorization = `Basic ${Buffer.from(`${sk}:`, "utf8").toString("base64")}`;

export const paymongo = Paymongo(sk);

export const client = createFetchClient(undefined, {
  authorization,
});

export async function createCheckoutSession(
  body: CheckoutParams,
): Promise<CheckoutResource> {
  const { data } = await client.post<CheckoutResource>("/checkout_sessions", {
    body,
  });
  return data;
}

```

Notes
- All examples below are server handlers in the Next.js App Router.
- Replace body shapes with the exact types your flow requires. The SDK validates on the server via Zod schemas.
- Never expose your secret key to the browser.

### Payment Methods

- Create
  - [app/api/payment-methods/route.ts](app/api/payment-methods/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await paymongo.paymentMethod.create(body);
  return NextResponse.json(data, { status: 201 });
}
```

- Retrieve
  - [app/api/payment-methods/[id]/route.ts](app/api/payment-methods/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.paymentMethod.retrieve({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

### Payment Intents

- Create
  - [app/api/payment-intents/route.ts](app/api/payment-intents/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await paymongo.paymentIntent.create(body);
  return NextResponse.json(data, { status: 201 });
}
```

- Retrieve (requires client_key)
  - [app/api/payment-intents/[id]/route.ts](app/api/payment-intents/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(req: Request, ctx: { params: { id: string } }) {
  const url = new URL(req.url);
  const client_key = url.searchParams.get("client_key");
  if (!client_key) return NextResponse.json({ error: "client_key required" }, { status: 400 });

  const data = await paymongo.paymentIntent.retrieve({
    id: ctx.params.id,
    client_key,
  });
  return NextResponse.json(data, { status: 200 });
}
```

- Attach
  - [app/api/payment-intents/[id]/attach/route.ts](app/api/payment-intents/[id]/attach/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const body = await req.json();
  const data = await paymongo.paymentIntent.attach({ id: ctx.params.id, ...body });
  return NextResponse.json(data, { status: 200 });
}
```

### Sources

- Create
  - [app/api/sources/route.ts](app/api/sources/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await paymongo.source.create(body);
  return NextResponse.json(data, { status: 201 });
}
```

- Retrieve
  - [app/api/sources/[id]/route.ts](app/api/sources/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.source.retrieve({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

### Payments

- Create
  - [app/api/payments/route.ts](app/api/payments/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await paymongo.payment.create(body);
  return NextResponse.json(data, { status: 201 });
}
```

- Retrieve
  - [app/api/payments/[id]/route.ts](app/api/payments/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.payment.retrieve({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

- List
  - [app/api/payments/list/route.ts](app/api/payments/list/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

// query params: before, after, limit (as needed)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams);
  const data = await paymongo.payment.list(params as Record<string, string>);
  return NextResponse.json(data, { status: 200 });
}
```

### Checkout Sessions

- Create
  - [app/api/checkout/route.ts](app/api/checkout/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await paymongo.checkout.create(body);
  return NextResponse.json(data, { status: 201 });
}
```

- Retrieve
  - [app/api/checkout/[checkout_session_id]/route.ts](app/api/checkout/[checkout_session_id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(_req: Request, ctx: { params: { checkout_session_id: string } }) {
  const data = await paymongo.checkout.retrieve({ checkout_session_id: ctx.params.checkout_session_id });
  return NextResponse.json(data, { status: 200 });
}
```

- Expire
  - [app/api/checkout/[checkout_session_id]/expire/route.ts](app/api/checkout/[checkout_session_id]/expire/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(_req: Request, ctx: { params: { checkout_session_id: string } }) {
  const data = await paymongo.checkout.expire({ checkout_session_id: ctx.params.checkout_session_id });
  return NextResponse.json(data, { status: 200 });
}
```

### Refunds

- Create
  - [app/api/refunds/route.ts](app/api/refunds/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await paymongo.refund.create(body);
  return NextResponse.json(data, { status: 201 });
}
```

- Retrieve
  - [app/api/refunds/[id]/route.ts](app/api/refunds/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.refund.retrieve({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

### Customers

- Create
  - [app/api/customers/route.ts](app/api/customers/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await paymongo.customer.create(body);
  return NextResponse.json(data, { status: 201 });
}
```

- Retrieve
  - [app/api/customers/[id]/route.ts](app/api/customers/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.customer.retrieve({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

- Edit
  - [app/api/customers/[id]/edit/route.ts](app/api/customers/[id]/edit/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function PUT(req: Request, ctx: { params: { id: string } }) {
  const body = await req.json();
  const data = await paymongo.customer.edit({ id: ctx.params.id, ...body });
  return NextResponse.json(data, { status: 200 });
}
```

- Delete
  - [app/api/customers/[id]/route.ts](app/api/customers/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function DELETE(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.customer.delete({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

### Webhooks

- Create
  - [app/api/webhooks/route.ts](app/api/webhooks/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await paymongo.webhook.create(body);
  return NextResponse.json(data, { status: 201 });
}
```

- Retrieve
  - [app/api/webhooks/[id]/route.ts](app/api/webhooks/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.webhook.retrieve({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

- List
  - [app/api/webhooks/list/route.ts](app/api/webhooks/list/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET() {
  const data = await paymongo.webhook.list();
  return NextResponse.json(data, { status: 200 });
}
```

- Enable
  - [app/api/webhooks/[id]/enable/route.ts](app/api/webhooks/[id]/enable/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.webhook.enable({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

- Disable
  - [app/api/webhooks/[id]/disable/route.ts](app/api/webhooks/[id]/disable/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.webhook.disable({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

- Update
  - [app/api/webhooks/[id]/route.ts](app/api/webhooks/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function PUT(req: Request, ctx: { params: { id: string } }) {
  const body = await req.json();
  const data = await paymongo.webhook.update({ id: ctx.params.id, ...body });
  return NextResponse.json(data, { status: 200 });
}
```

### Links

- Create
  - [app/api/links/route.ts](app/api/links/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await paymongo.link.create(body);
  return NextResponse.json(data, { status: 201 });
}
```

- Retrieve
  - [app/api/links/[id]/route.ts](app/api/links/[id]/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.link.retrieve({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

- Get by reference number
  - [app/api/links/by-reference/route.ts](app/api/links/by-reference/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const reference_number = url.searchParams.get("reference_number");
  if (!reference_number) return NextResponse.json({ error: "reference_number required" }, { status: 400 });

  const data = await paymongo.link.getByReferenceNumber({ reference_number });
  return NextResponse.json(data, { status: 200 });
}
```

- Archive
  - [app/api/links/[id]/archive/route.ts](app/api/links/[id]/archive/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.link.archive({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

- Unarchive
  - [app/api/links/[id]/unarchive/route.ts](app/api/links/[id]/unarchive/route.ts:1)
```ts
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(_req: Request, ctx: { params: { id: string } }) {
  const data = await paymongo.link.unarchive({ id: ctx.params.id });
  return NextResponse.json(data, { status: 200 });
}
```

## Using SDK types

All request/response types are exported, so you can type your handlers and payloads explicitly.

```ts
import {
  type CheckoutParams,
  type RetrieveCheckoutParams,
  type ExpireCheckoutParams,
  type CreatePaymentIntentParams,
  type RetrievePaymentIntentParamsUsingPublic,
  type AttachPaymentIntentParamsUsingPublic,
  type CreatePaymentParams,
  type RetrievePaymentParams,
  type ListAllPaymentsParams,
  type CreatePaymentMethodParams,
  type RetrievePaymentMethodParams,
  type CreateSourceParams,
  type RetrieveSourceParams,
  type CreateRefundParams,
  type RetrieveRefundParams,
  type CreateCustomerParams,
  type RetrieveCustomerParams,
  type EditCustomerParams,
  type DeleteCustomerParams,
  type CreateWebhookParams,
  type RetrieveWebhookParams,
  type EnableWebhookParams,
  type DisableWebhookParams,
  type UpdateWebhookParams,
  type CreateLinkParam,
  type RetrieveLinkParam,
  type GetLinkByRefParam,
  type ArchiveLinkParam,
  type UnarchiveLinkParam,
} from "paymongo-fn";
```

Examples

- Strongly-typed variables:

```ts
const checkoutParams: CheckoutParams = {
  data: {
    attributes: {
      line_items: [
        { name: "T-Shirt", amount: 10000, currency: "PHP", quantity: 1, description: "Black L" },
      ],
      payment_method_types: ["gcash", "card"],
      success_url: "https://your-app.com/success",
      cancel_url: "https://your-app.com/cancel",
    },
  },
};
```

- Typed body from Next.js Request:

```ts
export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutParams;
  const checkout = await paymongo.checkout.create(body);
  // ...
}
```

- Other endpoint examples:

```ts
const piCreate: CreatePaymentIntentParams = {
  data: {
    attributes: {
      amount: 10000,
      currency: "PHP",
      payment_method_allowed: ["gcash", "card"],
    },
  },
};

const piRetrieve: RetrievePaymentIntentParamsUsingPublic = {
  id: "pi_123",
  client_key: "pi_client_key_abc",
};

const piAttach: AttachPaymentIntentParamsUsingPublic = {
  id: "pi_123",
  data: { attributes: { client_key: "pi_client_key_abc", payment_method: "gcash" } },
};

const payCreate: CreatePaymentParams = {
  data: {
    attributes: {
      amount: 10000,
      currency: "PHP",
      source: { type: "source", id: "src_123" },
    },
  },
};

const payList: ListAllPaymentsParams = { limit: "10" };

const pmCreate: CreatePaymentMethodParams = {
  data: { type: "gcash", details: { /* ... */ } },
};
```

Tips

- Import types directly from "paymongo-fn" and annotate your Request JSON parsing via `as TypeName`.
- When building shared helpers, re-export types from your own module to keep imports consistent across your codebase.

## Quick start with types

You can strongly-type your params and request parsing using the exported types.

```ts
import { Paymongo, type CheckoutParams, type CreatePaymentIntentParams } from "paymongo-fn";

const p = Paymongo(process.env.PAYMONGO_SK!);

// Typed Checkout params
const checkoutParams: CheckoutParams = {
  data: {
    attributes: {
      line_items: [
        { name: "T-Shirt", amount: 10000, currency: "PHP", quantity: 1, description: "Black L" },
      ],
      payment_method_types: ["gcash", "card"],
      success_url: "https://your-app.com/success",
      cancel_url: "https://your-app.com/cancel",
    },
  },
};

const session = await p.checkout.create(checkoutParams);

// Typed Payment Intent params
const piParams: CreatePaymentIntentParams = {
  data: {
    attributes: {
      amount: 10000,
      currency: "PHP",
      payment_method_allowed: ["gcash", "card"],
    },
  },
};

const intent = await p.paymentIntent.create(piParams);
```

Type Next.js request bodies:

```ts
import { type CheckoutParams } from "paymongo-fn";
import { NextResponse } from "next/server";
import { paymongo } from "@/lib/paymongo";

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutParams;
  const checkout = await paymongo.checkout.create(body);
  return NextResponse.json(checkout, { status: 201 });
}
```
