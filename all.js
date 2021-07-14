const requestURL = "https://raw.githubusercontent.com/isaac1125/BoardgameInfoWeb/master/list.json";
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    let BoardgameInfo = request.response;
    listRender(BoardgameInfo);
}

const list = document.querySelector('.list');
const sleeves = document.querySelector('.sleeves');

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
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        let boardgameInfo = request.response;
        for (i = 1; i < boardgameInfo.list.length; i++) {
            let name = boardgameInfo.list[i].boardgameName[0].name;
            if (name == select) {
                print(boardgameInfo);
            }
        }
    }
})
function print(boardgameInfo) {
    let boardgame = boardgameInfo.list[i];





    console.log(boardgame);

    document.querySelector('.heading__primary').textContent = boardgame.boardgameName[0].name;
    document.querySelector('.heading__sub').textContent = boardgame.boardgameName[1].name;



    let tagsStr = "";
    boardgame.tags.forEach(function (item) {
        tagsStr += `<li>${item}</li>`
    });
    document.querySelector('.tags').innerHTML = tagsStr;

    document.querySelector('.playerNum').innerHTML = `人數：${boardgame.minPlayers}~${boardgame.maxPlayers}`;
    document.querySelector('.price').textContent = `售價：${boardgame.price}元`;
    document.querySelector('.weight').innerHTML = `<p>難度：${boardgame.bggWeight}/5 <br>(參考<a target="_blank" href="${boardgame.bggSite}">BoardGameGeek</a>)</p>`;


    if (boardgame.cardSleeves.cardNums == 0) {
        sleeves.textContent = `不須牌套`;
        return;
    }
    else if (boardgame.cardSleeves.normalSize == boardgame.cardSleeves.fitSize) {
        sleeves.textContent = `牌套尺寸：${boardgame.cardSleeves.normalSize}(${boardgame.cardSleeves.cardNums}張)`;
    } else {
        sleeves.innerHTML = `<p>牌套尺寸：${boardgame.cardSleeves.normalSize}(${boardgame.cardSleeves.cardNums}張) <br>貼合尺寸：${boardgame.cardSleeves.fitSize}(${boardgame.cardSleeves.cardNums}張)</p>`;
    }

    document.querySelector('.publisher').textContent = `台灣代理商：${boardgame.publisherTW}`;
    document.querySelector('.publishYear').textContent = `出版年份：${boardgame.publishYear}`;
    let designersStr = "";
    boardgame.designer.forEach(function (item) {
        designersStr += `<p>${item}</p>`;
    })
    document.querySelector('.designer').innerHTML = `作者：${designersStr}`;
    let artistsStr = "";
    boardgame.artist.forEach(function (item) {
        artistsStr += `<p>${item}</p>`;
    })
    document.querySelector('.artist').innerHTML = `美術：${artistsStr}`;

    let salesStr = "";
    boardgame.shopSite.forEach(function (item) {
        salesStr += `<a target="_blank" href="${item.siteURL}">${item.siteName}</a> `;
    })
    document.querySelector('.saleSite').innerHTML = `購買連結：${salesStr}`;
    let playsStr = "";
    boardgame.playStore.forEach(function (item) {
        playsStr += `<a target="_blank" href="${item.storeURL}">${item.storeName}</a> `;
    })
    document.querySelector('.playStore').innerHTML = `這裡玩的到：${playsStr}`;

    let rulesStr = "";
    boardgame.ruleSite.forEach(function (item) {
        rulesStr += `<a target="_blank" href="${item.siteURL}">${item.siteName}</a> `;
    })
    document.querySelector('.ruleSite').innerHTML = `規則連結：${rulesStr}`;
}