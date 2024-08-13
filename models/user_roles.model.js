/**
 * @file user_roles.model.js
 * @description This file defines the Mongoose model for the UserRoles junction table.
 * 
 * The UserRoles model represents the many-to-many relationship between users and roles. It serves as a junction table that links users with their assigned roles.
 * 
 * The attributes of the UserRoles model are as follows:
 * 
 * - `userId`: An ObjectId field that references the ID of a user from the `User` model. This field is required.
 * - `roleId`: An ObjectId field that references the ID of a role from the `Role` model. This field is required.
 * 
 * @module models/user_roles
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the UserRoles junction table
const userRolesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role', // Reference to the Role model
        required: true
    }
});

// Create and export the UserRoles model
module.exports = mongoose.model('UserRoles', userRolesSchema);
