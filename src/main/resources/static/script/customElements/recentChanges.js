class recentChanges extends HTMLElement{
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({
            mode:"open"
        })
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `<!-- HTML -->
        <style>
        * {
                    transition: background-color ease-out 0.5s, color ease-out 0.5s;
                }
                a {
                    color: var(--main-link-color);
                }
                th, td {
                    padding: 3px;
                }
                thead {
                    background-color: var(--main-active-color);
                }
                thead {
                    color: var(--main-color);
                }
                tr:nth-child(even){
                    background-color: var(--main-table-accent-color);  
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
        <table>
            <thead>
                <tr>
                    <th>Titel</th>
                    <th>Inhoud</th>
                    <th>Bewerkt op</th>
                    <th>Categorie</th>
                    <th>Subcategorie</th>
                </tr>
            </thead>
        </table>
        
        `
        this.loadTable();
    }

    loadTable() {
        fetch(`rest/getrecent`, {
            method: "GET"
        }).then(response => {
            if (!(response.ok)) {
                throw response.status
            } else {
                response.json().then(json => {
                    let table = this._shadowRoot.querySelector("table")
                    let tBody = table.createTBody()
                    if(json[0] === undefined) {
                        let message = document.createElement('p')
                        message.innerText = `Er is (nog) geen geschiedenis`
                        table.parentNode.appendChild(message)
                    }
                    json.forEach(historyItem => {
                        let row = tBody.insertRow()
                        let count = 0
                        let items = ["Titel", "Inhoud", "Bewerkt op", "Categorie", "Subcategorie"]
                        Object.keys(historyItem).forEach(actualItem => {

                            let itemTitle = historyItem[actualItem].name || historyItem[actualItem]
                            if (actualItem !== "id") {
                                let cell = row.insertCell()
                                if(actualItem === 'title') {
                                    cell.innerHTML = `<a href="/${itemTitle}.html">${itemTitle}</a>`
                                } else {
                                    cell.innerHTML = `${itemTitle}`

                                }
                                cell.setAttribute("title", items[count])
                                count += 1
                            }
                        })
                    })
                })
            }
        })
    }
}
window.customElements.define('billy-recentchanges', recentChanges);