import type { HttpClient, RequestOptions } from "../http/types";
import type {
  WebhookResource,
  CreateWebhookParams,
  RetrieveWebhookParams,
  EnableWebhookParams,
  DisableWebhookParams,
  UpdateWebhookParams,
} from "@schema/zod.webhook";

export const createWebhook = async (
  data: CreateWebhookParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: WebhookResource }>("/webhooks", {
    ...options,
    body: { data },
  });

  return res.data.data;
};

export const retrieveWebhook = async (
  data: RetrieveWebhookParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.get<{ data: WebhookResource }>(
    `/webhooks/${data.id}`,
    options,
  );

  return res.data.data;
};

export const listWebhooks = async (client: HttpClient) => {
  const res = await client.get<{ data: WebhookResource[] }>("/webhooks");
  return res.data.data;
};

export const enableWebhook = async (
  data: EnableWebhookParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: WebhookResource }>(
    `/webhooks/${data.id}/enable`,
    { ...options, body: {} },
  );

  return res.data.data;
};

export const disableWebhook = async (
  data: DisableWebhookParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.post<{ data: WebhookResource }>(
    `/webhooks/${data.id}/disable`,
    { ...options, body: {} },
  );

  return res.data.data;
};

export const updateWebhook = async (
  data: UpdateWebhookParams,
  client: HttpClient,
  options?: RequestOptions,
) => {
  const res = await client.put<{ data: WebhookResource }>(
    `/webhooks/${data.id}`,
    { ...options, body: { data } },
  );

  return res.data.data;
};
