import type { HttpClient, RequestOptions } from "../http/types";
import type {
  CheckoutParams,
  CheckoutResource,
  RetrieveCheckoutParams,
  ExpireCheckoutParams,
} from "@schema/zod.checkout";

export const createCheckoutSession = async (
  data: CheckoutParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: CheckoutResource }>(
    "/checkout_sessions",
    { ...options, body: data },
  );

  return res.data.data;
};

export const retrieveCheckoutSession = async (
  values: RetrieveCheckoutParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{ data: CheckoutResource }>(
    `/checkout_sessions/${values.checkout_session_id}`,
    options,
  );

  return res.data.data;
};

export const expireCheckoutSession = async (
  values: ExpireCheckoutParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: CheckoutResource }>(
    `/checkout_sessions/${values.checkout_session_id}/expire`,
    { ...options },
  );

  return res.data.data;
};
