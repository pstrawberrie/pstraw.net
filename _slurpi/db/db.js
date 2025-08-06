import { Sequelize } from 'sequelize';
import { resolveFromRoot } from '../../path.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: resolveFromRoot('_slurpi/db/db.sqlite'),
  logging: false
});

// Confirm connection
sequelize.authenticate()
  .catch((error) => {
    console.error(error);
    console.error('Unable to connect to sqlite database via sequelize. We need that. Exiting now.');
    process.exit(1);
  });

export default sequelize;
