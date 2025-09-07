export interface UrlMetadata {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
  type?: string;
  favicon?: string;
}

export interface MetadataFetchResult {
  success: boolean;
  data?: UrlMetadata;
  error?: string;
}
