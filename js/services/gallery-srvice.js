'use strict'

let gImgs
let gId = 1
let gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}




function createImgs() {
    gImgs = [
        createImg('imgs/1.jpg', ['Succes'], 'Proud child'),
        createImg('imgs/2.jpg', ['Happy'], 'Happy Women'),
        createImg('imgs/3.jpg', ['Political'], 'Donald Trump'),
        createImg('imgs/4.jpg', ['Happy'], 'Puppies'),
        createImg('imgs/5.jpg', ['Adorable'], 'Baby&Puppie'),
        createImg('imgs/6.jpg', ['Adorable'], 'Cat'),
        createImg('imgs/7.jpg', ['Violance'], 'Fight'),
        createImg('imgs/8.jpg', ['Weird'], 'Weird'),
        createImg('imgs/9.jpg', ['Happy'], 'Laughing baby'),
        createImg('imgs/10.jpg', ['Succes'], 'Leo'),
        createImg('imgs/11.jpg', ['Weird'], 'Some guy'),
        createImg('imgs/12.jpg', ['Happy'], 'Haim'),
        createImg('imgs/13.jpg', ['Awkward'], 'Toys'),
        createImg('imgs/14.jpg', ['Happy'], 'Obama'),
        createImg('imgs/15.jpg', ['Happy'], 'Opra'),
        createImg('imgs/16.jpg', ['Weird'], 'Some dude'),
        createImg('imgs/17.jpg', ['Awkward'], 'Awkward'),
        createImg('imgs/18.jpg', ['Political'], 'Putin'),
        createImg('imgs/19.jpg', ['Weird'], 'Look!'),
        createImg('imgs/20.jpg', ['Adorable'], 'Yoga dog'),
    ]
}

function createImg(url, keyword, description) {
    return {
        id: gId++,
        url: url,
        keywords: keyword,
        description: description
    }
}

function getImages() {
    return gImgs
}

// function getImgById(id) {
//     let imgIdx = gImgs.find(img =>{
//         return img.id === id
//     });
//     console.log(imgIdx)
//     saveToStorage('img', imgIdx)
// }