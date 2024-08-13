/**
 * @file role.model.js
 * @description This file defines the Mongoose model for the Role entity.
 * 
 * The Role model is used to represent user roles within the application. It includes attributes for the role name and an optional description.
 * 
 * The attributes of the Role model are as follows:
 * 
 * - `roleName`: A string indicating the name of the role (e.g., admin, user). This field is required and must be unique.
 * - `description`: A string providing a description of the role. This field is optional.
 * 
 * @module models/role
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the Role model
const roleSchema = new Schema({
    roleName: {
        type: String,
        required: true,
        unique: true // Ensures that role names are unique
    },
    description: {
        type: String,
        required: false // Description is optional
    }
});

// Create and export the Role model
module.exports = mongoose.model('Role', roleSchema);
