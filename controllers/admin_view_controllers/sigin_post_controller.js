const createToken = require("../token_controllers/create_token")

async function signinPost(req, res) {
    try {
        const body = req.body;

        const email = body.email.trim().toLowerCase()
        const password = body.password.trim().toLowerCase()

        const adminEmail = process.env.ADMIN_NAME.trim().toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD.trim().toLowerCase();

        if (email === adminEmail && password === adminPassword) {
            // Generate token that expires after 24hrs
            const token = await createToken();
            // Create cookie
            const cookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            };

            console.log("created")

            // Set cookie in response
            res.cookie("authToken", token, cookieOptions);

            return res.redirect('/admin/dashboard');
        } else {
            omitted = true;
            return res.render('admin/signin.ejs', { omitted });
        }

    } catch (error) {
        throw error;
    }
}

module.exports = signinPost;