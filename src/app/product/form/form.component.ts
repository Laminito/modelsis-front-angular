import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriService} from "../../service/categori.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CONSTANTES} from "../../constantes/constantes";
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  idProduct:any;
  productsTypes! :any;
  dialogTitle!: string;
  action!:string;
  constantes = CONSTANTES.TYPEACTION;
  productForm:FormGroup = new FormGroup<any>({
      productName:new FormControl(''),
      productType:new FormControl('')
    })
  ngOnInit() {
    this.getProductTypes();
  }

  onSave(){
    if (this.action == this.constantes.NEW){
      this.save();
    }else if(this.action == this.constantes.EDIT){
      this.edit();
    }

  }

  getProduct(idProduct:string){
    if (idProduct){
      this.productService.product(idProduct).subscribe(res=>{
        const product =  res.modelsis.result.data
        console.log('resultat',res);
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
      console.log('type de produits',this.productsTypes)
    })
  }
  constructor(private productService:ProductService,
              private router:ActivatedRoute,
              private productTypeService:CategoriService,
              public matDialogRef: MatDialogRef<FormComponent>,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) _data: any) {
    console.log('data',_data)
    if (_data.action == this.constantes.NEW){
      this.dialogTitle = "Ajouter un ";
      this.action = this.constantes.NEW
    }else if(_data.action == this.constantes.EDIT){
      this.dialogTitle = "Modifier un ";
      this.idProduct  = _data.information.idProduct
      this.getProduct(this.idProduct)
      this.action = this.constantes.EDIT;
    }
  }

  private save() {
    this.productForm.patchValue({productType:{id:this.productForm.get('productType')?.value}})
    if (this.productForm.valid){
      this.productService.addProduct(this.productForm.value).subscribe(res=>{
        this.matDialogRef.close(res);
        this.changeDetectorRef.markForCheck();
        console.log('ajout', res)
        swal.fire({
          title: res.modelsis.result.status,
          text: res.modelsis.result.message,
          icon: "success"
        });
      })
    }

  }
  private edit() {
    this.productForm.patchValue({id:this.idProduct,productType:{id:this.productForm.get('productType')?.value}})
    if (this.productForm.valid){
      this.productService.editProduct(this.productForm.value).subscribe(res=>{
        this.matDialogRef.close(res);
        this.changeDetectorRef.markForCheck();
        console.log('ajout', res)
        swal.fire({
          title: res.modelsis.result.status,
          text: res.modelsis.result.message,
          icon: "success"
        });
      })
    }

  }


}
