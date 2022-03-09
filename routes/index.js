const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const categoryRouter = require('./categoryRouter');
const blogRouter = require('./blogRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/category', categoryRouter);
router.use('/blog', blogRouter);

module.exports = router;
