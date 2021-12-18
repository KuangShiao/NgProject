import { Component, OnInit, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'home-sidebar',
    templateUrl: './home-sidebar.component.html',
    styleUrls: ['./home-sidebar.component.css'],
    providers: []
})
export class HomeSidebarComponent implements OnInit {

    // ([sidebarOpen])
    private _sidebarOpen = false;
    get sidebarOpen(): boolean {
        return this._sidebarOpen;
    }
    @Input()
    set sidebarOpen( b: boolean ) {
        this._sidebarOpen = b;
        this.sidebarOpenChange.emit( this._sidebarOpen );
    }
    @Output()
    sidebarOpenChange = new EventEmitter<boolean>();

    // ([mainContent])
    private _mainContent = '';
    get mainContent(): string {
        return this._mainContent;
    }
    @Input()
    set mainContent( s: string ) {
        this._mainContent = s;
        this.mainContentChange.emit( this._mainContent );
    }
    @Output()
    mainContentChange = new EventEmitter<string>();

    sidebarList: SidebarItem[] = [ { name: 'stock', icon: 'fa fa-line-chart', active: false }, 
                                   { name: 'users', icon: 'pi pi-users', active: false }
                                ];
    tabmenuContent = '';

    constructor( private eRef: ElementRef ) {

    }

    ngOnInit() {

    }

    sidebarEvent( sidebarItem?: SidebarItem ) {

        if ( sidebarItem ) {
            sidebarItem.active = !sidebarItem.active;
            this.sidebarOpen = sidebarItem.active;
            for ( let item of this.sidebarList ) {
                if ( item.name !== sidebarItem.name ) { // 將其他選項關閉
                    item.active = false;
                }
            }
            this.tabmenuContent = sidebarItem.name;
        }
        else {
            this.sidebarOpen = false;
            for ( let item of this.sidebarList ) {
                item.active = false;
            }
        }
    }

    openStatement() {
        console.log( 'home-sidebar.component.ts openStatement()' );
        this.mainContent = 'stockInfoQuery';
        this.sidebarEvent();     // close sidebar
    }

    @HostListener( 'document:click', ['$event'] )
    clickout( event: any ) {
        if ( !this.eRef.nativeElement.contains( event.target ) ) {
            this.sidebarEvent();     // close sidebar
        }
    }

}

class SidebarItem {
    name: string;
    icon: string;
    active: boolean;
}
