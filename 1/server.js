const Koa = require('koa');
const KoaRouter = require('@koa/router');
const staticCache = require('koa-static-cache');

const app=new Koa()
app.use(staticCache({
    prefix: '/public',
    dir: __dirname + '/public',
    gzip: true,
    dynamic: true
}));
const router = new KoaRouter();
router.get('/', ctx=>{
    ctx.body = tpl.render('index.html')
});
router.get('/gettext',ctx=>{
    ctx.body = {
        code: 0,
        message: '',
        data: "hello"
    };
})
router.get('/getimg', ctx => {
    ctx.body = {
        code: 0,
        message: '',
        data: [
            {
                id: 1,
                url: './img/1.png'
            },
            {
                id:2,
                url:'./img/2.jpg'
            }
        ]
            
        
    };
})
app.use(router.routes());
app.listen(8888);