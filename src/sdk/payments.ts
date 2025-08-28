import type { HttpClient, RequestOptions } from "../http/types";
import type {
  CreatePaymentParams,
  ListAllPaymentsParams,
  PaymentResource,
  RetrievePaymentParams,
} from "@schema/zod.payments";

export const createPayment = async (
  data: CreatePaymentParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: PaymentResource }>("/payments", {
    ...options,
    body: data,
  });

  return res.data.data;
};

export const listAllPayments = async (
  data: ListAllPaymentsParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{
    data: PaymentResource[];
    has_more: boolean;
  }>("/payments", {
    ...options,
    query: { ...data },
  });

  return res.data.data;
};

export const retrievePayment = async (
  data: RetrievePaymentParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{ data: PaymentResource }>(
    `/payments/${data.id}`,
    options,
  );

  return res.data.data;
};
