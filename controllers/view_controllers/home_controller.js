const Moniker = require('moniker');


async function home(req, res) {
    try {
        res.render("index.ejs");
    } catch (error) {
        throw error;
    }
}

module.exports = home;