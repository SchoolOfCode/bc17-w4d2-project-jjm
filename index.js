import express, { json } from "express";
import activities from "./activities.json" assert { type: "json" };
import helmet from "helmet";
import { query, validationResult } from "express-validator";
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

//UPDATE(put) ACTIVITY
//http://localhost:3000/activities?id=20

app.put("/activities", query("id").notEmpty().escape(), (request, response) => {
  const result = validationResult(request);

  if (result.isEmpty()) {
    const index = activities.findIndex(
      (activity) => activity.id === request.params["id"]
    );

    const { activity_type, activity_duration } = request.body;
    const newActivity = {
      id: uuidv4(),
      activity_submitted: Date.now(),
      activity_type,
      activity_duration,
    };
    activities[index] = newActivity;
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
    const result = validationResult(request);

    if (result.isEmpty()) {
      const index = activities.findIndex(
        (activity) => activity.id === request.params["id"]
      );

      activities.splice(index, 1);

      return response.status(200).json({
        success: true,
        query: request.query.id,
        payload: activities,
      });
    }

    response.status(400).json({ errors: result.array() });
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
