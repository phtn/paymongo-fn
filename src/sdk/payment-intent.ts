import type { HttpClient, RequestOptions } from "../http/types";
import type {
  CreatePaymentIntentParams,
  PaymentIntentResource,
  RetrievePaymentIntentParamsUsingPublic,
  AttachPaymentIntentParamsUsingPublic,
} from "@schema/zod.payment-intent";

export const createPaymentIntent = async (
  data: CreatePaymentIntentParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: PaymentIntentResource }>(
    "/payment_intents",
    { ...options, body: data },
  );

  return res.data.data;
};

export const retrievePaymentIntent = async (
  data: RetrievePaymentIntentParamsUsingPublic,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const { id, client_key } = data;

  const res = await client.get<{ data: PaymentIntentResource }>(
    `/payment_intents/${id}`,
    { ...options, query: { client_key } },
  );

  return res.data.data;
};

export const attachPaymentIntent = async (
  data: AttachPaymentIntentParamsUsingPublic,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const { id, ...params } = data;
  const res = await client.post<{ data: PaymentIntentResource }>(
    `/payment_intents/${id}/attach`,
    { ...options, body: params },
  );

  return res.data.data;
};
