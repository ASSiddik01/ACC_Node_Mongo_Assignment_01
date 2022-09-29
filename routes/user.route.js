const express = require("express");
const userControllers = require("../controllers/user.controller");
const router = express.Router();

router
  .route("/all")
  /**
   * @api {get} /all
   * @apiDescription Get all the user
   * @apiPermission all
   */
  .get(userControllers.getAllUsers);

router
  .route("/random")
  /**
   * @api {get} /random
   * @apiDescription Get a random user
   * @apiPermission all
   */
  .get(userControllers.getRandomUser);

router
  .route("/save")
  /**
   * @api {post} /save
   * @apiDescription save a user
   * @apiPermission all
   */
  .post(userControllers.saveUser);

router
  .route("/update")
  /**
   * @api {patch} /update
   * @apiDescription Update a user by id
   * @apiPermission admin
   */
  .patch(userControllers.updateUser);

router
  .route("/bulk-update")
  /**
   * @api {patch} /bulk-update
   * @apiDescription Update multiple user by id
   * @apiPermission all
   */
  .patch(userControllers.bulkUpdate);

router
  .route("/delete")
  /**
   * @api {delete} /delete
   * @apiDescription Delete a user by id
   * @apiPermission admin
   */
  .delete(userControllers.deleteUser);

module.exports = router;
