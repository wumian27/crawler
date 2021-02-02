const Router =  require('koa-router');

const { index } = require('../../controllers/user')

const userRouter = new Router();

userRouter.prefix('/user')

userRouter.get('/:id', index)

userRouter.post('/:id', async(ctx, next) => {
    console.log('添加')
})

userRouter.put('/:id', async(ctx, next) => {
    console.log('修改id');
})

module.exports = userRouter
