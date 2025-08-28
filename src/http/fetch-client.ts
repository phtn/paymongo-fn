import type { HttpClient, RequestOptions, ResponseEnvelope } from "./types";
import { HttpError } from "./types";

type HeadersRecord = Record<string, string>;

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const encodeQuery = (query?: Record<string, string | number | boolean | undefined>) => {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined) continue;
    params.append(k, String(v));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
};

const mergeHeaders = (a?: HeadersRecord, b?: HeadersRecord): HeadersRecord => ({
  ...(a ?? {}),
  ...(b ?? {}),
});

const toJson = (body: unknown) => (body === undefined ? undefined : JSON.stringify(body));

async function parseJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

function extractErrorInfo(payload: unknown): { message: string; code?: string; details?: unknown } {
  // PayMongo error shape is typically { errors: [{ code, detail, ... }] }
  if (isObject(payload) && Array.isArray(payload.errors) && payload.errors.length > 0) {
    const first = payload.errors[0];
    if (isObject(first)) {
      const msg = (typeof first.detail === "string" ? first.detail : undefined) ?? "Request failed";
      const code = typeof first.code === "string" ? first.code : undefined;
      return { message: msg, code, details: first };
    }
  }
  // Fallback
  return { message: "Request failed", details: payload };
}

export const createFetchClient = (
  baseUrl: string,
  defaultHeaders?: HeadersRecord,
): HttpClient => {
  const request = async <T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    options?: RequestOptions,
  ): Promise<ResponseEnvelope<T>> => {
    const url = `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\/?/, "")}${encodeQuery(
      options?.query,
    )}`;

    const headers = mergeHeaders(
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mergeHeaders(defaultHeaders, options?.headers),
    );

    const res = await fetch(url, {
      method,
      headers,
      body: method === "GET" || method === "DELETE" ? undefined : toJson(options?.body),
      signal: options?.signal,
    });

    if (!res.ok) {
      const payload = await parseJsonSafe(res);
      const info = extractErrorInfo(payload);
      throw new HttpError(info.message, res.status, info.code, info.details);
    }

    // Successful; expect { data: T }
    const payload = await parseJsonSafe(res);
    if (isObject(payload) && "data" in payload) {
      return { data: payload.data as T };
    }

    // Some endpoints may return raw responses; treat entire payload as data
    return { data: payload as T };
  };

  const client: HttpClient = {
    get: (path, options) => request("GET", path, options),
    post: (path, options) => request("POST", path, options),
    put: (path, options) => request("PUT", path, options),
    patch: (path, options) => request("PATCH", path, options),
    delete: (path, options) => request("DELETE", path, options),
  };

  return client;
};