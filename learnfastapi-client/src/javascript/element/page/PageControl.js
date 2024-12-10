import {E, setElementDisplay} from '../DOM';
import {HeaderControl} from "../HeaderControl";
export class PageControl {
    static __currentPage = null;
    static pages = {}

    static get currentPage() {
        return this.__currentPage;
    }
    static addPage(pageElement) {
        this.pages[pageElement.pageName] = pageElement;
    }
    static __setCurrentPage(pageName) {
        if (this.currentPage && this.currentPage.pageName === pageName)
            return;
        if (!(this.pages[pageName].onPageShow()))
            return;
        if (this.currentPage)
            setElementDisplay(this.currentPage, 'none');

        let pageBoxE = E("page_box");
        let pageInDOM = E("page-" + this.pages[pageName].pageName);
        if (pageInDOM)
            setElementDisplay(pageInDOM, 'block');
        else
            pageBoxE.appendChild(this.pages[pageName]);

        this.__currentPage = this.pages[pageName];
        if (Object.keys(this.pages).includes(pageName))
            HeaderControl.updateSelectedPage(pageName);
    }
}