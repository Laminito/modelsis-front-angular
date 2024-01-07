import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./product/list/list.component";
import {FormComponent} from "./product/form/form.component";
import {ProductTypeComponent} from "./product/product-type/product-type.component";
import {FormTypeComponent} from "./product/product-type/form-type/form-type.component";
import {ListTypeComponent} from "./product/product-type/list-type/list-type.component";
import {FormEditComponent} from "./product/product/form-edit/form-edit.component";

const routes: Routes = [
  {path: 'product', component: ListComponent},
  {path: 'add', component: FormComponent},
  {path: 'productType' ,component: ProductTypeComponent, children: [
      {path: 'list' , component: ListTypeComponent },
      {path: 'form' ,component: FormTypeComponent},
      {path: 'form/:id' ,component: FormTypeComponent },
    ]
  },
  {path: 'add/:id' ,component: FormEditComponent },
  {path:'**', redirectTo:'product'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
