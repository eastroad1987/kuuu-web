const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    };
  }

  return {
    /* config options for all phases except development here */
  };
};

module.exports = nextConfig;
