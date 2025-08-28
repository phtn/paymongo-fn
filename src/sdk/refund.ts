import type { HttpClient, RequestOptions } from "../http/types";
import type {
  RefundResource,
  CreateRefundParams,
  RetrieveRefundParams,
} from "@schema/zod.refund";

export const createRefund = async (
  data: CreateRefundParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: RefundResource }>("/refunds", {
    ...options,
    body: { data },
  });

  return res.data.data;
};

export const retrieveRefund = async (
  data: RetrieveRefundParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{ data: RefundResource }>(
    `/refunds/${data.id}`,
    options,
  );

  return res.data.data;
};

// export const listAllRefunds = async (
//   data: ListAllRefundsParam,
//   client: HttpClient,
//   options?: RequestOptions,
// ) => {
//   const queryParams: Record<string, string> = {};
//   if (data.payment_id) queryParams.payment_id = data.payment_id;
//   if (data.limit) queryParams.limit = String(data.limit);
//   if (data.before) queryParams.before = data.before;
//   if (data.after) queryParams.after = data.after;

//   const res = await client.get<{ data: RefundResource[] }>("/refunds", {
//     ...options,
//     query: queryParams,
//   });

//   return res.data.data;
// };
