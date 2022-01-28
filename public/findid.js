const button = document.querySelector('#sub');
const modal =  document.querySelector('.modalBox');

button.addEventListener('click',async function(event){
            const year = document.querySelector('#year').value;
            const month = document.querySelector('#month').value;
            const day= document.querySelector('#day').value;
            const email= document.querySelector('#email').value;
            const phone= document.querySelector('#phone').value;

            if(year === '' || month === '' || day === '' || email === '' || phone === '') {
                        alert('정보를 모두 입력하세요!');
                        return;
            }
            
            const result = await axios.post('user/findid',{
                        year,
                        month,
                        day,
                        email,
                        phone,
            });

            if(!result.data) {
                        idmodal(false,result.data);
            } else {
                        idmodal(true,result.data[0].id);
                        
            }
});

function idmodal(tof,data){
            modal.classList.remove('hidden');
            const userid = document.querySelector('.userid');
            const check = document.querySelector('#useridCheck');
            if(tof === true) {
                        userid.textContent += data;
            }else {
                        userid.textContent += '존재하지 않는 사용자입니다.'
            }

            check.addEventListener('click',function(event){
                        modal.classList.add('hidden');
                        userid.textContent = '';
            });
}
