// should contain all the "get routes" to view most user/class/session specific data
// and the create/delete routes for sessions as these will be user created
const router = require("express").Router();
const userController = require("../../controllers/userController");
const sessionController = require("../../controllers/sessionController");
const locationController = require("../../controllers/locationController");
const authenticatedUser = require("../../config/authenticatedUser.js");
const classController = require("../../controllers/classController");
const passport = require("../../config/passport");

// matches with "/api/user/"
router
  .route("/")
  .put(passport.authenticate("local"), function (req, res) {
    // console.log({user:req.user})
    let user = { ...req.user.dataValues, password: "youWish" }
    res.json(user)
    console.log("login successful!")
  })

router
  // .route("/verifyUser")
  // .get(passport.authenticate("cookie", {session:true}),function (req, res) {
  //   console.log("verifying user")
  //   // res.json(req.user)
  //   res.json("verifyingUser")
  // })

  .route("/verifyUser")
  .get(authenticatedUser,function (req, res) {

    console.log("verifying user")
    // res.json(req.user)
    res.json(req.user)
  })


// Matches with "/api/user/:id"
router
  .route("/info/:id", authenticatedUser)
  .get(userController.findUser)
  .put(userController.update)

// Matches with "/api/class"
router
  .route("/allclasses/:id/classes")
  .get(classController.findAllClasses)



// ============= SESSIONS API=========
// Matches with "/api/session"
// find all sessions where user is participating
router
  .route("/:userid/session")
  .get(sessionController.findAllUserSessions)

router
  .route("/:userid/session/:sessionid")
  .get(sessionController.findOneSessionForUser)

// find all sessions for all classes
router
  .route("/info-session/:userid/allsessions")
  .get(sessionController.findAllSessionsAllClasses)

// find sessions where user is the host
router
  .route("/:userid/session/hosting")
  .get(sessionController.findAllSessionsAsHost)
  .post(sessionController.create)
  .delete(sessionController.remove)

router
  .route("/:sessionid")
  .put(sessionController.update)

router
  .route("/:classid/:userid/session")
  .get(sessionController.findAllSessionsOneClasses)


// =====================================================
// =====================LOCATIONS API ==================


router
  .route("/locations")
  .get(locationController.findAllLocations)

router
  .route("/location/:sessionid")
// .get(locationController.findOne)




//   app.put("/api/user", passport.authenticate("local"), function (req, res) {
//     db.User.findOne({
//         where: {
//             username: req.body.username,
//             password: req.body.password
//         }

//     }).then(function (dbUser) {
//         console.log("passport checking user...")
//         // console.log(req.user);
//         // Added Passport logic for validating user
//         if (req.user) {
//             console.log("true");
//             // console.log(dbUser);
//             res.json(dbUser);
//         }
//         else { res.sendFile("/html/login.html", { root: path.join(__dirname, "../public") }) };
//     });
// })


module.exports = router;
