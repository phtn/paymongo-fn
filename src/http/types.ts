export type QueryValue = string | number | boolean | undefined;

export interface RequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, QueryValue>;
  body?: unknown;
  signal?: AbortSignal;
}

export interface ResponseEnvelope<T> {
  data: T;
}

export interface HttpClient {
  get<T>(path: string, options?: Omit<RequestOptions, "body">): Promise<ResponseEnvelope<T>>;
  post<T>(path: string, options?: RequestOptions): Promise<ResponseEnvelope<T>>;
  put<T>(path: string, options?: RequestOptions): Promise<ResponseEnvelope<T>>;
  patch<T>(path: string, options?: RequestOptions): Promise<ResponseEnvelope<T>>;
  delete<T>(path: string, options?: Omit<RequestOptions, "body">): Promise<ResponseEnvelope<T>>;
}

export class HttpError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}