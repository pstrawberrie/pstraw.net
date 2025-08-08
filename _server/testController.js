import Message from "../_slurpi/db/Message.js";

export const getMessages = async (req, res) => {
  const messages = await Message.findAll({ raw: true });
  res.json(messages);
};
