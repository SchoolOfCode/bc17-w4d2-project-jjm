import express, { json } from "express";
import activities from "./activities.json" assert { type: "json" };
import helmet from "helmet";
import { query, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

// MIDdLEWERE
app.use(express.json());
app.use(helmet());

app.use(
  helmet({
    xPoweredBy: false,
  })
);

// GET
app.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    payload: "Welcome",
  });
});

// GET ACTIVITIES
app.get("/activities", (request, response) => {
  response.status(200).json({
    success: true,
    payload: activities,
  });
});

// ADD(post) NEW ACTIVITY
app.post("/activities", (request, response) => {
  const activity = request.body;

  // conditional statment
  if (!activity) {
    response.status(400).json({
      success: false,
      payload: "please provide data",
    });
  }
  // build a new object
  const { activity_type, activity_duration } = request.body;
  const newActivity = {
    id: uuidv4(),
    activity_submitted: Date.now(),
    activity_type,
    activity_duration,
  };

  // add the new activity
  activities.push(newActivity);

  // response updated activities
  response.status(200).json({
    success: true,
    payload: activities,
  });
});

//UPDATE(put) ACTIVITY
//http://localhost:3000/activities?id=20

app.put("/activities", query("id").notEmpty().escape(), (request, response) => {
  //implementing EXPRESS-VALIDATOR
  const result = validationResult(request);

  // conditional statment using EXPRESS-VALIDATOR
  if (result.isEmpty()) {
    const index = activities.findIndex(
      (activity) => activity.id === request.query.id
    );

    // build a new object
    const { activity_type, activity_duration } = request.body;
    const newActivity = {
      id: uuidv4(),
      activity_submitted: Date.now(),
      activity_type,
      activity_duration,
    };

    // update the activity
    activities[index] = newActivity;

    // response updated activities
    return response.status(200).json({
      success: true,
      query: request.query.id,
      payload: activities,
    });
  }

  response.status(400).json({ errors: result.array() });
});

//DELETE ACTIVITY
app.delete(
  "/activities",
  query("id").notEmpty().escape(),
  (request, response) => {
    //implementing EXPRESS-VALIDATOR
    const result = validationResult(request);

    // conditional statment using EXPRESS-VALIDATOR
    if (result.isEmpty()) {
      const index = activities.findIndex(
        (activity) => activity.id === request.query.id
      );

      // delete the activity
      activities.splice(index, 1);

      // response updated activities
      return response.status(200).json({
        success: true,
        query: request.query.id,
        payload: activities,
      });
    }
    //error response
    response.status(400).json({ errors: result.array() });
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
