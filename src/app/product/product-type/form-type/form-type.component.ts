import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriService} from "../../../service/categori.service";

@Component({
  selector: 'app-form-type',
  templateUrl: './form-type.component.html',
  styleUrls: ['./form-type.component.css']
})
export class FormTypeComponent implements OnInit{



  idProductType = this.route.snapshot.params['id'];
  productTypeForm:FormGroup = new FormGroup<any>({
    type:new FormControl(''),
  })


  ngOnInit() {
    this.getProductType()
  }

  onSave(){
    console.log(this.productTypeForm.value)
    if (this.idProductType){
      this.edit();
    }
    else {
      this.save();
    }
  }

  getProductType(){
    if (this.idProductType)
    this.productTypeService.TypeProduct(this.idProductType).subscribe(res=>{
      const productType = res.modelsis.result.data
      console.log(res)
      this.productTypeForm.patchValue({
        type: productType.type
      })
    })
  }
  constructor(private productType:CategoriService,private route:ActivatedRoute, private productTypeService:CategoriService,private router:Router) {
  }

  private save() {
    console.log(this.productTypeForm.value)
    if (this.productTypeForm.valid){
      this.productType.addProductProduct(this.productTypeForm.value).subscribe(res=>{
        console.log(res)
        console.log('reussi...')
        this.router.navigate(['/productType/list'])
      },error => {
        console.log(error.modelsis.result.message);
      })
    }

  }

  private edit() {

    console.log(this.productTypeForm.value)
    if (this.productTypeForm.valid){
      this.productType.editProduct(this.productTypeForm.value).subscribe(res=>{
        console.log(res);
        this.router.navigate(['/productType/list'])
      },error => {
        console.log(error.modelsis.result.message);
      })
    }
  }

}
