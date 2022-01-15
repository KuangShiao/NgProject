import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule }  from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DropdownModule }  from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { SpinnerModule } from 'primeng/spinner';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent }  from './header/header.component';
import { HomeSidebarComponent } from './home/home-sidebar/home-sidebar.component';
import { HomeComponent } from './home/home.component';
// home layout template
import { StockInfoQueryComponent } from './home/home-content-template/stock-info-query/stock-info-query.component';
import { StockInventoryIncomeComponent } from './home/home-content-template/stock-inventory-income/stock-inventory-income.component';

import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeSidebarComponent,
    HomeComponent,
    StockInfoQueryComponent,
    StockInventoryIncomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    BlockUIModule,
	  ToastModule,
    TableModule,
    DropdownModule,
    DialogModule,
    SpinnerModule,
    KeyFilterModule,
    MessagesModule,
    MessageModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
