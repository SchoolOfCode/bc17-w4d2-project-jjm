import express from "express"; //import from the node express modules
const app = express(); //assigning express to a variable
const port = 3000; //port is the local host e.g. localhost://3000 (PortNumber)
app.get("/", (request, result) => { //use app instead of express as variable is assigned with the method .get
  result.send("test is ok");
});

app.post("/", (request, result) => {
  result.send("Post has been requested")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); //runs the server through your browser
});