let input = document.querySelector(".input");
let body = document.querySelector("body");
input.addEventListener("click", function (e) {
  removeModalContainer();
  //opening the post modal
  let modal = `
        <div class="modalContainer">
        <div class="modal">
            <div class="headingContainer">
                <span class="heading">Create Post</span>
                <span class="material-icons close" >
                    cancel
                    </span>
            </div>
            <div class="ProfileContainer">
                <img class="ProfilePic" src = './mustafa-chahwala-jvSTl5SCPUs-unsplash.jpg'/>
                <span class="ProfileName">Elena Gilbert</span>
                    
                    
            </div>
            <div class="PostDataContainer">
                <div class="PostData" contenteditable="true"></div>
            </div>
            <span class="material-icons gif" style="font-size:45px;">gif_box</span>
    
            <button class="postBtn">Post</button>
        </div>
    </div>
        `;
  let modalContainer = document.createElement("div");
  modalContainer.classList.add("modalContainer");
  modalContainer.innerHTML = modal;
  body.appendChild(modalContainer);

  var postdiv = document.querySelector('.PostData');
setTimeout(function() {
    postdiv.focus();
}, 0);


  //gif modal open
 
  let gifbtn = modalContainer.querySelector(".gif");

  gifbtn.addEventListener("click", function () {
    let div = document.createElement("div");
    div.classList.add("gifModal");

    div.innerHTML = `<div class="gifContainer">
    <div class="headingContainer">
            <span class="heading">Choose GIF</span>
            <span class="material-icons close gifclose" >
                cancel
                </span>
        </div>
        <span class="material-icons searchIcon ">search</span>
        <input class="gifInputSearch input" type="text" />
        <div class="container">
           
        </div>
        </div>`;
    body.appendChild(div);

    let container = div.querySelector(".container");
    let input = div.querySelector(".gifInputSearch");


    input.addEventListener("keyup", function (e) {
      let query = e.target.value;
      var url =
        "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + query;
      var GiphyAJAXCall = new XMLHttpRequest();
      GiphyAJAXCall.open("GET", url);
      GiphyAJAXCall.send();

      GiphyAJAXCall.addEventListener("load", function (data) {
        var actualData = data.target.response;
        response = JSON.parse(actualData);

        var images = response.data;
        container.innerHTML = "";

        // Loop through data array and add IMG html
        images.forEach(function (image) {
          // Find image src
          var src = image.images.fixed_height.url;

          // Concatenate a new IMG tag
          container.innerHTML +=
            "<img src='" + src + "' class='container-image' />";
          let imgs = document.querySelectorAll(".container-image");
        
          //add click listener to imgs
          for (let img of imgs) {
            img.addEventListener("click", function () {
              console.log("clicked");
              let gifModal = document.querySelector(".gifModal");
              body.removeChild(gifModal);

              //add clicked gif to the post
              let postDataContainer =
                document.querySelector(".PostDataContainer");
              postDataContainer.appendChild(img);
            });
          }
        });
      });
    });

    //gif close button
    let gifclosebtn = document.querySelector(".gifclose");
    gifclosebtn.addEventListener("click", function () {
      let gifModal = document.querySelector(".gifModal");
      body.removeChild(gifModal);
    });
  });


  //post Button Add comment to Home Page
  let postbtn = modalContainer.querySelector(".postBtn");
  postbtn.addEventListener("click", function () {
    let commentdiv = document.createElement("div");
    let text = document.querySelector(".PostDataContainer").innerHTML;
    console.log(text);
    commentdiv.classList.add("commentContainer");

    commentdiv.innerHTML += text;

    body.appendChild(commentdiv);
    removeModalContainer();
  });

  //closing the modal

  let closebtn = modalContainer.querySelector(".close");

  closebtn.addEventListener("click", function () {
    removeModalContainer();
  });
});



const removeModalContainer = () => {
  let modalContainer = document.querySelector(".modalContainer");
  if (modalContainer) {
    body.removeChild(modalContainer);
  }
};
