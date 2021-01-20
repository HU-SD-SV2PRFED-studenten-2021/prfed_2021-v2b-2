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
            .article-searchbar-container{
                width: 100px;
            }
            div div {
                background-color: var(--main-color);
                color: var(--main-text-color);
                z-index: 3;
                padding-bottom: 5px;
                position: relative;
                width = inherit;
                height = auto;
                cursor = pointer;
            }
            div div:hover{
                background-color: var(--main-text-color);
                color: var(--main-color);
                cursor: pointer;
            }
            div div a{
                cursor: pointer;
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
            .article-searchbar-container{
                display: none;
                position: absolute;
                width: 200px;
                height: auto;
                background-color: var(--main-text-color);
                border: 0 1px 1px 1px solid var(--main-color);
                z-index: 2;
            }
            </style>
            <label><input type="text" id="searchField" placeholder="Wiki doorzoeken"/><a id="searchBtn" href="" aria-label="Search button">🔎</a></label>
           <div id="article-searchbar-container" class="article-searchbar-container"></div>
        `
        this.searchBtn()
    }

    searchBtn() {
        const searchField = this._shadowRoot.getElementById('searchField')
        const searchContainer = this._shadowRoot.querySelector('#article-searchbar-container');

        const BASE_URL = "/rest/articles";
        let articles;

        searchField.addEventListener('focus', function () {
            articles = [];

            fetch(BASE_URL, {
                method: 'GET'
            }).then(response => {
                if(response.status !== 200){
                    console.log(response.status);
                    throw response.status;
                }
                else{
                    response.json().then(data => {
                        for(let i = 0; i < data.length; i++){
                            articles.push(data[i]);
                        }
                    })
                }
            })
        });

        let inputCounter = 0;
        let characterArray = [];
        let newArr;
        searchField.addEventListener('input', function (event) {
            searchContainer.innerHTML = "";
            // End filtering process...
            //Adding div(children) to container element based on input
            for(let i = 0; i < articles.length; i++){
                if(articles[i].title.includes(searchField.value)){
                    let itemList = document.createElement("div");
                    itemList.setAttribute("id", articles[i].title);
                    itemList.setAttribute("class", "item-list");
                    itemList.innerHTML = articles[i].title;
                    itemList.addEventListener('click', function () {
                        window.location = articles[i].title + ".html";
                    })
                    searchContainer.appendChild(itemList);
                    searchContainer.style.display = "block";
                }
            }


            //Resetting process:
            //Check if searchfield is empty and reset.
            if(searchField.value.length === 0){
                while(searchContainer.firstChild){
                    searchContainer.removeChild(searchContainer.lastChild);
                }
                searchContainer.style.display = "none";
                characterArray = [];
                newArr = [];
                inputCounter = 0;
            }
        })

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