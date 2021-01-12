class topNav extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `<!-- HTML -->
            <style>
                * {
                    transition: background-color 0.4s ease-out, color 0.4s ease-out;
                }
                a {
                    color: var(--main-link-color);
                    text-decoration: none;
                    padding: 0 5px 3px 5px;
                    background-color: var(--main-color);
                }
                .top-navigation-list li {
                    border-right: solid var(--main-text-color) 1px;
                    border-left: solid var(--main-text-color) 1px;
                }
                ul {
                    list-style-type: none;
                }
                .top-navigation-list li a.active {
                    padding-bottom: 10px;
                    background-color: var(--main-color);
                    background-clip: padding-box;
                }
                .top-navigation-list li:last-of-type {
                    border-right: none;
                    border-left: none;
                    background-color: var(--main-color);
                }
                .bottom-container {
                    margin-top: 50px;
                    padding-bottom: 5px;
                    margin-left: -5%;
                }
                .top-navigation-list {
                    display: flex;
                    justify-content: space-around;
                    border-bottom: 1px solid var(--main-text-color);
                }
                @media (max-width: 1040px) {
                    ul li {
                        font-size: 0.75em;
                    }
                }
                @media (max-width: 850px) {
                    a {
                        background-image: none;
                        background-color: var(--main-color);
                    }
                    .top-navigation-list {
                        border-bottom: 0;
                        margin-left: -12px;
                    }
                    .top-navigation-list li {
                        border: none;
                        text-indent: -0.5em;
                        background-color: ;
                    }
                    .top-navigation-list li a.active {
                        background-color: var(--main-color);
                        color: red;
                    }
                }
                @media (max-width: 620px) {
                    * {
                        display: none;
                    }
                }
            </style>
            <div class="bottom-container">
                <nav class="top-navigation" role="navigation" aria-label="Top navigation">
                    <ul class="top-navigation-list" id="topnav">
                        <li><a href="" class="active" id="hoofdpagina">Hoofdpagina</a></li>
                        <li><a href="" id="overleg">Overleg</a></li>
                        <li><a href="" id="lezen">Lezen</a></li>
                        <li><a href="" id="brontext">Brontext bekijken</a></li>
                        <li><a href="" id="geschiedenis">Geschiedenis weergeven</a></li>
                        <li><billy-search></billy-search></li>
                    </ul>
                </nav>
            </div>
        `
        this.topnav()
    }

    topnav() {
        this._shadowRoot.querySelectorAll("a").forEach(aItem => {
            aItem.addEventListener('click', function (e) {
                e.preventDefault()
                this.parentNode.parentNode.querySelectorAll("a").forEach(otherA => otherA.className = '')
                aItem.className = 'active'
                document.querySelector("billy-main").setAttribute("mode", `${aItem.id}`)
                document.querySelector('billy-navbutton')._shadowRoot.querySelector(`#modeList`)
                    .childNodes.forEach(child => {
                        if (child.nodeType !== 3) {
                            child.childNodes.forEach(innerChild => innerChild.classList.remove("active"))
                        }
                })
                document.querySelector('billy-navbutton')._shadowRoot.querySelector(`#${aItem.id}`).classList.add("active")
            })
        })
    }
}

window.customElements.define('billy-topnav', topNav)