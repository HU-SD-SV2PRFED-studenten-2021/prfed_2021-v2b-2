class topNav extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = `<!-- HTML -->
            <style>
                a {
                    color: #0000EE;
                    text-decoration: none;
                    padding: 0 5px 3px 5px;
                    background-clip: padding-box;
                    background-image: linear-gradient(#f6f6f6, white);
                }
                .top-navigation-list li {
                    background-color: white;
                    border-right: solid black 1px;
                    border-left: solid black 1px;
                }
                ul {
                    list-style-type: none;
                }
                .top-navigation-list li a.active {
                    padding-bottom: 10px;
                    background-color: white;
                    background-clip: padding-box;
                }
                .top-navigation-list li:last-of-type {
                    border-right: none;
                    border-left: none;
                    background-color: #f6f6f6;
                }
                .bottom-container {
                    margin-top: 50px;
                    padding-bottom: 5px;
                    margin-left: -5%;
                }
                .top-navigation-list {
                    display: flex;
                    justify-content: space-around;
                    border-bottom: 1px solid black;
                }
                @media (max-width: 1040px) {
                    ul li {
                        font-size: 0.75em;
                    }
                }
                @media (max-width: 850px) {
                    a {
                        background-image: none;
                        background-color: #f6f6f6;
                    }
                    .top-navigation-list {
                        border-bottom: 0;
                        margin-left: -12px;
                    }
                    .top-navigation-list li {
                        border: none;
                        text-indent: -0.5em;
                        background-color: #f6f6f6;
                    }
                    .top-navigation-list li a.active {
                        background-color: #f6f6f6;
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
                <nav class="top-navigation">
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
        const topNavAList = this._shadowRoot.getElementById('topnav').childNodes
        const topNav = this._shadowRoot.getElementById('topnav')
        topNavAList.forEach(topNavA => {
            const topNavAChildren = topNavA.childNodes
            if (topNavAChildren.length > 0) {
                const actualAItem = topNavAChildren[0]
                actualAItem.addEventListener('click', function (e) {
                    topNav.dispatchEvent(new CustomEvent('itemClicked', {detail: actualAItem.id}))
                    e.preventDefault()
                    topNavAList.forEach(topNavChild => {
                        const topNavActualA = topNavChild.childNodes
                        if (topNavActualA.length > 0) {
                            const topNavActualAItem = topNavActualA[0]
                            topNavActualAItem.className = ''
                        }
                    })
                    actualAItem.className = 'active'
                })
            }
        })
    }
}

window.customElements.define('billy-topnav', topNav)