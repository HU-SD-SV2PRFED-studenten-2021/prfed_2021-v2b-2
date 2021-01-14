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
                @media screen and (max-width: 1400px) {
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
                <thead>
                    <th></th>
                    <th><a href="/software.html">Software</a></th>
                    <th><a href="/gebruikersinteractie.html">Gebruikersinteractie</a></th>
                    <th><a href="/organisatieprocessen.html">Organisatieprocessen</a></th>
                    <th><a href="/infrastructuur.html">Infrastructuur</a></th>
                    <th><a href="/hardware interfacing.html">Hardware interfacing</a></th>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="/analyseren.html">Analyseren</a></td>
                        <td><a href="/software analyseren.html">X</a></td>
                        <td><a href="/gebruikersinteractie analyseren.html">X</a></td>
                        <td><a href="/organisatieprocessen analyseren.html">X</a></td>
                        <td><a href="/infrastructuur analyseren.html">X</a></td>
                        <td><a href="/hardware interfacing analyseren.html">X</a></td>   
                    </tr>
                    <tr>
                        <td><a href="/adviseren.html">Adviseren</a></td>
                        <td><a href="/software adviseren.html">X</a></td>
                        <td><a href="/gebruikersinteractie adviseren.html">X</a></td>
                        <td><a href="/organisatieprocessen adviseren.html">X</a></td>
                        <td><a href="/infrastructuur adviseren.html">X</a></td>
                        <td><a href="/hardware interfacing adviseren.html">X</a></td>   
                    </tr>
                    <tr>
                        <td><a href="/ontwerpen.html">Ontwerpen</a></td>
                        <td><a href="/software ontwerpen.html">X</a></td>
                        <td><a href="/gebruikersinteractie ontwerpen.html">X</a></td>
                        <td><a href="/organisatieprocessen ontwerpen.html">X</a></td>
                        <td><a href="/infrastructuur ontwerpen.html">X</a></td>
                        <td><a href="/hardware interfacing ontwerpen.html">X</a></td>   
                    </tr>
                    <tr>
                        <td><a href="/realiseren.html">Realiseren</a></td>
                        <td><a href="/software realiseren.html">X</a></td>
                        <td><a href="/gebruikersinteractie realiseren.html">X</a></td>
                        <td><a href="/organisatieprocessen realiseren.html">X</a></td>
                        <td><a href="/infrastructuur realiseren.html">X</a></td>
                        <td><a href="/hardware interfacing realiseren.html">X</a></td>   
                    </tr>
                    <tr>
                        <td><a href="/manage and control.html">Manage and control</a></td>
                        <td><a href="/software manage and control.html">X</a></td>
                        <td><a href="/gebruikersinteractie manage and control.html">X</a></td>
                        <td><a href="/organisatieprocessen manage and control.html">X</a></td>
                        <td><a href="/infrastructuur manage and control.html">X</a></td>
                        <td><a href="/hardware interfacing manage and control.html">X</a></td>   
                    </tr>
                </tbody>
            </table>
            </div>
        `
        this.setMobileTable(this._shadowRoot.querySelector("table"))
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


window.customElements.define('billy-matrix', categoryMatrix)