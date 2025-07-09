/**
 * Utility functions for handling safe area insets on mobile devices
 */

/**
 * Sets CSS variables for safe area insets
 * This should be called on the client side
 */
export const initSafeAreaInsets = (): void => {
  if (typeof window === "undefined") return;

  // Check if the browser supports env() function for safe area insets
  const supportsSafeArea = CSS.supports(
    "padding-top: env(safe-area-inset-top)",
  );

  if (supportsSafeArea) {
    // Set CSS variables based on environment values
    document.documentElement.style.setProperty(
      "--sat",
      "env(safe-area-inset-top)",
    );
    document.documentElement.style.setProperty(
      "--sar",
      "env(safe-area-inset-right)",
    );
    document.documentElement.style.setProperty(
      "--sab",
      "env(safe-area-inset-bottom)",
    );
    document.documentElement.style.setProperty(
      "--sal",
      "env(safe-area-inset-left)",
    );
  }
};

/**
 * Updates viewport meta tag to ensure proper safe area handling
 * This should be called on the client side
 */
export const setupViewport = (): void => {
  if (typeof window === "undefined") return;

  // Find the viewport meta tag
  let viewportMeta = document.querySelector('meta[name="viewport"]');

  // If it doesn't exist, create it
  if (!viewportMeta) {
    viewportMeta = document.createElement("meta");
    viewportMeta.setAttribute("name", "viewport");
    document.head.appendChild(viewportMeta);
  }

  // Set the viewport content to include viewport-fit=cover
  viewportMeta.setAttribute(
    "content",
    "width=device-width, initial-scale=1, viewport-fit=cover",
  );
};
