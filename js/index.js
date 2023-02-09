// localStorage.clear();
var search = $("#search-movie");
var lastSearch = localStorage.getItem("lastname");
var zmap;
var body = $("body");
var search_page=true;
// to display favorite movies
$("body").delegate("#favourites", "click", function (event) {
  displayfavorites();
});
// to delete favourites from
body.delegate(".remove-fav-favpage", "click", function (event) {
  event.preventDefault();
  console.log(event.target.getAttribute("s"));
  delete zmap[`${event.target.getAttribute("s")}`];
  localStorage.zmap = JSON.stringify(zmap);
  console.log(`#${event.target.getAttribute("s")}`)
  $(`#${event.target.getAttribute("s")}`).remove();
});
// add movie to favourites
$("div").delegate(".add-to-fav", "click", function (event) {
  event.preventDefault();
  console.log(event.target.getAttribute("s"));
  console.log(event.target.tagName);
  zmap[`${event.target.getAttribute("s")}`] = 1;
  localStorage.zmap = JSON.stringify(zmap);
  if(search_page)
  {
    event.target.className="remove-fav fa-solid fa-heart";
      event.target.style="color:red;font-size:25px";
  }
  else{
    console.log(event.target)
      event.target.className="remove-fav fa-solid fa-heart";
      event.target.style="color:red;font-size:25px";
  }
});
$("div").delegate(".remove-fav", "click", function (event) {
  event.preventDefault();
  console.log(event.target.getAttribute("s"));
  delete zmap[`${event.target.getAttribute("s")}`];
  localStorage.zmap = JSON.stringify(zmap);
  if(search_page)
  {
    event.target.className="add-to-fav fa-regular fa-heart";
    event.target.style="color:white;font-size:25px";
  }
  else{
    event.target.className="add-to-fav fa-regular fa-heart";
    event.target.style="color:white;font-size:25px";
  }
});
// to restore back from basic display of info of movie on hover on movie name
$("body").delegate(".open-detail", "mouseleave", function (event) {
  console.log(event.target.getAttribute("s"));
  var imgwidth;
  var imgheight;
  imgwidth = $("#poster-display").width();
  imgheight = $("#poster-display").height();
  console.log(imgwidth + "   " + imgheight);
  let k = 0.72;
  for (let i = 0; i < 24; i++) {
    setTimeout(async () => {
      k -= 0.03;
      console.log("hello");
      $("#poster-display").css("width", `${imgwidth * k}px`);
      $("#poster-display").css("height", `${imgheight * k}px`);
      $("#container").css("padding", `${5.5 * k}vh`);
      $("#details-container").css("font-size", `${5 * k}vh`);
    }, 10 * i);
  }
});
// to show movie info, when you hover on the movie name
$("body").delegate(".open-detail", "mouseenter", function (event) {
  console.log(event.target.getAttribute("s"));
  $.ajax({
    url: `https://www.omdbapi.com/?i=${event.target.getAttribute("s")}&plot=full&apikey=b893eb1`,
    type: 'get',
    beforeSend: function(){
      $("#loading").css("display",'block');
      $("#nav-bar").css("margin-bottom",'0px');
    },
    success: function(data){
      $("#poster-display").attr("src", `${data.Poster}`);
      var tmpImg = new Image();
      var imgwidth;
      var imgheight;
      tmpImg.src = `${data.Poster}`;
      if (data.Poster == "N/A") {
        $("#poster-display").attr(
          "src",
          `https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png`
        );
        tmpImg.src = `https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png`;
      }
      $("#Metascore").html(`Metascore: ${data.Metascore}`);
      $("#imdbRating").html(`imdbRating: ${data.imdbRating}`);
      $(tmpImg).one("load", function () {
        imgwidth = tmpImg.width;
        imgheight = tmpImg.height;
        console.log(imgwidth + "   " + imgheight);
        let k = 0;
        for (let i = 0; i < 24; i++) {
          setTimeout(async () => {
            k += 0.03;
            console.log("hello");
            $("#poster-display").css("width", `${imgwidth * k}px`);
            $("#poster-display").css("height", `${imgheight * k}px`);
            $("#container").css("padding", `${5.5 * k}vh`);
            $("#details-container").css("font-size", `${5 * k}vh`);
          }, 10 * i);
        }
      })
    },
    complete:function(data){
     $("#loading").css("display",'none');
     $("#nav-bar").css("margin-bottom",'3px');
    }
   }); 
});
$("body").delegate("#back-search", "click", function (event) {
  event.preventDefault();
  search_page=true;
  $("#do-the-change").html(`
  <div id="main"class="column-flex">
        <form action="" >
          <div id="nav-bar">
            <div><img src="assests/logo.png" alt="" width="80vw"></div>
            <div style="display: flex">
              <input type="text" placeholder="movie" value="" id="search-movie" />
              <button type="submit" id="search-btn">Search</button>
            </div>
            <button id="favourites">Fav Movies</button>
          </div>
        </form>
        <div id="loading"></div>
        <div class="row-flex">
          <ul></ul>
          <div id="hover-poster">
            <div id="container">
              <div><img src="" id="poster-display" /></div>
              <div id="details-container">
                <div id="Metascore"></div>
                <div id="imdbRating"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  search = $("#search-movie");
  search.val(lastSearch);
  list();
});

// to open page for details of the movie
$("body").delegate(".open-detail, .picture-list-item", "click", function (event) {
  if (event.target.tagName != "I") {
    console.log(event.target.getAttribute("s"));
    let searchID = event.target.getAttribute("s");
    $.ajax({
      url: `https://www.omdbapi.com/?i=${searchID}&plot=full&apikey=b893eb1`,
      type: 'get',
      beforeSend: function(){
        $("#loading").css("display",'block');
        $("#nav-bar").css("margin-bottom",'0px');
      },
      success: function(data){
        if (data.Plot != undefined) {
          document.getElementById(
            "do-the-change"
          ).innerHTML = `<div id="nav-bar">
        <div><img src="assests/logo.png" alt="" width="80vw" /></div>
        
        <button id="back-search">Back</button>
      </div>
      <div id="loading"></div>
      <div id="show-info">
        <h1>${data.Title}</h1>
        <div id="img-plot">
          <div style="background-color: black">
            <img
              src="${data.Poster}"
              style="height: 50vh; width: 40vh; padding: 5vh"
            />
          </div>
  
          <div id="plot">
            <div>
              <h2>Plot</h2>
              <br />${data.Plot}
            </div>
          </div>
        </div>
        <hr style="width: 98vw" />
        <div style="margin-bottom: 2vh">
          <h3>Year</h3>
          ${data.Year}
        </div>
        <hr style="width: 98vw" />
        <div>
          <h3>Genre</h3>
          <br />${data.Genre}
        </div>
        <hr style="width: 98vw" />
        <div>
          <h3>Director</h3>
          <br />${data.Director}
        </div>
        <hr style="width: 98vw" />
        <div>
          <h3>Language</h3>
          <br />${data.Language}
        </div>
        <hr style="width: 98vw" />
        <div>
          <h3>Country</h3>
          <br />${data.Country}
        </div>
        <hr style="width: 98vw" />
        <div>
          <h3>Awards</h3>
          <br />${data.Awards}
        </div>
        <hr style="width: 98vw" />
      </div>
  
      <div class="" style="display: flex; flex-direction: row">
        <div>
          <h3></h3>
          <br />
        </div>
      </div>`;
        }
      },
      complete:function(data){
       $("#loading").css("display",'none');
       $("#nav-bar").css("margin-bottom",'3px');
      }
     });  
  }
});
// HOME_PAGE
function list() {
  zmap = JSON.parse(localStorage.zmap);
  lastSearch = search.val();
  localStorage.setItem("lastname", `${lastSearch}`);
  lastSearch = localStorage.getItem("lastname");
  search.val(lastSearch);
  $.ajax({
    url:`https://www.omdbapi.com/?s=${lastSearch}&apikey=b893eb1`,
    type:'get',
    beforeSend:function(){
      $("#loading").css("display",'block');
      $("#nav-bar").css("margin-bottom",'0px');
    },
    success:function (data) {
      let opt = data.Search;
      document.getElementsByTagName("ul")[0].innerHTML = "";
      if (opt) {
        for (let o in opt) {
          if (!zmap[`${opt[o].imdbID}`]) {
            $("ul").append(
              `<li s="${opt[o].imdbID}" class="open-detail">
              <span style="margin-left:8px">${opt[o].Title}</span>
              <span style="margin-right:8px;"><i s="${opt[o].imdbID}" class="add-to-fav fa-regular fa-heart" style="color:white;font-size:25px"></i></span></li>
              `
            );
          } else {
            $("ul").append(
              `<li s="${opt[o].imdbID}" class="open-detail">
              <span style="margin-left:8px">${opt[o].Title}</span>
              <span style="margin-right:8px"><i s="${opt[o].imdbID}" class="remove-fav fa-solid fa-heart" style="color:red;font-size:25px"></i></span></li>
              `
            );
          }
        }
      }
    },
    complete:function(data){
      $("#loading").css("display",'none');
      $("#nav-bar").css("margin-bottom",'3px');
    }
  })
}
//for continous update of the movie search list
setInterval(function () {
  if (search.val() == "") {
    $("#poster-display").css("width", `0px`);
    $("#poster-display").css("height", `0px`);
    $("#container").css("padding", `0vh`);
    $("#details-container").css("font-size", `0vh`);
  }
  if (search.val() != lastSearch) {
    list();
  }
}, 100);
//home page load
function backWallpaper() {
  var wall = $("#background-wallpaper");
  document.getElementById("background-wallpaper").innerHTML = "";
  for (let i = 0; i < 220; i++) {
    wall.append(
      `<img class="card-overlay"onerror='this.style.display = "none"' src="https://randommer.io/images/movies/${
        Math.floor(Math.random() * (1500 - 13 + 1)) + 13
      }.webp" alt="hi">`
    );
  }
}
//window loader, on very first opening of website
window.onload = function () {
  search.val(lastSearch);
  if (localStorage.zmap == undefined) {
    localStorage.zmap = "{}";
  }
  backWallpaper();
  list();
};
//search button caller
$("body").delegate("#search-btn", "click", function (event) {
  event.preventDefault();
  search_page=false;
  display_poster_list();
});
// display poster list on clicking search button
function display_poster_list() {
  zmap = JSON.parse(localStorage.zmap);
  lastSearch = search.val();
  localStorage.setItem("lastname", `${lastSearch}`);
  lastSearch = localStorage.getItem("lastname");
  search.val(lastSearch);
  document.getElementById("do-the-change").innerHTML = "";
      document.getElementById("do-the-change").innerHTML = `<div id="nav-bar">
      <div><img src="assests/logo.png" alt="" width="80vw" /></div>
      
      <button id="back-search">Back</button>
    </div><div id="loading"></div><div id='list-view'></div>`;
    $.ajax({
      url: `https://www.omdbapi.com/?s=${lastSearch}&apikey=b893eb1`,
      type: 'get',
      beforeSend: function(){
        $("#loading").css("display",'block');
        $("#nav-bar").css("margin-bottom",'0px');
      },
      success: function(data){
        let opt = data.Search;
      
        if (opt) {
          for (let o in opt) {
            if (!zmap[`${opt[o].imdbID}`]) {
              $("#list-view").append(
                `<div s="${opt[o].imdbID}" class=" picture-list-item">
                <img src='${opt[o].Poster}' s="${opt[o].imdbID}" class="">
                <span style="margin-left:8px" s="${opt[o].imdbID}"class="">${opt[o].Title}</span>
                <span style="margin-right:8px;">
                <i s="${opt[o].imdbID}" s="${opt[o].imdbID}"class="add-to-fav fa-regular fa-heart" style="color:white;font-size:25px">
                </i>
                </span>
                </div>
                `
              );
            } else {
              $("#list-view").append(
                `<div s="${opt[o].imdbID}" class=" picture-list-item">
                <img src='${opt[o].Poster}' s="${opt[o].imdbID}" style="width:19vw;
                height: 50vh;">
                <span style="margin-left:8px" s="${opt[o].imdbID}" >${opt[o].Title}</span>
                <span style="margin-right:8px"><i s="${opt[o].imdbID}" class="remove-fav fa-solid fa-heart" style="color:red;font-size:25px"></i></span>
                </div>
                `
              );
            }
          }
        }
      },
      complete:function(data){
       $("#loading").css("display",'none');
       $("#nav-bar").css("margin-bottom",'3px');
      }
     }); 
}
//function to display favourites
function displayfavorites() {
  document.getElementById("do-the-change").innerHTML = "";
      document.getElementById("do-the-change").innerHTML = `<div id="nav-bar">
      <div><img src="assests/logo.png" alt="" width="80vw" /></div>
      <div><h1>FAVORITES</h1></div>
      <button id="back-search">Back</button>
      
    </div><div id="loading"></div><div id='list-view'></div>
    `;
    for (const key in zmap) {
      $.ajax({
        url: `https://www.omdbapi.com/?i=${key}&apikey=b893eb1`,
        type: 'get',
        beforeSend: function(){
          $("#loading").css("display",'block');
          $("#nav-bar").css("margin-bottom",'0px');
        },
        success: function(data){
          $("#list-view").append(
            `<div s="${data.imdbID}" id="${data.imdbID}" class="picture-list-item">
            <img src='${data.Poster}' s="${data.imdbID}" class="">
            <span style="margin-left:8px" s="${data.imdbID}"class="">${data.Title}</span>
            <span style="margin-right:8px;">
            <i s="${data.imdbID}" s="${data.imdbID}"class="remove-fav-favpage fa-solid fa-heart" style="color:red;font-size:25px">
            </i>
            </span>
            </div>
            `
          );
        },
        complete:function(data){
         $("#loading").css("display",'none');
         $("#nav-bar").css("margin-bottom",'3px');
        }
       }); 
    }
}