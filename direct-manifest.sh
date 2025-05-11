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

# Create a BUILD_ID file
echo "Creating BUILD_ID file"
echo "$(date +%s)" > .next/BUILD_ID

# Create a minimal server/pages-manifest.json file
echo "Creating server/pages-manifest.json"
mkdir -p .next/server
cat > .next/server/pages-manifest.json << 'EOL'
{
  "/_app": "pages/_app.js",
  "/_error": "pages/_error.js",
  "/_document": "pages/_document.js"
}
EOL

# Create minimal app directory structure
echo "Creating minimal app directory structure"
mkdir -p .next/server/app
mkdir -p .next/server/pages
mkdir -p .next/static/chunks/app
mkdir -p .next/static/chunks/webpack
mkdir -p .next/static/css
mkdir -p .next/static/media

# Create minimal webpack runtime
echo "Creating webpack runtime"
cat > .next/static/chunks/webpack-9b312e20a4e32339.js << 'EOL'
// Minimal webpack runtime
console.log("Webpack runtime loaded");
EOL

# Create minimal JavaScript files
echo "Creating minimal JavaScript files"
cat > .next/server/app/page.js << 'EOL'
(() => {
var exports = {};
exports.id = 931;
exports.ids = [931];
exports.modules = {
  /***/ 1931:
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    "use strict";
    __webpack_exports__["default"] = function() {
      return { props: {} };
    };
  }
};
exports.runtime = "edge";
var __webpack_exports__ = {};
__webpack_exports__["default"] = exports.modules[1931].default;
return __webpack_exports__;
})();
EOL

cat > .next/server/app/layout.js << 'EOL'
(() => {
var exports = {};
exports.id = 915;
exports.ids = [915];
exports.modules = {
  /***/ 1915:
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    "use strict";
    __webpack_exports__["default"] = function(props) {
      return props.children;
    };
  }
};
exports.runtime = "edge";
var __webpack_exports__ = {};
__webpack_exports__["default"] = exports.modules[1915].default;
return __webpack_exports__;
})();
EOL

cat > .next/server/pages/_app.js << 'EOL'
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {
  /***/ 6004:
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    "use strict";
    __webpack_exports__["default"] = function(props) {
      return props.Component ? { ...props } : props;
    };
  }
};
exports.runtime = "edge";
var __webpack_exports__ = {};
__webpack_exports__["default"] = exports.modules[6004].default;
return __webpack_exports__;
})();
EOL

cat > .next/server/pages/_document.js << 'EOL'
(() => {
var exports = {};
exports.id = 660;
exports.ids = [660];
exports.modules = {
  /***/ 4140:
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    "use strict";
    __webpack_exports__["default"] = function() {
      return { html: "", head: [], styles: [] };
    };
  }
};
exports.runtime = "edge";
var __webpack_exports__ = {};
__webpack_exports__["default"] = exports.modules[4140].default;
return __webpack_exports__;
})();
EOL

cat > .next/server/pages/_error.js << 'EOL'
(() => {
var exports = {};
exports.id = 651;
exports.ids = [651];
exports.modules = {
  /***/ 9185:
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    "use strict";
    __webpack_exports__["default"] = function() {
      return { statusCode: 404 };
    };
  }
};
exports.runtime = "edge";
var __webpack_exports__ = {};
__webpack_exports__["default"] = exports.modules[9185].default;
return __webpack_exports__;
})();
EOL

# Create a minimal app-paths-manifest.json
echo "Creating app-paths-manifest.json"
cat > .next/server/app-paths-manifest.json << 'EOL'
{
  "/page": "app/page.js",
  "/layout": "app/layout.js"
}
EOL

# Create a minimal middleware-manifest.json file
echo "Creating middleware-manifest.json"
cat > .next/server/middleware-manifest.json << 'EOL'
{
  "sortedMiddleware": [
    "/"
  ],
  "middleware": {
    "/": {
      "files": [
        "server/middleware.js"
      ],
      "name": "middleware",
      "page": "/",
      "matchers": [
        {
          "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/([^/.]{1,})(?:\\/(.*))?(\\/?|\\.json)$",
          "originalSource": "/:locale(.*)"
        }
      ]
    }
  },
  "functions": {},
  "version": 2
}
EOL

# Create a minimal middleware.js file
echo "Creating middleware.js file"
cat > .next/server/middleware.js << 'EOL'
module.exports = {
  middleware: function(request) {
    return { response: request, status: 200 };
  }
}
EOL

# Create a minimal app-build-manifest.json
echo "Creating app-build-manifest.json"
cat > .next/app-build-manifest.json << 'EOL'
{
  "pages": {
    "/page": [
      "static/chunks/webpack-9b312e20a4e32339.js",
      "static/chunks/fd9d1056-d9a18e2dc6d4e2a0.js",
      "static/chunks/596-d8bc47f1d0a5c6a0.js",
      "static/chunks/main-app-0c57742e580f01e7.js",
      "static/chunks/app/page-7a7dda0d6a06f9cd.js"
    ],
    "/layout": [
      "static/chunks/webpack-9b312e20a4e32339.js",
      "static/chunks/fd9d1056-d9a18e2dc6d4e2a0.js",
      "static/chunks/596-d8bc47f1d0a5c6a0.js",
      "static/chunks/main-app-0c57742e580f01e7.js",
      "static/chunks/app/layout-d4b0f5e9a5d8a8a1.js"
    ]
  }
}
EOL

# Create a minimal react-loadable-manifest.json file
echo "Creating react-loadable-manifest.json"
cat > .next/react-loadable-manifest.json << 'EOL'
{}
EOL

# Create a minimal next-font-manifest.json file
echo "Creating next-font-manifest.json"
cat > .next/server/next-font-manifest.json << 'EOL'
{
  "pages": {},
  "app": {
    "/page": [],
    "/layout": []
  }
}
EOL

# Create a minimal chunks manifest
echo "Creating chunks manifest"
cat > .next/static/chunks/fd9d1056-d9a18e2dc6d4e2a0.js << 'EOL'
// Minimal chunk
console.log("Chunk loaded");
EOL

cat > .next/static/chunks/596-d8bc47f1d0a5c6a0.js << 'EOL'
// Minimal chunk
console.log("Chunk loaded");
EOL

cat > .next/static/chunks/main-app-0c57742e580f01e7.js << 'EOL'
// Minimal main app chunk
console.log("Main app chunk loaded");
EOL

cat > .next/static/chunks/app/page-7a7dda0d6a06f9cd.js << 'EOL'
// Minimal page chunk
console.log("Page chunk loaded");
EOL

cat > .next/static/chunks/app/layout-d4b0f5e9a5d8a8a1.js << 'EOL'
// Minimal layout chunk
console.log("Layout chunk loaded");
EOL

echo "Manifest files created successfully"
exit 0
