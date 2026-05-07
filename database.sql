-- Profile Listing SEO Database
-- Create database
CREATE DATABASE IF NOT EXISTS profile_listing;
USE profile_listing;

-- Admins table
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'superadmin') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Locations table (cities and areas)
CREATE TABLE locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  type ENUM('city', 'area') NOT NULL,
  parent_id INT DEFAULT NULL,
  description TEXT,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES locations(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX idx_location_slug ON locations(slug);
CREATE INDEX idx_location_type ON locations(type);
CREATE INDEX idx_location_parent ON locations(parent_id);

-- Profiles table
CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE,
  age INT,
  height VARCHAR(20),
  description TEXT,
  place_of_service ENUM('incall', 'outcall', 'both') DEFAULT 'both',
  location_id INT,
  category_id INT,
  status ENUM('active', 'inactive', 'draft') DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INT DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE INDEX idx_profile_location ON profiles(location_id);
CREATE INDEX idx_profile_category ON profiles(category_id);
CREATE INDEX idx_profile_status ON profiles(status);
CREATE INDEX idx_profile_featured ON profiles(is_featured);

-- Profile images table
CREATE TABLE profile_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_profile_images_profile ON profile_images(profile_id);

-- Profile services (many-to-many)
CREATE TABLE profile_services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id INT NOT NULL,
  service_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  UNIQUE KEY unique_profile_service (profile_id, service_id)
);

-- Reviews table
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_reviews_profile ON reviews(profile_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- FAQs table
CREATE TABLE faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50),
  status ENUM('active', 'inactive') DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  content TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  status ENUM('active', 'inactive') DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- SEO meta table for dynamic pages
CREATE TABLE seo_meta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_type ENUM('home', 'location', 'category', 'service', 'profile') NOT NULL,
  reference_id INT DEFAULT NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Site settings table
CREATE TABLE site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  site_name VARCHAR(100) DEFAULT 'Profile Listing',
  logo VARCHAR(500),
  favicon VARCHAR(500),
  primary_color VARCHAR(7) DEFAULT '#e91e63',
  secondary_color VARCHAR(7) DEFAULT '#212121',
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  whatsapp_number VARCHAR(20),
  address TEXT,
  footer_content LONGTEXT,
  facebook_url VARCHAR(500),
  instagram_url VARCHAR(500),
  twitter_url VARCHAR(500),
  linkedin_url VARCHAR(500)
);

-- Insert default admin
INSERT INTO admins (username, email, password, role) VALUES 
('admin', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'superadmin');

-- Insert default site settings
INSERT INTO site_settings (site_name, contact_email, contact_phone) VALUES 
('Profile Listing', 'info@example.com', '+1234567890');

-- Insert sample data for testing
INSERT INTO categories (name, slug, description, status) VALUES 
('Independent', 'independent', 'Independent profiles', 'active'),
('Premium', 'premium', 'Premium profiles', 'active');

INSERT INTO services (name, slug, description, status) VALUES 
('Massage', 'massage', 'Relaxing massage service', 'active'),
('VIP', 'vip', 'VIP service', 'active');

INSERT INTO locations (name, slug, type, description, status) VALUES 
('Delhi', 'delhi', 'city', 'Capital city', 'active'),
('Mumbai', 'mumbai', 'city', 'Financial capital', 'active');

INSERT INTO locations (name, slug, type, parent_id, description, status) VALUES 
('Connaught Place', 'connaught-place', 'area', 1, 'Central Delhi area', 'active'),
('Bandra', 'bandra', 'area', 2, 'Mumbai suburb', 'active');