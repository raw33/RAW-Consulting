# RAW Consulting website

Static React and Vite website prepared for deployment through Vercel's GitHub integration.

## Local development

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

## Quality checks

```sh
npm run check
npm run build
```

The production site is generated in `dist/`.

## Deployment

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Vercel will use the settings in `vercel.json`.
4. Review the temporary `vercel.app` address before connecting the production domain.

No environment variables, database, or application server are required. The contact form opens a pre-addressed email draft in the visitor's email application.
