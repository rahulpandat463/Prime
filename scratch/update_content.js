const mysql = require('mysql2/promise');

async function updateFaqsAndTestimonials() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'profile_listing',
  });

  try {
    // Clear existing to avoid duplicates if needed, or just insert
    await pool.query('DELETE FROM faqs');
    await pool.query('DELETE FROM testimonials');

    const faqs = [
      ['Which cities have the best escort service in India?', 'Cities like Delhi, Mumbai, Bangalore, and Pune are known for having a wide range of premium and verified escort services.'],
      ['How do I book escort service in my city?', 'You can browse profiles on our website, check their reviews, and contact them directly via the provided WhatsApp or Call buttons.'],
      ['Are escort services safe and private?', 'Yes, we prioritize your privacy. All profiles are verified, and your contact with them is direct and confidential.'],
      ['Is escort service available in my city?', 'We cover 28 major cities across India. You can check the "Service Locations" section to find your city.'],
      ['Can I book escorts for events or travel?', 'Many companions offer travel and event services. Check the "Services" section on their individual profiles for details.'],
      ['How quickly can I book an escort?', 'Most companions are available for immediate booking. You can confirm the timing during your direct conversation.'],
      ['Are all profiles verified?', 'Yes, we strive to ensure all profiles on our platform are genuine with authentic photos.'],
      ['Do you provide 24/7 support?', 'Our website is accessible 24/7, and many companions offer round-the-clock services.'],
      ['What is the starting price for escort service in India?', 'Prices vary based on the location and specific services. You can discuss rates directly with the companion.'],
      ['Do you provide incall and outcall escort service?', 'Most companions provide both incall and outcall options. This is usually mentioned on their profiles.'],
      ['Is advance payment required to book call girls?', 'Payment terms are discussed directly between you and the companion. We recommend verifying details before any transaction.'],
      ['Do you have Russian and foreign escorts in India?', 'Yes, we have a dedicated "Russian Escorts" category and several other international profiles.'],
    ];

    for (const faq of faqs) {
      await pool.query('INSERT INTO faqs (question, answer) VALUES (?, ?)', faq);
    }

    const testimonials = [
      ['Rahul S.', 'Mumbai', 'Absolutely amazing experience. The profile was 100% genuine and the service was beyond expectations. Highly recommended!', 5],
      ['Amit K.', 'Delhi', 'Found a great companion for my business trip. Very professional and discreet. The website is very easy to use.', 5],
      ['Vikram P.', 'Bangalore', 'The verification process here is solid. I have tried other sites, but this one is the most reliable.', 5],
      ['Sanjay M.', 'Pune', 'Premium services at their best. Loved the variety of categories and the quick contact options.', 5],
      ['Anil T.', 'Hyderabad', 'Beautiful companions and excellent communication. The best directory for elite services in India.', 5],
    ];

    for (const test of testimonials) {
      await pool.query('INSERT INTO testimonials (name, location, content, rating) VALUES (?, ?, ?, ?)', test);
    }

    console.log('Successfully updated FAQs and Testimonials in DB.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateFaqsAndTestimonials();
