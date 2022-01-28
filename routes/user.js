const express = require('express');
const mysql = require('mysql');

const conn = {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'shoppingMall'
}

const router = express.Router();

function validityPw(pw) {
            const specialString = '~!@#$%^&*(){[]';
            const number = '0123456789';
            const pwTxt = pw.value;
            let specialStringCnt = 0;
            let numberCnt = 0;

            //특수문자
            for(let i = 0 ; i < pwTxt.length; i++) {
                        if(specialString.includes(pwTxt[i])){
                                    specialStringCnt++;
                                    break;
                        }
            }
            //숫자
            for (let i = 0; i < pwTxt.length; i++) {
                        if(number.includes(pwTxt[i])) {
                                    numberCnt++;
                                    break;
                        }
            }

            console.log('cnt',specialStringCnt,numberCnt);
            if(specialStringCnt > 0 && numberCnt > 0) {
                        return true;
            }else return false;

}

router.post('/login', (req, res, next) => {
            const connection = mysql.createConnection(conn);
            connection.connect();
            const body = req.body;
            const id = body.id;
            const pw  = body.pw;
            
            const sql = `select EXISTS(select id from shoppingMall.user where id = ${id} and pw = ${pw});`

            connection.query(sql,(err,result,fields) => {
                        if(err) {
                                    console.log('login err',err.message);
                        }
                        console.log(result);
                        if(result) {
                                    req.session.userId = id;
                                    res.redirect('/');
                        }
                        else {
                                    res.redirect('/login.html');
                        }
            })
});

router.post('/signup',(req,res,next) => {
            const connection = mysql.createConnection(conn);
            connection.connect();
            const body = req.body;
            const id = body.id;
            const pw = body.pw;
            const email = body.email;
            const year = body.year;
            const month = body.month;
            const day = body.day;
            const phone = body.phone;
            let overage = body.age;

            if(overage === 'on') {
                        overage = true;
            } else {
                        overage = false;
            }

            if(!validityPw(pw)) { 
                        res.redirect('/signUp.html');
                        return;
            }           

            const sql = `insert into shoppingMall.user(id, pw, email,phone, year, month, day, overage) values ('${id}','${pw}','${email}',${phone},${year},${month},${day},${overage});`
            console.log('sql',sql);
            connection.query(sql, (err,result, fields) => {
                        if(err) {
                                    console.log('signup err', err.message);
                        }
                        if(result) {
                                    res.redirect('/login.html');
                        }
            })
});

router.get('/duplicateid/:id',(req,res,next) => {
            //duplicateid
            const connection = mysql.createConnection(conn);
            connection.connect();
            const id = req.params.id; //req.params.id
            const sql = `select id from shoppingMall.user where id = '${id}';`;
            connection.query(sql,(err,result,fields) => {
                        if(err) {
                                    console.log('duplicateId err',err.message);
                        }
                        if(result.length === 0) {
                                    res.send('false');     
                        } else if(result[0].id === id) {
                                    res.send('true');
                        } 
                        
            })
});

router.post('/findpw',(req,res,next) => {
            const connection = mysql.createConnection(conn);
            connection.connect();
            const body = req.body;
            const id = body.id;
            const year = Number(body.year);
            const month = Number(body.month);
            const day = Number(body.day);
            const email = body.email;
            const phone = body.phone;
            const sql = `select pw from shoppingMall.user where id = '${id}' and year=${year} and month=${month} and day=${day} and email ='${email}' and phone='${phone}';`;
            connection.query(sql,(err,result,fields) => {
                        if(err) {
                                    console.log('findPw err',err.message);
                        }
                        if(result.length === 0) {
                                    res.json(false);
                        }else{
                                    res.json(result);
                        }
            })
});

router.post('/findid',(req,res,next) => {
            const connection = mysql.createConnection(conn);
            connection.connect();
            const body = req.body;
            const year = Number(body.year);
            const month = Number(body.month);
            const day = Number(body.day);
            const phone = body.phone;
            const sql = `select id from shoppingMall.user where year=${year} and month=${month} and day=${day} and phone='${phone}';`;
            connection.query(sql,(err,result,fields) => {
                        if(err) {
                                    console.log('findId err',err.message);
                        }
                        if(result.length === 0) {
                                    res.json(false);
                        }else{
                                    res.json(result);
                        }
            })
})


module.exports = router;