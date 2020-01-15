const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {

    async list(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github: username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            };
    
            dev = await Dev.create({
                name,
                github: username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }

        return res.json(dev);
    }

}