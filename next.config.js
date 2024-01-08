/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['mongoose'],
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images.pexel.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'static.wixstatic.com',
                pathname: '**',
            },
        ],
    },

    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
            layers: true,
        };

        return config;
    },

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            bufferutil: 'commonjs bufferutil',
        });
        return config;
    },
};

module.exports = nextConfig;
