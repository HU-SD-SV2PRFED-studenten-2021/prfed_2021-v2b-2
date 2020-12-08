window.onload = function () {
    const jwt = window.sessionStorage.getItem('myJWT')
    if (jwt !== null) {
        const loginBtn = document.getElementById('loginBtn')
        const resultJWT = parseJwt(jwt.substr(jwt.indexOf(' ') + 1))
        loginBtn.innerText = `Welcome back, ${resultJWT.sub}!`
        loginBtn.onclick = function () {
            if (confirm("Wil je uitloggen?")) {
                window.location = '/logout.html'
            }
        }
        loginBtn.title = 'Klik om uit te loggen'
    }

    function parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}