
async function billet(req, res) {
    try {
        res.render("billet.ejs");
    } catch (error) {
        throw error;
    }
}

module.exports = billet;