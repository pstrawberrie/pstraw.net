const NAME = "[express debug]";

export default async function (req, res, next) {
  try {
    console.log(`-----${NAME}-----`);
    console.log(`${req.method} ${req.path}`);
    if (req.body) console.log(JSON.stringify(req.body, null, 2));

    next();
  } catch (err) {
    console.error("Error in debug middleware", err);
  }
}
