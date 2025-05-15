const NAME = '[express debug]';

export default async function (req, res, next) {
  try {
    console.log(`${NAME} path: ${req.path}`);

    next();
  } catch (err) {
    console.error('Error in debug middleware', err);
  }
}