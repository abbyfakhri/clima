const forecastDiv = document.querySelector('.forecast');

    forecastDiv.addEventListener('wheel',(event)=>{

            forecastDiv.scrollTo({
                top: 0,
                left: forecastDiv.scrollLeft += event.deltaY,
                duration:1000,
                behavior: 'smooth',
            })
    })

const navIcon = document.getElementsByClassName('icons');

for(let i =0;i<navIcon.length;i++){
    navIcon[i].addEventListener('click',()=>{

        navIcon[i].classList.add('icons-after-clicked');
        
        for(let j = 0;j < navIcon.length;j++){

            if(j != i){
                navIcon[j].classList.remove('icons-after-clicked');
            }
            
        }
        
        
    })
}
    