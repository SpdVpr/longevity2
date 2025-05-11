#!/bin/bash

# Create .next directory if it doesn't exist
mkdir -p .next

# Create a minimal routes-manifest.json file directly
echo "Creating routes-manifest.json directly"

cat > .next/routes-manifest.json << 'EOL'
{
  "version": 4,
  "pages404": true,
  "basePath": "",
  "redirects": [],
  "headers": [],
  "dynamicRoutes": [
    {
      "page": "/[locale]",
      "regex": "^/([^/]+?)(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)(?:/)?$"
    },
    {
      "page": "/[locale]/articles/[slug]",
      "regex": "^/([^/]+?)/articles/([^/]+?)(?:/)?$",
      "routeKeys": {
        "locale": "locale",
        "slug": "slug"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/articles/(?<slug>[^/]+?)(?:/)?$"
    },
    {
      "page": "/[locale]/biomarkers",
      "regex": "^/([^/]+?)/biomarkers(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/biomarkers(?:/)?$"
    },
    {
      "page": "/[locale]/fitness",
      "regex": "^/([^/]+?)/fitness(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/fitness(?:/)?$"
    },
    {
      "page": "/[locale]/mental-health",
      "regex": "^/([^/]+?)/mental-health(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/mental-health(?:/)?$"
    },
    {
      "page": "/[locale]/nutrition",
      "regex": "^/([^/]+?)/nutrition(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/nutrition(?:/)?$"
    },
    {
      "page": "/[locale]/supplements",
      "regex": "^/([^/]+?)/supplements(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/supplements(?:/)?$"
    },
    {
      "page": "/[locale]/tools",
      "regex": "^/([^/]+?)/tools(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/tools(?:/)?$"
    },
    {
      "page": "/[locale]/tools/bio-age-calculator",
      "regex": "^/([^/]+?)/tools/bio-age-calculator(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/tools/bio-age-calculator(?:/)?$"
    },
    {
      "page": "/[locale]/tools/body-composition",
      "regex": "^/([^/]+?)/tools/body-composition(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/tools/body-composition(?:/)?$"
    },
    {
      "page": "/[locale]/tools/caloric-needs",
      "regex": "^/([^/]+?)/tools/caloric-needs(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/tools/caloric-needs(?:/)?$"
    },
    {
      "page": "/[locale]/tools/healthy-habits-checklist",
      "regex": "^/([^/]+?)/tools/healthy-habits-checklist(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/tools/healthy-habits-checklist(?:/)?$"
    },
    {
      "page": "/[locale]/tools/longevity-quiz",
      "regex": "^/([^/]+?)/tools/longevity-quiz(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/tools/longevity-quiz(?:/)?$"
    },
    {
      "page": "/[locale]/tools/smart-bio-age-calculator",
      "regex": "^/([^/]+?)/tools/smart-bio-age-calculator(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/tools/smart-bio-age-calculator(?:/)?$"
    },
    {
      "page": "/[locale]/tools/supplement-tracker",
      "regex": "^/([^/]+?)/tools/supplement-tracker(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/tools/supplement-tracker(?:/)?$"
    },
    {
      "page": "/[locale]/tools/workout-planner",
      "regex": "^/([^/]+?)/tools/workout-planner(?:/)?$",
      "routeKeys": {
        "locale": "locale"
      },
      "namedRegex": "^/(?<locale>[^/]+?)/tools/workout-planner(?:/)?$"
    },
    {
      "page": "/api/auth/[...nextauth]",
      "regex": "^/api/auth/(.+?)(?:/)?$",
      "routeKeys": {
        "nextauth": "nextauth"
      },
      "namedRegex": "^/api/auth/(?<nextauth>.+?)(?:/)?$"
    },
    {
      "page": "/api/profile/[userId]",
      "regex": "^/api/profile/([^/]+?)(?:/)?$",
      "routeKeys": {
        "userId": "userId"
      },
      "namedRegex": "^/api/profile/(?<userId>[^/]+?)(?:/)?$"
    }
  ],
  "staticRoutes": [
    {
      "page": "/",
      "regex": "^/(?:/)?$",
      "routeKeys": {},
      "namedRegex": "^/(?:/)?$"
    },
    {
      "page": "/api/articles",
      "regex": "^/api/articles(?:/)?$",
      "routeKeys": {},
      "namedRegex": "^/api/articles(?:/)?$"
    },
    {
      "page": "/api/auth/register",
      "regex": "^/api/auth/register(?:/)?$",
      "routeKeys": {},
      "namedRegex": "^/api/auth/register(?:/)?$"
    },
    {
      "page": "/api/bioage",
      "regex": "^/api/bioage(?:/)?$",
      "routeKeys": {},
      "namedRegex": "^/api/bioage(?:/)?$"
    },
    {
      "page": "/api/strapi-webhook",
      "regex": "^/api/strapi-webhook(?:/)?$",
      "routeKeys": {},
      "namedRegex": "^/api/strapi-webhook(?:/)?$"
    }
  ],
  "dataRoutes": [],
  "rsc": {
    "header": "RSC",
    "varyHeader": "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url"
  },
  "rewrites": []
}
EOL

# Create a minimal build-manifest.json file
echo "Creating build-manifest.json"

cat > .next/build-manifest.json << 'EOL'
{
  "polyfillFiles": [
    "static/chunks/polyfills-c67a75d1b6f99dc8.js"
  ],
  "devFiles": [],
  "ampDevFiles": [],
  "lowPriorityFiles": [
    "static/development/_buildManifest.js",
    "static/development/_ssgManifest.js"
  ],
  "rootMainFiles": [
    "static/chunks/webpack-9b312e20a4e32339.js",
    "static/chunks/fd9d1056-d9a18e2dc6d4e2a0.js",
    "static/chunks/596-d8bc47f1d0a5c6a0.js",
    "static/chunks/main-app-0c57742e580f01e7.js"
  ],
  "pages": {
    "/_app": [
      "static/chunks/webpack-9b312e20a4e32339.js",
      "static/chunks/framework-8883d1e9be70c3da.js",
      "static/chunks/main-b482fffd82fa7e1d.js",
      "static/chunks/pages/_app-52924524f99094ab.js"
    ],
    "/_error": [
      "static/chunks/webpack-9b312e20a4e32339.js",
      "static/chunks/framework-8883d1e9be70c3da.js",
      "static/chunks/main-b482fffd82fa7e1d.js",
      "static/chunks/pages/_error-c92d5c4bb2b49926.js"
    ]
  },
  "ampFirstPages": []
}
EOL

# Create a minimal prerender-manifest.json file
echo "Creating prerender-manifest.json"

cat > .next/prerender-manifest.json << 'EOL'
{
  "version": 4,
  "routes": {},
  "dynamicRoutes": {},
  "preview": {
    "previewModeId": "development-id",
    "previewModeSigningKey": "development-signing-key",
    "previewModeEncryptionKey": "development-encryption-key"
  },
  "notFoundRoutes": []
}
EOL

# Create a minimal required-server-files.json file
echo "Creating required-server-files.json"

cat > .next/required-server-files.json << 'EOL'
{
  "version": 1,
  "config": {
    "configFile": null,
    "trailingSlash": false,
    "reactStrictMode": true,
    "env": {},
    "images": {
      "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384],
      "path": "/_next/image",
      "loader": "default",
      "domains": [],
      "disableStaticImages": false,
      "minimumCacheTTL": 60,
      "formats": ["image/webp"],
      "dangerouslyAllowSVG": false,
      "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;"
    },
    "experimental": {
      "forceSwcTransforms": true
    }
  },
  "appDir": true,
  "files": []
}
EOL

echo "Manifest files created successfully"
exit 0
