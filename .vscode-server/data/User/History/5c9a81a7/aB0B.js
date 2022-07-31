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
        const tutoriAls = {Title, Video_Url, Description, Published_Status, Deleted_At };

        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tutorial_list SET ?", tutoriAls );
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
        const result = await connection.query("SELECT id, Title, Video_Url, Description, Published_Status, Deleted_At from tutorial_list WHERE id = ?", id);
        res.json(result);
    } catch (error) {
            res.status(500);
            res.send(error.message);
        };
    
};

// Delete a tutorial from DB
const deleteTutorial = async (req, res) => {
    try{
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM tutorial_list WHERE id = ?", id);
        res.json(result);
    } catch (error) {
            res.status(500);
            res.send(error.message);
        };
    
};

// Update a tutorial from DB
const updateTutorial = async (req, res) => {
    try{
        const { id } = req.params;
        const {Title, Video_Url, Description, Published_Status, Deleted_At } = req.body;

        if(id === undefined || Title === undefined || Published_Status === undefined){
            res.status(400).json({ message: "Bad Request, id, Title or Published Status missing" });

        };
        const tutorial =  {Title, Video_Url, Description, Published_Status, Deleted_At};
        const connection = await getConnection();
        const result = await connection.query("UPDATE tutorial_list SET ? WHERE id = ?", [tutorial, id]);
        res.json(result);
    } catch (error) {
            res.status(500);
            res.send(error.message);
        };
    
};

// Delete all tutorials
const deleteAllTutorials = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("TRUNCATE tutorial_list");
        res.json(result);
    } catch (error) {
            res.status(500);
            res.send(error.message);
        };
    
};


export const methods = {
    getTutorials,
    addTutorial,
    getTutorial,
    deleteTutorial,
    updateTutorial,
    deleteAllTutorials
};