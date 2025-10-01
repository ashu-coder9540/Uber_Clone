const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname,
    lastname,
    email,
    password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('Missing required fields');
    }
    // Use correct schema field names: fullname, firstname, lastname
    const user = new userModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    await user.save();
    return user;
}