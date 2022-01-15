import { Component, OnInit, HostListener } from '@angular/core';
import { Constants } from '../utils/constants';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: []
})
export class HeaderComponent implements OnInit {

    topBarMenuVisible = false;

    constructor() {
    }

    ngOnInit() {
    }

    showTopbarMenu() {
        this.topBarMenuVisible = !this.topBarMenuVisible;
    }

    getUserId(): string {
        return localStorage.getItem(Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY);
    }

    @HostListener( 'document:click', ['$event'] )
    clickout( event: any ) {
        if ( event.target.className !== 'topbar-li' && event.target.className !== 'topbar-menu-button pi pi-bars' ) {
            if ( this.topBarMenuVisible ) {
                this.topBarMenuVisible = false;
            }
        }
    }

}
