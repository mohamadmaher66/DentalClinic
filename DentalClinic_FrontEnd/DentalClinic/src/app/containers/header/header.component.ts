import { Component, Input, Inject, Renderer2, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
    selector: 'app-header-custom',
    templateUrl: './header.component.html'
})

export class AppHeaderCustomComponent {

    navbarBrandText = { icon: '??', text: '?? CoreUI' };
    navbarBrandRouterLink = '';
    fixedClass = 'header-fixed';
    appHeaderClass = true;
    navbarClass = true;
    breakpoints = ['xl', 'lg', 'md', 'sm', 'xs'];
    sidebarTogglerClass = 'd-none d-md-block';
    sidebarTogglerMobileClass = 'd-lg-none';
    asideTogglerClass = 'd-none d-md-block';
    asideTogglerMobileClass = 'd-lg-none';

    constructor() {

    }
    ngOnInit() {
        this.isFixed(true);
        //this.navbarBrandImg = Boolean(this.navbarBrand || this.navbarBrandFull || this.navbarBrandMinimized);
        this.navbarBrandRouterLink = "['/dashboard']";
        this.sidebarTogglerClass = "'lg'";
        this.sidebarTogglerMobileClass = "'lg'";
        this.asideTogglerClass = "false";
        this.asideTogglerMobileClass = "false";
    }
    ngOnDestroy() {
        //this.renderer.removeClass(this.document.body, this.fixedClass);
    }
    isFixed(fixed = true) {
        // if (fixed) {
        //     this.renderer.addClass(this.document.body, this.fixedClass);
        // }
    }
    setToggerBreakpointClass(breakpoint = 'md') {
        let togglerClass = 'd-none d-md-block';
        if (this.breakpoints.includes(breakpoint)) {
            const breakpointIndex = this.breakpoints.indexOf(breakpoint);
            togglerClass = `d-none d-${breakpoint}-block`;
        }
        return togglerClass;
    }
    setToggerMobileBreakpointClass(breakpoint = 'lg') {
        let togglerClass = 'd-lg-none';
        if (this.breakpoints.includes(breakpoint)) {
            togglerClass = `d-${breakpoint}-none`;
        }
        return togglerClass;
    }
}