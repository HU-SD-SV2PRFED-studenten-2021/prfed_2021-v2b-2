window.onload = function () {
    const jwt = window.sessionStorage.getItem('myJWT')
    if (jwt !== null) {
        const resultJWT = parseJwt(jwt.substr(jwt.indexOf(' ') + 1))
        document.getElementById('loginBtn').innerText = `Welcome back, ${resultJWT.sub}!`
        document.getElementById('loginBtn').href = '/logout.html'
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