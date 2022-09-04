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
            <input-with-label name='fecha' type='date' min='${this.ahora[0]}'  required=true>
                Fecha
            </input-with-label>
            <input-with-label name='hora' type='time' required=true>
                Hora
            </input-with-label>
            <div>
                <button type='submit'>Agendar</button>
                <button type='button' id='cerrar'>Cerrar</button>
            </div>
        </form>
        ${this.getCss()}`;
        return template;
    }

    cerrar() {
        this.remove();
        window.location.hash = '';
    }

    get ahora() {
        return (new Date()).toISOString().split('T')
    }

    cambioFecha(fecha) {
        console.debug('fecha === this.ahora[0]', fecha === this.ahora[0], fecha, this.ahora[0])
        if (fecha === this.ahora[0]) {
            this.shadowRoot.querySelector('form input-with-label[name="hora"]')
                .setAttribute('min', this.ahora[1].substring(0, 5));
        }
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.getTemplet().content.cloneNode(true));
        this.shadowRoot.querySelector('form').onsubmit = () => {
            window.location.hash = '';
        }
        this.shadowRoot.querySelector('form button#cerrar').onclick = () => this.cerrar();
        this.shadowRoot.querySelector('form input-with-label[name="fecha"]')
            .querySelector('input')
            .onchange = e => {
                this.cambioFecha(e.target.value)
            };
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