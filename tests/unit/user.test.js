const mongoose = require('mongoose');
const User = require('../../models/user');
const { mongoTestConfig } = require('../../config/config'); 

beforeAll(async () => {
    await mongoose.connect(mongoTestConfig.uri);
});

afterAll(async () => {
   //  await mongoose.connection.dropDatabase();  // todo : uncomment this , for now delete manual
    await mongoose.connection.close();
});

describe('User Model Test', () => {
    it('create & save user successfully', async () => {
        const userData = { username: 'Wiss_27', email: 'wiss@jocker.com', password: '123456' };
        const validUser = new User(userData);
        const savedUser = await validUser.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
    });

    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new User({ username: 'nič_27', email: 'john_nobody@jocker.com', password: '123456', additional_field: 'smiley_face :)' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.nickname).toBeUndefined();
    });

    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new User({ name: 'batman' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
    });
});
