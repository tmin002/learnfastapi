import {PopupElement} from "./PopupElement";
import {createElement} from "../DOM";

export class OKPopupElement extends PopupElement {
    constructor(title, message) {
        super(
            createElement('div', `
                <h3>${title}</h3>
                <p>${message}</p>
            `),
            [
                createElement('button', `OK`, {
                    '$self': {
                        eventName: 'onclick',
                        event: () => {
                            this.__return(true);
                            this.close();
                        }
                    }
                })
            ]);

        this.__promise = new Promise(resolve => {
            this.__return = resolve;
        })
    }

    static show(title, message) {
        let popup = new OKPopupElement(title, message)
        document.body.appendChild(popup);
        return popup.__promise;
    }
}
customElements.define('ok-popup-div', OKPopupElement);

export class OKCancelPopupElement extends PopupElement {
    constructor(title, message) {
        super(
            createElement('div', `
                <h3>${title}</h3>
                <p>${message}</p>
            `),
            [
                createElement('button', `OK`, {
                    '$self': {
                       eventName: 'onclick',
                       event: () => {
                           this.__return(true);
                           this.close();
                       }
                    }
                }),
                createElement('button', `Cancel`, {
                    '$self': {
                        eventName: 'onclick',
                        event: () => {
                            this.__return(false);
                            this.close();
                        }
                    }
                }),
            ]);

        this.__promise = new Promise(resolve => {
            this.__return = resolve;
        })
    }

    static show(title, message) {
        let popup = new OKCancelPopupElement(title, message)
        document.body.appendChild(popup);
        return popup.__promise;
    }
}
customElements.define('yes-no-popup-div', OKCancelPopupElement);
