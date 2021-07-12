const requestURL = "https://raw.githubusercontent.com/isaac1125/BoardgameInfoWeb/master/list.json";
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    let BoardgameInfo = request.response;
    listRender(BoardgameInfo);
}

let list = document.querySelector('.list');

function listRender(jsonObj) {
    let boardgame = jsonObj;
    listStr = ' ';
    for (i = 0; i < boardgame.list.length; i++) {
        let name = boardgame.list[i].boardgameName[0].name;
        listStr += `<option value="${name}" class="op">${name}</option>`
    }
    list.innerHTML = listStr;
}

const search = document.querySelector('.search');

list.addEventListener('change', function (e) {
    let select = e.target.value;
    console.log("click");
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        let boardgameInfo = request.response;
        console.log("onload?")
        for (i = 1; i < boardgameInfo.list.length; i++) {
            let name = boardgameInfo.list[i].boardgameName[0].name;
            if (name == select) {
                console.log("bingo");
                print(boardgameInfo);
            }
        }
    }
})
function print(boardgameInfo) {

    console.log(i);

    document.querySelector('h1').textContent = boardgameInfo.list[i].boardgameName[0].name;
    document.querySelector('h2').textContent = boardgameInfo.list[i].boardgameName[1].name;

    let tagsStr = "";
    boardgameInfo.list[i].tags.forEach(function (item) {
        tagsStr += `<li>${item}</li>`
    });
    document.querySelector('.tags').innerHTML = tagsStr;

    let maxPlayers = boardgameInfo.list[i].maxPlayers;
    let minPlayers = boardgameInfo.list[i].minPlayers;
    document.querySelector('.playerNum').innerHTML = `人數：${minPlayers}~${maxPlayers}`;
}