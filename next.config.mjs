/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',

            },
            {
                protocol: 'https',
                hostname: 'ricco-food-ordering.s3.amazonaws.com',
            },
        ]
    }
};

export default nextConfig;
