const express = require('express');

const controllers = require('./controllers');

const router = express.Router();

router.post("/registro", controllers.registro);
router.post("/login", controllers.login);
router.get("/user/:id", controllers.getUser)
router.post("/user/:id/like", controllers.Like);

module.exports = router;
