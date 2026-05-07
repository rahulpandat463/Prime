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

// Mock Data for Static Frontend
const mockData = {
  categories: [
    { id: 1, name: 'Independent', slug: 'independent', description: 'Premium independent profiles' },
    { id: 2, name: 'Premium', slug: 'premium', description: 'Elite high-end companions' },
    { id: 3, name: 'VIP', slug: 'vip', description: 'World-class VIP services' },
    { id: 4, name: 'College Girls', slug: 'college-girls', description: 'Young and energetic companions' },
    { id: 5, name: 'Celebrity', slug: 'celebrity', description: 'Exclusive celebrity escorts' },
    { id: 6, name: 'Call Girls', slug: 'call-girls', description: 'Verified local call girls' },
  ],
  featuredProfiles: [
    { id: 1, name: 'Ananya', slug: 'ananya', age: 23, location_name: 'Delhi', rating: 5.0 },
    { id: 2, name: 'Neha', slug: 'neha', age: 24, location_name: 'Mumbai', rating: 4.9 },
    { id: 3, name: 'Priya', slug: 'priya', age: 25, location_name: 'Bangalore', rating: 4.8 },
    { id: 4, name: 'Kavya', slug: 'kavya', age: 27, location_name: 'Hyderabad', rating: 4.8 },
  ],
  newProfiles: [
    { id: 5, name: 'Riya', slug: 'riya', age: 26, location_name: 'Pune', rating: 4.7 },
    { id: 6, name: 'Isha', slug: 'isha', age: 22, location_name: 'Chennai', rating: 4.6 },
    { id: 7, name: 'Sana', slug: 'sana', age: 24, location_name: 'Kolkata', rating: 4.5 },
  ],
  testimonials: [
    { id: 1, name: 'Rahul', location: 'Mumbai', content: 'Incredible experience, very professional.', rating: 5 },
    { id: 2, name: 'Amit', location: 'Delhi', content: 'Best service I have ever used. Highly recommend.', rating: 5 },
    { id: 3, name: 'Vikram', location: 'Bangalore', content: 'Very discreet and high quality profiles.', rating: 5 },
  ],
  faqs: [
    { id: 1, question: 'How do I book a companion?', answer: 'You can contact the companion directly via the phone number or WhatsApp link provided on their profile.' },
    { id: 2, question: 'Are the photos genuine?', answer: 'Yes, all our profiles are verified and we ensure that the photos are 100% genuine.' },
  ],
  services: [
    { id: 1, name: 'Massage', slug: 'massage' },
    { id: 2, name: 'Dinner Date', slug: 'dinner-date' },
    { id: 3, name: 'Travel Companion', slug: 'travel' },
  ],
  locations: [
    { id: 1, name: 'Delhi', slug: 'delhi' },
    { id: 2, name: 'Mumbai', slug: 'mumbai' },
    { id: 3, name: 'Bangalore', slug: 'bangalore' },
    { id: 4, name: 'Hyderabad', slug: 'hyderabad' },
    { id: 5, name: 'Pune', slug: 'pune' },
    { id: 6, name: 'Chennai', slug: 'chennai' },
  ]
};

export default function HomePage() {
  const { categories, featuredProfiles, newProfiles, testimonials, faqs, services, locations } = mockData;

  return (
    <>
      <HeroSection />

      <PopularProfiles profiles={featuredProfiles} />

      <CategoriesSection categories={categories} />

      <FeaturedProfiles profiles={newProfiles} title="Newly Added Profiles" />

      <ServicesSection services={services} />

      <HowItWorksSection />

      <TestimonialsSection testimonials={testimonials} />

      <FaqsSection faqs={faqs} />

      <LocationsSection locations={locations} />

      <Footer locations={locations} categories={categories} services={services} />
    </>
  );
}