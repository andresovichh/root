/*
Foos to handle CRUD operations
*/
import {getConnection} from "./../database/database";


// Get all tutorials in the DB
const getTutorials= async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id, Title, Video_Url, Description, Published_Status, Deleted_At from tutorial_list")
        res.json(result);
    } catch (error) {
            res.status(500);
            res.send(error.message);
        };
    
};

// Add a tutorial to the DB
const addTutorial = async (req, res) => {
    try{
        const {Title, Video_Url, Description, Published_Status, Deleted_At } = req.body;

        if(Title === undefined || Published_Status === undefined){
            res.status(400).json({ message: "Bad Request, Title or Published Status missing" });

        }
        const movies = {Title, Video_Url, Description, Published_Status, Deleted_At };

        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tutorial_list SET ?", movies );
        res.json(result);

        res.json("add tutorial")
    } catch (error) {
            res.status(500);
            res.send(error.message);
        };
    

};

// Get a specific tutorial by ID
const getTutorial = async (req, res) => {
    try{
        console.log(req.params);
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, Title, Video_Url, Description, Published_Status, Deleted_At from tutorial_list")
        res.json(result);
    } catch (error) {
            res.status(500);
            res.send(error.message);
        };
    
};


export const methods = {
    getTutorials,
    addTutorial,
    getTutorial
};