/**
 * Image compression utility for reducing file size and resolution
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  format?: "image/jpeg" | "image/png" | "image/webp";
}

/**
 * Compress an image file by reducing resolution and quality
 * @param file - The original image file
 * @param options - Compression options
 * @returns Promise<File> - The compressed image file
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = {},
): Promise<File> => {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.8,
    format = "image/jpeg",
  } = options;

  return new Promise((resolve, reject) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      resolve(file); // Return original file if not an image
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      try {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > height) {
            width = Math.min(width, maxWidth);
            height = width / aspectRatio;
          } else {
            height = Math.min(height, maxHeight);
            width = height * aspectRatio;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress the image
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                // Create new file with compressed data
                const compressedFile = new File(
                  [blob],
                  file.name.replace(/\.[^/.]+$/, "") + getExtension(format),
                  {
                    type: format,
                    lastModified: Date.now(),
                  },
                );
                resolve(compressedFile);
              } else {
                reject(new Error("Failed to compress image"));
              }
            },
            format,
            quality,
          );
        } else {
          reject(new Error("Failed to get canvas context"));
        }
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    // Load the image
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Get file extension based on MIME type
 */
const getExtension = (format: string): string => {
  switch (format) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    default:
      return ".jpg";
  }
};

/**
 * Compress multiple images
 * @param files - Array of image files
 * @param options - Compression options
 * @returns Promise<File[]> - Array of compressed files
 */
export const compressImages = async (
  files: File[],
  options: CompressionOptions = {},
): Promise<File[]> => {
  const compressionPromises = files.map((file) => compressImage(file, options));
  return Promise.all(compressionPromises);
};

/**
 * Get image dimensions
 * @param file - Image file
 * @returns Promise with width and height
 */
export const getImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image"));
      return;
    }

    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);
  });
};
