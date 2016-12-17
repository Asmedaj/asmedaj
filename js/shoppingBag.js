LoadTopBagData();
mobileMenu();
loadDataFromBag();
prepeareTabletSearch();
mainMenuActiveColor();
buyNow();
clearBag();
goParentPage(); 
stickyMenuSize();
prepeareForMobile();
window.addEventListener("resize",stickyMenuSize, false);
window.addEventListener("resize",changeTopic, false);
window.addEventListener("resize", changeDownMenu, false);
changeTopic();
/* CHANGE TOPIC ON RESIZE */ 
function changeTopic() {
    var topic = document.body.querySelector(".logo a");
    if (document.body.clientWidth < 480) {
        if(topic.innerHTML != "TL")
            topic.innerHTML = "TL";
    }
    else {
        if (topic.innerHTML != "Template")
            topic.innerHTML = "Template";
    }
        
}

/*FIX MAIN MENU SIZE */ 
function stickyMenuSize() {
    if(document.body.clientWidth < 480) {
        document.body.querySelector(".sticky-header").style.width = getComputedStyle(document.body.querySelector("header")).width;
    }
}

/* CHANGE DOWN MENU ON RESIZE */
function changeDownMenu () {
    if (document.body.clientWidth < 480) {
        if (document.body.querySelector(".down").firstElementChild != document.body.querySelector(".down__menu") ) {
            prepeareForMobile();    
        }
    }
    else {
        if (document.body.querySelector(".down").firstElementChild == document.body.querySelector(".down__menu") ) {
            returnFromMobile();    
        }
        
    }
}

/* CHANGE DOWN MENU ON LOAD */
function prepeareForMobile () {
    if (document.body.clientWidth < 480) {
        var downMenu = document.body.querySelector(".down__menu");
        var parent = downMenu.parentElement;
        var social = document.body.querySelectorAll(".social");
        parent.removeChild(downMenu);
        parent.insertBefore(downMenu, parent.firstElementChild);
        var socialParent = social[0].parentElement;
        socialParent.removeChild(social[0]);
        socialParent.removeChild(social[1]);
        var end = document.createElement("div");
        end.className = "social-around";
        end.appendChild(social[0]);
        end.appendChild(social[1]);
        parent.insertBefore(end, parent.firstElementChild.nextElementSibling);
    }
}

/* CANSEL DOWN MENU ON RESIZE*/
function returnFromMobile() {
    if (document.body.clientWidth >= 480) {
        var down = document.body.querySelector(".down");
        var downMenu = document.body.querySelector(".down__menu");
        var parent = downMenu.parentElement;
        var social = document.body.querySelectorAll(".social");
        var end = document.body.querySelectorAll(".social-around");
        downMenu.parentElement.removeChild(downMenu);
        down.appendChild(downMenu);
        var linksRight = document.body.querySelector(".links .right");
        linksRight.appendChild(social[0]);
        linksRight.appendChild(social[1]);
        down.removeChild(down.firstElementChild);
        
    }
}


function mobileMenu() {
    var btnMainMenu = document.body.querySelector(".main-nav");
    var closeMainMenu = document.body.querySelector(".close-main-menu");
    var mainMenuWrap = document.body.querySelector(".main-menu__wrap");
// mobile menu show
    btnMainMenu.onclick = function (e) {
        if (this === e.target) {
            if (document.body.clientWidth < 480) {
                this.style.position = "absolute";
                this.style.width = "100%";
                this.style.zIndex = "3035";
                this.style.background = "none";
                this.style.border = "none";
                this.style.height = "auto";
                closeMainMenu.style.display = "block";
                mainMenuWrap.style.display = "block";
                mainMenuWrap.style.height = document.documentElement.clientHeight - 69 + "px";
                mainMenuWrap.style.width = this.clientWidth;
            }
        }
    }
// mobile menu close
    closeMainMenu.onclick = function () {
        btnMainMenu.style.cssText = "";
        mainMenuWrap.style.cssText = "";
        this.style.display = "none";
    }
}

/* SEARCH FOR TABLET */
function prepeareTabletSearch() {
    var btnSearch = document.querySelector(".btn-search");
    var search = document.querySelector(".tablet-search");
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
    var mainMenu = document.body.querySelectorAll(".main-menu li a");
    for (var i =0, n = mainMenu.length; i < n; i++) {
        mainMenu[i].onclick = function () {
            for (var j =0, k = mainMenu.length; j < k; j++) {
                mainMenu[j].style.color = "#000";
            }
            this.style.color = "#f14a58";
        }
    }
}

/* CLEAR BAG */
function clearBag() {
    var btnClearBag = document.body.querySelector(".bag__empty span");
    btnClearBag.onclick = function() {
        localStorage.removeItem("bag");
        var itemConteiner = document.body.querySelector(".conteiner");
        itemConteiner.innerHTML = "";
        itemConteiner.innerHTML = "Your shopping bag is empty. Use Catalog to add new items";
        var topBag = document.body.querySelector(".bag"); 
        topBag.innerHTML = "Bag";
        var downBag = document.body.querySelector(".cost__sum"); 
        downBag.innerHTML = "&pound; 0.00";    
    } 
}

/* BUY NOW */
function buyNow() {
    var btnbuyNow = document.body.querySelector(".buy-now");
    btnbuyNow.onclick = function() {
        localStorage.removeItem("bag");
        var itemConteiner = document.body.querySelector(".conteiner");
        itemConteiner.innerHTML = "";
        itemConteiner.innerHTML = "Thank you for your purchase";
        var topBag = document.body.querySelector(".bag"); 
        topBag.innerHTML = "Bag";
        var downBag = document.body.querySelector(".cost__sum"); 
        downBag.innerHTML = "&pound; 0.00";    
    }
}

/* REMOVE ITEM */ 
function RemoveItemF() {
// get item options    
    var item = this.parentElement.parentElement;
    var name = item.lastElementChild.firstElementChild;
    var color = name.nextElementSibling;
    var size = color.nextElementSibling;
// get bag
    var bag = JSON.parse(localStorage.getItem("bag"));
// remove item
    for (var i =0, n = bag.length; i < n; i++) {
        if (name.innerHTML == bag[i].name && color.innerHTML.substring(7) == bag[i].color && size.innerHTML.substring(6) == bag[i].size) {
// if quantity == 1
            if (bag[i].quantity == "1") {
                bag.splice(i,1);
                var sBag = JSON.stringify(bag);
                localStorage.setItem("bag", sBag);
                var Parent = item.parentElement;
                Parent.removeChild(item);
                break;
            }
// if quantity bigger then 1            
            else {
                bag[i].price = (bag[i].price - bag[i].price/bag[i].quantity).toFixed(2);
                bag[i].quantity = bag[i].quantity - (+1);
                size.nextElementSibling.innerHTML = "Quantity: " + bag[i].quantity;
                var sBag = JSON.stringify(bag);
                localStorage.setItem("bag", sBag);
                break;
            }
        }
        
    }
    if (bag.length == 0) {
        var itemConteiner = document.body.querySelector(".conteiner");
        itemConteiner.innerHTML = "";
        itemConteiner.innerHTML = "Your shopping bag is empty. Use Catalog to add new items";    
    }
    LoadTopBagData();
}

/* LOAD MAIN DATA FROM BAG */
function loadDataFromBag() {
//step 1 - get context
    var itemConteiner = document.body.querySelector(".conteiner");
//step 2 - get data from bag    
    var bag = JSON.parse(localStorage.getItem("bag"));
    if (bag == null) {
//bag is empty
        itemConteiner.innerHTML = "Your shopping bag is empty. Use Catalog to add new items ";
        return 0;
    }
//bag has items    
    if (bag != null) {
        for (var i =0, n = bag.length; i < n; i++) {
// create item            
            var item = document.createElement("div");
            item.className = "item clearfix";
            var itemPreview = document.createElement("div");
//left part
            itemPreview.className = "item__preview";
            var link = document.createElement("a");
            link.href = "item.html";
            var quickView = document.createElement("div");
            quickView.className = "quick-view";
            quickView.innerHTML = "View item"; 
            var img = document.createElement("img");
            img.src = "img/shoppingBag/" + bag[i].src + ".png";
            var itemPrice = document.createElement("div");
            itemPrice.className = "item__price";
            itemPrice.innerHTML = "&pound; " + (bag[i].price/bag[i].quantity).toFixed(2);
            link.appendChild(img);
            link.appendChild(quickView);
            itemPreview.appendChild(link);
            itemPreview.appendChild(itemPrice);
//right part            
            var itemOverview = document.createElement("div");
            itemOverview.className = "item__overview";
            var itemName = document.createElement("div");
            itemName.className = "item__name";
            itemName.innerHTML = bag[i].name;
            var itemColor = document.createElement("div");
            itemColor.className = "item__color";
            itemColor.innerHTML = "Color: " + bag[i].color;
            var itemSize = document.createElement("div");
            itemSize.className = "item__size";
            itemSize.innerHTML = "Size: " + bag[i].size;
            var itemQuantity = document.createElement("div");
            itemQuantity.className = "item__quantity";
            itemQuantity.innerHTML = "Quantity: " + bag[i].quantity;
            var removeItem = document.createElement("div");
            removeItem.className = "item__remove";
            removeItem.innerHTML = "Remove item";
            removeItem.onclick = RemoveItemF;
            itemOverview.appendChild(itemName);
            itemOverview.appendChild(itemColor);
            itemOverview.appendChild(itemSize);
            itemOverview.appendChild(itemQuantity);
            itemOverview.appendChild(removeItem);
// complite all            
            item.appendChild(itemPreview);
            item.appendChild(itemOverview);
            itemConteiner.appendChild(item);
        }
    }
}

/* LOAD DATA TO TOP BAG */
function LoadTopBagData() {
    var bag = JSON.parse(localStorage.getItem("bag"));
    var topBag = document.body.querySelector(".bag");
    var downBag = document.body.querySelector(".cost__sum"); 
    //if bag not empty    
    if (bag != null) {
        var sumQuan = getSummQuant(bag);
        topBag.innerHTML = "Bag &pound; "+sumQuan[0] + " (" +sumQuan[1]+")";
        downBag.innerHTML = "&pound; " + sumQuan[0];
    }
    else {
        topBag.innerHTML = "Bag";
        downBag.innerHTML = "&pound; 0.00";
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

/* GO TO PARENT PAGE */
function goParentPage () {
    var imgList = document.body.querySelectorAll(".itemPreview img");
    for (var i = 0, n = imgList.length; i < n; i++) {
        imgList[i].onclick = function () {
            var path = this.src.substr(0, this.src.length - 3);
            path = path.substr(path.lastIndexOf("/")+1);
            location.href = path + "html";
        }    
    }
}