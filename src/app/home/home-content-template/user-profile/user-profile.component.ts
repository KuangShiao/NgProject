import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

    @Output() refreshProfile = new EventEmitter();

    isBlocked = false;

    userProfile = [];

    constructor( public service: ApiService, private messageService: MessageService, private sanitizer: DomSanitizer ) {
    }

    ngOnInit() {
        this.findUserProfile();
    }

    getUserPhoto(): SafeUrl {
        if ( !this.userProfile || this.userProfile.length === 0 ) {
            return null;
        }
        const personalPhoto = this.userProfile[0].personalPhoto;
        const objectURL = 'data:image/png;base64,' + personalPhoto;
        return this.sanitizer.bypassSecurityTrustUrl( objectURL );
    }

    async findUserProfile() {
        const paramObj = {
            acc: localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY )
        };
        this.isBlocked = true;
        this.userProfile = [];
        await this.service.postApiService( 'findUserProfile', paramObj )
                          .then(( data: any ) => {
                                this.userProfile.push( data );
                          })
                          .catch(( error ) => {
                                this.messageService.add({ severity: 'error', summary: '錯誤', detail: error });
                          });
        this.isBlocked = false;
    }

    onBeforeUploadPhoto( event: any ) {
        this.isBlocked = true;
        event.formData.append( 'acc', localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY ) );
    }

    async onUploadPhoto( event: any ) {
        if ( event.originalEvent.body.check ) {
            this.messageService.add({ severity: 'info', detail: '更改成功' });
            await this.findUserProfile();
            // refresh header profile
            this.refreshProfile.emit();
        }
        else {
            this.messageService.add({ severity: 'error', summary: '錯誤', detail: event.originalEvent.body.msg });
        }
        this.isBlocked = false;
    }

}