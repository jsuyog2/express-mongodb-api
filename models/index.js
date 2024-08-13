/**
 * @file index.js
 * @description This file initializes the Mongoose ORM and sets up model relationships.
 * 
 * The file configures Mongoose using the database connection settings and defines references between models.
 * 
 * The following models are initialized:
 * 
 * - `User`: Represents users in the system.
 * - `Session`: Represents user sessions.
 * - `Log`: Represents system logs.
 * - `Role`: Represents roles that users can have.
 * - `UserRoles`: Represents the many-to-many relationship between users and roles.
 * 
 * Relationships are defined as follows:
 * 
 * - `Log` and `Session` models reference the `User` model through a `userId` field.
 * - The `User` model has a many-to-many relationship with the `Role` model through the `UserRoles` collection.
 * 
 * @module models/index
 */

const mongoose = require('mongoose');
const dbConfig = require('./../config/database.config');

// Connect to MongoDB
mongoose.connect(dbConfig.connectionString);

const db = {};

// Initialize models
db.mongoose = mongoose;

db.user = require("./user.model.js");
db.session = require("./session.model.js");
db.log = require("./log.model.js");
db.role = require("./role.model.js");
db.user_roles = require("./user_roles.model.js");

// Define relationships manually
db.userSchema = db.user.schema;
db.sessionSchema = db.session.schema;
db.logSchema = db.log.schema;
db.roleSchema = db.role.schema;
db.userRolesSchema = db.user_roles.schema;

// Export the models and schemas
module.exports = db;
