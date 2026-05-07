const mysql = require('mysql2/promise');

async function addCategories() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'profile_listing',
  });

  try {
    const [existing] = await pool.query('SELECT * FROM categories');
    console.log('Current categories:', existing.length);

    const newCategories = [
      ['Independent Escorts', 'independent', 'Discover the finest independent escorts providing exclusive and personal experiences.', 1],
      ['Premium Escorts', 'premium', 'Experience luxury with our handpicked premium companions for elite tastes.', 2],
      ['VIP Escorts', 'vip', 'The gold standard of companionship. Top-tier profiles for the most discerning clients.', 3],
      ['Call Girls', 'call-girls', 'Verified and professional call girls available for your convenience across major cities.', 4],
      ['College Girls', 'college-girls', 'Young, vibrant, and energetic college companions for a fresh and fun experience.', 5],
      ['Celebrity Escorts', 'celebrity', 'Experience the lifestyle of the rich and famous with our high-profile celebrity companions.', 6],
    ];

    for (const cat of newCategories) {
      await pool.query(
        'INSERT INTO categories (name, slug, description, sort_order, status) VALUES (?, ?, ?, ?, "active") ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description)',
        cat
      );
    }

    console.log('Successfully added/updated 6 categories.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addCategories();
