// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);


// TESTING ROUTES FOR UTILS MIDDLEWARE-AUTH.JS
// // GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Spiderman'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });


// // GET /api/restore-user
// router.use(restoreUser);

// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// }
// );


// // GET /api/require-auth
// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );


router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;