const mysql = require('mysql2/promise');

async function addMoreCities() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'profile_listing',
  });

  try {
    const cities = [
      ['Ahmedabad', 'ahmedabad'],
      ['Surat', 'surat'],
      ['Jaipur', 'jaipur'],
      ['Lucknow', 'lucknow'],
      ['Kanpur', 'kanpur'],
      ['Nagpur', 'nagpur'],
      ['Indore', 'indore'],
      ['Thane', 'thane'],
      ['Bhopal', 'bhopal'],
      ['Visakhapatnam', 'visakhapatnam'],
      ['Pimpri-Chinchwad', 'pimpri-chinchwad'],
      ['Patna', 'patna'],
      ['Vadodara', 'vadodara'],
      ['Ghaziabad', 'ghaziabad'],
      ['Ludhiana', 'ludhiana'],
      ['Agra', 'agra'],
      ['Nashik', 'nashik'],
      ['Faridabad', 'faridabad'],
      ['Meerut', 'meerut'],
      ['Rajkot', 'rajkot'],
      ['Kalyan-Dombivli', 'kalyan-dombivli'],
      ['Vasai-Virar', 'vasai-virar'],
      ['Varanasi', 'varanasi'],
      ['Srinagar', 'srinagar'],
      ['Aurangabad', 'aurangabad'],
      ['Dhanbad', 'dhanbad'],
      ['Amritsar', 'amritsar'],
      ['Navi Mumbai', 'navi-mumbai'],
    ];

    for (const [name, slug] of cities) {
      await pool.query(
        'INSERT INTO locations (name, slug, status) VALUES (?, ?, "active") ON DUPLICATE KEY UPDATE status="active"',
        [name, slug]
      );
    }

    console.log('Successfully added more cities to reach 28+.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addMoreCities();
