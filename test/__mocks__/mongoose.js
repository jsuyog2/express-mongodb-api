/**
 * Mock implementation of the Mongoose library for testing purposes.
 * This mock replaces Mongoose's actual methods with Jest mocks to avoid
 * interacting with a real MongoDB database during tests.
 *
 * @module __mocks__/mongoose
 */

const mongoose = {
    /**
     * Mock implementation of the `connect` method.
     * Resolves with 'Mocked Connection' to simulate a successful connection.
     * 
     * @function
     * @returns {Promise<string>} A promise that resolves to 'Mocked Connection'.
     */
    connect: jest.fn().mockResolvedValue('Mocked Connection'),

    /**
     * Mock implementation of the `disconnect` method.
     * Resolves with 'Mocked Disconnection' to simulate a successful disconnection.
     * 
     * @function
     * @returns {Promise<string>} A promise that resolves to 'Mocked Disconnection'.
     */
    disconnect: jest.fn().mockResolvedValue('Mocked Disconnection'),

    /**
     * Mock model for `user` collection.
     * Provides mock implementations of CRUD operations on the `user` model.
     * 
     * @property {function} find - Mock implementation of `find` method.
     * @property {function} findOne - Mock implementation of `findOne` method.
     * @property {function} create - Mock implementation of `create` method.
     * @property {function} findById - Mock implementation of `findById` method.
     */
    user: jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
        findById: jest.fn().mockResolvedValue({}),
    }),

    /**
     * Mock model for `role` collection.
     * Provides mock implementations of CRUD operations on the `role` model.
     * 
     * @property {function} find - Mock implementation of `find` method.
     * @property {function} findOne - Mock implementation of `findOne` method.
     * @property {function} create - Mock implementation of `create` method.
     * @property {function} findById - Mock implementation of `findById` method.
     */
    role: jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
        findById: jest.fn().mockResolvedValue({}),
    }),

    /**
     * Mock model for `session` collection.
     * Provides mock implementations of CRUD operations on the `session` model.
     * 
     * @property {function} find - Mock implementation of `find` method.
     * @property {function} findOne - Mock implementation of `findOne` method.
     * @property {function} create - Mock implementation of `create` method.
     * @property {function} findById - Mock implementation of `findById` method.
     */
    session: jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
        findById: jest.fn().mockResolvedValue({}),
    }),

    /**
     * Mock model for `user_roles` collection.
     * Provides mock implementations of CRUD operations on the `user_roles` model.
     * 
     * @property {function} find - Mock implementation of `find` method.
     * @property {function} findOne - Mock implementation of `findOne` method.
     * @property {function} create - Mock implementation of `create` method.
     * @property {function} findById - Mock implementation of `findById` method.
     */
    user_roles: jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
        findById: jest.fn().mockResolvedValue({}),
    }),

    /**
     * Mock model for `log` collection.
     * Provides mock implementations of CRUD operations on the `log` model.
     * 
     * @property {function} find - Mock implementation of `find` method.
     * @property {function} findOne - Mock implementation of `findOne` method.
     * @property {function} create - Mock implementation of `create` method.
     * @property {function} findById - Mock implementation of `findById` method.
     */
    log: jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
        findById: jest.fn().mockResolvedValue({}),
    }),
};

module.exports = mongoose;
