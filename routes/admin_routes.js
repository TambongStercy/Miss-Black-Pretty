const express = require('express');
const multer = require('multer');
const fs = require('fs');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const category = req.query.category;

        const dynamicFolder = 'public/img/candidates/' + category.trim();

        if (!fs.existsSync(dynamicFolder)) {
            fs.mkdirSync(dynamicFolder, { recursive: true });
        }

        req.dir = dynamicFolder;
        cb(null, dynamicFolder);

    },
    filename: (req, file, cb) => {
        const category = req.query.category;

        cb(null, file.originalname);

    }
});


const upload = multer({ storage: storage });


const dashboard = require("../controllers/admin_view_controllers/dashboard_controller");
const candidates = require("../controllers/admin_view_controllers/candidates_controller");
const categories = require("../controllers/admin_view_controllers/categories_controller");
const category = require("../controllers/admin_view_controllers/category_controller");
const autoVote = require("../controllers/admin_view_controllers/automatic_vote_controller");
const signinView = require("../controllers/admin_view_controllers/sign_controller");
const autoRedVote = require("../controllers/admin_view_controllers/automatic_redvote_controller");

const {authentication, authSigninView} = require("../controllers/admin_view_controllers/authentication_controller");


//CRUD by post request
const createCategory = require("../controllers/admin_view_controllers/create_category_controller");
const addParticipant = require("../controllers/admin_view_controllers/add_participant_controller");
const updateParticipant = require("../controllers/admin_view_controllers/update_participant_controller");
const updateCategory = require("../controllers/admin_view_controllers/update_category_controller");
const signin = require("../controllers/admin_view_controllers/sigin_post_controller");


const router = express.Router();




router.get("/category", authentication, category);
router.get("/dashboard", authentication, dashboard);
router.get("/categories", authentication, categories);
router.get("/candidates", authentication, candidates);
router.get("/signin", authSigninView, signinView);

router.get("/*", authentication, (req, res) => res.redirect("/admin/dashboard"));

router.post("/create-category", authentication, upload.single('image'), imagePathFormating, createCategory);
router.post("/add-participant", authentication, upload.single('image'), imagePathFormating, addParticipant);
router.post("/update-participant", authentication, upload.single('image'), imagePathFormating, updateParticipant);
router.post("/update-category", authentication, upload.single('image'), imagePathFormating, updateCategory);
router.post("/vote-auto", authentication, autoVote);
router.post("/vote-red-auto", authentication, autoRedVote);
router.post("/signin", signin);


function imagePathFormating(req, res, next) {
    const category = req.query.category;

    if (req.file) {
        req.image = "/img/candidates/" + category.trim() + "/" + req.file.filename;
    }

    return next();
}

module.exports = router; 

