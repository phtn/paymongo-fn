import type { SecretOrPublicKey } from "@schema/zod.common";
import type { HttpClient } from "../http/types";
import { createFetchClient } from "../http/fetch-client";

import {
  createPaymentMethod,
  retrievePaymentMethod,
} from "@sdk/payment-methods";
import {
  retrievePaymentIntent,
  attachPaymentIntent,
  createPaymentIntent,
} from "@sdk/payment-intent";
import { createSource, retrieveSource } from "@sdk/source";
import { createPayment, listAllPayments, retrievePayment } from "@sdk/payments";
import {
  createCheckoutSession,
  expireCheckoutSession,
  retrieveCheckoutSession,
} from "@sdk/checkout";
import { createRefund, retrieveRefund } from "@sdk/refund";
import {
  createCustomer,
  retrieveCustomer,
  editCustomer,
  deleteCustomer,
} from "@sdk/customer";
import {
  createWebhook,
  retrieveWebhook,
  listWebhooks,
  enableWebhook,
  disableWebhook,
  updateWebhook,
} from "@sdk/webhooks";
import {
  createLink,
  retrieveLink,
  getLinkByReferenceNumber,
  archiveLink,
  unarchiveLink,
} from "@sdk/link";

const toBase64 = (value: string): string => {
  // Prefer browser's btoa when available
  if (
    typeof globalThis !== "undefined" &&
    typeof (globalThis as { btoa?: unknown }).btoa === "function"
  ) {
    return (globalThis as { btoa: (s: string) => string }).btoa(value);
  }
  // Fallback to Node/Bun Buffer API
  return Buffer.from(value, "utf8").toString("base64");
};

const createFn = <TParams, TReturn>(
  fn: (params: TParams, client: HttpClient) => Promise<TReturn>,
  client: HttpClient,
) => {
  return (data: TParams) => fn(data, client);
};

// New function for methods with optional parameters
const createNoParamFn = <TReturn>(
  fn: (client: HttpClient) => Promise<TReturn>,
  client: HttpClient,
) => {
  return () => fn(client);
};

const Paymongo = (key: SecretOrPublicKey, opts?: { client?: HttpClient }) => {
  const client =
    opts?.client ??
    createFetchClient("https://api.paymongo.com/v1", {
      // PayMongo expects Basic auth using base64(`${key}:`)
      Authorization: `Basic ${toBase64(`${key}:`)}`,
    });

  const isSecret = key.includes("sk");

  if (typeof window !== "undefined" && isSecret) {
    throw new Error("Do not use the secret key in the browser");
  }

  return {
    paymentMethod: {
      create: createFn(createPaymentMethod, client),
      retrieve: createFn(retrievePaymentMethod, client),
    },
    paymentIntent: {
      create: createFn(createPaymentIntent, client),
      retrieve: createFn(retrievePaymentIntent, client),
      attach: createFn(attachPaymentIntent, client),
    },
    source: {
      create: createFn(createSource, client),
      retrieve: createFn(retrieveSource, client),
    },
    payment: {
      create: createFn(createPayment, client),
      retrieve: createFn(retrievePayment, client),
      list: createFn(listAllPayments, client),
    },
    checkout: {
      create: createFn(createCheckoutSession, client),
      retrieve: createFn(retrieveCheckoutSession, client),
      expire: createFn(expireCheckoutSession, client),
    },
    refund: {
      create: createFn(createRefund, client),
      retrieve: createFn(retrieveRefund, client),
    },
    customer: {
      create: createFn(createCustomer, client),
      retrieve: createFn(retrieveCustomer, client),
      edit: createFn(editCustomer, client),
      delete: createFn(deleteCustomer, client),
    },
    webhook: {
      create: createFn(createWebhook, client),
      retrieve: createFn(retrieveWebhook, client),
      list: createNoParamFn(listWebhooks, client),
      enable: createFn(enableWebhook, client),
      disable: createFn(disableWebhook, client),
      update: createFn(updateWebhook, client),
    },
    link: {
      create: createFn(createLink, client),
      retrieve: createFn(retrieveLink, client),
      getByReferenceNumber: createFn(getLinkByReferenceNumber, client),
      archive: createFn(archiveLink, client),
      unarchive: createFn(unarchiveLink, client),
    },
  };
};

export { Paymongo };
