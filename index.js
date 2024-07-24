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
    xPoweredBy: false,
  })
);

app.get("/", (request, response) => {
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

  const newActivity = {
    id: uuidv4(),
    activity_submitted: Date.now(),
    activity_type: "something",
    activity_duration: "30 min",
  };

  activities.push(newActivity);

  response.status(200).json({
    success: true,
    payload: activities,
  });
});

app.put("/activities/:id/:data", (request, response) => {
  // original activities
  console.log("activities:", activities);
  //request parameter
  console.log("request params", request.params);
  // parse parameter in json format and defragmentation.
  const { activity_type, activity_duration } = JSON.parse(request.params.data);

  console.log("data:", activity_type, activity_duration);

  //query the request index by id
  const index = activities.findIndex(
    (activity) => activity.id === request.params["id"]
  );
  console.log("index:", index);
  if (index === -1) {
    response.send("provide a valid id");
  }
  //provide the new activity
  const newActivity = {
    id: uuidv4(),
    activity_submitted: Date.now(),
    activity_type,
    activity_duration,
  };
  console.log("newActivities:", newActivity);
  //update the activity
  activities[index] = newActivity;
  response.send(activities);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
