import { E, setElementDisplay } from './DOM';
import {PostElement} from "./PostElement";

export class PopupElement extends HTMLElement {
    constructor(contentElement, buttonElements) {
        super();
        this.__contentElement = contentElement;
        this.__buttonElements = buttonElements;
    }
    connectedCallback() {
        this.innerHTML = `
            <div class="popup_box_container">
                <div class="popup_box">
                    <div class="popup_box_content">
                    </div>
                    <div class="popup_button_box">
                    </div>
                </div>
            </div>
        `;
        this.getElementsByClassName('popup_box_content')[0]
            .appendChild(this.__contentElement);
        this.__buttonElements.forEach(buttonElement => {
            this.getElementsByClassName('popup_button_box')[0]
                .appendChild(buttonElement);
            buttonElement.popupElement = this;
        });
    }
    close() {
        this.remove();
    }
}

customElements.define('popup-div', PopupElement);
