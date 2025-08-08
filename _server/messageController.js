import Message from "../_slurpi/db/Message.js";

/* POST Message */
export const postMessage = async (req, res) => {
  try {
    const { name, email, message, naughty } = req.body;

    if (naughty) return res.json({ error: "Hmmm..." });
    if (!message || message.trim() === "")
      return res.json({ error: "Message is required" });

    const messageObj = {};
    if (name && name.trim() !== "") messageObj.name = name.trim();
    if (email && email.trim() !== "") messageObj.email = email.trim();
    messageObj.message = message.trim();

    await Message.create(messageObj);

    // Send JSON
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ error: "Search Error" });
  }
};
