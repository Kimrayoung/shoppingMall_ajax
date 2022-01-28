const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const app = express();

app.set('port', 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine','html');
nunjucks.configure('views',({
  express: app,
  watch: true
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dataFIle')));
app.use('/user', userRouter);
app.use('/item', itemRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  console.log(err);
  // res.sendFile('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
