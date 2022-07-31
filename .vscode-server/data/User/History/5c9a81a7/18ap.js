/*
Foos to handle CRUD operations
*/
import {getConnection} from "./../database/database";

const getTutorials=(req, res) => {
    res.json("hola Andrés");

};

export const methods = {
    getTutorials
};