// Created by Laxman Cozzarin

// CONST
const PHONE_SCREEN_W = 1000;                                    //The width where the animation changes to the phoneAnimation or ComputerAnimation        
const SCALING_RATIO = 105;                                      //Ratio used to scale the video 
const ROTATION_RATIO = 2;                                       //Ratio used to rotate the video
const STOP_ANGLE = 90;                                          //Angle where the phone stops

// DOM ELEMENTS
const spottedTitle = document.getElementById("spotted");        //Title
const vidBackground = document.getElementById("video");         //Video in background
const vidDiv = document.getElementById("phoneContainer");

const trovaDiv = document.getElementById("trova");

const uniqueValuePropositionDiv = document.getElementById("valueProposition");          //Trova section to show after the animation
const uniqueValuePropositionH1 = document.getElementById("uniqueTitle")
const downloadBtnContainer = document.getElementById("downloadButtons");
const btnAppStore = document.getElementById("appStore");
const btnGoogleStore = document.getElementById("googleStore");


// ANIMATION VALUES
var windowY = 0;                //Value that stores the Y offset of the scroll
var rotationAngle = 0;          //Stores the current angle of rotation of the phone

// –––––––––––––––––––––––––––––––––––––

btnAppStore.style.marginTop = `${(windowY * 1.5) + 50}px`;


// On the window resize flags the function that controls the best animation based on the window inner width
window.addEventListener('resize', setListener);
window.onload = setListener;



// Function to understand what animation has to display based on the window inner width
function setListener(){
    uniqueValuePropositionDiv.style.opacity = 0;
    trovaDiv.style.opacity = 0;
    if(window.innerWidth > PHONE_SCREEN_W){
        window.removeEventListener('scroll', mobileScrollingAnimation)
        window.addEventListener('scroll', computerScrollingAnimation, { passive: true }); 
        vidBackground.style.borderRadius = "4vw";
        downloadBtnContainer.style.opacity = 0;
        
        console.log("scrolling da computer")
    } 
    else{
        window.removeEventListener('scroll', computerScrollingAnimation)
        window.addEventListener('scroll', mobileScrollingAnimation, { passive: true });
        vidBackground.style.borderRadius = "7vw";
        downloadBtnContainer.style.opacity = 1;

        console.log("Scrolling da telefono")
    }
}

// –––––––––––––––––––––––––––––––––––––


// PHONE ANIMATION: MARGIN TOP AND SCALE + FADINGS
function mobileScrollingAnimation(){
    windowY = window.pageYOffset;
    downloadBtnContainer.style.opacity = 1;

    if(windowY > -100 && windowY <= 250){    
        animationPropertySetMobile(); 
        vidBackground.style.marginTop = `${windowY * 1.2}px`;
        btnAppStore.style.marginTop = `${(windowY * 1.2) + 50}px`;

        uniqueValuePropositionDiv.style.opacity = 0;
        uniqueValuePropositionH1.style.opacity = 0;

        downloadBtnContainer.style.opacity = windowY/uniqueValuePropositionDiv * windowY;
        vidBackground.style.clipPath = "none";
        trovaDiv.style.opacity = 0;
    }
    if(windowY > 250){
        uniqueValuePropositionDiv.style.opacity = 1;
        uniqueValuePropositionH1.style.opacity = 1;
        downloadBtnContainer.style.opacity = 0;
        vidBackground.style.clipPath = "inset(50px 5px)";
        vidBackground.style.transform = `scale(${230 / SCALING_RATIO}`;

        uniqueValuePropositionH1.style.bottom= (windowY) / 2 + "px";

        trovaDiv.style.opacity = 1;
        trovaDiv.style.marginTop = vidBackground.offsetHeight * 1.5 + "px"
    } 
}

function animationPropertySetMobile(){
    if(windowY/SCALING_RATIO > 1){
        rotateAndScale(vidBackground, false, true);
        rotateAndScale(btnAppStore, false, true);
        rotateAndScale(btnGoogleStore, false, true);
        
        downloadBtnContainer.style["gap"] =`${(windowY / SCALING_RATIO) * 30}px`;
    }
    else{
        vidBackground.style.transform = "scale(1)";
        btnAppStore.style.transform = "scale(1)";
        btnGoogleStore.style.transform = "scale(1)";
        downloadBtnContainer.style["gap"] = "20px";
    }
    vidBackground.play();
}


// –––––––––––––––––––––––––––––––––––––

// COMPUTER ANIMATION: MARGIN TOP, ROTATIONS AND SCALING + FADING
function computerScrollingAnimation(){
    windowY = window.pageYOffset;
    rotationAngle = (windowY - 100) / ROTATION_RATIO;
    
    downloadBtnContainer.style.opacity = 0;
    if(windowY >= -100 && windowY <= getPageYOffesetFromAngle(STOP_ANGLE)){
        vidBackground.style.marginTop = `${(windowY/uniqueValuePropositionDiv.clientHeight) * -0.66}px`;
        animationPropertySet();
        uniqueValuePropositionDiv.style.opacity = 0;
        trovaDiv.style.opacity = 0;
    }   
    if(windowY >= getPageYOffesetFromAngle(72)){
        uniqueValuePropositionDiv.style.opacity = (rotationAngle / 90 - STOP_ANGLE / 110) ;
        vidBackground.style.opacity = (STOP_ANGLE / 10 - rotationAngle / 90);
    }
    if(windowY > getPageYOffesetFromAngle(STOP_ANGLE)){
        uniqueValuePropositionH1.style.opacity = 1;
        vidBackground.style.transform = `rotate(${-90}deg) scale(${getPageYOffesetFromAngle(STOP_ANGLE) / SCALING_RATIO})`;
        trovaDiv.style.opacity = 1;
        trovaDiv.style.marginTop = vidBackground.offsetHeight * 2 + "px"

        uniqueValuePropositionH1.style.bottom = (windowY) / 29 + "px";
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