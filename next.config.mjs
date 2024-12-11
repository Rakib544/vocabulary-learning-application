import pwa from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withPWA = pwa({
  dest: "public",
});

// Merge MDX config with Next.js config
export default withPWA(nextConfig);
