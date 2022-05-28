import API_URL from "../script/apiUrl";

//Function to get parameters
function getUsername() {
  url = document.URL.split("#");

  if (url.length < 2) {
    window.location.replace("/");
  }

  postId = url[1];

  return postId;
}

/* Geting username parameter */
const username = getUsername();

/* DOM Elements */

// Creating a loader icon to be added to other divs
const loader = document.createElement("i");
loader.className = "fa fa-circle-o-notch fa-spin fa-3x";

/* Profile Div */
const profileDiv = document.getElementById("content");

/* Profile Image */
const profileImg = document.createElement("img");
profileImg.className = "profile-image";

/* Profile Info Div */
const profileInfo = document.createElement("div");
profileInfo.className = "profile-info";

/* Display Name */
const displayName = document.createElement("h2");
displayName.className = "profile-display-name";

/* Username */
const usernameLabel = document.createElement("h3");
usernameLabel.className = "profile-username";

/* Username */
const followers = document.createElement("h3");
followers.className = "profile-followers";

const errorDiv = document.createElement("div");
errorDiv.className = "profile-error";

const loadProfileInfos = () => {
  profileDiv.appendChild(loader);

  let requesrUrl = `${API_URL}/preview/user/${username}`;
  fetch(requesrUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data = data.msg;

      data.profilePictureUrl ? (profileImg.src = data.profilePictureUrl) : "";
      data.username ? (usernameLabel.textContent = "@" + data.username) : "";
      data.displayName ? (displayName.textContent = data.displayName) : "";

      profileInfo.appendChild(displayName);
      profileInfo.appendChild(usernameLabel);

      profileDiv.removeChild(loader);

      profileDiv.appendChild(profileImg);
      profileDiv.appendChild(profileInfo);
    })
    .catch((error) => {
      console.error(error);
      profileDiv.removeChild(loader);
      errorDiv.innerHTML = "<h2>Username not found!</h2>";
      profileDiv.appendChild(errorDiv);
    });
};

/* On page load i create the elements for the profile */
document.addEventListener("onload", loadProfileInfos());
