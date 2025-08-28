import type { HttpClient, RequestOptions } from "../http/types";
import type {
  CreateCustomerParams,
  RetrieveCustomerParams,
  CustomerResource,
  EditCustomerParams,
  DeleteCustomerParams,
} from "@schema/zod.customer";

export const createCustomer = async (
  data: CreateCustomerParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: CustomerResource }>("/customers", {
    ...options,
    body: data,
  });
  return res.data.data;
};

export const retrieveCustomer = async (
  data: RetrieveCustomerParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{ data: CustomerResource }>(
    `/customers/${data.id}`,
    options,
  );
  return res.data.data;
};

export const editCustomer = async (
  data: EditCustomerParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.put<{ data: CustomerResource }>(
    `/customers/${data.id}`,
    { ...options, body: data },
  );
  return res.data.data;
};

export const deleteCustomer = async (
  data: DeleteCustomerParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.delete<{ data: CustomerResource }>(
    `/customers/${data.id}`,
    options,
  );
  return res.data.data;
};
