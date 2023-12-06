/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [{
            hostname: 'links.papareact.com'
            , protocol: "https"
        }, {
            hostname: 'static.vecteezy.com',
            protocol: "https"
        }]
    },
    webpack: (config) => {
        config.resolve.fallback = {
            "mongodb-client-encryption": false,
            "aws4": false
        };
        return config;
    }
}

module.exports = nextConfig
