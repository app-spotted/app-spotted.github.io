function getPostId(){
    url = document.URL.split('#');

    if(url.length < 2){
       window.location.replace("/");   
    }

    postId = url[1];

    return postId;
}

function updateMeta(){
    var meta = document.createElement('meta');
    meta.setAttribute('property',"og:image");
    meta.content = "/img/"+ getPostId() + ".png";
    document.getElementsByTagName('head')[0].appendChild(meta);
    setPostImage(document.getElementById('postImage'));
}

function setPostImage(element){
    element.src = "/img/"+ getPostId() + ".png";
}