// Created by Laxman Cozzarin

// CONST
const PHONE_SCREEN_W = 1000;        //The width where the animation changes to the phoneAnimation or ComputerAnimation        
const SCALING_RATIO = 105;          //Ratio used to scale the video 
const ROTATION_RATIO = 2;           //Ratio used to rotate the video
const STOP_ANGLE = 90;              //Angle where the phone stops

// DOM ELEMENTS
const spottedTitle = document.getElementById("spotted");        //Spotted title
const vidBackground = document.getElementById("video");         //Video in background
const otherContent = document.getElementById("trova");          //Trova section to show after the animation

// ANIMATION VALUES
var windowY = 0;                //Value that stores the Y offset of the scroll
var rotationAngle = 0;          //Stores the current angle of rotation of the phone

// –––––––––––––––––––––––––––––––––––––

if (screen.width > PHONE_SCREEN_W) window.addEventListener('scroll', computerScrollingAnimation, { passive: true }); 
else window.addEventListener('scroll', mobileScrollingAnimation, { passive: true });

// –––––––––––––––––––––––––––––––––––––

// PHONE ANIMATION: MARGIN TOP AND SCALE + FADINGS
function mobileScrollingAnimation(){
    windowY = window.pageYOffset;
    
    if(windowY > -100 && windowY <= 250){    
        animationPropertySetMobile(); 

        vidBackground.style.marginTop = `${windowY / 0.55}px`;
        spottedTitle.style.opacity = ((100 / windowY)) / 10;
        vidBackground.style.opacity = ((100 / windowY)) / 1;
        otherContent.style.opacity = 0;
        vidBackground.style.opacity = 1; 
    }
    if(windowY >= 230){
        otherContent.style.opacity = 1;
        vidBackground.style.opacity = 0;
    } 
    else spottedTitle.style.opacity = 1;
}
function animationPropertySetMobile(){
    if(windowY/SCALING_RATIO > 1) rotateAndScale(vidBackground, false, true);
    else vidBackground.style.transform = "rotate(0deg) scale(1)";
    vidBackground.play();
}


// –––––––––––––––––––––––––––––––––––––

// COMPUTER ANIMATION: MARGIN TOP, ROTATIONS AND SCALING + FADING
function computerScrollingAnimation(){
    windowY = window.pageYOffset;
    rotationAngle = (windowY - 100) / ROTATION_RATIO;
    
    if(windowY >= -100 && windowY <= getPageYOffesetFromAngle(STOP_ANGLE)){
        if(window.innerHeight >= vidBackground.innerHeight) vidBackground.style.marginTop = `${windowY / 1.31}px`;
        else animationPropertySet();
        
        spottedTitle.style.opacity = (STOP_ANGLE / 100 - rotationAngle / 100);
        vidBackground.style.opacity = 1;
        otherContent.style.opacity = 0;
    }   
    if(windowY >= getPageYOffesetFromAngle(72)){
        otherContent.style.opacity = (rotationAngle / 90 - STOP_ANGLE / 110) ;
        vidBackground.style.opacity = (STOP_ANGLE / 10 - rotationAngle / 90);
    }
    if(windowY > getPageYOffesetFromAngle(STOP_ANGLE)){
        spottedTitle.style.opacity = 0;
        vidBackground.style.opacity = 0; 
    }
}

// RETURNS THE PAGEY WITH THE ANGLE (REVERSE FORMULA)
function getPageYOffesetFromAngle(angle){ return (angle * ROTATION_RATIO) + 100; }

// SET THE PROPERTY FOR THE ANIMATION
function animationPropertySet(){     
    if(rotationAngle >= 0){
        if(windowY / SCALING_RATIO > 1) rotateAndScale(vidBackground, true, true);
        else rotateAndScale(vidBackground, true, false);
    }
    else vidBackground.style.transform = "rotate(0deg) scale(1)";
}

// ROTATE AND SCALES THE ELEMENT
function rotateAndScale(elem, rotate, scale){ 
    windowY = window.pageYOffset;
    if(rotate && scale) elem.style.transform = `rotate(${-rotationAngle}deg) scale(${windowY / SCALING_RATIO})`;
    if(rotate && !scale) elem.style.transform = `rotate(${-rotationAngle}deg)`;
    if(!rotate && scale) elem.style.transform = `scale(${windowY / SCALING_RATIO})`;
}