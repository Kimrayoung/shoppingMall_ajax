const button = document.querySelector('#sub');
const modal =  document.querySelector('.modalBox');

button.addEventListener('click',async function(event){
            const id = document.querySelector('#finder_id').value;
            const year = document.querySelector('#year').value;
            const month = document.querySelector('#month').value;
            const day= document.querySelector('#day').value;
            const email= document.querySelector('#email').value;
            const phone= document.querySelector('#phone').value;

            if(id === '' || year === '' || month === '' || day === '' || email === '' || phone === '') {
                        alert('정보를 모두 입력하세요!');
                        return;
            }
            
            const result = await axios.post('user/findpw',{
                        id,
                        year,
                        month,
                        day,
                        email,
                        phone,
            });
            
            if(!result.data) {
                        pwmodal(false,result.data);
            } else {
                        pwmodal(true,result.data[0].pw);
                        
            }
});

function pwmodal(tof,data){
            modal.classList.remove('hidden');
            const userpw = document.querySelector('.userpw');
            const check = document.querySelector('#userpwCheck');
            if(tof === true) {
                        userpw.textContent += data;
            }else {
                        userpw.textContent += '존재하지 않는 사용자입니다.'
            }

            check.addEventListener('click',function(event){
                        modal.classList.add('hidden');
                        userpw.textContent = '';
            });
}
