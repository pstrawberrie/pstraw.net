import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Site = sequelize.define('Site', {
  build_history: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  messages: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, { timestamps: true });

export default Site;