'use strict'


function saveToStorage(key, value) {
  var strValue = JSON.stringify(value);
  localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

function getSavedMemes() {
  gSavedMemes = loadFromStorage(STORAGE_KEY)
  if (getSavedMemes === null || localStorage.length === 0) {
    gSavedMemes = [{
      selectedImgId: 5,
      selectedLineIdx: 0,
      lines: [
        {
          txt: 'Example Meme',
          size: 40,
          align: 'left',
          color: 'red',
          pos: {
            x: 50,
            y: 80
          },
          fontFamily: "Impact",
          isDrag: false
        },
        {
          txt: 'Try it yourself!',
          size: 30,
          align: 'left',
          color: 'green',
          pos: {
            x: 60,
            y: 420
          },
          fontFamily: "Impact",
          isDrag: false
        }
      ]

    }]
  }
  return gSavedMemes
}