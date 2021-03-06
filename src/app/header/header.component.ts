import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/utils/api.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: []
})
export class HeaderComponent implements OnInit {

    // ([mainContent])  (目前沒用到，本來設計要讓 user profile 也在 main content，但之後因為版面不需要那麼大，改 dialog)
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
    
    topBarMenuVisible = false;
    profileMenuVisible = false;

    userProfileDialog = false;

    personalPhoto = null;

    constructor( private service: ApiService, private router: Router, private sanitizer: DomSanitizer ) {
    }

    ngOnInit() {
        if ( this.getUserId() ) {
            this.findUserProfile();
        }
    }

    switchTopbarMenu() {
        this.topBarMenuVisible = !this.topBarMenuVisible;
    }

    switchProfileMenu() {
        this.profileMenuVisible = !this.profileMenuVisible;
    }

    showUserProfile() {
        this.userProfileDialog = true;
    }

    getUserId(): string {
        return localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY ) ;
    }

    getUserName(): string {
        return localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_NAME_KEY ) ;
    }

    getUserPhoto(): SafeUrl {
        if ( !this.personalPhoto ) {
            return null;
        }
        const objectURL = 'data:image/png;base64,' + this.personalPhoto;
        return this.sanitizer.bypassSecurityTrustUrl( objectURL );
    }

    async findUserProfile() {
        const paramObj = {
            acc: localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY )
        };
        await this.service.postApiService( 'findUserProfile', paramObj )
                          .then(( data: any ) => {
                                this.personalPhoto = data.personalPhoto;
                          })
                          .catch(( error ) => {
                                console.log( 'error occur:' , error );
                          });
    }

    setMainContent( s: string ) {
        console.log( 'setMainContent: ', s );
        this.mainContent = s;
    }
    
    logout() {
        this.router.navigate ( ['/logout'] );
    }

    @HostListener( 'document:click', ['$event'] )
    clickout( event: any ) {
        // console.log( event.target.className );
        if ( event.target.className !== 'topbar-li' && event.target.className !== 'topbar-menu-button pi pi-bars' &&
                event.target.className !== 'profile-li'  && event.target.className !== 'profile-a' &&
                event.target.className !== 'profile-image-div'  && event.target.className.indexOf('profile-image') === -1 &&
                event.target.className !== 'profile-info'  && event.target.className !== 'profile-name' ) {
            if ( this.topBarMenuVisible ) {
                this.topBarMenuVisible = false;
            }
            if ( this.profileMenuVisible ) {
                this.profileMenuVisible = false;
            }
        }
    }

    @HostListener( 'window:resize', ['$event'] )
    onResize( event: any ) {
        if ( event.target.innerWidth > 1080 ) {
            this.topBarMenuVisible = false;
        }
    }

}
