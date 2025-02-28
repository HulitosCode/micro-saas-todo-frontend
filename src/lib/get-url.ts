// Função para obter a URL completa com o caminho normalizado
export function getUrl(path?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path || "";
  return `${baseUrl}${normalizedPath}`;
}
