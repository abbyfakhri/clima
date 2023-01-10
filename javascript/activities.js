const navigation = ()=>{
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
}




const changeInfoStatusColor = () =>{
    const status = document.getElementsByClassName('info-status');
    console.log('count:',status.length);

    for(let i=0;i<status.length;i++){
        if(status[i].innerText == 'MODERATE'){
            status[i].style.color = "#F2B411";
        }

        else if(status[i].innerText == 'POOR'){
            status[i].style.color = "#F21111";
        }

        else if(status[i].innerText == 'LOW'){
            status[i].style.color = "#35963E";
        }
    }
}


navigation();
changeInfoStatusColor();