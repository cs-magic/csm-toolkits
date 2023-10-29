/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
  },

      // 这个可以，ref: https://frontend-digest.com/how-to-import-svgs-into-nextjs-8ec6100e613f
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },

}

export default nextConfig
