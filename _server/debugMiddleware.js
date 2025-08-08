export default async function (req, res, next) {
  try {
    const myTimestamp = Date.now();
    const dateObject = new Date(myTimestamp);

    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const seconds = String(dateObject.getSeconds()).padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    console.log(`-----[express debug @ ${formattedTime}]-----`);
    console.log(`${req.method} ${req.path}`);
    if (req.body && JSON.stringify(req.body) !== "{}")
      console.log(JSON.stringify(req.body, null, 2));

    next();
  } catch (err) {
    console.error("Error in debug middleware", err);
  }
}
