'use strict';

let gElCanvas
let gCtx
let gImg


function renderEditor(img) {
    document.querySelector('.gallery').style.display = 'none'
    gMemes.selectedImgId = getImgId(img)

    createCanvas()
    renderMeme()
}

function renderMeme() {
    loadImg()
    drawCanvas()
}

function loadImg() {
    let ImgIdx = loadFromStorage('imgIdx');
    gImg = new Image();
    if (!ImgIdx) gImg.src = `imgs/${gMemes.selectedImgId}.jpg`;
    else gImg.src = 'imgs/3.jpg';

}

function createCanvas() {
    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')

}


function drawCanvas() {
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
    let meme = getMemes()
    meme.lines.forEach(line => drawTxt(line))
}

function drawTxt(line) {
    gCtx.beginPath()
    gCtx.fillStyle = line.color
    gCtx.lineWidth = 3
    gCtx.font = line.size + 'px ' + line.fontFamily
    console.log('line.size: ', gCtx.font)
    gCtx.textAlign = line.align

    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function onChageTxt(val) {
    setLineTxt(val)
    renderMeme()
}

function onChangeSize(val) {
    setLineSize(val)
    renderMeme()
}

function onChangeColor(val) {
    setLineColor(val)
    renderMeme()
}

function onChangeFont(val) {
    setLineFont(val)
    renderMeme()
}

function onChangeAlign(val) {
    setLineAlign(val)
    renderMeme()
}
