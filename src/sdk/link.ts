import type { HttpClient, RequestOptions } from "../http/types";
import type {
  LinkResource,
  CreateLinkParam,
  RetrieveLinkParam,
  GetLinkByRefParam,
  ArchiveLinkParam,
  UnarchiveLinkParam,
} from "@schema/zod.link";

export const createLink = async (
  data: CreateLinkParam,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: LinkResource }>("/links", {
    ...options,
    body: { data },
  });
  return res.data.data;
};

export const retrieveLink = async (
  data: RetrieveLinkParam,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{ data: LinkResource }>(
    `/links/${data.id}`,
    options,
  );
  return res.data.data;
};

export const getLinkByReferenceNumber = async (
  data: GetLinkByRefParam,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{ data: LinkResource }>(
    `/links`,
    { ...options, query: { reference_number: data.reference_number } },
  );
  return res.data.data;
};

export const archiveLink = async (
  data: ArchiveLinkParam,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: LinkResource }>(
    `/links/${data.id}/archive`,
    { ...options, body: {} },
  );
  return res.data.data;
};

export const unarchiveLink = async (
  data: UnarchiveLinkParam,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: LinkResource }>(
    `/links/${data.id}/unarchive`,
    { ...options, body: {} },
  );
  return res.data.data;
};
