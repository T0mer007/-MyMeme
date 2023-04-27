'use strict'




function onInit() {
    createImgs()
    renderGallery()
    renderSearch()
    window.addEventListener('resize', () => {
        renderMeme()
    })
}


function renderGallery() {
    let imgs = getImages()
    let strHtmls = imgs.map(img => {
        return `
        <div class="card-layout ${img.class}" data-id =${img.id} onclick="onSetImg(this)">
        <img src="${img.url}" class="meme-img"/>
            <span class="img-description">${img.description}</span>
            </div>
            `
    })
    document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function renderSearch() {

    let strHtmls = ` <form><input class="search-bar" oninput="searchMeme(value)"
     type="text" name="search" placeholder="Search  &#xF002"></form>
    <ul  class='list clean-list'>
        <li onclick="onLiClick(this)" class="memes" data-name="Proud child">Proud child</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Happy Women">Happy Women</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Donald Trump">Donald Trump</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Puppie">Puppie</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Baby&Puppie">Baby&Puppie</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Cat">Cat</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Fight">Fight</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Weird">Weird</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Laughing baby">Laughing baby</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Leo">Leo</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Some guy">Some guy</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Haim">Haim</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Toys">Toys</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Obama">Obama</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Opra">Opra</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Some dude">Some dude</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Awkward">Awkward</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Putin">Putin</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Look!">Look!</li>
        <li onclick="onLiClick(this)" class="memes" data-name="Yoga dog">Yoga dog</li>
    </ul>`
    document.querySelector('.search-place').innerHTML = strHtmls
}

function getImgId(elImg) {
    let id = elImg.dataset.id
    return id
}

function onSetImg(img) {
    document.querySelector('.editor').style.display = 'flex'
    document.querySelector('.gallery').style.display = 'none'
    gMeme.selectedImgId = getImgId(img)
    renderEditor()
    renderMeme()
    document.querySelector('.search-bar').value = ''
    document.querySelector('.list').style.display = "none"
}


function renderSavedMemes() {
    const memes = getSavedMemes()
    if (memes.legth === 0) return
    let strHtmls = memes.map((meme, idx) => {
        return `
        <div class="card-layout">
        <button class="btn delete-saved" onclick="onDeleteSavedMeme(${idx})">X</button>
         <img onclick="onLoadSavedMeme(${idx})" src="imgs/saved.png" class="meme-img small"/>
        <span class="img-description">Saved: ${idx + 1}</span>
        </div>
        `
    })
    document.querySelector('.savedMemes').innerHTML = strHtmls.join('')
}


function searchMeme(val) {
    let input = val
    if (val=== '') {
        gImgs.forEach(img => img.class = '' )
        renderGallery()
        document.querySelector('.list').style.display = "none"
        return
    }
    input = input.toLowerCase();
    let memes = document.querySelectorAll('.memes')
    document.querySelector('.list').style.display = "none"
    for (let i = 0; i < memes.length; i++) {
        if (!memes[i].innerHTML.toLowerCase().includes(input)) {
            memes[i].style.display = "none"
            document.querySelector('.list').style.display = "block"
        }
        else {
            memes[i].style.display = "list-item";
        }
        for (let j = 0; j < gImgs.length; j++) {
            gImgs[j].class = ''
            if (!gImgs[j].description.toLowerCase().includes(input)) {
                gImgs[j].class = 'hide'
            }
        }
    }
    renderGallery()
}


function onLiClick(elLi) {
    let val = elLi.dataset.name
    console.log('val: ', val)
    document.querySelector('.search-bar').value = val
    searchMeme(val)
    document.querySelector('.list').style.display = "none"
}

function onAbout(){
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.sub-title').innerHTML = `<span data-trans="about">About</span>`
    document.querySelector('.about-modal').style.display = 'block'
    
}

function onGallery(){
    document.querySelector('.sub-title').innerHTML = `<span data-trans="style">CHOOSE AN IMAGE:</span>`
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.about-modal').style.display = 'none'
    document.querySelector('.gallery').style.display = 'flex'
}

function onOpenMenu() {
    document.querySelector('body').classList.toggle('open-menu')
}