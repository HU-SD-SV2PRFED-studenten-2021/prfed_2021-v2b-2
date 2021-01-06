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
                        location.reload()
                    }
                });
            }

            editButton.onclick = function () {
                editTitle.innerText = filename;
                editText.textContent = text
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