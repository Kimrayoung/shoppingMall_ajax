# shoppingMall_최종_ajax

## 📜 프로젝트 소개
Jstyle이라는 쇼핑몰을 모델로 그 전 프로젝트와 다르게 어떠한 기능을 넣을지 어떠한 방식으로 진행되어야 하는지 대략적으로나마 정하고 들어간 프로젝트입니다. 
순수자바스크립트와 node.js의 프레임워크인 express를 이용하여 쇼핑몰을 제작하였습니다.
관리자 페이지에서 ajax방식으로 데이터를 주고받는 기능을 연습하기 위해서 분리한 프로젝트로 아직 메인페이지가 진행중인 페이지입니다. 
메인페이지 또한 ajax방식과 SSR방식 두가지로 구현 할 예정입니다
SSR방식으로 구현한 프로젝트는 shoppingMall_defalut버전을 참고 부탁드립니다.

### 🛠 Stacks
<div>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
</div>

### 📁 폴더별 안내
###### 스토리보드
+ 어떠한 방식으로 구현할지 대략적으로 적어놓은 파일들이 들어있습니다
---------
###### public
+ 정적인 파일들이 모여있는 폴더입니다.
+ find_id와 find_pw는 아이디 찾기 , 비밀번호 찾기에 필요한 파일들입니다.
+ login 이름의 파일들은 로그인기능시 필요한 파일들
+ signup 이름의 파일들은 회원가입시 필요한파일들입니다
+ item 폴더는 관리자 페이지 기능시 필요한 파일들을 모아놓았습니다
--------
###### routes
+ user파일은 로그인, 회원가입, 아이디 찾기, 비밀번호 찾기 등 사용자의 정보가 서버에 전달될 때 사용될 라우터입니다
+ item파일은 아이템에 대한 수정이 일어날 때 사용될 라우터입니다
-------
###### views
+ 넌적스를 사용한 item.html이 들어있습니다.
+ 관리자 페이지를 열어줍니다
 
### 💡 Points

###### 관리자 페이지
+ 추가 버튼을 누르면 데이터를 추가할 수 있고 이미지 파일을 넣을 수 있습니다
+ 수정 버튼을 누르면 해당 데이러를 수정할 수 있고 왼쪽에 표시되는 이미지는 현재 데이터에 해당하는 이미지 입니다
+ 만약에 이미지를 변경하고 싶다면 이미지 파일을 추가하면 됩니다.
+ 가장 상단의 타입(상의, 원피스 등)을 누르면 해당 타입에 해당하는 데이터만 나오게 되어있습니다.
---------------
######로그인 페이지
+ 아이디와 비밀번호를 잊어버렸을 경우 해당 버튼을 클릭하면 아이디와 비밀번호를 찾을 수 있습니다.
+ non-member은 구매자가 회원가입을 하지 않아도 구매한 아이템을 볼 수 있도록 하려고 하였지만 아직 기능 구현이 되어있지 않습니다
------------
###### 회원가입 페이지
+ 아이디 유효성 검사해서 통과를 한다면 '멋진 아이디네요!'라는 문구가 아래 추가되고 아이디가 존재한다면 '존재하는 아이디 입니다'라는 문구가 나옵니다
+ 비밀번호와 비밀번호 검사가 동일하지 않다면 비밀번호 검사란의 테두리가 빨간색으로 변합니다
+ 필요한 데이터를 입력하지 않았다면 빨간색 테두리로 변경됩니다.
---------
##### 추가 예정이거나 수정되어야할 부분
+ 메인 페이지 
+ 수정, 추가 버튼 클릭시 데이터가 제대로 넘어가지 않음
+ 전체적으로 변수명을 통일이 필요(카멜 케이스로 다시 작성이 필요) -> 현재는 카멜케이스와 스네이크 케이스가 섞여있음
+ 현재 public파일에서 기능별로 묶여있지 않은데 묶어서 서버에서 다시 작성 필요(item파일 처럼)

https://user-images.githubusercontent.com/66238470/152209635-ec91b9d3-9d93-4443-8cc2-34853a2c56ca.gif



