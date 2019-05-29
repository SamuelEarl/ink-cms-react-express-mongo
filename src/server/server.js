const env = process.env.NODE_ENV || "development";

const express = require("express");
const path = require("path");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// An api endpoint that returns a short list of items
app.get("/api/getList", (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log("Sent list of items");
});

// Return the same index.html file for every request so the app can use BrowsserHistory in production
// SHOULD THIS BE app.all() INSTEAD OF app.get() SO THAT index.html WILL BE RETURNED FOR EVERY
// REQUEST REGARDLESS OF THE METHOD IN THE REQUEST?
app.get("*", (req, res) => {
  if (env === "production") {
    res.sendFile(path.join(__dirname + "some/path"));
  }
  else {
    res.sendFile(path.join(__dirname + "../../public/index.html"));
  }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
