var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected');
    } catch (err) {
        console.log('Failed to connect to the database: '  + err);
    }
})();

module.exports = mongoose;