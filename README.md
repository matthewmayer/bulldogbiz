## Bangkok Prep Business Directory

Test site: https://bulldogbiz.netlify.app

How it works:
1. Data is stored in an Airtable Base
2. When data is added or modified, a webhook is triggered
3. The webhook is received by Netlify, causing the site to redeploy
4. The site is built using simple Nunjucks templates and the Eleventy static site generator and outputs vanilla HTML/CSS

To modify the layout of pages edit src/index.njk and src/business.njk

To modify the style edit src/static/css/style.css

Note when businesses submit the form, the item is not immediately visible. Set Published=true in Airtable to publish it.

For running locally, create a .env file in the root with the following environment variables set:

```
AIRTABLE_KEY=
AIRTABLE_BASE=
AIRTABLE_TABLE=
GOOGLE_API_KEY=
```

