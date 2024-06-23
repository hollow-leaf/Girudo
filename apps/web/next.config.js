/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@repo/ui"],
};
