'use strict'


function onInit() {
    createImgs()
    renderGallery()
}

function renderGallery() {
    let imgs = getImages()
    let strHtmls = imgs.map(img => {
        return `
        <div class="card-layout" data-id =${img.id} onclick="renderEditor(this)">
        <img src="${img.url}" class="meme-img"/>
            <span class="img-description">${img.description}</span>
            </div>
            `
    })
    document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function getImgId(elImg){
   let id = elImg.dataset.id
   console.log('id: ', id )
   return id
}

