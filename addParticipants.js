// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');
// const Category = require('./models/category_model'); // Adjust the path to your model file


// const imagesFolderPath = './public/img/candidates'; // Adjust the path to your images folder
// // const uri = process.env.MONGODB_URI;
// const uri = 'mongodb://127.0.0.1:27017/MBAP';
// // Connect to MongoDB
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', async () => {
//     console.log('Connected to MongoDB');

//     try {
//         // Read image files from the folder
//         const imageFiles = fs.readdirSync(imagesFolderPath);

//         // Prepare participants array
//         const participants = imageFiles.map(imageFile => {
//             const imagePath = path.join(imagesFolderPath, imageFile);
//             const participantName = path.parse(imageFile).name; // Using the file name as the participant name
//             return {
//                 picture: imagePath.split('public')[1],
//                 name: participantName.toUpperCase().trim(),
//                 category: 'MAIN',
//                 votes: [],
//             };
//         });

//         // Find the 'MAIN' category
//         let category = await Category.findOne({ name: 'MAIN' });

//         if (!category) {
//             // Create the 'main' category if it doesn't exist
//             category = new Category({
//                 name: 'MAIN',
//                 picture: 'default', // Provide a default image path for the category
//                 participants: [],
//             });
//         }

//         // Add participants to the 'main' category
//         category.participants.push(...participants);

//         // Save the updated category
//         await category.save();
//         console.log('Participants added successfully');

//     } catch (err) {
//         console.error('Error adding participants:', err);
//     } finally {
//         // Close the database connection
//         mongoose.connection.close();
//     }
// });
