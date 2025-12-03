const express = require("express");
const movieControllers = require("../controllers/movie.js");

const { verify, verifyAdmin } = require("../auth.js");

const router = express.Router();

router.post("/addMovie", verify, verifyAdmin, movieControllers.addMovie);
router.get("/getMovies", verify, movieControllers.getMovies);
router.get("/getMovie/:id", verify, movieControllers.getMovie);
router.patch(
  "/updateMovie/:id",
  verify,
  verifyAdmin,
  movieControllers.updateMovie
);
router.delete(
  "/deleteMovie/:id",
  verify,
  verifyAdmin,
  movieControllers.deleteMovie
);
router.patch("/addComment/:id", verify, movieControllers.addComment);

router.get("/getComments/:id", verify, movieControllers.getComments);

module.exports = router;
