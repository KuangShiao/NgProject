import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService } from 'primeng/api';
import { Constants } from '../utils/constants';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [MessageService]
})
export class HomeComponent implements OnInit {

    isBlocked = false;

    sidebarOpen = false;
    sidebarList: SidebarItem[] = [ { name: 'foldeOpen', icon: 'pi pi-folder-open', active: false }, 
                                   { name: 'users', icon: 'pi pi-users', active: false }
                                ];
    tabmenuContent = '';
    mainContent = '';

    cars = [];

    constructor(private service: ApiService, private messageService: MessageService) {
        
    }

    ngOnInit() {
        console.log('home.component.ts ngOnInit()');
    }

    sidebarEvent( sidebarItem?: SidebarItem ) {

        console.log('home.component.ts sidebarEvent()');
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
        console.log('home.component.ts openStatement()');

        this.mainContent = 'stockInfoQuery';

    }

}

class SidebarItem {
    name: string;
    icon: string;
    active: boolean;
}
