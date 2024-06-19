const findToken = require("../token_controllers/find_token");

async function authentication(req, res, next) {
    try {

        const token = req.cookies.authToken;

        // const endPoint = req.route.path;

        if (!token) {
            console.log("token: " + token);
            console.log('not authorized');
            return res.redirect(302, "/admin/signin");
        }

        const tokenExist = await findToken(token);

        //if token exist in db
        if (!tokenExist) {
            console.log('not authorized');
            return res.redirect(302, "/admin/signin");
        }

        //successfully authenticated
        return next();
    } catch (error) {
        throw error;
    }
}

async function authSigninView(req, res, next) {
    try {

        const token = req.cookies.authToken;

        console.log("token: " + token);

        // const endPoint = req.route.path;

        if (!token) {
            console.log('not authorized');
            return next();
        }

        const tokenExist = await findToken(token);

        //if token exist in db
        if (!tokenExist) {
            console.log('not authorized');
            return next();
        }

        //successfully authenticated
        return res.redirect("/admin/dashboard");
    } catch (error) {
        throw error;
    }
}


module.exports = {authentication, authSigninView};