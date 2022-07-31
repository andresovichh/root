/*
Foos to handle CRUD operations
*/
import {getConnection} from "./../database/database";

const getTutorials= async (req, res) => {
    const connection = await getConnection();
    const result = await connection.query("SELECT id, Title, Video_Url, Description, Published_Status, Deleted_At from tutorial_list")

};

export const methods = {
    getTutorials
};