updateMeta();

function getPostId() {
  url = document.URL.split("#");

  if (url.length < 2) {
    window.location.replace("/");
  }

  postId = url[1];

  return postId;
}

function checkFileExist(url) {
var http = new XMLHttpRequest(); 
  http.open("HEAD", url, false);
  http.send();
  if (http.status === 200) {
    return true;
  } else {
    return false;
  }
}

function setPostImage() {
  var img = "/img/" + getPostId() + ".png";

  photoCanvas = document.getElementById("postImage");

  if(checkFileExist(img)){
    photoCanvas.src = "/img/" + getPostId() + ".png";
  }else{
    photoCanvas.src = "/img/postNotFound.png";
  }
}
