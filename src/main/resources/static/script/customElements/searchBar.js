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
            <label><input type="text" id="searchField" placeholder="Wiki doorzoeken"/>
                <a id="searchBtn" href="" aria-label="Search button">🔎</a>
            </label>
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