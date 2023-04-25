const access_url = document.currentScript.getAttribute('url') === null ?
    document.currentScript.getAttribute('url') : '';

window.radishBounds = {};

function updateBindings(bindings, res) {
    for(let binding of bindings) {
        updateBinding(binding, res);
    }
}

function updateBinding(binding, res) {
    let windowBinding = window.radishBounds[binding];
    if(!windowBinding) return

    windowBinding.callback(res);
}

class RadishDynamic extends HTMLElement {

    constructor() {
        super();
    }

    request(url, callback) {
        fetch(url).then((res) => {
            if(!res.ok) return;
            res.json().then((value) => {
                callback(value);
            });
        });
    }

    updateText(attr, res) {
        this.innerText = res[attr];

        let callback = this.getAttribute('callback');
        if(callback !== null) window[callback](res);

        this.setAttribute('loaded', '');
    } 

    connectedCallback() {
        let placeholder = this.getAttribute('placeholder');
        if(placeholder) this.innerText = placeholder;

        let get = this.getAttribute('get');
        let bind = this.getAttribute('bind');
        if(bind !== null) { // Add binding
            window.radishBounds[bind] = {
                callback: (res) => {
                    this.updateText(bind, res);
                }
            };
            return
        }

        if(get === null) {
            console.error(`UnspecifiedError: Cannot get data for dynamic element, no 'get' or 'bind' defined`);
            return
        }

        this.request(`${access_url}/${get}`, (res) => {
            let attr = this.getAttribute('attr');
            attr = (attr !== null) ? attr : 'text';

            this.updateText(attr, res);
        });
    }

    disconnectedCallback() {}

    adoptedCallback() {}

    attributeChangedCallback() {}
}

customElements.define('external-value', RadishDynamic);

exports = {
    updateBinding, updateBindings
};

document.querySelectorAll('[rjs-bind]').forEach((value) => {
});

document.querySelectorAll('[rjs-click]').forEach((value) => {
    value.addEventListener('click', (event) => {
        window[value.getAttribute('rjs-click')](event);
    });
});

window.bindings = new Proxy(window, {
    get: (target, key, value) => {
        return target[key]
    },
    set: (target, key, value) => {
        console.log(`${key} set to ${value}`);
        target[key] = value;
        return true
    }
});
