import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const Show = sequelize.define(
  "Show",
  {
    poster_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adult: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    genres: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    original_language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_air_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    episode_run_time: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    number_of_episodes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number_of_seasons: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    in_production: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_watch: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: true },
);

export default Show;
