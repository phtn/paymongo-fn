import type { HttpClient, RequestOptions } from "../http/types";
import type {
  CreateSourceParams,
  RetrieveSourceParams,
  SourceError,
  SourceResource,
} from "@schema/zod.source";

export const createSource = async (
  data: CreateSourceParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: SourceResource }>("/sources", {
    ...options,
    body: data,
  });

  return res.data.data;
};

export const retrieveSource = async (
  data: RetrieveSourceParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{ data: SourceResource }>(
    `sources/${data.id}`,
    options,
  );

  return res.data.data;
};

export const sourceError = (err: SourceError) => ({
  pointer: err.pointer,
  attribute: err.attribute,
});
