// Getting device OS to preconfigure the form select menu
document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("deviceOs");
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    console.log('UserAgent: '+ userAgent);
    let deviceType = "other";

    // Using RegEx to find 'android' or 'iphone' on the userAgent
    if (/android/i.test(userAgent)) {
    deviceType = "android";
    } else if (/iPhone|iPad|iPod|Macintosh/i.test(userAgent)) {
        deviceType = "apple";
    }

    // Setting select value accordingly
    if (select) {
    select.value = deviceType;
    }
});