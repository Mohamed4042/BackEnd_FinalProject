const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
        trim: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    img: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$|\/uploads\/.+\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?)$/.test(v);
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
}, { timestamps: true }); 



// Password Hashing Middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 

    try {
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt); 
        next(); 
    } catch (error) {
        next(error); 
    }
});


//Compare Passwords method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); 
};




const User = mongoose.model('User', userSchema);
module.exports = User;
