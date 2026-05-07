# cPanel Upload Instructions

## Step 1: Upload Files
1. Login to your cPanel
2. Open File Manager
3. Upload `profile-listing-seo.zip` to `public_html`
4. Extract the ZIP file

## Step 2: Database Setup
1. Open phpMyAdmin from cPanel
2. Create a new database (e.g., `profile_listing`)
3. Create a database user and assign to the database
4. Import `database.sql` file into your database

## Step 3: Configure Environment
1. Copy `.env.local.example` to `.env.local`
2. Update database credentials:
   - DB_HOST (usually localhost)
   - DB_USER (your database username)
   - DB_PASSWORD (your database password)
   - DB_NAME (your database name)
   - JWT_SECRET (random secret string)

## Step 4: Install Dependencies
Via SSH Terminal (if available):
```bash
cd public_html
npm install --production
npm run build
npm start
```

Or use the provided `package.json` with Node.js selector in cPanel.

## Step 5: Admin Access
- URL: https://yoursite.com/admin/login.html
- Default credentials:
  - Username: admin
  - Password: password

## Important Notes
- Ensure Node.js version 18+ is available
- PHP is not required (pure Node.js/Next.js)
- For shared hosting without Node.js, use static export:
  ```
  npm run build
  npm run export
  ```
  Then upload the `out` folder contents to public_html