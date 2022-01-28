(function() {
            const pw = document.querySelector('#pw');
            const checkPw = document.querySelector('#checkPw');
            const submit = document.querySelector('#sub');
            const id = document.querySelector('#id');
            const email = document.querySelector("#email");
            const phone = document.querySelector('#phone');
            const year = document.querySelector('#year');
            const month = document.querySelector('#month');
            const day = document.querySelector('#day');
            const overage = document.querySelector('#age');
            const duplicateBut = document.querySelector('#duplicateBut');
            let idflag = 0;
            
            duplicateBut.addEventListener('click',async function() {
                        const checkid = document.querySelector('.checkid');
                        let  duplicateId = await axios.get(`user/duplicateid/${id.value}`);
                        duplicateId = duplicateId.data;
                        
                        checkid.style.display = 'block';
                        if(duplicateId === true) { //아이디 중복 검사 button을 클릭 했는지 확인하는 방법
                                    checkid.textContent = '';
                                    checkid.textContent = '이미 존재하는 아이디 입니다.'
                                    return;
                        }
                        if(id.value == "") {
                                    checkid.textContent = '';
                                    checkid.textContent = '필수정보입니다.'
                        }else {
                                    checkid.textContent = '';
                                    checkid.textContent = '멋진 아이디네요!'
                                    idflag = 1;
                        }
            });
            
            id.addEventListener('change',function() {
                        const checkid = document.querySelector('.checkid');
                        checkid.style.display = 'none';
                        idflag = 0;
            });
            
            
            //pw 유효성 검사 
            pw.addEventListener('blur',function(event){
                        if(validityPw(pw)) {
                                    rightOrwrong('true',pw) 
                        }else {
                                    rightOrwrong('false',pw)
                                    alert('숫자와 특수문자를 한개 이상 포함해야 합니다.');
                        }
            });
            
            //비밀번호랑 비밀번호 재확인 확인하기 --> bordercolor 변경
            checkPw.addEventListener('blur', function(event) {
                        const target = event.target;
                        const checkPwTxt = target.value;
                        const pwTxt = pw.value;
            
                        pwTxt === checkPwTxt && checkPwTxt !== '' ? rightOrwrong('true',checkPw) : rightOrwrong('false',checkPw);
            });
            
            email.addEventListener('blur',function(event) {
                        email.value !== "" ? rightOrwrong('true',email) : rightOrwrong('false',email);
            });
            
            phone.addEventListener('blur',function(event) {
                        phone.value !== "" ? rightOrwrong('true',phone) : rightOrwrong('fasle',phone);
            });
            
            year.addEventListener('blur',function(event) {
                        year.value !== "" ? rightOrwrong('true',year) : rightOrwrong('false',year);
            });
            
            month.addEventListener('blur',function(event) {
                        month.value !== "" ? rightOrwrong('true',month) : rightOrwrong('true',month);
            });
            
            day.addEventListener('blur',function(event) {
                        day.value !== "" ? rightOrwrong('true',day) : rightOrwrong('false',day);
            });
            
            function rightOrwrong(answer,tag){
                        if(answer === 'true'){
                                    tag.classList.remove('wrong_pw');
                                    tag.classList.add('right_pw');
                        }else {
                                    tag.classList.remove('right_pw');
                                    tag.classList.add('wrong_pw');
                        }
            }
            
            submit.addEventListener('click',function(event) {
                        const formtag = document.querySelector('#signUp');
                        
                        if(id.value === null || email.value === null || phone.value === null || year.value === ""|| month.value === "" || day.value === "") {
                                    alert('정보를 전부 입력해주세요!');
                        } else if(idflag === 0) {
                                    alert('아이디 중복검사를 해주세요.');
                        } else {
                                    formtag.submit();
                        }
            })
}) ();
