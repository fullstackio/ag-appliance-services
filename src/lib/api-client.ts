/**
 * Tiny typed fetch wrapper for calling our own /api routes from the client.
 * Author: Avijit Ghosh
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly fields?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ErrorBody {
  error?: string;
  fields?: Record<string, string>;
}

export async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
  });

  if (!res.ok) {
    let body: ErrorBody = {};
    try {
      body = (await res.json()) as ErrorBody;
    } catch {
      // non-JSON error body
    }
    throw new ApiError(body.error ?? `Request failed (${res.status})`, res.status, body.fields);
  }

  return (await res.json()) as T;
}
