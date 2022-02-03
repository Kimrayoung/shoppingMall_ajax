const express = require('express');
const mysql = require('mysql');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = req.body.itemtype;
    cb(null, `./dataFile/dataImg/${type}`);
  },
});

const upload = multer({ storage: storage });

const conn = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'shoppingMall',
  multipleStatements: true,
};

const connection = mysql.createConnection(conn);
connection.connect();

const router = express.Router();

//pagination //list middleware
router.use('/list',(req, res, next) => {
  const tag = 'middleware/item';
  console.log(tag, 'body', req.body);
  const type = req.query.type || 'all';
  console.log('type',type);
  
  const sql = `select count(*) as totalRecoredCount from item ${type !== 'all' ? 'where itemtype= "'+type+'"' : ';'}`
  console.log('sql',sql);

  connection.query(sql, (err, result) => {
    if(err) {
      console.error(tag, err.message);
    }
    console.log(tag, 'result', result);
    if(result) {
      const currentPageNo = Number(req.query.currentPageNo) || 1; //현재 페이지 번호
      const recordCountPerPage = Number(req.query.recordCountPerPage) || 10;  //한페이지에 보여지는 게시물의 갯수
      const pageSize = 10; // 페이지 리스트 사이즈
      const totalRecoredCount = result[0].totalRecoredCount; //전체 아이템의 개수
      const totalPageCount = Math.floor((totalRecoredCount - 1) / recordCountPerPage) + 1; //총 페이지 갯수
      const firstPageNoOnPageList = Math.floor((currentPageNo -1) / pageSize) * pageSize + 1; //페이지 리스트의 첫번째 페이지 번호
      let lastPageNoOnPageList = (firstPageNoOnPageList + pageSize) - 1; //페이지 리스트의 마지막 페이지 번호
      if(lastPageNoOnPageList > totalPageCount) {
        lastPageNoOnPageList = totalPageCount;
      }

      const firstRecordIndex = (currentPageNo - 1) * recordCountPerPage; //db에서 찾을 데이터의 시작번호
      const lastRecordIndex = currentPageNo * recordCountPerPage;  //db에서 찾을 데이터의 마지막번호

      req.pagination = {
        currentPageNo,
        recordCountPerPage,
        pageSize,
        totalRecoredCount,
        totalPageCount,
        firstPageNoOnPageList,
        lastPageNoOnPageList,
        firstRecordIndex,
        lastRecordIndex
      }
      console.log(tag, 'pagination', req.pagination);
      
      next();
    }
  })
})

router.get('/list', (req, res) => {
  const tag = 'get/item';
  console.log(tag);

  const accept = req.accepts(['json', 'html']);

  const pagination = req.pagination;  //pagination에서 구현한 미들웨어
  const type = req.query.type || 'all';

  const sql =
    type === 'all'
      ? `select * from item order by itemNumber desc limit ${pagination.firstRecordIndex}, ${pagination.recordCountPerPage};`
      : `select * from item where itemtype = '${type}' order by itemNumber desc limit ${pagination.firstRecordIndex}, ${pagination.recordCountPerPage};`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(tag,err.message);
    }
    console.log(tag,'result',result);
    if (result) {
      if (accept === 'json') {
                res.json({items: result, pagination, type});
            } else if (accept === 'html') {  //처음에 item/html로 들어가면 어떻게 accept가 html인지 알지,,?
                res.render('item.html', {items: result, pagination, type});
            }
    }
  });
});

function getPath(filepath) {
  const filepatharr = filepath.split('/');
  const realpath = filepatharr.slice(1, filepatharr.length - 1);
  return realpath.join('/');
}

router.post('/add', upload.single('uploadImg'), (req, res, next) => {
  const tag = 'post/item/add';
  console.log(tag);

  const body = req.body;
  const file = req.file;
  const imgOriginalName = file.originalname;
  const fileName = file.filename;
  const path = getPath(file.path);
  const itemtype = body.itemtype;
  const itemname = body.itemName;
  const value = body.value;
  const size = body.size;
  const color = body.color;

  const sql = `insert into shoppingMall.item (itemname, itemtype, value, size, colors, filename,originalFileName,imgFilePath) value ('${itemname}','${itemtype}',${value},'${size}','${color}','${fileName}','${imgOriginalName}','${path}');`;
  connection.query(sql, (err, result, fields) => {
    if (err) {
      console.log('add err', err.message);
    }
    if (result) {
      res.json(true);
    }
  });
});

router.post('/modify',upload.single('modifyimg'),(req, res, next) => {
    const tag = 'post/item/modify';
    console.log(tag);
    console.log(req.body)
    const body = req.body;
    const file = req.file; 
    console.log('file',file);
    const itemNumber = Number(body.itemNumber); 
    const itemtype = body.itemtype;
    const itemname = body.itemName;
    const value = body.value;
    const size = body.size;
    const color = body.color;
    let sql = '';

    if(file === undefined) {
      sql = `update item set itemname = '${itemname}', itemtype = '${itemtype}', value ='${value}', size = '${size}', colors = '${color}'  where itemNumber = ${itemNumber};` 
    } else {
      const imgOriginalName = file.originalname;
      const fileName = file.filename;
      const path = getPath(file.path);
      sql = `update item set itemname = '${itemname}', itemtype = '${itemtype}', value ='${value}', size = '${size}', colors = '${color}', filename ='${fileName}', originalFileName = '${imgOriginalName}', imgFilePath ='${path}' where itemNumber = ${itemNumber};`;
    }

    connection.query(sql,(err, result, fields) => {
      if (err) {
        console.log(tag, err.message);
      } else {
        console.log(tag,'result',result);
        res.json(true);
      }
    });
  }
);

router.get('/delete', (req, res) => {
  const tag = 'get/item/delete';
  console.log(tag);

  const itemNumber = req.query.itemNumber;
  const sql = `delete from item where itemNumber=${itemNumber}` ;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(tag,err.message);
    } else {
      console.log(tag,'result',result);
      res.json(true);
    }
  });
});

router.get('/:id', (req, res, next) => {
    const tag = 'get /item/:id';
    console.log(tag, req.query, req.url);

    const id = req.params.id;
    const sql = `select *
                 from item
                 where itemNumber = ${id}`;

    connection.query(sql, (err, result, fields) => {
        if (err) {
            console.error(tag, err.message);
        } else {
            console.log(tag, 'result', result);
            res.json({item: result[0]});
        }
    });
});

module.exports = router;
