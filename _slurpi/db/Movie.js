import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

const Movie = sequelize.define(
  "Movie",
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
      unique: true,
    },
    original_language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    runtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      defaultValue: "Unknown",
    },
    last_watch: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    last_watch_suppressed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: true },
);

export default Movie;
