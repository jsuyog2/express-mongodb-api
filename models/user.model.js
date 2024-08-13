/**
 * @file user.model.js
 * @description This file defines the Mongoose model for the Users collection.
 * 
 * The User model represents users in the system, storing essential information about each user.
 * 
 * The attributes of the User model are as follows:
 * 
 * - `name`: A string field that holds the user's name. This field is optional.
 * - `username`: A string field that holds the user's username. This field is required and must be unique.
 * - `email`: A string field that holds the user's email address. This field is required and must be unique.
 * - `password`: A string field that stores the user's hashed password. This field is required.
 * - `phoneNumber`: A string field that holds the user's phone number. This field is optional and accommodates various phone number formats.
 * - `emailVerified`: A boolean field that indicates whether the user's email has been verified. Defaults to `false`.
 * - `acceptedTerms`: A boolean field that indicates whether the user has accepted the terms of service. This field is required and defaults to `false`.
 * 
 * @module models/user
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the User model
const userSchema = new Schema({
    name: {
        type: String,
        required: false // Name is optional
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensures that usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures that emails are unique
    },
    password: {
        type: String,
        required: true // Password is required
    },
    phoneNumber: {
        type: String, // Use String to accommodate various phone number formats
        required: false // Phone number is optional
    },
    emailVerified: {
        type: Boolean,
        default: false // Default to false indicating email is not verified
    },
    acceptedTerms: {
        type: Boolean,
        required: true,
        default: false // Default to false indicating terms are not accepted
    }
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
