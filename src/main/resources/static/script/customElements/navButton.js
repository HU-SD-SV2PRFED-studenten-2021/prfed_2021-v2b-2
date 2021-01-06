class navButton extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `
            <!-- HTML -->
            <style>
            @media (min-width: 620px) {
                * {
                display: none;
                }            
            }
            button {
                width: 55px;
                height: 55px;
                position: fixed;
                bottom: 0;
                right: 0;
                margin-right: 5px;
                margin-bottom: 5px;
                background-color: black;
                color: white;
                font-size: 1.5em;
                border-color: black;
                border-width: 2px;
                border-radius: 5px;
            }
            #navdiv {
                opacity: 0;
                width: 100%;
                height: 100%;
                position: fixed;
                top: 100%;
                background-color: lightgrey;
                text-align: center;
            }
            #navdiv.invisible {
                animation-name: disappear;
                animation-duration: 0.5s;
            }
            #navdiv.visible {
                opacity: 1;
                top: 0;
                animation-name: appear;
                animation-duration: 0.5s;
            }
            ul {
                list-style: none;
                padding-inline-start: 0;
            }
            li {
                padding-top: 5px;
            }
            a {
                color: black;
                text-decoration: underline;
            }
            @keyframes appear {
                0% {opacity: 0; top: 100%; left: 100%; border-radius: 100%}
                5% {opacity: 1;}
                100% {top: 0; left: 0; border-radius: 0}            
            }
            @keyframes disappear {
                0% {opacity: 1; top: 0; left: 0; border-radius: 0}
                100% {top: 100%; left: 100%; border-radius: 100%; opacity: 0;}            
            }
            </style>
            <button id="toggler">
            ☰
            </button>
            <div id="navdiv" class="">
                <h1>Menu</h1>
                <billy-search></billy-search>
                <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/navigatie.html">Navigatie</a></li>
                <li><a href="/recent.html">Recente wijzigingen</a></li>
                <li><a href="/">Hoofdpagina</a></li>
                </ul>
                <button id="toggler2">
                ☰
                </button>
            </div>
`
        const navdiv = this._shadowRoot.querySelector('#navdiv')
        this._shadowRoot.querySelector('#toggler').addEventListener('click', function (e) {
            e.preventDefault()
            if (navdiv.classList.contains('visible')) {
                navdiv.classList.remove('visible')
                navdiv.classList.add('invisible')
            }
        })
        this._shadowRoot.querySelector('#toggler2').addEventListener('click', function (e) {
            e.preventDefault()
            if (navdiv.classList.contains('visible')) {
                navdiv.classList.remove('visible')
                navdiv.classList.add('invisible')
            } else {
                navdiv.classList.remove('invisible')
                navdiv.classList.add('visible')
            }
        })
    }
}

window.customElements.define('billy-navbutton', navButton)