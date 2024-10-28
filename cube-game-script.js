
let player_mode = ".cube"

var rotateY = 0,
    rotateX = 0,
    playerY = 0,
    playerX = 0;

// On/Off Checks
let activeSetsSide = ["left", "left", "left", "left"]

let settingsData = {
    AutoRotateCube: false,
    DisableCubeBorder: false,
    DisableBackgroundMusic: false,
    DisableSfx: false,
    RotateCubeArrow: 4,
    PlayerMoveSpeed: 5,
    PlayerBorderXY: 260,
}

let active_side = "front"

let unlockedSides = {
    "front": true,
    "back": false,
    "left": false,
    "right": false,
    "top": false,
    "bottom": false,
}

function changeSide(from, pos1, pos2) {
    let player = document.querySelector(".player");
    document.querySelector(`.${active_side}`).innerHTML += player.innerHTML;
    // document.querySelector(".player")
}

function rotate() {

    document.onkeydown = function (e) {

        cr = +settingsData.RotateCubeArrow;
        pm = +settingsData.PlayerMoveSpeed;
        pbxy = +settingsData.PlayerBorderXY;

             if (e.keyCode === 37) rotateY -= cr
        else if (e.keyCode === 38) rotateX += cr
        else if (e.keyCode === 39) rotateY += cr
        else if (e.keyCode === 40) rotateX -= cr

             if (e.key == "a") playerX -= pm
        else if (e.key == "d") playerX += pm
        else if (e.key == "w") playerY -= pm
        else if (e.key == "s") playerY += pm

        if (rotateY > 360 && rotateX > 360) rotateY -= 360; rotateX -= 360;
        if (rotateY < -360 && rotateX < -360) rotateY += 360; rotateX += 360;

        if (playerX < 0) {
            if (active_side == "front") {
                if (unlockedSides.left == true) {active_side = "left"; changeSide()}
                else if (unlockedSides.left == false) playerX = 0;
            }
        }
        else if (playerX > pbxy) {
            playerX = pbxy;
        }

        if (playerY < 0) {
            playerY = 0;
        }
        else if (playerY > pbxy) {
            playerY = pbxy;
        }

        document.querySelector(player_mode).style.transform = 
        'rotateY(' + rotateY + 'deg)' +
        'rotateX(' + rotateX + 'deg)';

        document.querySelector(".player").style.left = `${playerX}px`
        document.querySelector(".player").style.top = `${playerY}px`
    }
};

rotate();

let resources = {
    wood: 200,
    iron: 100,
    gold: 100,
    stone: 100,
    money: 2000,
}
let resources_per_sec = {
    wood_sec: 0,
    iron_sec: 0,
    gold_sec: 0,
    stone_sec: 0,
    money_sec: 0,
}

let structures = {
    buildings_cost: {
        mine: {
            wood: 40, iron: 20, stone: 100, gold: 5, money: 30,
        },
        lumberjack: {
            wood: 100, iron: 15, stone: 20, gold: 0, money: 30,
        },
        house: {
            wood: 60, iron: 20, stone: 30, gold: 0, money: 50,
        },
        farm: {
            wood: 100, iron: 30, stone: 15, gold: 0, money: 80,
        },
        office: {
            wood: 20, iron: 100, stone: 20, gold: 0, money: 200,
        },
        shop: {
            wood: 10, iron: 40, stone: 20, gold: 0, money: 100,
        },
    },
    buildings_income: {
        mine: {
            wood: 0, iron: 3, stone: 4, gold: 2, money: 0,
        },
        lumberjack: {
            wood: 4, iron: 0, stone: 0, gold: 0, money: 0,
        },
        house: {
            wood: 0, iron: 0, stone: 0, gold: 0, money: 3,
        },
        farm: {
            wood: 0, iron: 0, stone: 0, gold: 0, money: 10,
        },
        office: {
            wood: 0, iron: 0, stone: 0, gold: 0, money: 20,
        },
        shop: {
            wood: 0, iron: 0, stone: 0, gold: 0, money: 15,
        },
    },
}

// 💵

let shop = [
    [
        [120, 200],
        [240, 460],
        [480, 920],
        [720, 1440],
    ],
    [
        [160, 200],
        [280, 500],
        [560, 960],
        [860, 2000],
    ],
    [
        [140, 220],
        [260, 550],
        [540, 1000],
        [880, 1600],
    ],
    [
        [200, 20],
        [400, 44],
        [800, 92],
        [1200, 120],
    ],
]

let costOfSides = [
    6800,
    3500,
    1200,
    12400,
    20000,
]

let player_buildings = {
    mine: {
        how: 0,
    },
    lumberjack: {
        how: 0,
    },
    house: {
        how: 0,
    },
    farm: {
        how: 0,
    },
    office: {
        how: 0,
    },
    shop: {
        how: 0,
    },
}

let sounds_names = [
    "not-enough-money",
    "buying",
    "build-done",
    "settings-switch",
    "buy-side",
    "bump",
]


let buildings_id = "cells"
let buildings_condition = "none"

function show_menu() {
    if (buildings_condition == "none") {
        document.getElementById(buildings_id).style.display = 'block';
        buildings_condition = "block";
    }
    else if (buildings_condition == "block") {
        document.getElementById(buildings_id).style.display = 'none';
        buildings_condition = "none"
    }
}

let decorations_id = "deco-cells"
let decorations_condition = "none"

function show_decorations() {
    if (decorations_condition == "none") {
        document.getElementById(decorations_id).style.display = 'block';
        decorations_condition = "block";
    }
    else if (decorations_condition == "block") {
        document.getElementById(decorations_id).style.display = 'none';
        decorations_condition = "none"
    }
}


let active_cube = "cube1";

// 90000 * 6 сторон куба (поверхность добавляется когда новая сторона доступна)
let surface = {
    cube1: {
        front: {
            total_surface: 90000,
            width: 0,
            height: 0,
        },
        back: {
            width: 0,
            height: 0,
        },
        left: {
            width: 0,
            height: 0,
        },
        right: {
            width: 0,
            height: 0,
        },
        top: {
            width: 0,
            height: 0,
        },
        bottom: {
            width: 0,
            height: 0,
        },
    },
    cube2: {

    },
    cube3: {

    },
}

function clearSide() {
    let clearWhere = prompt("What side do you want to clear? (front, back, left, right, top, bottom)")
    document.querySelector(`.${clearWhere}`).innerHTML = ""
}

let structures_id = 0



function dirBuild(structure) {
    document.querySelector(".inner-select-side").style.display = "block"
    document.querySelector(".select-resource").innerHTML = structure
}
function dirStopBuild() {
    document.querySelector(".inner-select-side").style.display = "none"
}



function add_structure_build(side) {
    let structure = document.querySelector(".select-resource").innerHTML

    if (structure in (structures.buildings_cost)) {
        sidesOfCube = ["front", "back", "left", "right", "top", "bottom"]

        let x = "";

        for (res in structures.buildings_cost[structure]) {
            if (resources[res] - structures.buildings_cost[structure][res] >= 0) {
                x += "true "
            }
            else if (resources[res] - structures.buildings_cost[structure][res] <= 0) {
                x += "false "
            }
        }
        if (x.indexOf("false") != -1) {
            infoBox("Not enough resources!")
            audioPlay(sounds_names[0])
            document.querySelector(".inner-select-side").style.display = "none"
        }
        else {
            audioPlay(sounds_names[1])
            for (res in structures.buildings_cost[structure]) {
                resources[res] = resources[res] - structures.buildings_cost[structure][res]
            }

            update()

            document.querySelector(".help-put").style.color = "blue";
            document.querySelector(".help-put").style.animation = "help-sizing 1s infinite running";
            document.querySelector(`.${side}`).innerHTML += `<div class="temp-structure ${structure}">Move me</div>`;/* structures.buildings[structure] */

            let left = 0,
                top = 0;

            document.onkeydown = function(e) {

                     if (e.key == "a") left -= 10;
                else if (e.key == "d") left += 10;
                else if (e.key == "w") top -= 10;
                else if (e.key == "s") top += 10;

                if (e.key == "x") {
                    document.querySelector(".temp-structure").remove();

                    document.querySelector(".help-put").style.color = "black";
                    document.querySelector(".help-put").style.animation = "help-sizing 1s infinite paused";
                    document.querySelector(".help-put").style["font-size"] = "24px"

                    document.querySelector(`.${side}`).innerHTML += `<div class="structure ${structure}" id="${structure}${structures_id}">${structure}</div>`;

                    document.getElementById(`${structure}${structures_id}`).style.left = left + "px";
                    document.getElementById(`${structure}${structures_id}`).style.top = top + "px";

                    audioPlay(sounds_names[2])

                    document.querySelector(".inner-select-side").style.display = "none"

                    resources_per_sec.wood_sec += structures.buildings_income[structure].wood;
                    resources_per_sec.iron_sec += structures.buildings_income[structure].iron;
                    resources_per_sec.gold_sec += structures.buildings_income[structure].gold;
                    resources_per_sec.stone_sec += structures.buildings_income[structure].stone;
                    resources_per_sec.money_sec += structures.buildings_income[structure].money;
                }

                try {
                    let str = document.querySelector(`.${structure}`);

                    tmpWidth = +window.getComputedStyle(str).width.slice(0, -2);
                    tmpHeight = +window.getComputedStyle(str).height.slice(0, -2);

                    if (settingsData.DisableCubeBorder == false) {
                        tmpWidth += 10; tmpHeight += 10;
                    }

                    if (left < 0) left = 0;
                    else if (left > 300 - tmpWidth) {
                        left = 300 - tmpWidth;
                    }

                    if (top < 0) top = 0;
                    else if (top > 300 - tmpHeight) {
                        top = 300 - tmpHeight;
                    }

                    document.querySelector(".temp-structure").style.left = left + "px";
                    document.querySelector(".temp-structure").style.top = top + "px";
                }

                catch {
                    rotate()
                }
            }

            structures_id += 1

            let current_structure = document.querySelector(`.${structure}`);
            let style_current_structure = window.getComputedStyle(current_structure);

            surface[active_cube][side]["total_surface"] -= (
                (style_current_structure.width).slice(0, -2) * (style_current_structure.height).slice(0, -2)
            );
            player_buildings[structure]["how"] += 1;
        }
    }
    else {
        alert("Oops, there is no such structure!");
    }
}


function incomeResources() {
    resources.wood += resources_per_sec.wood_sec;
    resources.iron += resources_per_sec.iron_sec;
    resources.gold += resources_per_sec.gold_sec;
    resources.stone += resources_per_sec.stone_sec;
    resources.money += resources_per_sec.money_sec;
    update()
}

setInterval(incomeResources, 1000)

let settingsDisplayStyle = "none"
function settingsShow() {
    if (settingsDisplayStyle == "none") {
        document.querySelector(".inner-settings").style.display = "block"
        settingsDisplayStyle = "block"
    }
    else if (settingsDisplayStyle == "block") {
        document.querySelector(".inner-settings").style.display = "none"
        settingsDisplayStyle = "none"
    }
}

function setAnim(num) {
    audioPlay(sounds_names[3])
    if (activeSetsSide[num] == "left") {
        activeSetsSide[num] = "right"
        document.querySelectorAll(".inner-check")[num].style.left = "20px"
        document.querySelectorAll(".inner-check")[num].innerHTML = "I"
    }
    else if (activeSetsSide[num] == "right") {
        activeSetsSide[num] = "left"
        document.querySelectorAll(".inner-check")[num].style.left = "0px"
        document.querySelectorAll(".inner-check")[num].innerHTML = "O"
    }
}

function autoRotateCubeSet(num) {
    setAnim(num)
    if (settingsData["AutoRotateCube"] == false) {
        settingsData["AutoRotateCube"] = true
        document.querySelector(".cube").style.animation = "autoCubeRotate 10s infinite both"
    }
    else if (settingsData["AutoRotateCube"] == true) {
        settingsData["AutoRotateCube"] = false
        document.querySelector(".cube").style.animation = ""
        rotate()
    }
}

function cubeBorder(num) {
    setAnim(num)

    if (settingsData["DisableCubeBorder"] == false) {
        settingsData["DisableCubeBorder"] = true;
        settingsData.PlayerBorderXY = 270
        for (let i = 0; i < 6; i++) {
            try {
                document.querySelectorAll(".side")[i].style.border = "0px solid red";
                let lockedSide = document.querySelectorAll(".locked")
                lockedSide[i].style.setProperty("--line-height-locked", "100px")
            }
            catch {}
        }
    }

    else if (settingsData["DisableCubeBorder"] == true) {
        settingsData["DisableCubeBorder"] = false;
        settingsData.PlayerBorderXY = 260
        for (let i = 0; i < 6; i++) {
            try {
                document.querySelectorAll(".side")[i].style.border = "5px solid red";
                let lockedSide = document.querySelectorAll(".locked")
                lockedSide[i].style.setProperty("--line-height-locked", "97px")
            }
            catch {}
        }
    }
}

function setBgMusic(num) {
    setAnim(num);
    if (settingsData["DisableBackgroundMusic"] == false) {
        settingsData["DisableBackgroundMusic"] = true
        infoBox("After this track, it won't be play.")
    }
    else if (settingsData["DisableBackgroundMusic"] == true) {
        settingsData["DisableBackgroundMusic"] = false
    }
}

function setsfx(num) {
    setAnim(num);
    if (settingsData["DisableSfx"] == false) {
        settingsData["DisableSfx"] = true
    }
    else if (settingsData["DisableSfx"] == true) {
        settingsData["DisableSfx"] = false
    }
}

class Action {
    func(key) {
        key = this['set' + key];
        if('function' === typeof key) {
            return key();
        }
    }

    setOne() {
        return "1";
    }

    setRotateCubeArrow() {
        let num = document.getElementById("RotateCubeArrow").value;
        settingsData.RotateCubeArrow = num;
    }

    setPlayerSpeed() {
        let num = document.getElementById("PlayerSpeed").value;
        settingsData.PlayerMoveSpeed = num;
    }
}

let act = new Action();
// console.log(act.func('One'));
// act.func('Two');


let listOfIds = ["RotateCubeArrow", "PlayerSpeed"]

function checkInputs() {
    for (set of listOfIds) {
        act.func(set)
    }
}

function infoBox(infoText) {
    function change() {
        document.querySelector(".info-box").style.color = "black"
        document.querySelector(".info-box").innerHTML = "#"
    }
    document.querySelector(".info-box").style.color = "red"
    document.querySelector(".info-box").innerHTML = `Info - ${infoText}`;
    setTimeout(change, 2500)
}


resources_names = ["wood", "iron", "stone", "gold", "money"]
function shopBuying(resource, order) {
    function infoShop(text) {
        function change() {
            document.querySelector(`.info-${resources_names[resource]}`).innerHTML = ""
            document.querySelector(`.info-${resources_names[resource]}`).style.color = "transparent"
        }
        document.querySelector(`.info-${resources_names[resource]}`).innerHTML = `${text}`
        document.querySelector(`.info-${resources_names[resource]}`).style.color = "red"
        setTimeout(change, 2000)
    }
    if (resources.money - shop[resource][order][0] >= 0) {
        resources[resources_names[resource]] += shop[resource][order][1];
        resources.money -= shop[resource][order][0];
        infoShop("purchased!")
        audioPlay(sounds_names[1])
        update()
    }
    else if (resources.money - shop[resource][order][0] < 0) {
        infoShop("Not enough<br> moneys!")
        audioPlay(sounds_names[0])
    }
}

function shopShow() {
    let shop_modal = document.getElementById("shop-modal");
    let shop_btn = document.querySelector(".shop-button");
    let closeX = document.getElementsByClassName("close")[0];

    shop_btn.onclick = function() {
        shop_modal.style.display = "block";
    }

    closeX.onclick = function() {
        shop_modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == shop_modal) {
            shop_modal.style.display = "none";
        }
    }
}


function buySide(side, cost) {
    if (resources.money - cost > 0 ) {
        document.querySelector(`.${side} > .locked`).remove()
        resources.money -= cost
        audioPlay(sounds_names[4])
    }
    else if (resources.money - cost < 0) {
        infoBox(`Not enough money to unlock ${side} side!`)
        audioPlay(sounds_names[0])
    }
}

function audioPlay(audioName) {
    if (settingsData.DisableSfx == false) {
        let audio = new Audio();
        audio.preload = 'auto';
        audio.src = `./cube-sounds/${audioName}.mp3`;
        audio.play();
    }
}

function mixarr(arr) {
    return arr.map(i => [Math.random(), i]).sort().map(i => i[1])
}

function bgMusic() {
    let audioName = mixarr(["skylines", "awaken", "jvna-demon"])[0];
    let audio = new Audio();
    audio.preload = 'auto';
    audio.src = `./cube-sounds/background-music/bg-${audioName}.mp3`;
    audio.play();
    infoBox(`Now playing - ${audioName}`);
    // let audioPlayname = setInterval(bgMusic, Math.round(audio.duration) + 10000, true);
    // bgMusic(true, audio)
}

function checkBgMusic() {
    // settingsData.DisableBackgroundMusic = true
    if (settingsData.DisableBackgroundMusic == false) {
        setTimeout(bgMusic, 0)
    }
}
setTimeout(checkBgMusic, 5000)


function update() {
    document.getElementById("gold-count").innerHTML = resources.gold;
    document.getElementById("iron-count").innerHTML = resources.iron;
    document.getElementById("wood-count").innerHTML = resources.wood;
    document.getElementById("stone-count").innerHTML = resources.stone;
    document.getElementById("money-count").innerHTML = resources.money;
}

function loadGame() {
    let structures_names_load = ["mine", "lumberjack", "house", "farm", "office", "shop"]
    let resources_stickers = ["A", "B", "C", "E"]
    let sidesOfCube = ["back", "right", "left", "top", "bottom"]

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            document.getElementById(`build-cell-${i}`).innerHTML += 
            `<div class="build-info">${resources_names[j]}: ${ structures.buildings_cost[ structures_names_load[i]] [resources_names[j] ] } </div>`;
        }
    }

    for (let i = 0; i <= 3; i++) {
        document.querySelector(".modal-inner-body").innerHTML +=
        `
        <div class="section">
            <div class="section-res section-${resources_names[i]}"><span class="section-title">${resources_names[i]}</span</div>
        </div>
        `
        for (let j = 0; j <= 3; j++) {
            document.querySelector(`.section-${resources_names[i]}`).innerHTML +=
            `<div class="section-cell" onclick="shopBuying(${i}, ${j})"> <span class="product">${shop[i][j][1]}</span> <span class="product-sticker"> ${resources_stickers[i]}</span> <div class="price">${shop[i][j][0]} </div> </div>`
        }
        document.querySelector(`.section-${resources_names[i]}`).innerHTML +=
        `<div class="section-cell info-${resources_names[i]}"></div>`
    }

    for (let i = 0; i <= 4; i++) {
        document.getElementsByClassName("locked")[i].innerHTML += 
        `<br><span class="buy-side" onclick="buySide('${sidesOfCube[i]}', '${costOfSides[i]}')">${costOfSides[i]}</span>`

        console.log(document.getElementsByClassName("locked") [i].innerHTML);
        console.log(`${sidesOfCube[i]} - side`)
    }
}

