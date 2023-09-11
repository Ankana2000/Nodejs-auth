//require library
const mongoose = require('mongoose');

//connect to database
async function main() {
    const db = await mongoose.connect('mongodb+srv://ankumis2000:anku3421@cluster0.ahewrlp.mongodb.net/?retryWrites=true&w=majority');
    module.exports = db;
}

main()
.then(() => console.log('MongoDB Connected...')) //if connected
.catch(err => console.log(err)); //if error