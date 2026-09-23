const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicAssetPath(assetPath: string): string {
  if (/^(?:https?:)?\/\//i.test(assetPath)) return assetPath;
  const basePath = configuredBasePath.replace(/\/+$/, "");
  const normalizedPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  if (!basePath || normalizedPath === basePath || normalizedPath.startsWith(`${basePath}/`)) {
    return normalizedPath;
  }
  return `${basePath}${normalizedPath}`;
}
