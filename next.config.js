/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub Pages serves /projects/ only when the export writes projects/index.html.
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
