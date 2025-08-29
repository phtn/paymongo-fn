# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning (SemVer). While < 1.0.0, MINOR version bumps may include breaking changes.

## [0.2.0] - 2025-08-29

### Added
- Transport‑agnostic SDK design with a minimal HTTP abstraction:
  - [`HttpClient`](src/http/types.ts:14)
  - [`RequestOptions`](src/http/types.ts:3)
  - [`ResponseEnvelope`](src/http/types.ts:10)
  - [`HttpError`](src/http/types.ts:22)
- Default fetch-based HTTP client:
  - [`createFetchClient()`](src/http/fetch-client.ts:1)
  - JSON encode/decode, query support, and normalized error handling
- Centralized default base URL and option to override:
  - [`PAYMONGO_BASE_URL`](src/http/constants.ts:1) = `https://api.paymongo.com/v1`
  - [`Paymongo()`](src/sdk/index.ts:70) accepts `opts.baseUrl` and `opts.headers`
- Public exports to build custom integrations:
  - [src/index.ts](src/index.ts:1) exports `Paymongo`, `createFetchClient`, `HttpClient`, `RequestOptions`, `ResponseEnvelope`, `HttpError`

### Changed
- All SDK callers now use the transport abstraction via the `HttpClient`:
  - Payment Methods: [src/sdk/payment-methods.ts](src/sdk/payment-methods.ts:1)
  - Payment Intent: [src/sdk/payment-intent.ts](src/sdk/payment-intent.ts:1)
  - Sources: [src/sdk/source.ts](src/sdk/source.ts:1)
  - Payments: [src/sdk/payments.ts](src/sdk/payments.ts:1)
  - Checkout: [src/sdk/checkout.ts](src/sdk/checkout.ts:1)
  - Refunds: [src/sdk/refund.ts](src/sdk/refund.ts:1)
  - Customers: [src/sdk/customer.ts](src/sdk/customer.ts:1)
  - Webhooks: [src/sdk/webhooks.ts](src/sdk/webhooks.ts:1)
  - Links: [src/sdk/link.ts](src/sdk/link.ts:1)
- SDK factory creates a default client with Basic Authorization header:
  - [`Paymongo()`](src/sdk/index.ts:70)

### Removed
- axios runtime dependency and axios-based instance file (fully excluded from build)
- tRPC-related runtime coupling (trpc sources excluded from typecheck/lint/build)

### Documentation
- README updated with:
  - Quick start using default fetch client
  - Bringing your own HTTP client
  - API surface overview
  - Error handling with [`HttpError`](src/http/types.ts:22)
  - Configuration for overriding `baseUrl` and `headers`

### Tooling
- ESLint flat config scoped to library sources: [eslint.config.mjs](eslint.config.mjs:1)
- tsconfig excludes non-library directories and legacy axios file: [tsconfig.json](tsconfig.json:1)
- Prepublish checks in scripts: [package.json](package.json:1)

### Notes
- Secret key guard: `Paymongo("sk_...")` throws when called in the browser
- Basic Authorization header corrected to `base64("${key}:")`

## [0.1.3] - 2025-08-28
- Package rename to `paymongo-fn`
- Initial transport refactor groundwork and cleanup
- Type, lint, and build configuration stabilizations