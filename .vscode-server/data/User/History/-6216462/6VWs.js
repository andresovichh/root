/*
Here we will handle routes for CRUD operations
*/

import {Router} from "express";
import {methods as tutorialController} from "../controllers/tutorial.controller";


const router = Router();

router.get('/tutorials/', (req, res) => {
    res.send("hello");
});

export default router;