'use strict';

let gElCanvas
let gCtx
let gImg
let gStartPos


function renderEditor() {
    document.querySelector('.sub-title').innerHTML = `<span data-trans="style">Style & share</span>`
    const meme = getMeme()
    const currLine = meme.lines[meme.selectedLineIdx]


    let strHtmls = `
        <div class="canvas-container">
            <canvas class="my-canvas" width="500" height="500"></canvas>
        </div>
        <section class="control-section">
            <h2 class="control-title" data-trans="controls">Controls</h2>
          
            <div class="control-text">
            
            <button class="line-delete" onclick="onDeleteText()"><i class="fas trash fa-trash-alt"></i></button>
            <input class="btn text-input" type="text" placeholder="${currLine.txt}" oninput="onChageTxt(value)" />
            <button class="btn" onclick="onAddNewLine()"><i class="fa-solid fa-plus"></i></button>
            </div>
                            
                            <div class="tools-section">
                            <i class="fas fa-text-height"></i>
                            <input type="range" value="${currLine.size}" min="10" step="2" oninput="onChangeSize(value)">
                            
                            <i class="fas fa-font"></i>:
                            <input type="color" class="color-input" value="${currLine.color}" oninput="onChangeColor(value)">
                            
                            
                            <select oninput="onChangeFont(value)">
                            <option data-trans="font" style="font-family: Impact;" value="${currLine.fontFamily}">
                            Impact</option>
                            <option style="font-family: Tahoma;" value="Tahoma">Tahoma</option>
                            <option style="font-family: lobster;" value="lobster">Lobster</option>
                            <option value="Verdana">Verdana</option>
                            </select>
                            
                            <button class="switch-line btn" onclick="onSwitchLine()"><i class="fa-solid fa-repeat"></i></button>
                            
                            <i class="fas fa-arrows-alt-h"></i>
                            <input type="number" class="left-right-input" value="${currLine.pos.x}" min="0" step="5"
                            oninput="onChangeX(value)">
                            
                            <i class="fas fa-arrows-alt-v"></i> <input type="number" class="left-right-input" value="${currLine.pos.y}"
                            min="0" step="5" oninput="onChangeY(value)">
                            
                            <select oninput="onChangeAlign(value)">
                            <option data-trans="left" value="left">left</option>
                            <option data-trans="center" value="center">center</option>
                            <option data-trans="right" value="right">right</option>
                            </select>
                            
                            </div>
                            </div>
                                                
                            <div class="emoji">
                            <button class="btn emoji-btn" data-emoji="heart" onclick="onAddEmoji(this)">💘</button>
                            <button data-emoji="angel" onclick="onAddEmoji(this)" class="btn emoji-btn">😇</button>
                            <button data-emoji="laugh" onclick="onAddEmoji(this)" class="btn emoji-btn">🤣</button>
                            <button data-emoji="sun" onclick="onAddEmoji(this)" class="btn emoji-btn">😎</button>
                            <button data-emoji="sleep" onclick="onAddEmoji(this)" class="btn emoji-btn">😴</button>
                            </div>
                            <div>
                            <button class="flexible btn"  data-trans="flexible" onclick="onFlexible()">I'm flexible</button>
                            </div>
                            <div class="tools-section share-section">
                        <input type="file" class="custom-file-input" id="upload"
                         onchange="onImgInput(event)">
                        <label class="upload-btn share-btn btn" for="upload">Upload Image ⇑</label>
                        <button class="btn share-btn" data-trans="save" onclick="onSaveMeme()">Save Meme <i class="fa-regular fa-floppy-disk"></i></button>
                        <a class="btn share-btn" data-trans="download" onclick="onDownloadImg(this)" href="" >Download <i class="fas fa-cloud-download-alt"></i> </a>
                        <button class="btn  share-btn" data-trans="share" onclick="onUploadImg()" type="submit">Share <i class="fab fa-facebook-square"></i></button>
                        </div>
                        </section>
                        `
    document.querySelector('.editor').innerHTML = strHtmls

    createCanvas()
}

function renderMeme() {
    resizeCanvas()
    loadImg()
    drawCanvas()
    addListeners()
}

function renderControls() {
    let memes = getMeme()
    let strHtml = memes.txts.map(() => {
        return `
        
        
        `
    })
    document.querySelector('.control-tools').innerHTML = strHtml.join('')
}

function loadImg() {
    gImg = new Image()
    if (!gUploadSrc) gImg.src = `imgs/${gMeme.selectedImgId}.jpg`
    else gImg.src = gUploadSrc
}


function createCanvas() {
    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')

}

function drawCanvas() {
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
    let meme = getMeme()
    meme.lines.forEach(line => drawTxt(line))
    markSelected()
}

function markSelected() {
    let meme = getMeme()
    for (let i = 0; i < meme.lines.length; i++) {
        let line = meme.lines[i]
        let lineLength = line.txt.length
        console.log(lineLength);
        if (i === meme.selectedLineIdx) {
            gCtx.strokeRect(line.pos.x - 3, line.pos.y - line.size * 1, 13 + 17 * lineLength, line.size * 1.4)
        }
    }
}

function drawTxt(line) {

    gCtx.beginPath()
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 3
    gCtx.font = line.size + 'px ' + line.fontFamily
    gCtx.textAlign = line.align

    // console.log('line: ', line)

    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function onChageTxt(val) {
    setLineTxt(val)
    drawCanvas()
}

function onChangeSize(val) {
    setLineSize(val)
    drawCanvas()
}

function onChangeColor(val) {
    setLineColor(val)
    drawCanvas()
}

function onChangeFont(val) {
    setLineFont(val)
    drawCanvas()
}

function onChangeAlign(val) {
    setLineAlign(val)
    drawCanvas()
}

function onSwitchLine() {
    switchLine()
    drawCanvas()
}

function onChangeX(val) {
    changeX(val)
    drawCanvas()
}

function onChangeY(val) {
    changeY(val)
    drawCanvas()
}

function onDeleteText() {
    deleteText()
    drawCanvas()
}

function onAddNewLine() {
    addNewLine()
    drawCanvas()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}


function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(pos);
    if (!isLineClicked(pos)) {
        gMeme.selectedLineIdx = 0

        return
    }
    renderMeme()
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}


function onMove(ev) {
    const meme = getMeme()
    const isDrag = meme.lines[meme.selectedLineIdx].isDrag
    if (!isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp(ev) {
    const pos = getEvPos(ev)
    setLineDrag(false)
    document.body.style.cursor = 'default'
    renderMeme()
    if (!isLineClicked(pos)) cleanSelected()
}


function onFlexible() {
    createFlexible()
}

function onSaveMeme() {
    cleanSelected()
    saveMeme()
    renderSavedMemes()
}

function onLoadSavedMeme(idx) {
    createCanvas()
    loadSavedMeme(idx)
    renderMeme()

}

function onDeleteSavedMeme(idx) {
    deleteSavedMeme(idx)
    renderSavedMemes()
}

function onAddEmoji(elEmoji) {
    let emojiName = elEmoji.dataset.emoji
    addNewEmoji(emojiName)
    drawCanvas()
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}

function cleanSelected() {
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
    let meme = getMeme()
    meme.lines.forEach(line => drawTxt(line))
}


