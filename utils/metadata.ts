import { MetadataFetchResult } from "../types/metadata";

/**
 * Fetches metadata from a given URL using the API endpoint
 * @param url - The URL to fetch metadata from
 * @returns Promise with metadata result
 */
export async function fetchUrlMetadata(url: string): Promise<MetadataFetchResult> {
  try {
    const response = await fetch('/api/metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const result: MetadataFetchResult = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      success: false,
      error: 'Network error while fetching metadata',
    };
  }
}

/**
 * Validates if a string is a valid URL
 * @param string - The string to validate
 * @returns boolean indicating if the string is a valid URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

/**
 * Formats a URL by adding protocol if missing
 * @param url - The URL to format
 * @returns Formatted URL with protocol
 */
export function formatUrl(url: string): string {
  if (!url) return '';
  
  // Remove whitespace
  url = url.trim();
  
  // Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  return url;
}

/**
 * Extracts domain name from URL
 * @param url - The URL to extract domain from
 * @returns Domain name or empty string if invalid
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
}
