import { Suspense } from 'react';
import pool from '@/lib/db';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProfiles from '@/components/FeaturedProfiles';
import PopularProfiles from '@/components/PopularProfiles';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqsSection from '@/components/FaqsSection';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import LocationsSection from '@/components/LocationsSection';
import Footer from '@/components/Footer';

async function getHomeData() {
  const [categories] = await pool.query(
    'SELECT id, name, slug, description FROM categories WHERE status = "active" ORDER BY sort_order ASC, name ASC LIMIT 6'
  );

  const [featuredProfiles] = await pool.query(`
    SELECT p.*, l.name as location_name, l.slug as location_slug, 
           c.name as category_name
    FROM profiles p
    LEFT JOIN locations l ON p.location_id = l.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'active' AND p.is_featured = 1
    ORDER BY p.rating DESC, p.created_at DESC
    LIMIT 8
  `);

  const [newProfiles] = await pool.query(`
    SELECT p.*, l.name as location_name, l.slug as location_slug
    FROM profiles p
    LEFT JOIN locations l ON p.location_id = l.id
    WHERE p.status = 'active'
    ORDER BY p.created_at DESC
    LIMIT 6
  `);

  const [testimonials] = await pool.query(
    'SELECT id, name, location, content, rating FROM testimonials WHERE status = "active" ORDER BY sort_order ASC LIMIT 6'
  );

  const [faqs] = await pool.query(
    'SELECT id, question, answer FROM faqs WHERE status = "active" ORDER BY sort_order ASC LIMIT 5'
  );

  const [services] = await pool.query(
    'SELECT id, name, slug FROM services WHERE status = "active" ORDER BY sort_order ASC'
  );

  const [locations] = await pool.query(
    'SELECT id, name, slug FROM locations WHERE type = "city" AND status = "active" ORDER BY sort_order ASC'
  );

  return { categories, featuredProfiles, newProfiles, testimonials, faqs, services, locations };
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function HomePage() {
  const { categories, featuredProfiles, newProfiles, testimonials, faqs, services, locations } = await getHomeData();

  return (
    <>
      <HeroSection />

      <PopularProfiles profiles={featuredProfiles as any[]} />

      <CategoriesSection categories={categories as any[]} />

      <FeaturedProfiles profiles={newProfiles as any[]} title="Newly Added Profiles" />

      <ServicesSection services={services as any[]} />

      <HowItWorksSection />

      <TestimonialsSection testimonials={testimonials as any[]} />

      <FaqsSection faqs={faqs as any[]} />

      <LocationsSection locations={locations as any[]} />

      <Footer locations={locations as any[]} categories={categories as any[]} services={services as any[]} />
    </>
  );
}