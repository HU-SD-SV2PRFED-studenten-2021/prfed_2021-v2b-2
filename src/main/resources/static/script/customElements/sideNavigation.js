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
                    }
                    a {
                        text-decoration: none;
                        color: #0000EE;
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
                        border-top: 1px solid black;
                        border-bottom: 1px solid black;
                        border-right: 1px solid black;
                        flex-direction: column;
                        justify-content: space-around;
                        margin-left: 5%;
                        height: 100vh;
                        background-color: white;
                    }
                    .navigation li {
                        border-bottom: 1px solid black;
                    }
                    @media (max-width: 1150px) {
                        ul li {
                            font-size: 0.75em;
                        }
                    }
                    @media (max-width: 850px) {
                        nav {
                            display: none;
                        }
                    }
                </style>
                <div class="side-container">
                    <billy-logo></billy-logo>
                    <nav>
                        <ul class="navigation">
                            <li><a href="/index.html">Home</a></li>
                            <li><a href="">Navigatie</a></li>
                            <li><a href="">Hoofdpagina</a></li>
                            <li><a href="">Recente wijzigingen</a></li>
                            <li><a href="">Hulpmiddelen</a></li>
                        </ul>
                    </nav>
                </div>
        `
    }
}

window.customElements.define('billy-sidebar', sideNavigation)
