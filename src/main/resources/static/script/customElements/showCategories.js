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
                color: #0000EE;
            }
            .categories-articles{
                list-style-type: square;
            }
        </style> 
            <ul class="categories-articles">
        </ul>`
        this.getCatArticles()
    }

    getCatArticles() {
        let link = window.location.href.split('/').pop();
        let titleLow = link.split('.')[0]
        let title = decodeURI(titleLow.charAt(0).toUpperCase() + titleLow.slice(1))
        fetch(`/rest/category/${title}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let list = this._shadowRoot.querySelector('ul')
                    json.forEach(article => {
                        let articleTitle = article.title
                        articleTitle = articleTitle.charAt(0).toUpperCase() + articleTitle.slice(1)
                        if (articleTitle === 'Index' || articleTitle === title) {
                            return
                        }
                        let newLi = document.createElement('li')
                        let newA = document.createElement('a')
                        newA.textContent = `${articleTitle} | Laatst bewerkt: ${article.lastEdited}`
                        newA.href = `/${articleTitle.toLowerCase()}.html`
                        newLi.appendChild(newA)
                        list.appendChild(newLi)
                    })
                })
            }
        })
    }
}

window.customElements.define('billy-categories', showCategories);