class fieldComponent extends HTMLElement {
    attrs = [];
    label = '';
    constructor() {
        super();
        this.label = this.innerText;
        this.innerText = '';
    }

    connectedCallback() {
        this.appendChild(this.getTemplate().content.cloneNode(true));
    }

    getTemplate() {
        const template = document.createElement('template');
        let attrs = fieldComponent.observedAttributes.reduce((a, b) => {
            const attr = this.attributes[b];
            return `${a} ${b}${attr && attr.value ? `='${attr.value}'` : ''}`;
        }, '');
        try {
            const params = new URL(location.href).searchParams;
            const valor = params.get(this.attributes['name'].value);
            if (valor) {
                attrs += ` value='${valor}'`;
            }
        } catch (error) {
            console.error(error);
        }
        template.innerHTML = `<label style='display: inline-block;padding:15px;'>
            ${this.label} <input${attrs}/>
        </label>`;
        return template;
    }

    static get observedAttributes() {
        return [
            'min',
            'name',
            'required',
            'type',
        ];
    }

    attributeChangedCallback(attr, _oldVal, newVal) {
        console.debug('change', attr, newVal);
        if (this.querySelector('input')
            && fieldComponent.observedAttributes.includes(attr)) {
            this.querySelector('input').setAttribute(attr, newVal);
        }
    }
}

customElements.define('input-with-label', fieldComponent);