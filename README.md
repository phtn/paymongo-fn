# Paymongo Fn

##### Paymongo SDK - All Functions Everything

#

### features

- Built primarily for _tRPC_
- Zod validated schemas and resource, all Typescript inferred.
- Axios handled API calls
- All server side requests
- Also works on NextJS

#### install

```zsh
bun i @re-up/paymongo-fn
```

#### usage

```ts
import { Paymongo } from "@re-up/paymongo-fn";

const paymongo = Paymongo(process.env.PAYMONGO_SK);

const onCheckout = async (params) => await paymongo.checkout.create(params);
```

#### tRPC

```ts
// trpc/router.ts

const router = createRouter({
    checkout: checkoutProcedure.mutation(async({input}) => await paymongo.checkout.create(input)
})

// trpc/caller.ts

const checkout = async (params) => await trpc.router.checkout(params)
```

#### async helpers

```typescript
interface RParams<T> {
  input: T;
}

const asyncR =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
  async ({ input }: RParams<TParams>) =>
    await fn(input);
```

This helper is for mutations and expects input as key. It makes your code a bit concise and readable.

```ts
const router = createRouter({
  // checkout params is inferred by what paymongo.checkout.create accepts
  checkout: checkoutProcedure.mutation(asyncR(paymongo.checkout.create)),
  // retrieve params is inferred by what paymongo.checkout.retrieve accepts
  retrieve: retrieveProcedure.mutation(asyncR(paymongo.checkout.retrieve)),
});
```

```ts
const asyncFn =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
  async (params: TParams) =>
    await fn(params);
```

This one is a plane async/await wrapper, also type inferred based on the callers params.

```ts
const checkout = asyncFn(trpc.router.checkout);
```

_re-up.ph_
