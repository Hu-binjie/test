const defaultOptions = {
    method: 'get',
    url: '/'
}
function ajax(options) {
    options = {
        ...defaultOptions,
        ...options
    }
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(options.method, options.url, true)
        xhr.onload = function () {
            if (xhr.getResponseHeader('content-type').includes('json')) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                resolve(xhr.responseText);
            }
        }
        xhr.onerror = function () {
            reject('error')
        }
        xhr.send()
    })
}
let box = document.querySelector('.box');
let p = document.querySelector('.p');
getimg()
gettext()
async function getimg() {
    let rs = await ajax({
        url: '/getimg'
    });

    if (!rs.code) {
        let data = rs.data;
        data.forEach(d => {
            let aElement = document.createElement('img');
            aElement.src = d.url
            aElement.innerHTML = d.id
            box.appendChild(aElement);
        });
    }
}
async function gettext() {
    let rs = await ajax({
        url: '/gettext'
    });
    if (!rs.code) {
        let data = rs.data;
        p.innerHTML = data
    }
}