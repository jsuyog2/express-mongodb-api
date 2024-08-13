/**
 * @file session.model.js
 * @description This file defines the Mongoose model for the Session entity.
 * 
 * The Session model is used to represent user sessions within the application. It includes attributes for session tokens, flags, expiration dates, and associated users.
 * 
 * The attributes of the Session model are as follows:
 * 
 * - `token`: A unique text field that represents the session token. This field is required and must be unique.
 * - `flag`: A boolean field indicating whether the session is active or not. The default value is `false`.
 * - `expiresAt`: A date field specifying when the session expires. This field is optional.
 * - `userId`: An ObjectId field representing the ID of the user associated with the session. This field is optional and references the `User` model. If the related user is deleted, this field will be set to `NULL`.
 * 
 * @module models/session
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the Session model
const sessionSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true // Ensures that session tokens are unique
    },
    flag: {
        type: Boolean,
        required: true,
        default: false // Default to false indicating the session is inactive
    },
    expiresAt: {
        type: Date,
        required: false // Expiry date is optional
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: false // User ID is optional
    }
});

// Create and export the Session model
module.exports = mongoose.model('Session', sessionSchema);
