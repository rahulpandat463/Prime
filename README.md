# Profile Listing SEO Website

A complete Next.js profile listing website with MySQL database, programmatic SEO, and admin panel.

## Features

- Dynamic profile listing with Category + Service + Location combinations
- Auto-generated SEO pages
- Admin panel for content management
- Internal linking system
- Review and rating system
- Image gallery support
- Responsive design

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE profile_listing;
```

2. Import the database file:
```bash
mysql -u root -p profile_listing < database.sql
```

### 3. Environment Configuration

Create `.env.local` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=profile_listing
JWT_SECRET=your-secret-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Folder Structure

```
/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── category/     # Category pages
│   │   ├── service/      # Service pages
│   │   ├── profile/      # Profile pages
│   │   └── [slug]/       # Location pages
│   ├── components/       # React components
│   └── lib/
│       └── db.ts         # Database connection
├── public/
│   └── images/
│       └── profiles/     # Profile images
├── admin/                # Admin panel files
├── database.sql          # Database schema
├── package.json
└── tailwind.config.js
```

## Admin Panel Access

- URL: http://localhost:3000/admin/login.html
- Username: admin
- Password: password

## cPanel Deployment

1. Upload all files to public_html
2. Import database.sql via phpMyAdmin
3. Update `.env.local` with production database credentials
4. Run `npm install --production` and `npm run build`

## Programmatic SEO URLs

The system automatically generates pages for:
- `/{location}` - Location page
- `/category/{category}` - Category page
- `/service/{service}` - Service page
- `/profile/{slug}-{id}` - Profile detail page
- `/category/{category}/{location}` - Combined pages
- `/service/{service}/{location}` - Combined pages