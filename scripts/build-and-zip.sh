#!/bin/bash
# cPanel Upload Helper Script

echo "Building project for production..."
npm run build

echo "Creating ZIP file for cPanel upload..."
zip -r profile-listing-seo.zip . -x "node_modules/*" ".next/*" ".git/*" "*.zip"

echo "Done! Upload profile-listing-seo.zip to cPanel"