import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService } from 'primeng/api';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    isBlocked = false;

    user = { acc: '', pwd: '' };

    constructor(private service: ApiService, private messageService: MessageService, private router: Router) {

    }

    ngOnInit() {
        console.log(' login.component ngOnInit() ');
        localStorage.setItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY, '' );
    }

    onSubmit() {
        this.isBlocked = true;
        this.service.callApiService( 'verifyUser', this.user ).subscribe(
            result => {
                if ( result.check ) {
                    localStorage.setItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY, this.user.acc );
                    localStorage.setItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_NAME_KEY, result.data.name );
                    localStorage.setItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_PHOTO_KEY, result.data.personalPhoto );
                    this.router.navigate ( ['/home'] );
                }
                else {
                    console.log( result.msg );
                    this.messageService.add({ severity: 'error', summary: '錯誤', detail: result.msg });
                }
                this.isBlocked = false;
            },
            error => {
                console.log( error );
                this.messageService.add({ severity: 'error', summary: '錯誤', detail: error });
                this.isBlocked = false;
            }
        );
    }
}
