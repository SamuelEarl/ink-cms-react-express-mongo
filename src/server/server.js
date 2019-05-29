const env = process.env.NODE_ENV || "development";

const express = require("express");
const path = require("path");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log("Sent list of items");
});

/**
 * All other routes and API endpoints should go above this one.
 * -------------------------------------------------------------
 * Catch-all route that returns the same index.html file for every request so the app can use
 * BrowserHistory in production.
 */
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
