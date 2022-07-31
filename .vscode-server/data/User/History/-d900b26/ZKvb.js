/*
Express lets us createa a web server that handles routes

Morgan lets us adapt js code
*/


// Import Routes
import tutorialRoutes from "./routes/tutorial.routes.js";

import express from "express";
import morgan from "morgan";

const app = express();

// Settings
app.set("port", 4000);

// Middleware
app.use(morgan("dev"));


// Use Routes
app.use(tutorialRoutes);
 

export default app;