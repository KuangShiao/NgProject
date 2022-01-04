import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule }  from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DropdownModule }  from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { SpinnerModule } from 'primeng/spinner';
import { KeyFilterModule } from 'primeng/keyfilter';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent }  from './header/header.component';
import { HomeSidebarComponent } from './home/home-sidebar/home-sidebar.component';
import { HomeComponent } from './home/home.component';
// home layout template
import { StockInfoQueryComponent } from './home/home-content-template/stock-info-query/stock-info-query.component';
import { StockInventoryIncomeComponent } from './home/home-content-template/stock-inventory-income/stock-inventory-income.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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

    InputTextModule,
    ButtonModule,
    BlockUIModule,
	  ToastModule,
    TableModule,
    DropdownModule,
    DialogModule,
    SpinnerModule,
    KeyFilterModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
