const express = require("express");
const userControllers = require("../controllers/user.controller");
const router = express.Router();

router
  .route("/all")
  /**
   * @api {get} /user All user
   * @apiDescription Get all the user
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the user.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(userControllers.getAllUsers);

router
  .route("/random")
  /**
   * @api {get} /user All user
   * @apiDescription Get all the user
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the user.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(userControllers.getRandomUser);

router
  .route("/save")
  /**
   * @api {get} /user All user
   * @apiDescription Get all the user
   * @apiPermission admin
   */
  .post(userControllers.saveUser);

module.exports = router;
