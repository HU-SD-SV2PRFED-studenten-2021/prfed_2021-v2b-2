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
                        top: 125px;
                      }
                    }
                    @media (max-width: 140px) {
                      * {
                        display:none;
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
                        color: #0000EE;
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
        this.cats = []
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
                a{
                    text-decoration: none;
                }
                ul{
                    list-style-type: none;
                }
                .categories-list{
                    display: flex;
                    color: black;
                    border-right: 1px solid black;
                    border-left: 1px solid black;
                    justify-content: space-evenly;
                    margin: 20px 0;
                }
                .categories-list a{
                    color: black;
                }
                .main-container {
                    place-self: center;
                    width: 80%;
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
                a {
                    color: #0000EE;
                }
                
                #editButton{
                    float: right;
                    margin: 2px 5px 0 5px;
                    padding: 0 2px 0 2px;
                }
                .modal {
                    display: none;
                    position: fixed;
                    z-index: 1;
                    padding-top: 100px;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgb(0,0,0);
                    background-color: rgba(0,0,0,0.4);
                }
            
                .modal-content {
                    background-color: #fefefe;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                }
            
                .close {
                    color: #aaaaaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                }
            
                .close:hover,
                .close:focus {
                    color: #000;
                    text-decoration: none;
                    cursor: pointer;
                }.modal {
                    display: none;
                    position: fixed;
                    z-index: 1;
                    padding-top: 30vh;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgb(0,0,0);
                    background-color: rgba(0,0,0,0.4);
                }   
            
                .modal-content {
                    background-color: #fefefe;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                }
                
                .editArea{
                  resize: none;
                  width : 100%;
                  height: 100%;
                  padding-left: 2px;
                }
            
                .close {
                    color: #aaaaaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                }
            
                .close:hover,
                .close:focus {
                    color: #000;
                    text-decoration: none;
                    cursor: pointer;
                }
                
                .editTitle{
                display: inline-block;
                padding-right: 5px;
                }
                .categoryEdit{
                display: inline-block;
                }
                .editButtons{
                width: 25px;
                display: inline-block;
                }
                #saveButton {
                    width: 100%;
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
                    .categories-list {
                        display: block;
                        padding-left: 5px;
                    }
                    .categories-list li {
                        padding-bottom: 2px;
                    }
                }
                @media (max-width: 620px) {
                    div.main-container {
                        top: 80px;
                    }
                    .editTitle {
                        display: block;
                    }
                }
                </style>
                <div class="main-container">
                    <main>
                    <button id="editButton">Edit</button>
                    <div class="font-size-container" style="float: right">
                        <a style="font-size: small" href="#fontSizeSmall" id="fontSizeSmall">Aa</a>
                        <a style="font-size: medium" href="#fontSizeMedium" id="fontSizeMedium">Aa</a>
                        <a style="font-size: large" href="#fontSizeLarge" id="fontSizeLarge">Aa</a>
                    </div>
                    <h1 class="title" id="maintitle">Loading</h1>
                    <div class="content" id="maincontent">
                        <p><img src="https://i.giphy.com/3oEjI6SIIHBdRxXI40.gif" alt="loading gif"></p>     
                    </div>
                    </main>
                    <footer class="footer-info" id="billyfooter">
                        <p id="footercats">Categorieën: </p>
                        <ul class="categories-list" id="categories-list"></ul>                       
                        <p id="footerdate">Deze pagina is voor het laatst bewerkt op</p>
                        <a href="/privacy.html">Privacybeleid</a> <a href="/over.html">Over Billy</a> <a href="/voorbehoud.html">Voorbehoud</a>
                    </footer>
                        <div id="myModal" class="modal">
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <h1 id="editTitle" class = "editTitle"></h1>
                                <select id="categoryEditPlus" class="categoryEdit">
                                <option value="" disabled selected>voeg toe:</option>
                                </select>
                                <button class = "editButtons">+</button>
                                <select id="categoryEditMinus" class="categoryEdit">
                                <option value="" disabled selected>verwijder:</option>
                                </select>
                                <button class = "editButtons">-</button>
                                <textarea id="editArea" class="editArea"></textarea>
                                <button id="saveEdit" style="width: 100%">Save</button>
                            </div>
                        </div>
                </div>
        `
        this.loadFile()
        this.fontSize();
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
                                    li:first-of-type.message {
                                        margin-top: 5px;
                                    }
                                    li.message {
                                        border: solid black 1px;
                                        padding: 1px 1px 1px 5px;
                                        margin-top: 2px;
                                        width: 90%;
                                    }
                                    .fade li {
                                        transition: all 0.4s ease-out;
                                        opacity: 0;
                                        height: 0;
                                    }
                                    .fade li.show {
                                        opacity: 1;
                                        height: 1.5em;
                                    }
                                </style>
                                <form>
                                    <label>
                                        <input type="text" placeholder="Bericht" id="message">
                                        <button type="submit" id="submitBtn">Verzend</button>
                                    </label>
                                </form>
                                <ul id="messages" class="fade">
                                    <li class="show message">Wat een goede pagina! || anonymous</li>
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
                    setTimeout(function () {
                        listElement.className = listElement.className + ' show message'
                    }, 10)
                })
                return
            default:
                mc.innerHTML = this.originalText
                return
        }
    }

    makeEditModal(filename, text) {
        let modal = this._shadowRoot.getElementById("myModal");
        let editButton = this._shadowRoot.querySelector("#editButton");
        fetch("/rest/test", {
            method: 'POST',
            headers: {
                'Authorization': window.sessionStorage.getItem('myJWT')
            }
        }).then(function (response){
            if (response.status !== 200) {
                let mc = document.querySelector("billy-main")._shadowRoot.querySelector('.main-container');
                mc.querySelector("main").removeChild(editButton);
                mc.removeChild(modal);
            }
        });
        if (filename === "Index") {
            this._shadowRoot.querySelector(".main-container").querySelector("main").removeChild(editButton);
            this._shadowRoot.querySelector(".main-container").removeChild(modal);
        } else {
            const closeModal = this._shadowRoot.querySelector(".close");
            const editTitle = this._shadowRoot.querySelector("#editTitle")
            const editText = this._shadowRoot.querySelector("#editArea");
            const saveButton = this._shadowRoot.querySelector("#saveEdit");

            editText.onkeyup = function () {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight + 5) + 'px'
            }

            saveButton.onclick = function (event) {
                event.preventDefault();
                const data = {
                    title: `${filename}`,
                    content: `${editText.value}`,
                    categoryDTOs: [
                        {name: "Hardware interfacing"}
                    ]
                };

                fetch(`/rest/${filename.toLowerCase()}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `${window.sessionStorage.getItem("myJWT")}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then(response => {
                    if (response.status !== 200) {
                        console.log(response)
                        throw response.status
                    } else {
                        modal.style.display = "none"
                    }
                });
            }

            editButton.onclick = function () {
                editTitle.innerText = filename;
                editText.textContent = text.slice(3, -4)
                editText.setAttribute("rows", ((text.match("\r\n") || []).length + 1).toString())
                modal.style.display = "block";
                editText.style.height = (editText.scrollHeight + 5) + 'px'
            }


            closeModal.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            }
        }
    }

    loadFile() {
        let url = window.location.href;
        let filename = url.split('/').pop();
        filename = filename.split('.')[0]
        if (filename.length === 0) {
            window.location = "/index.html"
        }
        let filenameHigh = decodeURI(filename.charAt(0).toUpperCase() + filename.slice(1))
        this.fetchurl = `/rest/${filename}`
        fetch(this.fetchurl)
            .then(response => {
                if (response.status !== 200) {
                    throw response.status
                } else {
                    response.json().then(response => {
                        this.cats = response.categories
                        this._shadowRoot.getElementById('footerdate').innerText += ' ' + response.lastEdited
                        const mc = this._shadowRoot.getElementById('maincontent')
                        const editAreaText = response.content.replaceAll('\n', '\r\n')
                        this.originalText = response.content.replaceAll('\n', '<br>')
                        this.makeEditModal(filenameHigh, editAreaText)
                        mc.innerHTML = ``
                        mc.innerHTML = this.originalText
                        document.title = filenameHigh + ' | Billy'
                        this._shadowRoot.getElementById('maintitle').innerText = filenameHigh
                        this.getCategories()
                        this.evListener()
                        mc.querySelector('p').className += "paragraph-content";
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

    getCategories() {
        let URL = '/rest/categories'
        //Maybe sort categories by student's study and interests which will be highlighted first.

        fetch(URL)
            .then(response => {
                if (response.status !== 200) {
                    throw response.status;
                } else {
                    response.json().then(response => {
                        let categoriesFromResponse = response;
                        let categories = this._shadowRoot.querySelector('#categories-list');

                        let categoryItems = categories.getElementsByTagName("li");
                        for (let i = 0; i < categoriesFromResponse.length; i++) {
                            let catName = categoriesFromResponse[i].name
                            let createLI = document.createElement('li');
                            let createA = document.createElement('a');
                            let aNode = document.createTextNode(catName);

                            this.cats.forEach(cat => {
                                if (cat.name === catName) {
                                    createA.style.border = "solid 1px black"
                                    createA.style.padding = "0 2px 0 2px"
                                }
                            })
                            createA.setAttribute("href", `/${catName.toLowerCase()}.html`);

                            createA.appendChild(aNode);
                            let LiA = createLI.appendChild(createA);
                            categories.appendChild(createLI);
                            createLI.appendChild(LiA);
                        }
                    })
                }
            })
    }

    fontSize() {
        let font = document.querySelector("billy-main");
        this._shadowRoot.querySelector("#fontSizeSmall").addEventListener("click", function () {
            font.style = "font-size: x-small";
        });
        this._shadowRoot.querySelector("#fontSizeMedium").addEventListener("click", function () {
            font.style = "font-size: medium";
        });
        this._shadowRoot.querySelector("#fontSizeLarge").addEventListener("click", function () {
            font.style = "font-size: x-large";
        });
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
            @media (max-width: 620px) {
                a {
                    display: inline;
                }
                input#searchField {
                    width: 45%;
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
                    color: #0000EE;
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
                    a {
                        background-image: none;
                        background-color: #f6f6f6;
                    }
                    .top-navigation-list {
                        border-bottom: 0;
                        margin-left: -12px;
                    }
                    .top-navigation-list li {
                        border: none;
                        text-indent: -0.5em;
                        background-color: #f6f6f6;
                    }
                    .top-navigation-list li a.active {
                        background-color: #f6f6f6;
                        color: red;
                    }
                }
                @media (max-width: 620px) {
                    * {
                        display: none;
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

class navButton extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `
            <!-- HTML -->
            <style>
            @media (min-width: 620px) {
                * {
                display: none;
                }            
            }
            button {
                width: 55px;
                height: 55px;
                position: fixed;
                bottom: 0;
                right: 0;
                margin-right: 5px;
                margin-bottom: 5px;
                background-color: black;
                color: white;
                font-size: 1.5em;
                border-color: black;
                border-width: 2px;
                border-radius: 5px;
            }
            #navdiv {
                opacity: 0;
                width: 100%;
                height: 100%;
                position: fixed;
                top: 100%;
                background-color: lightgrey;
                text-align: center;
            }
            #navdiv.invisible {
                animation-name: disappear;
                animation-duration: 0.5s;
            }
            #navdiv.visible {
                opacity: 1;
                top: 0;
                animation-name: appear;
                animation-duration: 0.5s;
            }
            ul {
                list-style: none;
                padding-inline-start: 0;
            }
            li {
                padding-top: 5px;
            }
            a {
                color: black;
                text-decoration: underline;
            }
            @keyframes appear {
                0% {opacity: 0; top: 100%; left: 100%; border-radius: 100%}
                5% {opacity: 1;}
                100% {top: 0; left: 0; border-radius: 0}            
            }
            @keyframes disappear {
                0% {opacity: 1; top: 0; left: 0; border-radius: 0}
                100% {top: 100%; left: 100%; border-radius: 100%; opacity: 0;}            
            }
            </style>
            <button id="toggler">
            ☰
            </button>
            <div id="navdiv" class="">
                <h1>Menu</h1>
                <billy-search></billy-search>
                <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/navigatie.html">Navigatie</a></li>
                <li><a href="/recent.html">Recente wijzigingen</a></li>
                <li><a href="/">Hoofdpagina</a></li>
                </ul>
                <button id="toggler2">
                ☰
                </button>
            </div>
`
        const navdiv = this._shadowRoot.querySelector('#navdiv')
        this._shadowRoot.querySelector('#toggler').addEventListener('click', function (e) {
            e.preventDefault()
            if (navdiv.classList.contains('visible')) {
                navdiv.classList.remove('visible')
                navdiv.classList.add('invisible')
            }
        })
        this._shadowRoot.querySelector('#toggler2').addEventListener('click', function (e) {
            e.preventDefault()
            if (navdiv.classList.contains('visible')) {
                navdiv.classList.remove('visible')
                navdiv.classList.add('invisible')
            } else {
                navdiv.classList.remove('invisible')
                navdiv.classList.add('visible')
            }
        })
    }
}

window.customElements.define('billy-navbutton', navButton)


class showCategories extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `<!-- HTML -->
        <style>
            a{
                text-decoration: none;
            }
            .categories-list{
                list-style-type: none;
            }
        </style> 
        <ul class="categories-list">
            <li><a>Software</a></li>
            <li><a>Gebruikersinteractie</a></li>
            <li><a>Organisatieprocessen</a></li>
            <li><a>Hardware interfacing</a></li>
        </ul>`
    }
}

window.customElements.define('billy-categories', showCategories);