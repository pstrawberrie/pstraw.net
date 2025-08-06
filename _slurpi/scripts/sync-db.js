import sequelize from '../db/db.js';
import Site from '../db/Site.js';
import Message from '../db/Message.js';
import Movie from '../db/Movie.js';
import Show from '../db/Show.js';

async function syncDB() {
  await sequelize.sync({ force: true }); // force table drop + recreate
  console.log('Database synced successfully');
}

syncDB().catch((err) => console.error('Error syncing DB', err));