
var mouseDown = 0;
document.body.onmousedown = function() {
    ++mouseDown;
}
document.body.onmouseup = function() {
    --mouseDown;
}
document.querySelector("#enter").onclick = function enter(){
    var response = prompt("Введите логин", "");
    var message;
    if (response == "Админ") {
        var responseTwo = prompt("Введите пароль", "");
        if(responseTwo == "Я главный") { message = "Здравствуйте!"; }
        else if(responseTwo = null) { message = "Отменено"; }
        else { message = "Неверный пароль"; }
    } else if (response == null ){ message = "Отменено"; }
    else{ message = "Я вас не знаю"; }
    alert(message);
}


let footerLink = document.querySelector(".footerOtherDescription")
footerLink.onclick = function(event) {
    function handleLink() {
        let isLeaving = confirm(`Покинуть страницу?`);
        if (!isLeaving) return false;
    }
    let target = event.target.closest('a');
    if (target && footerLink.contains(target)) {
        return handleLink();
    }
};

let thumbs = document.querySelector("#thumbs")
let largeImg = document.querySelector("#largeImg")
thumbs.onclick = function(event) {
    let thumbnail = event.target.closest('a');
    if (!thumbnail) return;
    showThumbnail(thumbnail.href);
    event.preventDefault();
}

function showThumbnail(href) {
    largeImg.src = href;
}

let currentDroppable = null;
let carItems = document.querySelector("#carItems")

carItems.onmousedown = function(event) {
    let carItem = event.target.closest('li');
    let shiftX = event.clientX - carItem.getBoundingClientRect().left;
    let shiftY = event.clientY - carItem.getBoundingClientRect().top;
    carItem.style.position = 'absolute';
    carItem.style.zIndex = 1;
    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
        carItem.style.left = pageX - shiftX + 'px';
        carItem.style.top = pageY - shiftY + 'px';
    }
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        carItem.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        carItem.hidden = false;
        if (!elemBelow) return;
        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
            currentDroppable = droppableBelow;
            if (currentDroppable) {
                if(!carItem)
                    return;
                enterDroppable(carItem);
            }
        }
    }
    document.addEventListener('mousemove', onMouseMove);
    carItem.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        carItem.onmouseup = null;
    };
};
let addsSum = document.querySelector(".addsSum");
let priceSum = 0;
function enterDroppable(carItem) {
    if(!mouseDown){
        return;
    }
    carItem.remove();
    let price = Number(carItem.querySelector(".price").innerHTML);
    priceSum += price;
    addsSum.innerHTML = `Сумма: ${priceSum}`;
    price = 0;
}
carItems.ondragstart = function() {
    return false;
};