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
                color: var(--main-link-color);
                
            }
            table, th, td {
                border: 1px solid var(--main-text-color);
            }
            th {
                text-align: left;
            }
            @media screen and (max-width: 722px) {
                  table thead {
                    display: none;
                  }
                  table td {
                    display: flex;
                  }
                  
                  table td::before {
                    content: attr(categorie);
                    width: 50px;
                    min-width: 155px;
                  }
                }
        </style>
            <table class="categories-table"></table>
        </ul>`
        this.generateTable()
    }

    getCategoryOrSubcategory(title) {
        switch (title) {
            case "Software":
            case "Gebruikersinteractie":
            case "Organisatieprocessen":
            case "Infrastructuur":
            case "Hardware interfacing":
                return "category"
            case "Analyseren":
            case "Adviseren":
            case "Ontwerpen":
            case "Realiseren":
            case "Manage and control":
                return "subcategory"
            default:
                return "other"
        }
    }

    getTHeadName(tab) {
        switch (tab) {
            case "title":
                return "Titel"
            case "lastEdited":
                return "Laatst bewerkt"
            case "category":
                return "Categorie"
            case "subcategory":
                return "Subcategorie"
        }
    }

    generateTable() {
        let link = window.location.href.split('/').pop();
        let titleLow = link.split('.')[0]
        let title = decodeURI(titleLow.charAt(0).toUpperCase() + titleLow.slice(1))
        let catOrSubcategory = this.getCategoryOrSubcategory(title)
        fetch(`/rest/${catOrSubcategory}/${title}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    let table = this._shadowRoot.querySelector('table')
                    let thead = table.createTHead()
                    for (let key of Object.keys(json[0])) {
                        if (key !== "content") {
                            let th = document.createElement("th")
                            let text = document.createTextNode(this.getTHeadName(key))
                            th.appendChild(text)
                            thead.appendChild(th)
                        }
                    }
                    for (let element of json) {
                        let catName = element.category.name.toLowerCase()
                        let subCatName = element.subcategory.name.toLowerCase()
                        if (element.title !== title.toLowerCase() &&
                        element.title !== `${catName} ${subCatName}`) {
                            let row = table.insertRow()
                            for (let key in element) {
                                if (key !== "content") {
                                    let name = element[key].name || element[key]
                                    name = name.charAt(0).toUpperCase() + name.slice(1)
                                    let cell = row.insertCell()
                                    if (key === "title") {
                                        let aElement = document.createElement("a")
                                        aElement.href = `/${name.toLowerCase()}.html`
                                        aElement.textContent = name
                                        cell.appendChild(aElement)
                                        row.appendChild(cell)
                                    } else {
                                        let text = document.createTextNode(name)
                                        cell.appendChild(text)
                                        row.appendChild(cell)
                                    }
                                }
                            }
                        }
                    }
                    this.setMobileTable(this._shadowRoot.querySelector("table"))
                })
            }
        })
    }

    setMobileTable(selector) {
        const tableEl = selector
        const thEls = tableEl.querySelectorAll('thead th');
        const tdLabels = Array.from(thEls).map(el => el.innerText);
        tableEl.querySelectorAll('tbody tr').forEach( tr => {
            Array.from(tr.children).forEach(
                (td, ndx) =>  td.setAttribute('categorie', tdLabels[ndx])
            );
        });
    }
}

window.customElements.define('billy-categories', showCategories);