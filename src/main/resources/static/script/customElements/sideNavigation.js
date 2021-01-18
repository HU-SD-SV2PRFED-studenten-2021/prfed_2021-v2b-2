class sideNavigation extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `
            <!-- HTML -->
                <style>
                    * {
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                        transition: background-color 0.4s ease-out, color 0.4s ease-out;
                    }
                    a {
                        text-decoration: none;
                        background-color: var(--main-active-color);
                        box-shadow: 5px 5px darkred;
                        color: var(--main-color);
                        padding: 0.5em 0.5em;
                        position: relative;
                        transition: all ease-in 0.5s;
                    }
                    a:hover {
                      background-color: #ce0606;
                      cursor: pointer;
                    }
                    
                    a:active {
                      box-shadow: none;
                      top: 5px;
                      transition: all ease-in 0.2s;
                    }
                    ul {
                        list-style-type: none;
                    }
                    .side-container {
                        width: 20%;
                        height: 100vh;
                    }
                    .navigation {
                        display: flex;
                        border-top: 1px solid var(--main-text-color);
                        border-bottom: 1px solid var(--main-text-color);
                        border-right: 1px solid var(--main-text-color);
                        flex-direction: column;
                        justify-content: space-around;
                        margin-left: 5%;
                        height: 100vh;
                        background-color: var(--main-color);
                    }
                    @media (max-width: 850px) {
                        nav {
                            display: none;
                        }
                    }
                </style>
                <div class="side-container">
                    <billy-logo></billy-logo>
                    <nav role="navigation" aria-label="sidebar">
                        <ul class="navigation">
                            <li><a href="/index.html">Home</a></li>
                            <li><a href="/navigatie.html">Navigatie</a></li>
                            <li><a href=` + `${window.location}` + `>Hoofdpagina</a></li>
                            <li><a href="/recent.html">Recente wijzigingen</a></li>
                            <li><a href="/over.html">Over</a></li>
                        </ul>
                    </nav>
                </div>
        `
    }
}

window.customElements.define('billy-sidebar', sideNavigation)
