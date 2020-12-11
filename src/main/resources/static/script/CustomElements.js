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
                    @media (max-width: 1040px) {
                    img {
                        width: 85%;
                    }}
                </style>
                <a href="/"><img src="resources/hboilogo-nobg.png" alt="HBO-i logo"></a>
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
                    @media (max-width: 1040px) {
                        ul li {
                            font-size: 0.75em;
                        }
                    }
                </style>
                <div class="side-container">
                    <billy-logo></billy-logo>
                    <nav>
                        <ul class="navigation">
                            <li><a href="/">Home</a></li>
                            <li><a href="#">Navigatie</a></li>
                            <li><a href="#">Hoofdpagina</a></li>
                            <li><a href="#">Recente wijzigingen</a></li>
                            <li><a href="#">Hulpmiddelen</a></li>
                            <li><a href="#">...</a></li>
                            <li><a href="#">...</a></li>
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
                    padding-bottom: 1%;
                    border-bottom: 1px solid black;
                    margin-left: 50px;
                    margin-top: 50px;
                }
                .title {
                    font-size: 1.8em;
                }
                div.content p {
                    padding-top: 5px;
                    border-top: 1px solid black;
                    font-family: sans-serif;
                }
                .footer-info {
                    margin-left: max(50px, 3.5%);
                    margin-top: 1px;
                }
                .footer-info p, .footer-info a {
                    margin: 10px;
                }
                .footer-info a:first-of-type, .footer-info p:first-child {
                    margin: 0;
                }
                </style>
                <div class="main-container">
                    <main>
                    <h1 class="title" id="maintitle">Homepage</h1>
                    <div class="content" id="maincontent">
                        <p></p>
                    </div>
                    </main>
                    <footer class="footer-info">
                        <p id="footerdate">Deze pagina is voor het laatst bewerkt op</p>
                        <a href="#">Privacybeleid</a> <a href="#">Over HBO-i-methoden-toolkit</a> <a href="#">Voorbehoud</a>
                    </footer>
                </div>
        `
        this.loadFile()
    }

    loadFile() {
        let url = window.location.href;
        let filename = url.split('/').pop();
        filename = filename.split('.')[0]
        if (filename.length === 0) {
            filename = 'index'
        }
        const fileurl = 'resources/files/' + filename + '.txt'
        filename = filename.charAt(0).toUpperCase() + filename.slice(1)
        fetch(fileurl)
            .then(response => {
                this._shadowRoot.getElementById('footerdate').innerText += ' ' +
                    response.headers.get('date').split(', ')[1]
                if (response.status === 404) {
                    throw "Not found"
                } else {
                    response.text().then(response => {
                        const mc = this._shadowRoot.getElementById('maincontent')
                        mc.innerHTML = response.replaceAll('\n', '<br>')
                        document.title = filename + ' | Billy'
                        this._shadowRoot.getElementById('maintitle').innerText = filename
                    }).catch((err) => {
                        if (err === 'Not found') {
                            this._shadowRoot.getElementById('maincontent').innerHTML = '<p>Not Found</p>'
                            document.title = filename + ' | Billy'
                            this._shadowRoot.getElementById('maintitle').innerText = filename
                        } else console.log(err)
                    })
                }
            }).catch(err => {
            this._shadowRoot.getElementById('maincontent').innerHTML = '<p>Not Found</p>'
            document.title = filename + ' | Billy'
            this._shadowRoot.getElementById('maintitle').innerText = err
        })
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
            </style>
            <label><input type="text" id="searchField" placeholder="Wiki doorzoeken"/><a id="searchBtn" href="">🔎</a></label>
        `
        this.searchBtn()
    }

    searchBtn() {
        const searchField = this._shadowRoot.getElementById('searchField')
        searchField.addEventListener('keypress', function (key) {
            if (key.key === 'Enter') {
                window.location = searchField.value + '.html'
            }
        })
        const searchBtn = this._shadowRoot.getElementById('searchBtn')
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault()
            window.location = searchField.value + '.html'
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
            </style>
            <div class="bottom-container">
                <nav class="top-navigation">
                    <ul class="top-navigation-list" id="topnav">
                        <li><a href="" class="active" id="hoofdpagina">Hoofdpagina</a></li>
                        <li><a href="" id="overleg">Overleg</a></li>
                        <li><a href="#" id="lezen">Lezen</a></li>
                        <li><a href="#" id="brontext">Brontext bekijken</a></li>
                        <li><a href="#" id="geschiedenis">Geschiedenis weergeven</a></li>
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
        topNav.addEventListener('itemClicked', function (e) {
            console.log(e.detail)
        })
    }
}

window.customElements.define('billy-topnav', topNav)