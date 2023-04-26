'use strict'

var gTrans = {
    title: {
        en: '#MyMeme',
        es: '#MiMemo',
        he: '#מאמי'
    },
    "head-line": {
        en: 'Choose an image:',
        es: 'Seleccione una imagen:',
        he: 'בחר תמונה:',
    },
    style: {
        en: 'Style & share',
        es: 'Estilo y compartir',
        he: 'עצב ושתף',
    },
    controls: {
        en: 'Editor',
        es: 'Editor',
        he: 'עורך',
    },
    font: {
        en: 'Font',
        es: 'fuente',
        he: 'כתב',
    },
    "switch-line": {
        en: 'Switch line',
        es: 'cambiar de línea',
        he: 'החלף שורה',
    },
    "add-line": {
        en: 'Add New Line',
        es: 'Agregar línea',
        he: 'הוסף שורה',
    },
    flexible: {
        en: `I'm flexible`,
        es: 'Soy flexible',
        he: 'אני זורם',
    },

    save: {
        en: 'Save Meme',
        es: 'Guardar Meme',
        he: 'שמור',
    },
    download: {
        en: 'Download Image',
        es: 'Descargar imagen',
        he: 'הורד כתמונה',
    },
    share: {
        en: 'Share on Facebook',
        es: 'Compartir en Facebook',
        he: 'שתף בפייסבוק',
    },
    copyrights: {
        en: 'tomer benaim',
        es: 'thomas\' benaimos\'',
        he: 'תומר בנאים',
    },
    left: {
        en: 'Left',
        es: 'escierda',
        he: 'שמאל',
    },
    center: {
        en: 'Center',
        es: 'centro',
        he: 'מרכז',
    },
    right: {
        en: 'Right',
        es: 'derecha',
        he: 'ימין',
    },

}

let gCurrLang = 'en'

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const transTxt = getTrans(transKey)
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function setLang(lang) {
    gCurrLang = lang
}