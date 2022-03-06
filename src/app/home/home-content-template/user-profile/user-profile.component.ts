import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService } from 'primeng/api';
import { Constants } from 'src/app/utils/constants';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
    providers: []
})
export class UserProfileComponent implements OnInit {

    isBlocked = false;

    userProfile = [];

    constructor( public service: ApiService, private messageService: MessageService, private sanitizer: DomSanitizer ) {
    }

    ngOnInit() {
        this.findUserProfile();
    }

    getUserPhoto(): SafeUrl {
        const personalPhoto = localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_PHOTO_KEY ) ;
        if ( !personalPhoto || personalPhoto === 'null' ) {
            return null;
        }
        const objectURL = 'data:image/png;base64,' + personalPhoto;
        return this.sanitizer.bypassSecurityTrustUrl( objectURL );
    }

    findUserProfile() {
        const paramObj = {
            acc: localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY )
        };
        this.isBlocked = true;
        this.userProfile = [];
        this.service.callApiService( 'findUserProfile', paramObj ).subscribe(
            result => {
                if ( result.check ) {
                    this.userProfile.push( result.data );
                    // let objectURL = 'data:image/png;base64,' + this.userProfile[0].personalPhoto;
                    // this.personalPhoto = this.sanitizer.bypassSecurityTrustUrl( objectURL );
                    // upload header profile photo
                    localStorage.setItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_PHOTO_KEY, this.userProfile[0].personalPhoto );
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

    onBeforeUploadPhoto( event: any ) {
        this.isBlocked = true;
        event.formData.append( "acc", localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY ) );
    }

    onUploadPhoto( event: any ) {
        console.log( event );
        if ( event.originalEvent.body.check ) {
            this.messageService.add({ severity: 'info', detail: '更改成功' });
            this.findUserProfile();
        }
        else {
            this.messageService.add({ severity: 'error', summary: '錯誤', detail: event.originalEvent.body.msg });
        }
        this.isBlocked = false;
    }

}