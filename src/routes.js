const express = require("express");
const router = express.Router();
const Auth = require("./middlewares/Auth");

const AuthValidator = require("./validators/AuthValidator");
const UserValidator = require("./validators/UserValidator");

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const AdsController = require("./controllers/AdsController");

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});

router.get("/states", UserController.getState);

router.post("/user/singin", AuthValidator.singin, AuthController.singin);
router.post("/user/singup", AuthValidator.singup, AuthController.singup);

router.get("/user/me", Auth.private, UserController.info);
router.put(
  "/user/me",
  UserValidator.editAction,
  Auth.private,
  UserController.editAction
);
router.get("/categories", AdsController.getCategories);

router.post("/ad/add", Auth.private, AdsController.addAction);
router.get("/ad/list", AdsController.getList);
router.get("/ad/item", AdsController.getItem);
router.post("/ad/:id", Auth.private, AdsController.editAction);

module.exports = router;