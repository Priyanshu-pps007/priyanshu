const backendUrl = process.env.PORTFOLIO_BACKEND_API_URL?.trim() || "https://backend-f5c9d745.fastapicloud.dev/";

export const backendApiUrl = backendUrl.replace(/\/$/, "");

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

  const payload = (await response.json()) as T & { detail?: string; message?: string };

  if (!response.ok) {
    throw new Error(payload.detail || payload.message || "Backend request failed.");
  }

  return payload;
}
