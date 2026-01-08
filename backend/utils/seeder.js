const User = require('../models/User');

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ username: 'user' });
        if (!adminExists) {
            const admin = await User.create({
                username: 'user',
                password: '1123',
                role: 'admin'
            });
            console.log('Default Admin Created (user/1123)');
        }
    } catch (error) {
        console.error('Seeder Error:', error);
    }
};

module.exports = seedAdmin;
