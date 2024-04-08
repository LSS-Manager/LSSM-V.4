---
title: Deploy API
lang: en_US
sidebarDepth: 2
---

# Deploy API
To start your own API, run `yarn build:api` or `./build/build.sh --api`. This will create a folder named `dist/api`. The API data will be in this folder. The `_redirects` file is used for basic URL rewriting as we are using Cloudflare pages. If you don't use it, you can delete this file. For apache2 and nginx there are rewrite examples below.

## Rewrite rules for nginx
To mimic the same behavior on nginx, you can use

```bash
location / {
  try_files $uri $uri.json $uri/ =404;
}
```
as code block.

## Rewrite rules for apache2
To mimic the same behavior on nginx, you can use
```bash
RewriteEngine on
RewriteRule "^/([a-z]{2}_[A-Z]{2})/*" "/$1/$2.json"

