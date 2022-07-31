/*
Express lets us createa a web server that handles routes

Morgan lets us adapt js code
*/


// Routes
import tutorialRoutes from "./routes/tutorial.routes";

import express from "express";
import morgan from "morgan";

const app = express();

// Settings
app.set("port", 4000);

// Middleware
app.use(morgan("dev"));


export default app;