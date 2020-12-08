window.onload = function () {
    const loginbtn = document.getElementById('loginBtn') || document.getElementById('submitButton')
    const username = document.getElementById('username') || document.getElementById('userNameInput')
    const password = document.getElementById('password') || document.getElementById('passwordInput')
    const form = document.getElementById('loginForm')


    function login() {
        const loginParams = {
            "username": `${username.value}`,
            "password": `${password.value}`
        };
        fetch("/login", {
            method: 'POST',
            body: JSON.stringify(loginParams)
        }).then(function (response) {
            if (response.ok) return response;
            else {
                throw "Wrong username/password"
            }
        })
            .then(function (resp) {
                window.sessionStorage.setItem("myJWT", resp.headers.get('Authorization'))
                window.location = '/index.html'
            })
            .catch(function (error) {
                alert(error)
            });
    }

    username.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            login()
        }
    })

    password.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            login()
        }
    })

    loginbtn.addEventListener('click', function (e) {
        e.preventDefault()
        login()
    })
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        login()
    })
}
