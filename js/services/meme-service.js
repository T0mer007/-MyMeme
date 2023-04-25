'use strict'

gId = 1
let gMemes = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            align: 'left',
            color: 'red',
            pos: {
                x: 50,
                y: 80
            },
            fontFamily: "Impact"
        },
        {
            txt: 'And shawarma too',
            size: 30,
            align: 'left',
            color: 'green',
            pos: {
                x: 60,
                y: 420
            },
            fontFamily: "Impact"
        }
    ]
}


function getMemes() {
    return gMemes
}

function setLineTxt(val) {
    //Idx
    gMemes.lines[0].txt = val
}

function setLineSize(val) {
    gMemes.lines[0].size = val
}

function setLineColor(val) {
    gMemes.lines[0].color = val
}

function setLineFont(val) {

    gMemes.lines[0].fontFamily = val
}

function setLineAlign(val) {

    gMemes.lines[0].align = val
}
