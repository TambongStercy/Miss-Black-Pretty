const getStats = require("../category_controllers/get_stats");

async function dashboard(req, res) {
    try {
        
        const active = 1;
        const stats = await getStats();
        
        res.render("admin/dashboard.ejs",{active, stats});    
    } catch (error) {
        throw error;
    }
}

module.exports = dashboard;