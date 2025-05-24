import { HTTPMethods, HTTPReadRequest, HTTPWriteRequest } from './types';

export default class HTTPClient {
  private readonly initHeaders: Record<string, any>;

  constructor(
    private readonly baseUrl: string,
    headers: Record<string, any> = {},
  ) {
    this.initHeaders = {
      // JSON biased
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  private async useFetch(method: HTTPMethods, params: HTTPWriteRequest) {
    const baseUrl = params.baseUrl ?? this.baseUrl;
    const headers = new Headers({
      ...this.initHeaders,
      ...params.headers,
    });
    if (params.query) {
      const query = new URLSearchParams(
        Object.fromEntries(
          // removes attributes where value is undefined
          Object.entries(params.query).filter(
            (value) => value[1] !== undefined,
          ),
        ),
      );
      params.path = params.path + `?${query.toString()}`;
    }
    const url = baseUrl + params.path;
    if (params.body instanceof FormData) {
      // Object biased
      params.body = Object.fromEntries(params.body.entries());
    }
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(params.body),
      });
      return response;
    } catch {
      throw new Error('Network request failed');
    }
  }

  get(params: HTTPReadRequest) {
    return this.useFetch('GET', params);
  }

  head(params: HTTPReadRequest) {
    return this.useFetch('HEAD', params);
  }

  post(params: HTTPWriteRequest) {
    return this.useFetch('POST', params);
  }

  put(params: HTTPWriteRequest) {
    return this.useFetch('PUT', params);
  }

  delete(params: HTTPReadRequest) {
    return this.useFetch('DELETE', params);
  }

  connect(params: HTTPReadRequest) {
    return this.useFetch('CONNECT', params);
  }

  options(params: HTTPReadRequest) {
    return this.useFetch('OPTIONS', params);
  }

  patch(params: HTTPWriteRequest) {
    return this.useFetch('PATCH', params);
  }
}
