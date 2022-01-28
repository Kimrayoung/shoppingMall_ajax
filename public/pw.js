//비밀번호 유효성 검사
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