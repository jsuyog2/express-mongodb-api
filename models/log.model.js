/**
 * @file log.model.js
 * @description This file defines the Mongoose model for the Log entity.
 * 
 * The Log model is used to store log entries, including details such as the log level, message, and timestamp.
 * It also optionally references the User model to associate logs with specific users.
 * 
 * The attributes of the Log model are as follows:
 * 
 * - `level`: A string indicating the severity of the log (e.g., INFO, WARN, ERROR). This field is required.
 * - `message`: A text field containing the log message. This field is required.
 * - `timestamp`: A date field recording when the log entry was created. Defaults to the current time.
 * - `userId`: An optional ObjectId field that references the ID of a user associated with the log entry. It is set to NULL if the related user is deleted.
 * 
 * @module models/log
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the Log model
const logSchema = new Schema({
    level: {
        type: String,
        required: true // Log level is required (e.g., INFO, WARN, ERROR)
    },
    message: {
        type: String,
        required: true // Log message is required
    },
    timestamp: {
        type: Date,
        default: Date.now // Default to the current time
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: false // User ID is optional
    }
});

// Create and export the Log model
module.exports = mongoose.model('Log', logSchema);
