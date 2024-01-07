import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriService} from "../../service/categori.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  idProduct = this.router.snapshot.params['id'];
  productsTypes! :any;
  productForm:FormGroup = new FormGroup<any>({
    productName:new FormControl(''),
    productType:new FormControl('')
  })


  ngOnInit() {
    this.getProductTypes();
    this.getProduct();
  }

  onSave(){
    console.log(this.productForm.value);
    this.save();

  }

  getProduct(){
    if (this.idProduct){
      this.productService.product(this.idProduct).subscribe(res=>{
        const product =  res.modelsis.result.data
        console.log(res);
        this.productForm.patchValue({
          productName: product.name,
          productType: product.type
        })
      })
    }
  }
  getProductTypes(){
    this.productTypeService.listTypeProduct().subscribe(res=>{
      this.productsTypes = res.modelsis.result.data;
      console.log(this.productsTypes)
    })
  }
  constructor(private productService:ProductService,private router:ActivatedRoute, private productTypeService:CategoriService) {
  }

  private save() {
    console.log(this.productForm.value)
    if (this.productForm.valid){
      this.productService.addProduct(this.productForm.value).subscribe(res=>{
        console.log(res)
      })
    }

  }


}
