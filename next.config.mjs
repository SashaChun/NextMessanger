/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.push({
                test: /\.cs$/,
                use: "raw-loader",
            });
        }
        return config;
    },
    images: {
        domains: [
            "res.cloudinary.com", ]}
};

export default nextConfig;