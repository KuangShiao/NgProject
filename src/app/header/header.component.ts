import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService } from 'primeng/api';
import { Constants } from '../utils/constants';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [MessageService]
})
export class HeaderComponent implements OnInit {

    isBlocked = false;

    topBarMenuVisible = false;

    constructor(private service: ApiService, private messageService: MessageService) {
        
    }

    ngOnInit() {
        console.log('header.component.ts ngOnInit()');
    }

    showTopbarMenu() {
        this.topBarMenuVisible = !this.topBarMenuVisible;
    }

}
