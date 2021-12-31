module.exports = {
  crossOrigin: "anonymous",
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://localhost:3001/:path*",
        destination: "http://songnebulabackend-env.eba-d8ht8phh.us-east-1.elasticbeanstalk.com/:path*",
      },
    ];
  },
};