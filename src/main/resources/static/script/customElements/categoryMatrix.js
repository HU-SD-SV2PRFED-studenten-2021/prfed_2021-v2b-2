class categoryMatrix extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML =
            `<!-- HTML -->
            <style>
                a {
                    color: var(--main-link-color);
                }
                th, td {
                    border: 1px solid var(--main-text-color);
                    padding: 3px;
                }
                @media screen and (max-width: 930px) {
                  table thead {
                    display: none;
                  }
                  table td {
                    display: flex;
                  }
                  
                  table td::before {
                    content: attr(categorie);
                    width: 75%;
                    min-width: 120px;
                  }
                }
            </style>
            <div style="overflow-x: auto">
            <table>
            </table>
            </div>
        `
        fetch("rest/categories", {
            method: "GET"
        }).then(response => {
            if (!(response.ok)) {
                console.log(response)
                throw response.status
            } else response.json().then(categories => {
                fetch("rest/subcategories", {
                    method: "GET"
                }).then(resp => {
                    if (resp.ok) {
                        resp.json().then(subcategories => this.generateTable(categories, subcategories))
                    } else throw resp.status
                }).catch(err => console.log(err))
            })
        })
    }
    generateTable(categories, subcategories) {
        let table = this._shadowRoot.querySelector("table")
        table.innerHTML = ``
        let tHead = table.createTHead()
        let row = tHead.insertRow()
        row.insertCell()
        categories.forEach(category => {
            let cell = row.insertCell()
            let catName = category.name.toLowerCase()
            let catNameHigh = category.name
            cell.innerHTML = `<a href="/${catName}.html" aria-label='${catName} category page'">${catNameHigh}</a>`
        })
        let tBody = table.createTBody()
        subcategories.forEach(subcategory => {
            let subCatName = subcategory.name.toLowerCase()
            let subCatNameHigh = subcategory.name
            let row = tBody.insertRow()
            row.insertCell().innerHTML = `<a href="/${subCatName}.html" aria-label='${subCatName} subcategory page'">${subCatNameHigh}</a>`
            categories.forEach(cat => {
                let catName = cat.name.toLowerCase()
                let catNameHigh = cat.name
                let subCatRow = row.insertCell()
                subCatRow.innerHTML = `<a href="/${catName} ${subCatName}.html" aria-label='${catName} category and ${subCatName} subcategory page'>X</a>`
                subCatRow.setAttribute("categorie", catNameHigh)
            })
        })
    }
}

window.customElements.define('billy-matrix', categoryMatrix)