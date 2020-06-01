const express = require("express");
const session = require("express-session")
const cors = require("cors")
const routes = require("./routes");
const moment = require("moment")
const cookieSession = require("cookie-session")
const cookieParser = require("cookie-parser")
const MySQLStore = require("express-mysql-session")(session);

const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models")
const url = "http://localhost:3000/"

const keys = require("./config/keys")
const passport = require("./config/passport");

var options = {
  host: process.env.DB_HOST,

}

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./sb-client/public'));

// setting up cookies
app.use(cookieSession({
  maxAge: 24*6060*60*1000,
  keys: [keys.session.cookieKey]
}))

// let sessionStore = new MySQLStore(db);
// initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: [keys.session.cookieKey], resave: true, saveUninitialized: true,
  // // , store:sessionStore ,
  // cookie: { maxAge: 24 * 6060 * 60 * 1000 }
}));

app.use(cookieParser());
// app.use(express.bodyParser());
// app.use(cors({origin:[url], credentials: true}))
// app.use(session({ secret: "buddy", resave: true, saveUninitialized: true , cookie:{maxAge:7200000}}));
// app.use(session({ secret: 'buddy' }));


app.use(routes);

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "development") {
//   app.use(express.static("client/build"));
// }
// Add routes, both API and view
// app.use(routes);


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    // ===============
    // let sessiondata = [
    //   { subject: 'Midterm1', sessionDate: '2020-06-04 15:30:34', maxParticipants:10, ClassId:9, hostId:2},
    //   { subject: 'Midterm2', sessionDate: '2020-06-05 13:30:34', maxParticipants:10, ClassId:1, hostId:15},
    //   { subject: 'Midterm1', sessionDate: '2020-06-02 17:00:34', maxParticipants:8, ClassId:15, hostId:5},
    //   { subject: 'Midterm2', sessionDate: '2020-06-03 18:00:34', maxParticipants:10, ClassId:29, hostId:7},
    //   { subject: 'Midterm3', sessionDate: '2020-06-07 19:00:34', maxParticipants:8, ClassId:13, hostId:17},
    //   { subject: 'Midterm1', sessionDate: '2020-06-08 20:00:34', maxParticipants:6, ClassId:9, hostId:8},
    //   { subject: 'Midterm2', sessionDate: '2020-06-10 17:30:34', maxParticipants:10, ClassId:16, hostId:2},
    //   { subject: 'Midterm1', sessionDate: '2020-06-12 14:00:34', maxParticipants:10, ClassId:27, hostId:9},
    //   { subject: 'Midterm2', sessionDate: '2020-06-15 15:30:34', maxParticipants:8, ClassId:33, hostId:22},
    //   { subject: 'Midterm3', sessionDate: '2020-06-17 17:30:34', maxParticipants:6, ClassId:34, hostId:18}    
    // ]
    // sessiondata.forEach(item => {
    //   db.Session.create(item)
    //     .then(() =>
    //       console.log("session table seeded"))
    //     .catch(error => console.log(error));
    // });
  //  let userclass = [ 
  //   {role:"student", ClassId:1, UserId:12},
  //   {role:"student", ClassId:9, UserId:12},
  //   {role:"student", ClassId:14, UserId:12},
  //   {role:"student", ClassId:29, UserId:12},
  //   {role:"student", ClassId:1, UserId:16},
  //   {role:"student", ClassId:29, UserId:16},
  //   {role:"student", ClassId:42, UserId:16},
  //   {role:"student", ClassId:74, UserId:16},
  //   {role:"student", ClassId:9, UserId:21},
  //   {role:"student", ClassId:14, UserId:21},
  //   {role:"student", ClassId:29, UserId:21},
  //   {role:"student", ClassId:33, UserId:21}
  // ]
  // userclass.forEach(item => {
  //   db.UserClass.create(item)
  //     .then(() => {
  //       console.log("userclass table seeded")
  //     })
  //   })

  })
})

