'use strict'




function onInit() {
    createImgs()
    renderGallery()
    window.addEventListener('resize', () => {
        renderMeme()
      })
}


function renderGallery() {
    let imgs = getImages()
    let strHtmls = imgs.map(img => {
        return `
        <div class="card-layout" data-id =${img.id} onclick="setImg(this)">
        <img src="${img.url}" class="meme-img"/>
            <span class="img-description">${img.description}</span>
            </div>
            `
    })
    document.querySelector('.gallery').innerHTML = strHtmls.join('')
}


function getImgId(elImg){
   let id = elImg.dataset.id
   return id
}


function renderSavedMemes() {
    const memes = getSavedMemes()
    if(memes.legth === 0) return
    let strHtmls = memes.map((meme,idx) => {
        return `
        <div class="card-layout">
        <button class="btn delete-saved" onclick="onDeleteSavedMeme(${idx})">X</button>
         <img onclick="onLoadSavedMeme(${idx})" src="imgs/saved.png" class="meme-img small"/>
        <span class="img-description">Saved: ${idx+1}</span>
        </div>
        `
    })
    document.querySelector('.savedMemes').innerHTML = strHtmls.join('')
}
