# Wedding Invitation

Premium Tamil wedding invitation built with React and Vite.

## Local development

Use Node.js 20:

```powershell
nvm use 20.19.0
```

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Production build

```powershell
npm run build
npm run preview
```

`dist` is the deployable output directory.

## Deploy with Vercel

### Option 1: Deploy from GitHub

1. Push the latest project files to GitHub.
2. Sign in to https://vercel.com.
3. Choose **Add New > Project**.
4. Import `Eswaranra1/wedding-invitation-karthika`.
5. Keep the detected settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Choose **Deploy**.
7. Every push to the configured production branch will deploy automatically.

### Option 2: Deploy using the Vercel CLI

```powershell
npm install --global vercel
vercel login
vercel
```

Use these answers:

- Set up and deploy: `Yes`
- Scope: choose your Vercel account
- Link to an existing project: `No`, unless you already created one
- Project name: accept the suggested name or enter a custom name
- Modify settings: `No`

Then deploy production:

```powershell
vercel --prod
```

## Custom domain

In the Vercel project:

1. Open **Settings > Domains**.
2. Add your domain, such as `invitation.example.com`.
3. Add the DNS records shown by Vercel at your domain registrar.
4. Wait for the domain status to become **Valid Configuration**.

Domain registration and DNS propagation are managed by the registrar. HTTPS is issued automatically by Vercel.

## Before sharing

- Test `/` on mobile and desktop.
- Confirm the wedding names, dates, venue, and reception details.
- Upload the actual deployed URL to WhatsApp with the invitation preview.
