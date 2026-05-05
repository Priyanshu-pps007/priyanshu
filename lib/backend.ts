const backendUrl = process.env.PORTFOLIO_BACKEND_API_URL?.trim() || "https://backend-f5c9d745.fastapicloud.dev/";

export const backendApiUrl = backendUrl.replace(/\/$/, "");

export class BackendRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BackendRequestError";
    this.status = status;
  }
}

type BackendRequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  cache?: RequestCache;
};

export async function backendRequest<T>(path: string, options: BackendRequestOptions = {}) {
  const response = await fetch(`${backendApiUrl}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: options.cache || "no-store",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson
    ? ((await response.json()) as T & { detail?: string; message?: string })
    : null;

  if (!response.ok) {
    const fallbackMessage = isJson
      ? payload?.detail || payload?.message || "Backend request failed."
      : `Backend request failed with status ${response.status}.`;

    throw new BackendRequestError(fallbackMessage, response.status);
  }

  return payload as T;
}
