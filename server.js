const express = require("express");
const mongoose = require("mongoose");
const uri = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
var path = require('path');

const users = require("./routes/api/Users");
const projects = require("./routes/api/Projects");
const submitedProjects = require("./routes/api/SubmitedProjects");
const voluntaries = require("./routes/api/Voluntaries");
const aaips = require("./routes/api/AAIPS");
const admin = require("./routes/api/Admin");
const companies = require("./routes/api/Company");
const notifications = require("./routes/api/Notifications");

const app = express();
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        {
            dbName: "GestorProj",
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/projects", projects);
app.use("/api/submitedProjects", submitedProjects);
app.use("/api/users", users);
app.use("/api/voluntaries", voluntaries);
app.use("/api/companies", companies);
app.use("/api/admin", admin);
app.use("/api/aaips", aaips);
app.use("/api/notifications",notifications);

const root = path.join(__dirname, "client", "build");
app.use(express.static(root));

app.get("/*", (req, res) => {
    res.sendFile("index.html", {root});
  });

const port = process.env.PORT || 3000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));