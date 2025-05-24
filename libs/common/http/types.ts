export type HTTPWriteRequest = {
  path: string;
  headers?: Record<string, string>;
  query?: Record<string, any>;
  body?: Record<string, any> | FormData;
  baseUrl?: string;
};

export type HTTPReadRequest = Omit<HTTPWriteRequest, 'body'>;

export type HTTPMethods =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';
