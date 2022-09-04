// turn
class turnFormComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    getTemplet() {
        const template = document.createElement('template');
        template.innerHTML = `<form>
            <header>Agendar turno</header>
            <div>
                <button type='submit'>Agendar</button>
            </div>
        </form>
        ${this.getCss()}`;
        return template;
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.getTemplet().content.cloneNode(true));
        this.shadowRoot.querySelector('form').onsubmit = (e) => {
            e.preventDefault();
            window.location.hash = '';
        }
    }

    getCss = () => `<style>
            :host {
                background: rgba(0, 0, 0, .5);
                padding: 100px;
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: column;
            }
            
            form {
                background: rgba(0, 0, 0, .7);
                color: white;
            }

            header {
                background: rgba(0, 0, 0, .5);
                padding: 15px;
            }
        </style>`;
}

customElements.define('turn-form', turnFormComponent);