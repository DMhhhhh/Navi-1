const X = localStorage.getItem('X')
const XObject = JSON.parse(X)
const hashMap = XObject || [{logo: 'G', url: 'https://google.com'}]
const $siteList = $('.siteList')
const $lastList = $siteList.find('li.last')

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace('/', '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const link = simplifyUrl(node.url)
        const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${link}</div>
                    <div class="removeButton">
                        <svg class="icon">
                            <use xlink:href="#icon-Remove1"></use>
                        </svg>
                    </div>
                </div>            
            </li>
        `).insertBefore($lastList)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.removeButton', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是什么？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    let logo = simplifyUrl(url)[0].toLocaleUpperCase()
    hashMap.push({
        logo: logo,
        url: url
    })
    render()
})


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('X', string)
}

$(document).on('keydown', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLocaleLowerCase() === key.toLocaleLowerCase()) {
            window.open(hashMap[i].url)
        }
    }
})

$(document).on('keydown', "input", (e) => {
    e.stopPropagation()
})