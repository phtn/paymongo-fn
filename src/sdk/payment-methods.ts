import type { HttpClient, RequestOptions } from "../http/types";
import type {
  CreatePaymentMethodParams,
  PaymentMethodResource,
  RetrievePaymentMethodParams,
} from "@schema/zod.payment-methods";

export const createPaymentMethod = async (
  data: CreatePaymentMethodParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: PaymentMethodResource }>(
    "/payment_methods",
    { ...options, body: data },
  );

  return res.data.data;
};

export const retrievePaymentMethod = async (
  data: RetrievePaymentMethodParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{ data: PaymentMethodResource }>(
    `/payment_methods/${data.id}`,
    options,
  );

  return res.data.data;
};
