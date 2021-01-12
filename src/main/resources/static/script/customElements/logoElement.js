class logoElement extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML =
            `<!-- HTML -->
                <style>
                    img {
                        max-width: 275px;
                        width: 220px;
                        margin-top: -120px;
                        margin-left: 5%;
                    }
                    @media (max-width: 1150px) {
                    img {
                        width: 85%;
                    }}
                    @media (max-width: 850px) {
                      img {
                        position: absolute;
                        width: 40%;
                        max-width: 125px;
                        margin-left: 0;
                        top: 125px;
                      }
                    }
                    @media (max-width: 140px) {
                      * {
                        display:none;
                      }
                    }
                </style>
                <a href="/index.html" role="link" aria-label="link that takes you to the homepage"><img src="resources/hboilogo-nobg.png" alt="" role="img" aria-label="HBO-i logo"></a>
        `
    }
}

window.customElements.define('billy-logo', logoElement)
