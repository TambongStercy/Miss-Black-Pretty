
async function signin(req, res) {
    try {
        const omitted = req.query.omitted;
        return res.render('admin/signin.ejs',{omitted});
    } catch (error) {
        throw error;
    }
}

module.exports = signin;