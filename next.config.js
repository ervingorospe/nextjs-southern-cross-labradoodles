/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    REACT_APP_FLUX_API: process.env.REACT_APP_FLUX_API
  },
  async redirects() {
    return [
      {
        "source": "/home",
        "destination": "/",
        permanent: true,
      },
      {
        "source": "/puppies",
        "destination": "/puppies/available-puppies",
        permanent: true,
      },
      {
        "source": "/our-dogs",
        "destination": "/our-dogs/dams",
        permanent: true,
      },
      {
        "source": "/resources",
        "destination": "/resources/getting-ready-for-puppy",
        permanent: true,
      },
      {
        "source": "/resources/puppy-stages",
        "destination": "/resources/getting-ready-for-puppy",
        permanent: true,
      },
      {
        "source": "/resources/puppy-routine-at-8-wks",
        "destination": "/resources/puppy-routine-@-8-wks",
        permanent: true,
      },
      {
        "source": "/resources/puppy-routine-at-8-wks",
        "destination": "/resources/puppy-routine-@-8-wks",
        permanent: true,
      },
      {
        "source": "/margeaux-and-bandit",
        "destination": "/puppies/available-puppies/margeaux-and-bandit",
        permanent: true,
      },
      {
        "source": "/ginger-rose-and-max-a-million",
        "destination": "/puppies/available-puppies/margeaux-and-bandit",
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
