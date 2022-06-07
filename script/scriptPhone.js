// Created by Laxman Cozzarin

// CONST
const PHONE_SCREEN_W = 1000; //The width where the animation changes to the phoneAnimation or ComputerAnimation
const SCALING_RATIO = 105; //Ratio used to scale the video
const ROTATION_RATIO = 2; //Ratio used to rotate the video
const STOP_ANGLE = 90; //Angle where the phone stops

// DOM ELEMENTS
const spottedTitle = document.getElementById("spotted"); //Title
const vidBackground = document.getElementById("video"); //Video in background
const vidDiv = document.getElementById("phoneContainer");

const socialDiv = document.getElementById("social");
const trovalDiv = document.getElementById("trova");

const uniqueValuePropositionDiv = document.getElementById("valueProposition"); //Trova section to show after the animation
const uniqueValuePropositionH1 = document.getElementById("uniqueTitle");
const downloadBtnContainer = document.getElementById("downloadButtons");
const btnAppStore = document.getElementById("appStore");
const btnGoogleStore = document.getElementById("googleStore");

// ANIMATION VALUES
var windowY = 0; //Value that stores the Y offset of the scroll
var rotationAngle = 0; //Stores the current angle of rotation of the phone

// –––––––––––––––––––––––––––––––––––––

// On the window resize flags the function that controls the best animation based on the window inner width
window.addEventListener("resize", setListener);
window.onload = setListener;

// Function to understand what animation has to display based on the window inner width
function setListener() {
  socialDiv.style.opacity = 0;

  if (window.innerWidth > PHONE_SCREEN_W) {
    window.removeEventListener("scroll", mobileScrollingAnimation);
    window.addEventListener("scroll", computerScrollingAnimation, {
      passive: true,
    });

    vidBackground.style.borderRadius = "3vw";
    vidBackground.style.width = "25%";
    vidBackground.style.top = "15vh";

    downloadContainerMarginTop(200);
  } else {
    window.removeEventListener("scroll", computerScrollingAnimation);
    window.addEventListener("scroll", mobileScrollingAnimation, {
      passive: true,
    });

    vidBackground.style.borderRadius = "5vw";
    vidBackground.style.width = "50%";
    vidBackground.style.top = "20.5vh";
    downloadBtnContainer.style.marginTop = 100 + "px";
    downloadBtnContainer.style.opacity = 1;
  }
}

// –––––––––––––––––––––––––––––––––––––

// PHONE ANIMATION: MARGIN TOP AND SCALE + FADINGS
function mobileScrollingAnimation() {
  windowY = window.pageYOffset;
  downloadBtnContainer.style.display = "block";
  downloadBtnContainer.style =
    "display: flex; align-items: center; flex-direction: column";
  socialDiv.style.marginTop = vidBackground.offsetHeight + 700 + "px";
  uniqueValuePropositionDiv.style.opacity = 0;
  downloadBtnContainer.style.marginTop = 50 + "px";

  if (windowY > -100 && windowY <= 250) {
    animationPropertySetMobile();
    vidBackground.style.marginTop = `${windowY * 1.2}px`;
    vidBackground.style.clipPath = "none";
    socialDiv.style.opacity = 0;
  }
  if (windowY > 250) {
    uniqueValuePropositionDiv.style.opacity =
      1 - (windowY - 250) / vidBackground.offsetHeight;
    downloadBtnContainer.style.display = "none";

    vidBackground.style.clipPath = "inset(15px 5px)";
    vidBackground.style.transform = `scale(${230 / SCALING_RATIO}`;

    socialDiv.style.opacity = 1;
  }

  if (1 - (windowY - 250) / vidBackground.offsetHeight <= 0)
    uniqueValuePropositionDiv.display = "none";
  else uniqueValuePropositionDiv.display = "block";
}

function animationPropertySetMobile() {
  if (windowY / SCALING_RATIO > 1) {
    rotateAndScale(vidBackground, false, true);
    rotateAndScale(downloadBtnContainer, false, true);
  } else {
    vidBackground.style.transform = "scale(1)";
    downloadBtnContainer.style.transform = "scale(1)";
  }
  vidBackground.play();
}

// –––––––––––––––––––––––––––––––––––––

// COMPUTER ANIMATION: MARGIN TOP, ROTATIONS AND SCALING + FADING
function computerScrollingAnimation() {
  windowY = window.pageYOffset;
  rotationAngle = (windowY - 100) / ROTATION_RATIO;
  downloadBtnContainer.style.opacity = 1 - windowY / SCALING_RATIO;
  vidBackground.style.clipPath = "none";
  if (windowY >= -100 && windowY <= getPageYOffesetFromAngle(STOP_ANGLE)) {
    vidBackground.style.marginTop = `${windowY}px`;
    downloadContainerMarginTop(200);
    animationPropertySet();
    uniqueValuePropositionDiv.style.display = "none";
    socialDiv.style.opacity = 0;
  }
  if (windowY >= getPageYOffesetFromAngle(72)) {
    if (
      1 -
        (windowY - getPageYOffesetFromAngle(STOP_ANGLE)) /
          getPageYOffesetFromAngle(STOP_ANGLE) <=
      0
    )
      uniqueValuePropositionDiv.style.display = "none";
    else uniqueValuePropositionDiv.style.display = "block";

    uniqueValuePropositionDiv.style.opacity =
      1 -
      (windowY - getPageYOffesetFromAngle(STOP_ANGLE)) /
        getPageYOffesetFromAngle(STOP_ANGLE);
    vidBackground.style.opacity = STOP_ANGLE / 10 - rotationAngle / 90;
  }
  if (windowY > getPageYOffesetFromAngle(STOP_ANGLE)) {
    vidBackground.style.transform = `rotate(${-90}deg) scale(${
      getPageYOffesetFromAngle(STOP_ANGLE) / SCALING_RATIO
    })`;
    socialDiv.style.opacity = 1;
    socialDiv.style.marginTop = vidBackground.offsetHeight * 1.2 + "px";
    vidBackground.style.marginTop = getPageYOffesetFromAngle(90) + "px";
    vidBackground.style.clipPath = "inset(0px 20px)";
  }
}

function downloadContainerMarginTop(offset) {
  downloadBtnContainer.style.marginTop = `${
    windowY - vidBackground.offsetHeight + offset
  }px`;
}

// RETURNS THE PAGEY WITH THE ANGLE (REVERSE FORMULA)
function getPageYOffesetFromAngle(angle) {
  return angle * ROTATION_RATIO + 100;
}

// SET THE PROPERTY FOR THE ANIMATION
function animationPropertySet() {
  if (rotationAngle >= 0) {
    if (windowY / SCALING_RATIO > 1) rotateAndScale(vidBackground, true, true);
    else rotateAndScale(vidBackground, true, false);
  } else vidBackground.style.transform = "rotate(0deg) scale(1)";
}

// ROTATE AND SCALES THE ELEMENT
function rotateAndScale(elem, rotate, scale) {
  windowY = window.pageYOffset;
  if (rotate && scale)
    elem.style.transform = `rotate(${-rotationAngle}deg) scale(${
      windowY / SCALING_RATIO
    })`;
  if (rotate && !scale) elem.style.transform = `rotate(${-rotationAngle}deg)`;
  if (!rotate && scale)
    elem.style.transform = `scale(${windowY / SCALING_RATIO})`;
}
