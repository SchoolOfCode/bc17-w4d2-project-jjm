import express, { json } from "express"; //import from the node express module
import activities from "./activities.json" assert { type: "json" }; //import a json file from the activities.json
const app = express(); //assigning express to a variable
const port = 3000; //port is the local host e.g. localhost://3000 (PortNumber)

app.use(express.json());

app.get("/", (request, response) => {
  //use app instead of express as variable is assigned with the method .get
  response.status(200).json({
    succes: true,
    payload: activities,
  });
});

app.post("/", (request, response) => {
  //use app instead of express as variable is assigned with the method .post
  response.send("Post has been requested");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); //runs the server through your browser
});
