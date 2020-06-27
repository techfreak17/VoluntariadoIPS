const express = require("express");
const mongoose = require("mongoose");
const uri = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");

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
mongoose.set('useFindAndModify', false);

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
app.use("/api/notifications",notifications)

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
var server = app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = server;