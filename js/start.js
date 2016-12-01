mobileMenu();
LoadTopBagData();
stickyMenuSize();
prepeareTabletSearch();
mainMenuActiveColor();
carouselDrive();
sliderAnime();
changeTopic();
bannerFlash();
prepeareForMobile();
toCatalog();
window.addEventListener("resize", changeDownMenu, false);
window.addEventListener("resize",stickyMenuSize, false);
window.addEventListener("resize",carouselOnResize, false);
window.addEventListener("resize",changeTopic, false);

/* CHANGE TOPIC ON RESIZE */ 
function changeTopic() {
    var topic = document.body.querySelector(".logo_tm a");
    if (document.body.clientWidth < 480) {
        if(topic.innerHTML != "TL")
            topic.innerHTML = "TL";
    }
    else {
        if (topic.innerHTML != "Template")
            topic.innerHTML = "Template";
    }
        
}

/* GO TO CATALOG */
function toCatalog() {
    var button = document.body.querySelector(".allArrivals");
    button.onclick = function () {
        location.href = "catalog.html";
    }
}

/*FIX MAIN MENU SIZE */ 
function stickyMenuSize() {
    if(document.body.clientWidth < 480) {
        document.body.querySelector(".stickyHeader").style.width = getComputedStyle(document.body.querySelector("header")).width;
    }
}

/* CHANGE DOWN MENU ON RESIZE */
function changeDownMenu () {
    if (document.body.clientWidth < 480) {
        if (document.body.querySelector(".down").firstElementChild != document.body.querySelector(".downMenu") ) {
            prepeareForMobile();    
        }
    }
    else {
        if (document.body.querySelector(".down").firstElementChild == document.body.querySelector(".downMenu") ) {
            returnFromMobile();    
        }
        
    }
}

/* CHANGE DOWN MENU ON LOAD */
function prepeareForMobile () {
    if (document.body.clientWidth < 480) {
        var downMenu = document.body.querySelector(".downMenu");
        var parent = downMenu.parentElement;
        var social = document.body.querySelectorAll(".social");
        parent.removeChild(downMenu);
        parent.insertBefore(downMenu, parent.firstElementChild);
        var socialParent = social[0].parentElement;
        socialParent.removeChild(social[0]);
        socialParent.removeChild(social[1]);
        var end = document.createElement("div");
        end.className = "socialAround";
        end.appendChild(social[0]);
        end.appendChild(social[1]);
        parent.insertBefore(end, parent.firstElementChild.nextElementSibling);
    }
}

/* CANSEL DOWN MENU ON RESIZE*/
function returnFromMobile() {
    if (document.body.clientWidth >= 480) {
        var down = document.body.querySelector(".down");
        var downMenu = document.body.querySelector(".downMenu");
        var parent = downMenu.parentElement;
        var social = document.body.querySelectorAll(".social");
        var end = document.body.querySelectorAll(".socialAround");
        downMenu.parentElement.removeChild(downMenu);
        down.appendChild(downMenu);
        var linksRight = document.body.querySelector(".linksRight");
        linksRight.appendChild(social[0]);
        linksRight.appendChild(social[1]);
        down.removeChild(down.firstElementChild);
        
    }
}

/* MOBILE MENU SHOW */
function mobileMenu() {
    var btnMainMenu = document.body.querySelector(".mainNav");
    var closeMainMenu = document.body.querySelector(".closeMainMenu");
// mobile menu show
    btnMainMenu.onclick = function (e) {
        if (this === e.target) {
            if (document.body.clientWidth < 480) {
                var closeMainMenu = document.body.querySelector(".closeMainMenu");
                var mainMenu = document.body.querySelector(".mainMenu");
                var searchAround = document.body.querySelector(".searchAround");
                this.style.position = "absolute";
                this.style.width = "100%";
                this.style.zIndex = "3035";
                this.style.background = "none";
                this.style.border = "none";
                this.style.height = "auto";
                this.style.cursor = "auto";
                closeMainMenu.style.display = "block";
                mainMenu.style.display = "block";
                searchAround.style.display = "block";
            }
        }
    }
// mobile menu close
    closeMainMenu.onclick = function () {
        var mainMenu = document.body.querySelector(".mainMenu");
        var searchAround = document.body.querySelector(".searchAround");
        btnMainMenu.style.cssText = "";
        mainMenu.style.display = "none";
        searchAround.style.display = "none";
        this.style.display = "none";
    }
}

/* SEARCH FOR TABLET */
function prepeareTabletSearch() {
    var btnSearch = document.querySelector(".btnSearch");
    var search = document.querySelector(".tabletSearch");
// on focus    
    btnSearch.onclick = function() {
        this.style.display = "none";
        search.removeAttribute("placeholder");
        search.style.width = "100%";
        search.style.left = "0%";
        setTimeout(function() {search.setAttribute("placeholder", "Style Name"); }, 900);
        search.style.paddingRight = "15px";
        search.focus();
    }
// on esc
    search.onblur = function () {
        if (document.body.clientWidth >= 480 && document.body.clientWidth < 1025) {
            this.removeAttribute("placeholder");
            this.value = "";
            search.style.padding = "0px";
            this.style.width = "0px";
            this.style.left = "100%";
            btnSearch.style.display = "block";
        }    
    }
    
    
}

/* MAIN MENU ACTIVE COLOR */
function mainMenuActiveColor() {
    var mainMenu = document.body.querySelectorAll(".mainMenu li a");
    for (var i =0, n = mainMenu.length; i < n; i++) {
        mainMenu[i].onclick = function () {
            for (var j =0, k = mainMenu.length; j < k; j++) {
                mainMenu[j].style.color = "#000";
            }
            this.style.color = "#f14a58";
        }
    }
}

/* CAROUSEL DRIVE */
function carouselDrive() { 
    var pointer = document.body.querySelectorAll(".pointer li .circle");
    for (var i = 0, n = pointer.length; i < n; i++) {
        pointer[i].onclick = function() {
            var carousel = document.body.querySelector(".carousel");
            carousel.style.transition = "all 600ms";
            var pointerList = document.body.querySelectorAll(".circle");
            var key = 0;
            for (var j = 0, k = pointerList.length; j < k; j++) {
// reset background
                pointerList[j].style.backgroundColor = "#d9d9d9";
// find number of point
                if (this === pointerList[j])
                    key = j;
            }
            carousel.style.marginLeft = - key * carousel.clientWidth / 4 + "px";
            if (key == '2') {
                this.style.backgroundColor = "#50c1e9";
            }
            else  
                this.style.backgroundColor = "#f14a58";
        }
    }
}

/* CAROUSEL DRIVE ON RESIZE */
function carouselOnResize() {
    var pointer = document.body.querySelectorAll(".pointer li .circle");
    var key = 0;
    for (var i = 0, n = pointer.length; i < n; i++) {
        if( toHexColor(getComputedStyle(pointer[i]).backgroundColor) != "#d9d9d9") {
            key = i;
            break;
        }
    }
    var carousel = document.body.querySelector(".carousel");
    carousel.style.transition = "none";
    carousel.style.marginLeft = - key * carousel.clientWidth / 4 + "px";
    carousel.style.transition = "";
}

/* COLOR CONVERT */
function toHexColor(color) {
    return color.replace( /rgba?\(([^\)]+)\)|#([a-f0-9]{6}|[a-f0-9]{3})/ig, function( m, rgb, hex ) {
        if ( rgb = /([0-9\.]+)(\%?)\s*,\s*([0-9\.]+)(\%?)\s*,\s*([0-9\.]+)(\%?)\s*(?:,\s*([0-9\.]+))?/g.exec( rgb || "" ) ) {
            hex = parseInt( rgb[2] ? rgb[1] * 2.55 : rgb[1] ).toString( 16 ).replace( /^(.)$/, '0$1' ) +
            parseInt( rgb[4] ? rgb[3] * 2.55 : rgb[3] ).toString( 16 ).replace( /^(.)$/, '0$1' ) +
            parseInt( rgb[6] ? rgb[5] * 2.55 : rgb[5] ).toString( 16 ).replace( /^(.)$/, '0$1' );
            m = rgb[ 7 ] == "" || rgb[ 7 ] === undefined ? 1 : parseFloat( rgb[ 7 ] );
        } 
        else if ( hex && ( m = 1 ) ) {
            hex = hex.replace( /^(.)(.)(.)$/, "$1$1$2$2$3$3" );
        } 
        else {
            return m;
        }
        return "#" + hex;
    });
}

/* ANIMATION IN SLIDER*/
function sliderAnime() {
    var flag = true; 
    var slider1Timer = setInterval(function () {
        var slider1 = document.body.querySelector(".cC2S1TopSlider");
        if (parseInt(getComputedStyle(slider1).marginTop)  > slider1.clientHeight * 1/3) {
            slider1.style.transitionDuration = "0ms"
            slider1.style.marginTop = 0;
        }
        else {

            slider1.style.transitionDuration = "650ms"
            slider1.style.marginTop = parseInt(getComputedStyle(slider1).marginTop) - slider1.clientHeight/3 + "px";
        }
    }, 3000); 
    var slider2Timer = setInterval(function () {
// Part 4 with bags 
        var slider2 = document.body.querySelector(".cC2S1BRight a");
        flag = !flag;
        if (flag == true)
            slider2.style.backgroundImage = 'url("img/start/slide_2/5_1.png")';
        else
            slider2.style.backgroundImage = 'url("img/start/slide_2/5_2.png")'; 
    }, 1000); 

//Slide 2 slider jewels 
    var slider3 = document.body.querySelector(".cC2S2Bottom a");
    slider3.onmouseover = function () {
        var front = document.body.querySelector(".cC2S2BottomFront");
        front.style.top = - front.clientHeight + "px";
    }
    slider3.onmouseout = function () {
        var front = document.body.querySelector(".cC2S2BottomFront");
        front.style.top = "0px";
    }
}

/* BANNER FLASH */
function bannerFlash() {
    var bannerF = document.body.querySelector(".rightBannerTabletF");
    var bannerB = document.body.querySelector(".rightBannerTabletB");
    var flag = false;
    var slider2Timer = setInterval(function () {
        flag = !flag;
        if (flag == true) {
            bannerF.style.display = "none";
            bannerB.style.display = "block";
        }
        else {
            bannerF.style.display = "block";
            bannerB.style.display = "none";
        }
    }, 2000); 
    
}

/* LOAD DATA TO TOP BAG */
function LoadTopBagData() {
    var bag = null;
    if(localStorage.getItem("bag") != null)
    var bag = JSON.parse(localStorage.getItem("bag"));
    var topBag = document.body.querySelector(".bagIn");
    //if bag not empty    
    if (bag != null) {
        var sumQuan = getSummQuant(bag);
        topBag.innerHTML = "Bag &pound; "+sumQuan[0] + " (" +sumQuan[1]+")";
    }
    else {
        topBag.innerHTML = "Bag";
    }
}

/* GET SUMM AND COUNT FOR ITEMS FROM BAG */
function getSummQuant(baggins) {
    var arr = new Array(2);
    arr[0] = 0;
    arr[1] = 0;
    for (var i = 0, n = baggins.length; i < n; i++) {
        arr[0] += +baggins[i].price;    
        arr[1] += +baggins[i].quantity;    
    }
    arr[0]= arr[0].toFixed(2);
    return arr;
} 