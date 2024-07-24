import express, { json } from "express";
import activities from "./activities.json" assert { type: "json" };
import helmet from "helmet";
import { v4 as uuidv4 } from "uuid";
const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());

app.use(
  helmet({
    xPoweredBy: false, //ignoring x-powered-by header
  })
);

// console.log(activities);

app.get("/", (request, response) => {
  //use app instead of express as variable is assigned with the method .get
  response.status(200).json({
    success: true,
    payload: "Welcome",
  });
});

app.get("/activities", (request, response) => {
  response.status(200).json({
    success: true,
    payload: activities,
  });
});

app.post("/activities", (request, response) => {
  const activity = request.body;
  if (!activity) {
    response.status(400).json({
      success: false,
      payload: "please provide data",
    });
  }

  const data = {
    id: uuidv4(),
    activity_submitted: Date.now(),
    activity_type: "something",
    activity_duration: "30 min",
  };

  activities.push(data);

  response.status(200).json({
    success: true,
    payload: activities,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); //runs the server through your browser
});
