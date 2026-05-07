const mysql = require('mysql2/promise');

async function addServices() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'profile_listing',
  });

  try {
    const newServices = [
      ['Full Body Massage', 'massage', 1],
      ['Oral Service', 'oral', 2],
      ['BDSM & Fetish', 'bdsm', 3],
      ['Dinner Dates', 'dinner-dates', 4],
      ['Travel Companion', 'travel', 5],
      ['Party Companion', 'party', 6],
      ['69 Position', '69-position', 7],
      ['Roleplay', 'roleplay', 8],
      ['Doorstep Service', 'doorstep', 9],
      ['Night Stay', 'night-stay', 10],
    ];

    for (const svc of newServices) {
      await pool.query(
        'INSERT INTO services (name, slug, sort_order, status) VALUES (?, ?, ?, "active") ON DUPLICATE KEY UPDATE name=VALUES(name)',
        svc
      );
    }

    console.log('Successfully added 10 services.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addServices();
