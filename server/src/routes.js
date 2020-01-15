const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.post("/users", DevController.store);
routes.get("/users", DevController.list);
routes.get("/search", SearchController.index);

module.exports = routes;