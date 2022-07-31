import app from "./app";

const main = () => {
    // here we listen on the port defined at app.js
    app.listen(app.get("port"));
    console.log(`Server running on port ${app.get("port")}`);

}

main();