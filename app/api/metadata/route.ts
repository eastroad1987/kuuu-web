import { MetadataFetchResult, UrlMetadata } from "../../../types/metadata";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 },
      );
    }

    // Validate URL format
    let validUrl: URL;
    try {
      validUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid URL format" },
        { status: 400 },
      );
    }

    // Fetch the HTML content
    const response = await fetch(validUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MetadataBot/1.0)",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch URL: ${response.status}` },
        { status: 400 },
      );
    }

    const html = await response.text();
    const metadata = extractMetadata(html, validUrl.toString());

    const result: MetadataFetchResult = {
      success: true,
      data: metadata,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch metadata" },
      { status: 500 },
    );
  }
}

function extractMetadata(html: string, url: string): UrlMetadata {
  const metadata: UrlMetadata = { url };

  // Helper function to extract content from meta tags
  const getMetaContent = (
    property: string,
    attribute: string = "property",
  ): string | undefined => {
    const regex = new RegExp(
      `<meta\\s+${attribute}=["']${property}["']\\s+content=["']([^"']*?)["'][^>]*>`,
      "i",
    );
    const match = html.match(regex);
    return match ? match[1] : undefined;
  };

  // Helper function to extract content from meta tags by name
  const getMetaByName = (name: string): string | undefined => {
    return getMetaContent(name, "name");
  };

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  metadata.title =
    getMetaContent("og:title") ||
    getMetaContent("twitter:title") ||
    (titleMatch ? titleMatch[1].trim() : undefined);

  // Extract description
  metadata.description =
    getMetaContent("og:description") ||
    getMetaContent("twitter:description") ||
    getMetaByName("description");

  // Extract image
  const ogImage = getMetaContent("og:image");
  const twitterImage = getMetaContent("twitter:image");
  const twitterImageSrc = getMetaContent("twitter:image:src");

  let imageUrl = ogImage || twitterImage || twitterImageSrc;

  // Convert relative URLs to absolute URLs
  if (imageUrl && !imageUrl.startsWith("http")) {
    try {
      const baseUrl = new URL(url);
      imageUrl = new URL(imageUrl, baseUrl.origin).toString();
    } catch {
      // If URL construction fails, keep the original
    }
  }

  metadata.image = imageUrl;

  // Extract site name
  metadata.siteName =
    getMetaContent("og:site_name") ||
    getMetaContent("twitter:site") ||
    getMetaByName("application-name");

  // Extract type
  metadata.type = getMetaContent("og:type");

  // Extract favicon
  const faviconMatch = html.match(
    /<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']*?)["'][^>]*>/i,
  );
  let faviconUrl = faviconMatch ? faviconMatch[1] : "/favicon.ico";

  // Convert relative favicon URL to absolute URL
  if (faviconUrl && !faviconUrl.startsWith("http")) {
    try {
      const baseUrl = new URL(url);
      faviconUrl = new URL(faviconUrl, baseUrl.origin).toString();
    } catch {
      // If URL construction fails, keep the original
    }
  }

  metadata.favicon = faviconUrl;

  return metadata;
}
