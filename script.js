const fileIn = document.getElementById('img-file')
updateImages()

const readUrl = event => {
    let fileOut = document.querySelectorAll('img');
    if(event.files && event.files[0]) {
        let reader = new FileReader();
            reader.onload = event => {
                for(let fileOutI of fileOut) {
                    fileOutI.src = event.target.result;
                }
            }
            reader.readAsDataURL(event.files[0])
    }
}

fileIn.onchange = function() {
  readUrl(this);
}

document.getElementById('aspect-check').addEventListener('input', function() {
    let check = document.getElementById('aspect-check')
    if(check.checked) {
        document.getElementById('sem-aspecto').style.display = 'none'
        document.getElementById('com-aspecto').style.display = 'flex'
    }
    else {
        document.getElementById('com-aspecto').style.display = 'none'
        document.getElementById('sem-aspecto').style.display = 'flex'
    }
    updateImages()
})

document.getElementById('size-knob').addEventListener('input', updateAspect)

for(let elem of document.querySelectorAll('#sem-aspecto input')) {
    elem.addEventListener('input', updateImages)
}

for(let elem of document.querySelectorAll('input[name="orientacao"]')) {
    elem.addEventListener('input', function() {
        let paisagem, retrato;
        paisagem = document.getElementById('pasagem')
        retrato = document.getElementById('retrato')

        if(retrato.checked) {
            document.getElementById('adjust').style.aspectRatio = '7 / 10'
            document.getElementById('printable').style.aspectRatio = '7 / 10'
            document.getElementById('adjust').style.maxHeight = '800px'
        }
        else {
            document.getElementById('adjust').style.aspectRatio = '10 / 7'
            document.getElementById('printable').style.aspectRatio = '10 / 7'
            document.getElementById('adjust').style.width = '100%'
        }
    })
}

document.getElementById('number-children').addEventListener('input', inserirImagens)
for(let btn of document.querySelectorAll('.add-img')) {
    btn.addEventListener('click', inserirImagens)
}

function updateImages() {
    let knobHeight = document.getElementById('height-knob')
    let knobWidth = document.getElementById('width-knob')
    let images = document.querySelectorAll('#printable > img')
    for(let img of images) {
        img.style.width = knobWidth.value + '%'
        img.style.height = knobHeight.value + '%'
    }
}

function updateAspect() {
    let knobHeight = document.getElementById('size-knob')
    let images = document.querySelectorAll('#printable > img')
    for(let img of images) {
        img.style.height = knobHeight.value + '%'
        img.style.width = 'auto'
    }
}

function inserirImagens() {
    let pai = document.getElementById('printable')
    let first = pai.firstElementChild
    while(first) {
        first.remove()
        first = pai.firstElementChild
    }
    let cnt = document.getElementById('number-children').value
    cnt = parseInt(cnt)
    let node = document.createElement('img')
    node.classList.add('atividade')
    for(let i = 0; i < cnt; i++) {
        let node = document.createElement('img')
        node.classList.add('atividade')
        pai.appendChild(node)
    }
    console.log(pai.childElementCount)
    // for(let child of pai.childNodes) {
    //     child.classList.add('atividade')
    // }
    readUrl(fileIn)
    updateImages()
}