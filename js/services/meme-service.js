'use strict'
const STORAGE_KEY = 'memes-tab'
let gSavedMemes = []
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            align: 'left',
            color: 'white',
            pos: {
                x:5,
                y: 80
            },
            fontFamily: "Impact",
            isDrag: false
        },
        {
            txt: 'And shawarma too',
            size: 35,
            align: 'left',
            color: 'pink',
            pos: {
                x: 60,
                y: 350
            },
            fontFamily: "Impact",
            isDrag: false
        }
    ]
}


function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        // console.log('ev.pageX:', ev.pageX)
        // console.log('ev.pageY:', ev.pageY)
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        // console.log('pos:', pos)
    }
    return pos
}

function moveLine(dx, dy) {
    console.log('dx:', dx)
    console.log('dy:', dy)
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function isLineClicked(clickedPos) {
    const { x, y } = clickedPos
    for (let i = 0; i <= gMeme.lines.length; i++) {
        let line = gMeme.lines[i]
        const distance = { x: line.size*10 , y: line.size }
        const { pos } = gMeme.lines[i]
        if (x > pos.x && x < (pos.x + distance.x) && y > pos.y-line.size*2 && (y < pos.y + distance.y)) {
            gMeme.selectedLineIdx = i
            return true
        }
    }
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}


function createLine() {
    return {
        txt: 'New Line',
        size: 35,
        align: 'left',
        color: 'white',
        pos: {
            x: 60,
            y: 220
        },
        fontFamily: "Impact",
        isDrag: false
    }
}

function getMeme() {
    return gMeme
}


function setLineTxt(val) {
    //Idx
    gMeme.lines[gMeme.selectedLineIdx].txt = val
}

function setLineSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size = val
}

function setLineColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].color = val
}

function setLineFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = val
}

function setLineAlign(val) {
    gMeme.lines[gMeme.selectedLineIdx].align = val
}

function changeX(val) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = val
}

function changeY(val) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y = val
}

function deleteText() {
    let lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
}

function addNewLine() {
    gMeme.lines.push(createLine())
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function createFlexible() {
    createCanvas()
    const randImgNum = getRandomIntInclusive(1, 20)
    console.log('randImgNum: ', randImgNum)
    gImg = new Image()
    gImg.src = `imgs/${randImgNum}.jpg`
    const randLinesNum = getRandomIntInclusive(1, 2)
    let randLines = []
    for (let i = 1; i <= randLinesNum; i++) {
        randLines.push(createRandomLine())
    }

    gMeme = {
        selectedImgId: randImgNum,
        selectedLineIdx: 0,
        lines: []
    }
    gMeme.lines.push(randLines)
    drawCanvas()
    gMeme.lines.forEach(line => drawTxt(line))

}

function createRandomLine() {
    const randTxtIdx = getRandomIntInclusive(0, 9)
    const lines = [
        "Happy?", "Try it", "Look Up", "I'm here", "DON'T", "YALLA", "It's about time", "Sometime", "You Ready?", "Trust me"
    ]
    const Fonts = ["Impact", "Tahoma", "lobster", "Verdana"]
    const randSize = getRandomIntInclusive(22, 38)
    const randPosX = getRandomIntInclusive(5, 175)
    const randPosY = getRandomIntInclusive(55, 455)
    const randFontIdx = getRandomIntInclusive(1, 4)
    return {
        txt: lines[randTxtIdx],
        size: randSize,
        align: 'left',
        color: getRandomColor(),
        pos: {
            x: randPosX,
            y: randPosY,
        },
        fontFamily: Fonts[randFontIdx],
        isDrag: false
    }
}

function saveMeme() {
    gSavedMemes.push(gMeme)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function loadSavedMeme(idx) {
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    gMeme = gSavedMemes[idx]
}

function deleteSavedMeme(idx) {
    gSavedMemes.splice(1, idx)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function addNewEmoji(emojiName) {
    console.log(emojiName);
    gMeme.lines.push(createEmoji(emojiName))
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function createEmoji(emojiName) {
    let emoji
    switch (emojiName) {
        case 'heart':
            console.log('heart');
            emoji = '💘'
            break;
        case 'angel':

            console.log('angel');
            emoji = '😇'
            break;
        case 'laugh':
            console.log('lufff');
            emoji = '🤣'

            break;
        case 'sun':
            console.log('Sun');
            emoji = '😎'
            
            break;
            case 'sleep':
            emoji = '😴'

            console.log('slepp');
            break;
    }
    return {
        txt: emoji,
        size: 35,
        align: 'left',
        color: 'white',
        pos: {
            x: 60,
            y: 220
        },
        fontFamily: "Impact",
        isDrag: false
    }
}
