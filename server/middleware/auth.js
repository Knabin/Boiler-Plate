const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 각종 인증 처리를 진행한다.
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화한 후, 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next()  // next가 없으면 middleware에 갇히니 주의한다!
    })

    // 유저가 있으면 인증 OK

    // 유저가 없으면 인증 NO!
}

module.exports = { auth };