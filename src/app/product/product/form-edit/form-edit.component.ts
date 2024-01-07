import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {CategoriService} from "../../../service/categori.service";

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit{
  objectProduct = {
    id:'',
    productName: '',
    productType: {
      id: '',
    },
  }

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
    console.log(this.productForm.value)
    if (this.idProduct){
      this.edit(this.idProduct);
    }
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


  private edit(id:string) {
    const val = this.productsTypes.filter((res:any) => res.type == this.productForm.get('productType')?.value)[0];
    console.log(val)
    this.objectProduct.id = this.idProduct
    this.objectProduct.productName = this.productForm.get('productName')?.value
    this.objectProduct.productType.id = val.idTypeProduct;

    console.log(this.objectProduct)
    if (this.productForm.valid){
      this.productService.editProduct(this.productForm.value).subscribe(res=>{
        console.log(res)
      })
    }
  }

}
