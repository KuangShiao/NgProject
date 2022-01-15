import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService } from 'primeng/api';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    isBlocked = false;

    registerForm: FormGroup = this.fb.group(
                                             { acc: [ '', [ Validators.required ] ],
                                               pwd: [ '', [ Validators.required ] ],
                                               cfmPwd: [ '', [ Validators.required ] ],
                                               name: [ '', [ Validators.required ] ],
                                             }, 
                                             { validator: this.checkIfMatchingPwd( 'pwd' , 'cfmPwd' ) }
                                            );

    constructor( private service: ApiService, private messageService: MessageService, private router: Router, private fb: FormBuilder ) {

    }

    ngOnInit() {

    }

    onRegister() {
        console.log( this.registerForm.value );
        this.isBlocked = true;
        this.service.callApiService( 'register', this.registerForm.value ).subscribe(
            result => {
                console.log( result );
                if ( result.check ) {
                    if ( result.data ) {
                        this.messageService.add({ severity: 'success', detail: '註冊成功' });
                        setTimeout( () => {
                            this.router.navigate( ['/login'] );    
                        }, 3000);
                    }
                    else {
                        this.messageService.add({ severity: 'warn', summary: '錯誤', detail: '註冊失敗' });
                        this.isBlocked = false;
                    }
                }
                else {
                    console.log(result.msg);
                    this.messageService.add({ severity: 'error', summary: '錯誤', detail: result.msg });
                    this.isBlocked = false;
                }
            },
            error => {
                console.log( error );
                this.messageService.add({ severity: 'error', summary: '錯誤', detail: error });
                this.isBlocked = false;
            }
        );
    }

    checkIfMatchingPwd( pwd: string, cfmPwd: string ) {
        return ( group: FormGroup ) => {
            let passwordInput = group.controls[ pwd ],
                passwordConfirmationInput = group.controls[ cfmPwd ];
            if ( passwordInput.value !== passwordConfirmationInput.value ) {
              return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
            else {
                return passwordConfirmationInput.setErrors( null );
            }
        }
    }

}
