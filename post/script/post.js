updateMeta()

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

    var meta = document.createElement('meta');
    meta.setAttribute('property',"og:title");
    meta.content = "See this post - Spotted";
    document.getElementsByTagName('head')[0].appendChild(meta);

    var meta = document.createElement('meta');
    meta.setAttribute('property',"og:description");
    meta.content = "There is a post for you! Download Spotted App";
    document.getElementsByTagName('head')[0].appendChild(meta);
}

function setPostImage(element){
    document.getElementById('postImage').src = "/img/"+ getPostId() + ".png";
}