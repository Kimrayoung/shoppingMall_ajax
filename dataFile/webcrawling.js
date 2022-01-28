const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const baseurl = 'http://www.jstyleshop.net';

const url =
  'http://www.jstyleshop.net/shop/shopbrand.html?xcode=012&type=Y&gf_ref=Yz1zanhaM1I=';
const dest =
  '/Users/rayoungnim/Documents/프로그래밍/shoppingmallFile/outer/';

const getfilename = (s) => {
  const x = s.split('?')[0].split('/');
  //?이전 url만 가져옴 http://www.jstylshop.net/shop/shopbrand.html
  return x[x.length - 1];
  //위 url에서 shopbrand.html만 가져옴
};

// : 브라우저의 전반적인 구조는 어떻게 생겼는지
const download = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage(); //생성된 페이지(페이지 객체)
  await page.goto(url);
  await page.waitForTimeout(1000);

  let thumbs = await page.$$eval('.thumb_img', (el) =>
    el.map((x) => x.getAttribute('src'))
  );
  console.log(thumbs);

  thumbs.map(async (x) => {
    const img = await axios.get(baseurl + x, {
      responseType: 'arraybuffer',
    });
    fs.writeFileSync(dest + getfilename(x), img.data);
  });

  await page.close();
  await browser.close();
};

download();
