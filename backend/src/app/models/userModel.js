const { ObjectId } = require('mongodb');
var mongoose = require('../../database/db');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    username: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    totalReceived: {
        type: Number,
        required: true,
        default: 0
    },
    phone: {
        type: String,
        required: true,
    },
    arts: [{
        type: ObjectId,  
    }],
    address: {
        postalCode: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
            uppercase: true,
        },
        complement: {
            type: String,
            uppercase: true,
        },
        district: {
            type: String,
            required: true,
            uppercase: true,
        },
        city: {
            type: String,
            required: true,
            uppercase: true,
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if(this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);