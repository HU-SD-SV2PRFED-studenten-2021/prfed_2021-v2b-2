class mainContainer extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
        this.originalText = ''
        this.cat = undefined
        this.subCat = undefined
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `
            <!-- HTML -->
                <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                    color: var(--main-text-color);
                    transition: background-color 0.4s ease-out, color 0.4s ease-out;
                }
                a{
                    text-decoration: none;
                    color: var(--main-link-color);
                }
                ul{
                    list-style-type: none;
                }
                .categories-list{
                    display: flex;
                    border-right: 1px solid var(--main-text-color);
                    border-left: 1px solid var(--main-text-color);
                    justify-content: space-evenly;
                    margin: 20px 0;
                }
                .categories-list a{
                    color: var(--main-text-color);
                }
                .main-container {
                    place-self: center;
                    width: 78%;
                    position: absolute;
                    left: 20%;
                    margin-right: 1%;
                    margin-top: -5px;
                    background: var(--main-color);
                    overflow: hidden;
                    min-height: 750px;
                    min-width: 75%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .main-container main {
                    padding-bottom: 5px;
                    border-bottom: 1px solid var(--main-text-color);
                    margin-left: 50px;
                    margin-top: 30px;
                }
                .title {
                    font-size: 1.8em;
                    border-bottom: 1px solid var(--main-text-color);
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
                    color: var(--main-link-color);
                }
                #editButton{
                    float: right;
                    margin: 0 5px 0 5px;
                }
                #darkButton {
                    float: right;
                }
                #postButton{
                    float: right;
                    margin: 0 5px 0 5px;
                }
                button {
                    color: var(--main-text-color);
                    background-color: var(--main-color);
                    border-color: var(--main-text-color);
                    border-radius: 5px;
                    border-width: 1px;
                    padding: 2px;
                }
                .modal {
                    display: none;
                    position: fixed;
                    z-index: 2;
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
                    background-color: var(--main-color);
                    margin: auto;
                    padding: 20px;
                    border: 1px solid var(--main-popup-color);
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
                }
                .editArea, .postArea{
                  resize: none;
                  width : 100%;
                  height: 100%;
                  padding-left: 2px;
                  background-color: var(--main-color);
                }
            
                .close {
                    color: #aaa;
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
                
                .modalOverlay {
                    z-index: 1;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: none;
                }
                
                .editTitle{
                display: inline-block;
                padding-right: 5px;
                }
                .categoryEdit, .categoryPost{
                display: inline-block;
                color: var(--main-text-color);
                background: var(--main-color);
                }
                .editButtons{
                width: 25px;
                display: inline-block;
                }
                #saveButton {
                    width: 100%;
                }
                .postTitle{
                display: inline-block;
                width: 20%;
                padding-right: 5px;
                color: var(--main-text-color);
                background: var(--main-color);
                }
                .PostButtons{
                width: 25px;
                display: inline-block;
                }
                .active {
                    text-decoration: underline;
                }
                #footerdate {
                    border-bottom: 1px solid var(--main-text-color);
                }
                @media (max-width: 850px) {
                    div.main-container {
                        left: 0;
                        width: 100%;
                    }
                    .main-container main {
                        margin-left: 20px;
                        margin-top: 10px;
                        border-top: solid var(--main-text-color) 1px;
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
                    <main role="main">
                    <button id="darkButton">Nacht mode</button>
                    <button id="editButton">Bewerk</button>
                    <button id="postButton">Nieuw artikel</button>
                    <div class="font-size-container" style="float: right">
                        <a style="font-size: small" href="#fontSizeSmall" id="fontSizeSmall" aria-label="set font size to small">Aa</a>
                        <a style="font-size: medium" href="#fontSizeMedium" id="fontSizeMedium" class="active" aria-label="set font size to medium">Aa</a>
                        <a style="font-size: large" href="#fontSizeLarge" id="fontSizeLarge" aria-label="set font size to large">Aa</a>
                    </div>
                    <h1 class="title" id="maintitle" role="heading">Loading</h1>
                    <div class="content" id="maincontent">
                        <p>Loading</p>     
                    </div>
                    </main>
                    <footer class="footer-info" id="billyfooter" role="contentinfo">
                        <p id="footerdate">Deze pagina is voor het laatst bewerkt op</p>
                        <p id="footercats">Categorieën: </p>
                        <ul class="categories-list" id="categories-list"></ul>
                        <p>Subcategorieën: </p>
                        <ul class="categories-list" id="subcategories-list"></ul>
                        <a href="/privacy.html">Privacybeleid</a> <a href="/over.html">Over Billy</a> <a href="/voorbehoud.html">Voorbehoud</a>
                    </footer>
                        <div class="modalOverlay" tabindex="-1"></div>
                        <div id="myEditModal" class="modal" aria-label="edit modal" aria-modal="true" role="dialog"">
                            <div class="modal-content">
                                <span class="closeEdit close" tabindex="0" aria-label="close dialog">&times;</span>
                                <h1 id="editTitle" class = "editTitle"></h1>
                                <select id="editCat" class="categoryEdit">
                                </select>
                                <select id="editSubCat" class="categoryEdit">
                                </select>
                                <textarea id="editArea" class="editArea"></textarea>
                                <button id="saveEdit" style="width: 100%">Save</button>
                            </div>
                        </div>
                        <div id="myPostModal" class="modal" aria-label="new article modal" aria-modal="true" role="dialog">
                            <div class="modal-content">
                                <span class="closePost close" tabindex="0" aria-label="close dialog">&times;</span>
                                <input placeholder="Titel" id="postTitle" class = "postTitle"/>
                                <select id="postCat" class="categoryPost">
                                </select>
                                <select id="postSubCat" class="categoryPost">
                                </select>
                                <textarea id="postArea" class="postArea"></textarea>
                                <button id="savePost" style="width: 100%">Save</button>
                            </div>
                        </div>
                </div>
        `
        this.darkMode(window.localStorage.getItem("readMode"))
        this.loadFile()
        this.darkEventlistener()
    }

    static get observedAttributes() {
        return ["mode"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const mc = this._shadowRoot.getElementById('maincontent')
        switch (newValue) {
            case "hoofdpagina":
                mc.innerHTML = this.originalText;
                break
            case "overleg":
                mc.innerHTML = `<!-- HTML -->
                                <style>
                                    #message {
                                        padding: 3px;
                                        width: 90%;
                                        margin-top: 5px;
                                        background-color: var(--main-color);
                                        color: var(--main-text-color);
                                        border-color: var(--main-text-color);
                                        border-width: 1px;
                                    }
                                    #messages {
                                        list-style-type: none;
                                    }
                                    li:first-of-type.message {
                                        margin-top: 5px;
                                    }
                                    li.message {
                                        border: solid var(--main-text-color) 1px;
                                        padding: 1px 1px 1px 5px;
                                        margin-top: 2px;
                                        width: 90%;
                                    }
                                    .fade li {
                                        transition: background-color 0.4s ease-out, color 0.4s ease-out, 
                                        opacity 1s ease-out;
                                        opacity: 0;
                                    }
                                    .fade li.show {
                                        opacity: 1;
                                        height: auto;
                                        min-height: 1.5em;
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
            case "lezen":
                mc.innerHTML = this.originalText;
                break
            case "brontext":
                mc.innerText = this.originalText;
                break
            case "geschiedenis":
                mc.innerHTML = this.originalText;
                break
            default:
                mc.innerHTML = this.originalText;
                break
        }
    }

    makeModal(isEdit, filename, text, modalElement, toggleButton, selectCat, selectSubCat, closeModal, title, textElement, saveButton) {
        const modalOverlay = this._shadowRoot.querySelector(".modalOverlay")
        let thisItem = this
        this.focusableEls = undefined
        fetch("/rest/test", {
            method: 'POST',
            headers: {
                'Authorization': window.sessionStorage.getItem('myJWT')
            }
        }).then(function (response) {
            if (response.status !== 200) {
                let mc = document.querySelector("billy-main")._shadowRoot.querySelector('.main-container');
                try {
                    mc.querySelector("main").removeChild(toggleButton);
                    mc.removeChild(modalElement);
                } catch (err) {
                }
            }
        });
        if ((this.cat.name === "Standaardpagina" || this.subCat.name === "Standaardpagina" || `${this.cat.name} ${this.subCat.name.toLowerCase()}` === filename) && isEdit) {
            this._shadowRoot.querySelector(".main-container").querySelector("main").removeChild(toggleButton);
            this._shadowRoot.querySelector(".main-container").removeChild(modalElement);
        } else {
            const category = this.cat.name
            const subcategory = this.subCat.name

            textElement.onkeyup = function () {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight + 5) + 'px'
            }

            saveButton.onclick = function (event) {
                event.preventDefault();
                if(isEdit){
                    saveEdit()
                }
                else {
                    savePost()
                }
            }

            toggleButton.onclick = function () {
                thisItem.focusableEls = modalElement.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
                thisItem.focusableEls = Array.prototype.slice.call(thisItem.focusableEls)
                fetch("/rest/categories", {
                    method: 'GET',
                }).then(response => {
                    if (response.status !== 200) {
                        console.log(response)
                        throw response.status
                    } else {
                        response.json().then(catList => {
                            selectCat.innerHTML = ""
                            const categoryElement = document.createElement("option")
                            categoryElement.value = category
                            categoryElement.textContent = category
                            selectCat.appendChild(categoryElement);

                            catList.forEach(cat => {
                                const categoryElement = document.createElement("option")
                                categoryElement.value = cat.name
                                categoryElement.textContent = cat.name
                                if (cat.name !== category) {
                                    selectCat.appendChild(categoryElement);
                                }
                            })
                        })
                    }
                })
                fetch("/rest/subcategories", {
                    method: 'GET',
                }).then(response => {
                    if (response.status !== 200) {
                        console.log(response)
                        throw response.status
                    } else {
                        response.json().then(catList => {
                            selectSubCat.innerHTML = ""
                            const categoryElement = document.createElement("option")
                            categoryElement.value = subcategory
                            categoryElement.textContent = subcategory
                            selectSubCat.appendChild(categoryElement);

                            catList.forEach(cat => {
                                const categoryElement = document.createElement("option")
                                categoryElement.value = cat.name
                                categoryElement.textContent = cat.name
                                if (cat.name !== subcategory) {
                                    selectSubCat.appendChild(categoryElement);
                                }
                            })
                        })
                    }
                })
                if(isEdit){
                    title.innerText = filename;
                    textElement.textContent = text
                    textElement.setAttribute("rows", ((text.match("\r\n") || []).length + 1).toString())
                }
                modalElement.style.display = "block";
                textElement.style.height = (textElement.scrollHeight + 5) + 'px'
                modalOverlay.style.display = "block";
                thisItem.focusableEls[1].focus()
            }
            closeModal.onclick = closing

            function savePost(){
                const data = {
                    title: `${title.value}`,
                    content: `${textElement.value}`,
                    categoryDTO: {name: `${selectCat.value}`},
                    subcategoryDTO: {name: `${selectSubCat.value}`}
                };

                fetch("/rest/article", {
                    method: 'POST',
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
                        location.reload()
                    }
                });
            }

            function saveEdit() {
                const data = {
                    title: `${filename}`,
                    content: `${textElement.value}`,
                    categoryDTO: {name: `${selectCat.value}`},
                    subcategoryDTO: {name: `${selectSubCat.value}`}
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
                        location.reload()
                    }
                });
            }
        }

        function closing() {
            modalElement.style.display = "none";
            modalOverlay.style.display = "none";
            toggleButton.focus()
        }

        modalElement.onkeydown = function (e) {
            let KEY_TAB = "Tab";
            let KEY_ESC = "Escape";
            let firstFocusableEl = thisItem.focusableEls[0]
            let lastFocusableEl = thisItem.focusableEls[thisItem.focusableEls.length - 1]

            function handleBackwardTab() {
                if (thisItem._shadowRoot.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            }

            function handleForwardTab() {
                if (thisItem._shadowRoot.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            }

            switch (e.key) {
                case KEY_TAB:
                    if (thisItem.focusableEls.length === 1) {
                        e.preventDefault();
                        break;
                    }

                    if (e.shiftKey) {
                        handleBackwardTab();
                    } else {
                        handleForwardTab();
                    }

                    break;
                case KEY_ESC:
                    closing()
                    break;
                default:
                    break;
            }
        };
    }

    loadFile() {
        let url = window.location.href;
        let filename = url.split('/').pop();

        const selectEditCat = this._shadowRoot.querySelector("#editCat");
        const selectEditSubCat = this._shadowRoot.querySelector("#editSubCat");
        const closeEditModal = this._shadowRoot.querySelector(".closeEdit");
        const editTitle = this._shadowRoot.querySelector("#editTitle")
        const editTextEl = this._shadowRoot.querySelector("#editArea");
        const saveEditButton = this._shadowRoot.querySelector("#saveEdit");
        let editModal = this._shadowRoot.getElementById("myEditModal");
        let editButton = this._shadowRoot.querySelector("#editButton");

        const selectPostCat = this._shadowRoot.querySelector("#postCat");
        const selectPostSubCat = this._shadowRoot.querySelector("#postSubCat");
        const closePostModal = this._shadowRoot.querySelector(".closePost");
        const postTitle = this._shadowRoot.querySelector("#postTitle")
        const postTextEl = this._shadowRoot.querySelector("#postArea");
        const savePostButton = this._shadowRoot.querySelector("#savePost");
        let postModal = this._shadowRoot.getElementById("myPostModal");
        let postButton = this._shadowRoot.querySelector("#postButton");

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
                        this.cat = response.category
                        this.subCat = response.subcategory
                        this._shadowRoot.getElementById('footerdate').innerText = `Deze pagina is voor het laatst bewerkt op ${response.lastEdited}`
                        const mc = this._shadowRoot.getElementById('maincontent')
                        const editAreaText = response.content.replaceAll('\n', '\r\n');
                        this.originalText = response.content.replaceAll('\n', '<br>');
                        this.makeModal(true, filenameHigh, editAreaText, editModal, editButton, selectEditCat, selectEditSubCat, closeEditModal, editTitle, editTextEl, saveEditButton);
                        this.makeModal(false, filenameHigh, "", postModal, postButton, selectPostCat, selectPostSubCat, closePostModal, postTitle, postTextEl, savePostButton);
                        mc.innerHTML = ``
                        mc.innerHTML = this.originalText
                        document.title = filenameHigh + ' | Billy'
                        this._shadowRoot.getElementById('maintitle').innerText = filenameHigh
                        this.getCategories("categories", "#categories-list", this.cat)
                        this.getCategories("subcategories", "#subcategories-list", this.subCat)
                        mc.querySelector('p').className += "paragraph-content";
                        this.fontSize()
                    })
                }
            }).catch(err => {
            let errMessage = "";
            switch (err) {
                case 404:
                    errMessage = "We hebben overal gezocht, maar we hebben dat niet kunnen vinden"
                    break
                case 403:
                    errMessage = "Je kunt het proberen maar dat is helaas iets wat je niet mag doen"
                    break
                case 500:
                    errMessage = "Uh oh dat is fout gegaan in ons systeem"
                    break
                default:
                    errMessage = "Er is veel geprobeerd, maar dat is niet gelukt"
            }
            this._shadowRoot.getElementById('maincontent').innerHTML = `<p>${errMessage}</p>`
            this._shadowRoot.getElementById('billyfooter').removeChild(this._shadowRoot.getElementById('footerdate'))
            this._shadowRoot.getElementById('billyfooter').removeChild(this._shadowRoot.getElementById('footercats'))
            document.title = filenameHigh + ' | Billy'
            this._shadowRoot.getElementById('maintitle').innerText = err
        })
    }

    getCategories(link, selector, object) {
        let URL = `/rest/${link}`

        fetch(URL)
            .then(response => {
                if (response.status !== 200) {
                    throw response.status;
                } else {
                    response.json().then(response => {
                        let categoriesFromResponse = response;
                        let categories = this._shadowRoot.querySelector(`${selector}`);
                        categories.innerHTML = ''
                        for (let i = 0; i < categoriesFromResponse.length; i++) {
                            let catName = categoriesFromResponse[i].name
                            let createLI = document.createElement('li');
                            let createA = document.createElement('a');
                            let aNode = document.createTextNode(catName);
                            if (object.name === catName) {
                                createA.style.border = "solid 1px var(--main-text-color)"
                                createA.style.padding = "0 2px 0 2px"
                            }
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
        let main = document.querySelector("billy-main");
        let body = document.querySelector("body");
        let search = document.querySelector("billy-topnav")._shadowRoot.querySelector("billy-search")._shadowRoot.querySelector("input")
        let size = localStorage.getItem("font-size") || "medium";
        let small = this._shadowRoot.querySelector("#fontSizeSmall")
        let medium = this._shadowRoot.querySelector("#fontSizeMedium")
        let large = this._shadowRoot.querySelector("#fontSizeLarge")
        main.style.fontSize = size;
        body.style.fontSize = size;
        search.style.fontSize = size;
        if (size === "x-large") {
            large.parentNode.childNodes.forEach(child => {
                child.className = ''
            })
            large.className = "active"
        } else if (size === "small") {
            small.parentNode.childNodes.forEach(child => {
                child.className = ''
            })
            small.className = "active"
        } else {
            medium.parentNode.childNodes.forEach(child => {
                child.className = ''
            })
            medium.className = "active"
        }
        small.addEventListener("click", function () {
            main.style.fontSize = "small";
            body.style.fontSize = "small";
            search.style.fontSize = "small";
            localStorage.setItem("font-size", "small")
            this.parentNode.childNodes.forEach(child => {
                child.className = ''
            })
            this.className = 'active'
        });
        medium.addEventListener("click", function () {
            main.style.fontSize = "medium";
            body.style.fontSize = "medium";
            search.style.fontSize = "medium";
            localStorage.setItem("font-size", "medium")
            this.parentNode.childNodes.forEach(child => {
                child.className = ''
            })
            this.className = 'active'
        });
        large.addEventListener("click", function () {
            main.style.fontSize = "x-large";
            body.style.fontSize = "x-large";
            search.style.fontSize = "x-large";
            localStorage.setItem("font-size", "x-large")
            this.parentNode.childNodes.forEach(child => {
                child.className = ''
            })
            this.className = 'active'
        });
    }

    darkEventlistener() {
        let darkButton = this._shadowRoot.querySelector("#darkButton")
        let doc = this
        darkButton.addEventListener("click", function (e) {
            e.preventDefault()
            doc.darkMode(darkButton.textContent)
        })
    }

    darkMode(content) {
        let darkButton = this._shadowRoot.querySelector("#darkButton")
        switch (content) {
            case "Nacht mode":
                darkButton.textContent = "Dag mode"
                document.querySelector("body").style.setProperty("--main-color", "rgb(33, 33, 33)")
                document.querySelector("body").style.setProperty("--main-text-color", "white")
                document.querySelector("body").style.setProperty("--main-link-color", "#5881ff")
                document.querySelector("body").style.setProperty("--main-popup-color", "rgb(49, 49, 49)")
                document.querySelector("body").style.setProperty("--main-active-color", "yellow")
                window.localStorage.setItem("readMode", "Nacht mode")
                return
            case "Dag mode":
                darkButton.textContent = "Nacht mode"
                document.querySelector("body").style.setProperty("--main-color", "white")
                document.querySelector("body").style.setProperty("--main-text-color", "rgb(33, 33, 33)")
                document.querySelector("body").style.setProperty("--main-link-color", "#0000EE")
                document.querySelector("body").style.setProperty("--main-popup-color", "lightgrey")
                document.querySelector("body").style.setProperty("--main-active-color", "red")
                window.localStorage.setItem("readMode", "Dag mode")
                return
            default:
                darkButton.textContent = "Nacht mode"
                document.querySelector("body").style.setProperty("--main-color", "white")
                document.querySelector("body").style.setProperty("--main-text-color", "rgb(33, 33, 33)")
                document.querySelector("body").style.setProperty("--main-link-color", "#5881ff")
                document.querySelector("body").style.setProperty("--main-popup-color", "rgb(49, 49, 49)")
                document.querySelector("body").style.setProperty("--main-active-color", "yellow")
                window.localStorage.setItem("readMode", "Dag mode")
                return
        }
    }
}

window.customElements.define('billy-main', mainContainer)