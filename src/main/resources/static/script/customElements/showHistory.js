class showHistory extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `<!-- HTML -->
        <style>
        th, td {
            border: solid 1px var(--main-text-color);
        }
        table thead {
            display: none;
        }
        table td {
            display: flex;
        }
        table td::before {
            content: attr(title);
            width: 95px;
            min-width: 95px;
            border-right: solid 1px var(--main-text-color);
            margin-right: 5px;
        }
        tr {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
        }
        </style>
        <table>
            <thead>
                <tr>
                    <th>Inhoud</th>
                    <th>Bewerkt op</th>
                    <th>Categorie</th>
                    <th>Subcategorie</th>
                </tr>
            </thead>
        </table>
`
        let url = window.location.href;
        this.filename = url.split('/').pop();
        this.filename = this.filename.split('.')[0]
        this.filename = decodeURI(this.filename).toLowerCase()
        this.isAdmin = false
        this.loadTable()
    }

    loadTable() {
        fetch(`rest/history/${this.filename}`, {
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
                    fetch("/rest/testadmin", {
                        method: "POST",
                        headers: {
                            'Authorization': window.sessionStorage.getItem('myJWT')
                        }
                    }).then(resp => {
                        if (resp.ok) {
                            this.isAdmin = true
                        }
                        json.forEach(historyItem => {
                            let row = tBody.insertRow()
                            let count = 0
                            let items = ["Inhoud", "Bewerkt op", "Categorie", "Subcategorie"]
                            Object.keys(historyItem).forEach(actualItem => {
                                let itemTitle = historyItem[actualItem].name || historyItem[actualItem]
                                if (itemTitle !== this.filename && actualItem !== "id") {
                                    let cell = row.insertCell()
                                    cell.innerText = `${itemTitle}`
                                    cell.setAttribute("title", items[count])
                                    count += 1
                                }
                            })
                            if (this.isAdmin) {
                                let cell = row.insertCell()
                                cell.innerHTML = `<button>Zet deze terug</button>`
                                cell.querySelector("button").addEventListener("click", function (e) {
                                    e.preventDefault()
                                    if (confirm(`Weet je zeker dat je de edit van ${historyItem.editTime} wilt terugzetten?`)) {
                                        fetch(`rest/rollback/${historyItem.id}`, {
                                            method: "PUT",
                                            headers: {
                                                'Authorization': window.sessionStorage.getItem('myJWT')
                                            }
                                        }).then(response => {
                                            if (response.ok) {
                                                location.reload()
                                            } else if (response.status === 403) {
                                                alert("Je hebt hier niet de rechten voor")
                                            } else console.log(response.status)
                                        })
                                    }
                                })
                                cell.setAttribute("title", "Terugzetten")
                            }
                        })
                    })
                })
            }
        })
    }
}

window.customElements.define("billy-history", showHistory)