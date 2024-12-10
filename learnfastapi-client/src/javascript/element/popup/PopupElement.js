export class PopupElement extends HTMLElement {
    constructor(contentElement, buttonElements, width = 0, height = 0) {
        super();
        this.__contentElement = contentElement;
        this.__buttonElements = buttonElements;
        if (width !== 0)
            this.width = String(width);
        if (height !== 0)
            this.height = String(height);
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

        let popup_box = this.getElementsByClassName('popup_box')[0];
        this.getElementsByClassName('popup_box_content')[0]
            .appendChild(this.__contentElement);

        this.width && (popup_box.style.minWidth = this.width);
        this.height && (popup_box.style.height = popup_box.style.minHeight = this.height);
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
