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
    }
}

module.exports = nextConfig
