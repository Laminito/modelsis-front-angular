import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './product/list/list.component';
import { FormComponent } from './product/form/form.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProductTypeComponent } from './product/product-type/product-type.component';
import { ListTypeComponent } from './product/product-type/list-type/list-type.component';
import { FormTypeComponent } from './product/product-type/form-type/form-type.component';
import { FormEditComponent } from './product/product/form-edit/form-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    HeaderComponent,
    ProductTypeComponent,
    ListTypeComponent,
    FormTypeComponent,
    FormEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
