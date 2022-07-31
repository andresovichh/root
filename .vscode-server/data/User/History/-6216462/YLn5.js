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
// Delete all tutorials
router.delete('/tutorials/mass_delete', tutorialController.deleteAllTutorials);
// Get tutorial by id
router.get('/tutorials/:id', tutorialController.getTutorial);
// Delete tutorial by id
router.delete('/tutorials/:id', tutorialController.deleteTutorial);
// Update a tutorial
router.put('/tutorials/:id', tutorialController.updateTutorial);


export default router;