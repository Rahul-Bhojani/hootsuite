const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
    const token = req.header('x-auth-token');
    // const token = req.cookies.token;
    // const token = req.header('Authorization').replace('Bearer ', '')
    // console.log("from node : " + token);
    if (!token) return res.status(401).send('Access Denied!!!')

    try {
        const verified = jwt.verify(token, 'LanetDemoProject')
        req.user = verified;
        next()
    } catch (error) {
        res.status(404).send('Invalid Token!!!')
    }
}

module.exports = verify