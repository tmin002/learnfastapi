import {PopupElement} from "./PopupElement";
import {createElement} from "./DOM";

export class OKPopupElement extends PopupElement {
    constructor(title, message) {
        super(
            createElement('div', `
                <h3>${title}</h3>
                <p>${message}</p>
            `),
            [
                createElement('button', `OK`, {
                    onclick: () => this.close()
                }),
            ]);
    }

    static show(title, message) {
        document.body.appendChild(new OKPopupElement(title, message));
    }
}
customElements.define('okpopup-div', OKPopupElement);
