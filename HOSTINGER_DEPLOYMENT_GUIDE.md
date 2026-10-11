# Hostinger Deployment Guide for College Company

This guide explains how to deploy the College Company institutional platform to **Hostinger**.

Two deployment packages have been generated for you:

1. **`hostinger-deploy-public_html.zip`** (Recommended for Hostinger Web / Cloud / Shared Hosting)
   - Contains the fully compiled, production-optimized web application (`index.html`, minified JavaScript/CSS assets, `.htaccess` SPA router rewrite rules, and static images).
   - Ready for instant drag-and-drop into Hostinger's `public_html/`.

2. **`hostinger-full-source.zip`** (For Hostinger VPS or Git / Node.js Deployment)
   - Contains the entire clean source codebase, TypeScript components, Tailwind CSS styling, package configurations, server entry points (`server.ts`), and build scripts (excluding `node_modules`).

---

## Method 1: Instant Deployment to Hostinger Web / Cloud Hosting (hPanel File Manager)

### Step 1: Log in to Hostinger hPanel
1. Navigate to your [Hostinger Control Panel](https://hpanel.hostinger.com).
2. Go to **Websites** and click **Manage** next to your domain.

### Step 2: Open File Manager
1. In the sidebar or search bar, click **File Manager** (under Files).
2. Choose **Access files of [your domain]**.
3. Open the **`public_html`** directory.

### Step 3: Upload and Extract
1. Delete default placeholder files (e.g. `default.php`) in `public_html` if present.
2. Click the **Upload** icon (top right) and select **`hostinger-deploy-public_html.zip`**.
3. Right-click the uploaded `.zip` file and select **Extract**.
4. Choose `.` (or current directory `public_html`) as the extract destination.
5. Verify that `index.html`, `.htaccess`, and the `assets/` folder are located directly inside `public_html/`.
6. (Optional) Delete the `.zip` file from the server to save space.

### Step 4: Test Your Domain
1. Visit your domain (e.g. `https://yourdomain.com`).
2. Your College Company site will load instantly with full HTTPS, dark luxury styling, interactive D3.js NIL charts, and holding maps.

---

## Method 2: Deployment on Hostinger VPS (Node.js / Express / PM2)

If you have a Hostinger VPS (Ubuntu/Debian) and want to run the full-stack server (`server.ts`):

1. Upload `hostinger-full-source.zip` to your VPS (e.g. `/var/www/college-company`).
2. Unzip the files:
   ```bash
   unzip hostinger-full-source.zip
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the production assets:
   ```bash
   npm run build
   ```
5. Start with PM2 or systemd:
   ```bash
   pm2 start server.ts --name "college-company" --interpreter npx --interpreter-args "tsx"
   pm2 save
   pm2 startup
   ```
6. Configure Nginx reverse proxy to forward port 80/443 to `http://localhost:3000`.

---

## Troubleshooting & Verification

- **404 on Page Refresh**: The included `.htaccess` file inside `hostinger-deploy-public_html.zip` automatically instructs Hostinger's LiteSpeed/Apache web server to rewrite all routes to `index.html`. If you experience 404s, ensure hidden files (dotfiles like `.htaccess`) are visible in Hostinger File Manager.
- **SSL Certificate**: Enable Hostinger's free Lifetime SSL certificate under **Security > SSL** in hPanel.
