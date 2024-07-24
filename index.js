import express, { json } from "express"; //import from the node express module
import activities from "./activities.json" assert { type: "json" }; //import a json file from the activities.json
import helmet from "helmet"; //importing helmet
const app = express(); //assigning express to a variable
const port = 3000; //port is the local host e.g. localhost://3000 (PortNumber)

app.use(express.json());
app.use(helmet());
//app.disable("x-powered-by"); //disabling x-powered-by feature

app.use(
  helmet({
    xPoweredBy: false,  //ignoring x-powered-by header
  })
);

console.log(activities);

app.get("/", (request, response) => {
  //use app instead of express as variable is assigned with the method .get
  response.status(200).json({
    success: true,
    payload: activities,
  });
});

app.post("/", (request, response) => {
  //use app instead of express as variable is assigned with the method .post

  // push our request.body inside our activities array

  response.send("Post has been requested");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); //runs the server through your browser
});

//set a GET request with a user_id

//response object always containing a key called data or error, ensure code is accurate represenation of failure or success and send back the response to the user

//if the request succeeds, it will respond with the correct status code along with some User Acitivity Objects (Date, time, duration etc)


// {
//   data: [
//   {
//     "id": "54321234", // UUID
// "activity_submitted": "1719486190058", // simple Epoc timestamp (Date.now() in JS)
// "activity_type": "run", // choose some standard types
// "activity_duration": "30", // choose standard unit type (minutes probably)
//    }, // activity object (Date)
//   { }, // activity object (Time)
//   { }, // activity object
//   ]
//   }