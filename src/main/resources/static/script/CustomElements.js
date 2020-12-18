class logoElement extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML =
            `<!-- HTML -->
                <style>
                    img {
                        max-width: 275px;
                        width: 220px;
                        margin-top: -120px;
                        margin-left: 5%;
                    }
                    @media (max-width: 1150px) {
                    img {
                        width: 85%;
                    }}
                    @media (max-width: 850px) {
                      img {
                        position: absolute;
                        width: 40%;
                        max-width: 125px;
                        margin-left: 0;
                      }
                    }
                </style>
                <a href="/index.html"><img src="resources/hboilogo-nobg.png" alt="HBO-i logo"></a>
        `
    }
}

window.customElements.define('billy-logo', logoElement)

class sideNavigation extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `
            <!-- HTML -->
                <style>
                    * {
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                    }
                    a {
                        text-decoration: none;
                    }
                    ul {
                        list-style-type: none;
                    }
                    .side-container {
                        width: 20%;
                        height: 100vh;
                    }
                    .navigation {
                        display: flex;
                        border-top: 1px solid black;
                        border-bottom: 1px solid black;
                        border-right: 1px solid black;
                        flex-direction: column;
                        justify-content: space-around;
                        margin-left: 5%;
                        height: 100vh;
                        background-color: white;
                    }
                    .navigation li {
                        border-bottom: 1px solid black;
                    }
                    @media (max-width: 1150px) {
                        ul li {
                            font-size: 0.75em;
                        }
                    }
                    @media (max-width: 850px) {
                        nav {
                            display: none;
                        }
                    }
                </style>
                <div class="side-container">
                    <billy-logo></billy-logo>
                    <nav>
                        <ul class="navigation">
                            <li><a href="/index.html">Home</a></li>
                            <li><a href="">Navigatie</a></li>
                            <li><a href="">Hoofdpagina</a></li>
                            <li><a href="">Recente wijzigingen</a></li>
                            <li><a href="">Hulpmiddelen</a></li>
                            <li><a href="">...</a></li>
                            <li><a href="">...</a></li>
                        </ul>
                    </nav>
                </div>
        `
    }
}

window.customElements.define('billy-sidebar', sideNavigation)

class mainContainer extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
        this.originalText = ''
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `
            <!-- HTML -->
                <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                .main-container {
                    place-self: center;
                    width: auto;
                    position: absolute;
                    top: 119px;
                    left: 22%;
                    margin-right: 1%;
                    margin-left: -2%;
                    margin-top: -5px;
                    background: #ffffff;
                    overflow: hidden;
                    min-height: 750px;
                    min-width: 75%;
                }
                .main-container main {
                    padding-bottom: 5px;
                    border-bottom: 1px solid black;
                    margin-left: 50px;
                    margin-top: 50px;
                }
                .title {
                    font-size: 1.8em;
                    border-bottom: 1px solid black;
                }
                div.content h1 {
                    font-size: 1.5em;
                }
                div.content p {
                    padding-top: 5px;
                    font-family: sans-serif;
                }
                .footer-info {
                    margin-left: max(50px, 3.5%);
                    margin-top: 1px;
                }
                .footer-info p, .footer-info a {
                    margin: 0 10px 10px 0;
                }
                @media (max-width: 850px) {
                    div.main-container {
                        left: 0;
                        width: 100%;
                    }
                    .main-container main {
                        margin-left: 20px;
                        margin-top: 10px;
                        border-top: solid black 1px;
                    }
                    .footer-info {
                        margin-left: 20px;
                    }
                }
                </style>
                <div class="main-container">
                    <main>
                    <h1 class="title" id="maintitle">Loading</h1>
                    <div class="content" id="maincontent">
                        <p><img src="https://i.giphy.com/3oEjI6SIIHBdRxXI40.gif" alt="loading gif"></p>
                    </div>
                    </main>
                    <footer class="footer-info" id="billyfooter">
                        <p id="footercats">Categorieën: </p>
                        <p id="footerdate">Deze pagina is voor het laatst bewerkt op</p>
                        <a href="/privacy.html">Privacybeleid</a> <a href="/over.html">Over Billy</a> <a href="/voorbehoud.html">Voorbehoud</a>
                    </footer>
                </div>
        `
        this.loadFile()
    }

    evListener() {
        const dom = this
        const topNav = document.querySelector('billy-topnav')._shadowRoot.getElementById('topnav')
        topNav.addEventListener('itemClicked', function (e) {
            dom.change(e.detail)
        })
    }

    change(e) {
        const mc = this._shadowRoot.getElementById('maincontent')
        switch (e) {
            case "brontext":
                mc.innerText = this.originalText
                return
            case "overleg":
                mc.innerHTML = `<!-- HTML -->
                                <style>
                                    #message {
                                        padding: 3px;
                                        width: 90%;
                                        margin-top: 5px;
                                    }
                                    #messages {
                                        list-style-type: none;
                                    }
                                    li:first-of-type {
                                        margin-top: 5px;
                                    }
                                    li {
                                        border: solid black 1px;
                                        padding: 1px 1px 1px 5px;
                                        margin-top: 2px;
                                        width: 90%;
                                    }
                                </style>
                                <form>
                                    <label>
                                        <input type="text" placeholder="Bericht" id="message">
                                        <button type="submit" id="submitBtn">Verzend</button>
                                    </label>
                                </form>
                                <ul id="messages">
                                    <li>Wat een goede pagina! || anonymous</li>
                                </ul>`
                mc.querySelector('#submitBtn').addEventListener('click', function (e) {
                    e.preventDefault()
                    const listElement = document.createElement('li')
                    const messageInput = mc.querySelector('#message')
                    let token = window.sessionStorage.getItem('myJWT')
                    if (token !== null) {
                        token = token.substr(token.indexOf(' ') + 1)
                        const base64Url = token.split('.')[1];
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                        }).join(''));
                        this.name = JSON.parse(jsonPayload).sub
                    } else {
                        this.name = "anonymous"
                    }
                    listElement.innerText = messageInput.value + ` || ${this.name}`
                    messageInput.value = ''
                    mc.querySelector('#messages').appendChild(listElement)
                })
                return
            default:
                mc.innerHTML = this.originalText
                return
        }
    }

    loadFile() {
        let url = window.location.href;
        let filename = url.split('/').pop();
        filename = filename.split('.')[0]
        if (filename.length === 0) {
            window.location = "/index.html"
        }
        const filenameHigh = filename.charAt(0).toUpperCase() + filename.slice(1)
        fetch("/rest/" + filename)
            .then(response => {
                if (response.status !== 200) {
                    throw response.status
                } else {
                    response.json().then(response => {
                        this._shadowRoot.getElementById('footerdate').innerText += ' ' + response.lastEdited
                        this._shadowRoot.getElementById('footercats').innerHTML += this.getCatString(response.categories)
                        const mc = this._shadowRoot.getElementById('maincontent')
                        this.originalText = response.content.replaceAll('\n', '<br>')
                        mc.innerHTML = this.originalText
                        document.title = filenameHigh + ' | Billy'
                        this._shadowRoot.getElementById('maintitle').innerText = filenameHigh
                        this.evListener()
                    })
                }
            }).catch(err => {
            this._shadowRoot.getElementById('maincontent').innerHTML = `<p>Er is veel geprobeerd, maar dat is niet gelukt</p>`
            this._shadowRoot.getElementById('billyfooter').removeChild(this._shadowRoot.getElementById('footerdate'))
            this._shadowRoot.getElementById('billyfooter').removeChild(this._shadowRoot.getElementById('footercats'))
            document.title = filenameHigh + ' | Billy'
            this._shadowRoot.getElementById('maintitle').innerText = err
        })
    }

    getCatString(array) {
        let string = ''
        if (array.length === 0) {
            string = 'Geen'
        } else {
            array.forEach(function (cat) {
                let catname = cat.name
                let lowerCaseCatname = catname.charAt(0).toLowerCase() + catname.slice(1)
                string += `<a href="${lowerCaseCatname}.html">${catname}</a>`
            })
        }
        return string;
    }
}

window.customElements.define('billy-main', mainContainer)

class searchBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `<!-- HTML -->
            <style>
            a {
                background-image: none;
            }
            a#searchBtn {
                text-decoration-color: #ffffff00;
            }
            @media (max-width: 850px) {
                a {
                    display: none;
                }
                input {
                    width: 75%;
                }
            }
            </style>
            <label><input type="text" id="searchField" placeholder="Wiki doorzoeken"/><a id="searchBtn" href="">🔎</a></label>
        `
        this.searchBtn()
    }

    searchBtn() {
        const searchField = this._shadowRoot.getElementById('searchField')
        searchField.addEventListener('keypress', function (key) {
            if (key.key === 'Enter') {
                const filename = searchField.value
                window.location = filename.charAt(0).toLowerCase() + filename.slice(1) + '.html'
            }
        })
        const searchBtn = this._shadowRoot.getElementById('searchBtn')
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault()
            const filename = searchField.value
            window.location = filename.charAt(0).toLowerCase() + filename.slice(1) + '.html'
        })
    }
}

window.customElements.define('billy-search', searchBar)

class topNav extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `<!-- HTML -->
            <style>
                a {
                    text-decoration: none;
                    padding: 0 5px 3px 5px;
                    background-clip: padding-box;
                    background-image: linear-gradient(#f6f6f6, white);
                }
                .top-navigation-list li {
                    background-color: white;
                    border-right: solid black 1px;
                    border-left: solid black 1px;
                }
                ul {
                    list-style-type: none;
                }
                .top-navigation-list li a.active {
                    padding-bottom: 10px;
                    background-color: white;
                    background-clip: padding-box;
                }
                .top-navigation-list li:last-of-type {
                    border-right: none;
                    border-left: none;
                    background-color: #f6f6f6;
                }
                .bottom-container {
                    margin-top: 50px;
                    padding-bottom: 5px;
                    margin-left: -5%;
                }
                .top-navigation-list {
                    display: flex;
                    justify-content: space-around;
                    border-bottom: 1px solid black;
                }
                @media (max-width: 1040px) {
                    ul li {
                        font-size: 0.75em;
                    }
                }
                @media (max-width: 850px) {
                    .top-navigation-list {
                        border-bottom: 0;
                        margin-left: -12px;
                    }
                    .top-navigation-list li {
                        border: none;
                        text-indent: -0.5em;
                    }
                }
            </style>
            <div class="bottom-container">
                <nav class="top-navigation">
                    <ul class="top-navigation-list" id="topnav">
                        <li><a href="" class="active" id="hoofdpagina">Hoofdpagina</a></li>
                        <li><a href="" id="overleg">Overleg</a></li>
                        <li><a href="" id="lezen">Lezen</a></li>
                        <li><a href="" id="brontext">Brontext bekijken</a></li>
                        <li><a href="" id="geschiedenis">Geschiedenis weergeven</a></li>
                        <li><billy-search></billy-search></li>
                    </ul>
                </nav>
            </div>
        `
        this.topnav()
    }

    topnav() {
        const topNavAList = this._shadowRoot.getElementById('topnav').childNodes
        const topNav = this._shadowRoot.getElementById('topnav')
        topNavAList.forEach(topNavA => {
            const topNavAChildren = topNavA.childNodes
            if (topNavAChildren.length > 0) {
                const actualAItem = topNavAChildren[0]
                actualAItem.addEventListener('click', function (e) {
                    topNav.dispatchEvent(new CustomEvent('itemClicked', {detail: actualAItem.id}))
                    e.preventDefault()
                    topNavAList.forEach(topNavChild => {
                        const topNavActualA = topNavChild.childNodes
                        if (topNavActualA.length > 0) {
                            const topNavActualAItem = topNavActualA[0]
                            topNavActualAItem.className = ''
                        }
                    })
                    actualAItem.className = 'active'
                })
            }
        })
    }
}

window.customElements.define('billy-topnav', topNav)