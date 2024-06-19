const getParticipants = require("../category_controllers/get_participants");

async function candidates(req, res) {
    try {
        // const name = req.query.name;

        // if(name!='main'||!name){
        //     console.log(name+' is not valid');
        // }


        const participants = await getParticipants('main');

        if(!participants){
            res.redirect("/user/home");
        }

        res.render("candidates.ejs",{participants, name: 'main'});    
    } catch (error) {
        throw error;
    }
}

module.exports = candidates;