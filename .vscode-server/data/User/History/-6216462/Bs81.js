/*
Here we will handle routes for CRUD operations
*/

import {Router} from "express";
import {methods as tutorialController} from "../controllers/tutorial.controller";


const router = Router();

// List all tutorials
router.get('/tutorials/', tutorialController.getTutorials);
// Add a tutorial
router.post('/tutorials/', tutorialController.addTutorial);

export default router;