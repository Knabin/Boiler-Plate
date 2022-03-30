const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type:String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// sava 하기 전, function을 실행함
userSchema.pre('save', function(next){
    var user = this;

    if (user.isModified('password')) {
        // 비밀번호를 암호화한다.
        // salt를 이용해서 비밀번호를 암호화하며, 이 salt를 생성해야 한다.
        // saltRounds는 salt가 몇 글자인지를 나타낸다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        // 비밀번호가 아니라 다른 정보를 변경한다면 넘겨 준다.
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234567    암호화된 비밀번호 $2b$10...
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    // jsonwebtoken을 이용하여 token을 생성한다.
    var user = this;

    // user._id + 'secretToken' = token
    // 'secretToken' -> user._id
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰을 decode 한다.
    // user._id + '' = token
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용하여 유저를 찾은 후, 
        // 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인한다.
        user.findOne({ "_id" : decoded, "token": token }, function(err, user) {
            if (err) return cb(err)
            cd(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }