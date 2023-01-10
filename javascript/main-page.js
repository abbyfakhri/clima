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

const pageLink = [
    '/map.html',
    '/weekly.html',
    '/main-page.html',
    '/air-quality.html',
    '/activities.html'
];

for(let i =0;i<navIcon.length;i++){
    navIcon[i].addEventListener('click',()=>{

        navIcon[i].classList.add('icons-after-clicked');
        window.location = pageLink[i];
        
        for(let j = 0;j < navIcon.length;j++){

            if(j != i){
                navIcon[j].classList.remove('icons-after-clicked');
            }
            
        }
        
        
    })
}
    