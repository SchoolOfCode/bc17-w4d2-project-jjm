import express, { json } from "express"; //import from the node express module
import activities from "./activities.json" assert { type: "json" }; //import a json file from the activities.json
import helmet from "helmet"; //importing helmet
import { v4 as uuidv4 } from 'uuid';
const app = express(); //assigning express to a variable
const port = 3000; //port is the local host e.g. localhost://3000 (PortNumber)
console.log(activities);
app.use(express.json());
app.use(helmet());
//app.disable("x-powered-by"); //disabling x-powered-by feature

app.use(
  helmet({
    xPoweredBy: false, //ignoring x-powered-by header
  })
);

console.log(activities);

app.get("/", (request, response) => {
  //use app instead of express as variable is assigned with the method .get
  console.log("ok");
  response.status(200).json({
    success: true,
    payload: "hello World",
  });
});

app.get("/activities", (request, response) => {
  response.status(200).json({
    success: true,
    payload: activities,
  });
  response.send(activities);
  // console.log(request)  //should show activity objects when accessed (ID, Date, Time etc)

  // //If there is an issue display error code representing the failure and why it happened

  // //If someone sends something, send the correct status code, if nothing was sent, return an error stating the code and what the issue is
});

app.post("/activities", (request, response) => {
  const newActivity = req.body.newActivity;
  if (!newActivity) {
    response.status(400).json({
      error: true,
      data: null,
    });
  }
  const activity = {
    ...newActivity,
    id: uui
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); //runs the server through your browser
});

//set a GET request with a user_id

//response object always containing a key called data or error, ensure code is accurate represenation of failure or success and send back the response to the user

//if the request succeeds, it will respond with the correct status code along with some User Acitivity Objects (Date, time, duration etc)

// {
//   data: [
//     {
//       "id": "54321234", // UUID
//   "activity_submitted": "1719486190058", // simple Epoc timestamp (Date.now() in JS)
//   "activity_type": "run", // choose some standard types
//   "activity_duration": "30", // choose standard unit type (minutes probably)
//      }, // activity object (Date)
//   ]
//   }
