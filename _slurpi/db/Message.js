import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Message = sequelize.define(
  "Message",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true },
);

export default Message;
