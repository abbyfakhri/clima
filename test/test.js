const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const image = document.getElementById('content');

let i = 0;

const imageSources = [
    'images/image (0).jpg',
    'images/image (1).jpg',
    'images/image (2).jpg',
    'images/image (3).jpg',
    'images/image (4).jpg',
    'images/image (5).jpg',
    'images/image (6).jpg',
    'images/image (7).jpg',
    'images/image (8).jpg', 
];

const changeImageNext = () =>{
    if(i+1 < imageSources.length){
        const image = document.getElementById('content');

        counterPlus(i);

        image.classList.remove("slide-out");
        image.classList.add("slide-in");
        
        console.log('image',i,'clicked');

        setTimeout(() => {
            image.classList.remove("slide-in");
            image.src = '';
            image.src = imageSources[i];
        }, 500);
    }

    else{
        console.log('running out of images');
        return;
    }
    
}

const changeImagePrev = () =>{
    if(i-1 > 0){
        const image = document.getElementById('content');        image.src = '';
        counterMin(i);
        image.src = imageSources[i];

        
        image.classList.add("slide-out");  

        console.log('image',i,'clicked');
        
        setTimeout(() => {
            image.classList.remove("slide-out");
            image.src = imageSources[i];
        }, 500);
    }

    else{
        console.log('running out of images');
        return;
    }
        
    
    
}

const counterPlus = (counter)=>{

        counter++;
        i = counter;    
}

const counterMin = (counter)=>{
  
        counter--;
        i = counter;

}

leftBtn.addEventListener('click',changeImagePrev);
rightBtn.addEventListener('click',changeImageNext);