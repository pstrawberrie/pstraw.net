import "dotenv/config";
import { joinFromRoot } from "../path.js";
import { SITE } from "../src/constants.js";
import { formatDate } from "../_slurpi/util.js";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import debugMiddleware from "./debugMiddleware.js";
import routes from "./routes_admin.js";

const isDev = process.env.NODE_ENV !== "production";
const app = express();
const PORT = process.env.ADMIN_SERVER_PORT;

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4321", process.env.ADMIN_SITE_URL],
    methods: ["GET", "POST"],
  }),
);

// View Engine & Static Files
app.use(express.static(joinFromRoot("_server/public")));
app.use(express.static(joinFromRoot("public")));
app.set("view engine", "ejs");
app.set("views", joinFromRoot("_server/views"));

// Global Middlewares
app.locals.isDev = isDev;
app.locals.SITE = SITE;
app.locals.formatDate = formatDate;

// Debug Middleware
if (isDev) app.use(debugMiddleware);

// Routing
app.use("/", routes);

// Start Express Server
app.listen(PORT, function (err) {
  if (err) console.error(err);
  console.log(`> admin server up @ ${PORT}`);
});
