

var FullImageBox = document.getElementById('FullImageBox');
var FullImage = document.getElementById('FullImage');



let currentIndex = 0;
let activeImagesArray = [];
let currentMode = 'gallery';
let currentImageSrc = "";


let favorites = [];
let recycleBin = [];



function getCleanSrc(fullPath){
    let parts = fullPath.split('/');
    return parts[parts.length - 1];
}


function toggleSidebar(){
    let sidebar = document.getElementById("sidebar");

    if (sidebar.style.width === "250px"){
        sidebar.style.width = "0";
    }

    else{
        sidebar.style.width = "250px";
    }
}



function displaydate(){
    document.getElementById('date').innerHTML = Date();
}


function openFullImg(picSrc){
    FullImageBox.style.display = "flex";
    currentImageSrc = picSrc;
    

    let cleanCurrent = getCleanSrc(picSrc);
    let inRecycleBin = recycleBin.some(src => getCleanSrc(src) === cleanCurrent);
    
    if(inRecycleBin){
        currentMode = 'recycle';
    }

    else if(currentMode !== 'favorites'){
        currentMode = 'gallery';
    }
    

    const visibleItems = Array.from(document.querySelectorAll('.gallery-item'))
        .filter(item => window.getComputedStyle(item).display !== 'none');
    
    activeImagesArray = visibleItems.map(item => item.querySelector('img').getAttribute('src'));
    currentIndex = activeImagesArray.indexOf(picSrc);
    if (currentIndex === -1) currentIndex = 0;
    
    FullImage.src = picSrc;
    

    let favBtn = document.getElementById('fav-btn');
    let delBtn = document.getElementById('del-btn');
    let restoreBtn = document.getElementById('restore-btn');
    let permDelBtn = document.getElementById('perm-del-btn');

    if(favBtn && delBtn && restoreBtn && permDelBtn){
        if(currentMode === 'recycle'){
            avBtn.style.display = 'none';
            delBtn.style.display = 'none';
            restoreBtn.style.display = 'inline-block';
            permDelBtn.style.display = 'inline-block';
        }


        else{
            favBtn.style.display = 'inline-block';
            delBtn.style.display = 'inline-block';
            restoreBtn.style.display = 'none';
            permDelBtn.style.display = 'none';
            

            let isFav = favorites.some(fav => getCleanSrc(fav) === cleanCurrent);
            if(isFav){
                favBtn.innerHTML = "❤️ Remove Favorite";
            }

            else{
                favBtn.innerHTML = "❤️ Favorite";
            }
        }
    }
}



function closeFullImg(){
    FullImageBox.style.display = "none";
}


function changeImage(picSrc){
    currentImageSrc = picSrc;
    FullImage.src = picSrc;
    currentIndex = activeImagesArray.indexOf(picSrc);
    
    let favBtn = document.getElementById('fav-btn');
    if(favBtn){
        let cleanCurrent = getCleanSrc(picSrc);
        let isFav = favorites.some(fav => getCleanSrc(fav) === cleanCurrent);

        if(isFav){
            favBtn.innerHTML = "❤️ Remove Favorite";
        }

        else{
            favBtn.innerHTML = "❤️ Favorite";
        }
    }
}



function slideImage(n){
    currentIndex += n;
    
    if(currentIndex >= activeImagesArray.length){
        currentIndex = 0;
    }

    if(currentIndex < 0){
        currentIndex = activeImagesArray.length - 1;
    }
    
    currentImageSrc = activeImagesArray[currentIndex];
    FullImage.src = currentImageSrc;
    
    let favBtn = document.getElementById('fav-btn');
    if(favBtn){
        let cleanCurrent = getCleanSrc(currentImageSrc);
        let isFav = favorites.some(fav => getCleanSrc(fav) === cleanCurrent);
        
        if(isFav){
            favBtn.innerHTML = "❤️ Remove Favorite";
        }

        else{
            favBtn.innerHTML = "❤️ Favorite";
        }
    }
}



function toggleFavorite(){
    let cleanCurrent = getCleanSrc(currentImageSrc);

    let index = favorites.findIndex(
        fav => getCleanSrc(fav) === cleanCurrent
    );

    let favBtn = document.getElementById('fav-btn');

    if(index > -1){

        favorites.splice(index, 1);

        if(favBtn){
            favBtn.innerHTML = "❤️ Favorite";
        }

        
        if(currentMode === 'favorites'){
            const items = document.querySelectorAll('.gallery-item');

                items.forEach(item => {
                let img = item.querySelector('img');

                if(img){
                    let imgSrc = img.getAttribute('src');
                    let cleanSrc = getCleanSrc(imgSrc);

                    if(cleanSrc === cleanCurrent){
                        item.style.display = "none";
                    }
                }
            });


            closeFullImg();
        }

    }


    else{
 
        favorites.push(currentImageSrc);

        if(favBtn){
            favBtn.innerHTML = "❤️ Remove Favorite";
        }
    }


    let favCountElem = document.getElementById('fav-count');

    if(favCountElem){
        favCountElem.innerText = favorites.length;
    }
}


function moveToRecycleBin(){
    recycleBin.push(currentImageSrc);
    

    const items = document.querySelectorAll('.gallery-item');
    let cleanCurrent = getCleanSrc(currentImageSrc);
    items.forEach(item => {
        let img = item.querySelector('img');
        if(img && getCleanSrc(img.getAttribute('src')) === cleanCurrent){
            item.style.display = 'none';
        }
    });
    
    let recCountElem = document.getElementById('rec-count');
    if (recCountElem) recCountElem.innerText = recycleBin.length;
    closeFullImg();
}



function restoreImage(){
    let cleanCurrent = getCleanSrc(currentImageSrc);
    recycleBin = recycleBin.filter(src => getCleanSrc(src) !== cleanCurrent);
    

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        let img = item.querySelector('img');

        if(img && getCleanSrc(img.getAttribute('src')) === cleanCurrent){
            item.style.display = 'block';
        }
    });
    
    let recCountElem = document.getElementById('rec-count');
    if(recCountElem) recCountElem.innerText = recycleBin.length;
    closeFullImg();
    showSection('recycle'); 
}



function permanentDelete(){
    let cleanCurrent = getCleanSrc(currentImageSrc);
    recycleBin = recycleBin.filter(src => getCleanSrc(src) !== cleanCurrent);
    

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        let img = item.querySelector('img');
        if(img && getCleanSrc(img.getAttribute('src')) === cleanCurrent){
            item.remove();
        }
    });
    
    let recCountElem = document.getElementById('rec-count');
    if(recCountElem) recCountElem.innerText = recycleBin.length;
    closeFullImg();
    showSection('recycle');
}



function showSection(section){
    currentMode = section;
    toggleSidebar();
    
    const items = document.querySelectorAll('.gallery-item');
    
    if (section === 'gallery'){
        items.forEach(item => {
            let img = item.querySelector('img');
            if(img){
                let imgSrc = img.getAttribute('src');
                let cleanSrc = getCleanSrc(imgSrc);
                // Check if it's not inside recycle bin
                let inRecycle = recycleBin.some(rec => getCleanSrc(rec) === cleanSrc);
                if(!inRecycle){
                    item.style.display = "block";
                }

                else{
                    item.style.display = "none";
                }
            }
        });
    }

    else if (section === 'favorites'){
        items.forEach(item => {
            let img = item.querySelector('img');
            if(img){
                let imgSrc = img.getAttribute('src');
                let cleanSrc = getCleanSrc(imgSrc);
                let isFav = favorites.some(fav => getCleanSrc(fav) === cleanSrc);
                let inRecycle = recycleBin.some(rec => getCleanSrc(rec) === cleanSrc);
                
                if(isFav && !inRecycle){
                    item.style.display = "block";
                }

                else{
                    item.style.display = "none";
                }
            }
        });
    }


    else if(section === 'recycle'){
        items.forEach(item => {
            let img = item.querySelector('img');
            if(img){
                let imgSrc = img.getAttribute('src');
                let cleanSrc = getCleanSrc(imgSrc);
                let inRecycle = recycleBin.some(rec => getCleanSrc(rec) === cleanSrc);
                
                if(inRecycle){
                    item.style.display = "block";
                } 

                else{
                    item.style.display = "none";
                }
            }
        });
    }
}



function filterGallery(category){
    document.querySelectorAll('.b1').forEach(function(button){
    button.classList.remove('active');
});

event.currentTarget.classList.add('active');
    currentMode = 'gallery';
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => {
        let img = item.querySelector('img');
        if(img){
            let imgSrc = img.getAttribute('src');
            let cleanSrc = getCleanSrc(imgSrc);
            let inRecycle = recycleBin.some(rec => getCleanSrc(rec) === cleanSrc);

            if(!inRecycle && (category === 'all' || item.getAttribute('data-category') === category)){
                item.style.display = "block";
            }

            else{
                item.style.display = "none";
            }
        }
    });
}



function positionLightboxActions(){
    const img = document.getElementById("FullImage");
    const actions = document.querySelector(".lightbox-actions");

    if(!img || !actions) return;

   
    if(!img.complete || img.naturalWidth === 0){
        actions.style.display = "none";
        return;
    }

    const rect = img.getBoundingClientRect();
    
    actions.style.display = "flex";

    actions.style.left = (rect.left - actions.offsetWidth - 15) + "px";

    actions.style.top =
        (rect.top + rect.height / 2 - actions.offsetHeight / 2) + "px";
}


document.getElementById("FullImage").addEventListener("load", function (){
    positionLightboxActions();
});


window.addEventListener("resize", positionLightboxActions);

let slideshowInterval = null;
let isPlaying = false;




function toggleSlideshow(){
    let slideshowBtn = document.getElementById('slideshome-btn') || document.getElementById('slideshow-btn');
    
    if(!isPlaying){
        if (FullImageBox.style.display !== "flex" && activeImagesArray.length > 0){
            openFullImg(activeImagesArray[0]);
        }
        
        slideshowInterval = setInterval(function(){
            slideImage(1);
        }, 3000);
        
        isPlaying = true;

        if(slideshowBtn) slideshowBtn.innerHTML = "⏸ Stop Slideshow";
    }


    else{
        clearInterval(slideshowInterval);
        isPlaying = false;
        if(slideshowBtn) slideshowBtn.innerHTML = "▶ Slideshow";
    }
}



let originalCloseFullImg = closeFullImg;
closeFullImg = function(){
    if(isPlaying){
        clearInterval(slideshowInterval);
        isPlaying = false;
        let slideshowBtn = document.getElementById('slideshome-btn') || document.getElementById('slideshow-btn');
        if(slideshowBtn) slideshowBtn.innerHTML = "▶ Slideshow";
    }

    originalCloseFullImg();
};




function toggleTheme(){
    document.body.classList.toggle('light-mode');
}



function searchImages(){
    let searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    let query = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.gallery-item');
    currentMode = 'gallery';

    items.forEach(item => {
        let img = item.querySelector('img');
        if(img){
            let cleanSrc = getCleanSrc(img.getAttribute('src')).toLowerCase();
            let category = (item.getAttribute('data-category') || "").toLowerCase();
            let inRecycle = recycleBin.some(rec => getCleanSrc(rec) === cleanSrc);

            let matchesQuery = cleanSrc.includes(query) || category.includes(query);

            if(!inRecycle && matchesQuery){
                item.style.display = "block";
            }


            else {
                item.style.display = "none";
            }
        }
    });
}




function toggleFullScreen(){
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    }

    else{
        if(document.exitFullscreen){
            document.exitFullscreen();
        }
    }
}