let url = window.location.href;
let filename = url.split('/').pop();
filename = filename.split('.')[0]
if (filename.length === 0) {
    filename = 'index'
}
filename = filename.charAt(0).toUpperCase() + filename.slice(1)
const fileurl = 'resources/files/' + filename + '.txt'
fetch(fileurl)
    .then(response => {
        document.getElementById('footerdate').innerText += ' ' +
            response.headers.get('date').split(', ')[1]
        if (response.status === 404) {
            throw "Not found"
        } else {
            response.text().then(response => {
                const mc = document.getElementById('maincontent')
                mc.innerHTML = response.replaceAll('\n', '<br>')
                document.title = filename + ' | Billy'
                document.getElementById('maintitle').innerText = filename
                document.getElementById('brontext').href = fileurl
        }).catch((err) => {
            if (err === 'Not found') {
                document.getElementById('maincontent').innerHTML = '<p>Not Found</p>'
                document.title = filename + ' | Billy'
                document.getElementById('maintitle').innerText = filename
                document.getElementById('brontext').href = fileurl
            } else console.log(err)
        })}
    }).catch(err => {
    console.log(err + 'eiugfeg')
})