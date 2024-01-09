
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriService } from '../../../service/categori.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css'],
})
export class FormEditComponent implements OnInit {
  idProduct = this.router.snapshot.params['id'];
  productsTypes: any;
  typeProduct : any;
  productForm: FormGroup = new FormGroup<any>({
    productName: new FormControl(''),
    productType: new FormControl(''),
  });

  ngOnInit() {
    this.getProductTypes();
    this.getProduct();
  }

  onSave() {
    if (this.idProduct) {
      this.edit(this.idProduct);
    }
  }

  getProduct() {
    if (this.idProduct) {
      this.productService.product(this.idProduct).subscribe((res) => {
        const product = res.modelsis.result.data;

        this.productForm.patchValue({
          productName: product.productName,
          productType: product.productType.id,
        });

        const selectedProductType = this.productsTypes.find((type: any) => type.type === product.productType);
        console.log('selectedProductType'+selectedProductType)
        if (selectedProductType) {
          this.productForm.get('productType')?.setValue(selectedProductType.id);
          console.log("this.productForm.get('productType')?.setValue(selectedProductType.id)'+selectedProductType"+this.productForm.get('productType')?.setValue(selectedProductType.id))
        }
      });
    }
  }



  private edit(id: string) {
    if (this.productForm.valid) {
      const editedProduct = {
        id: id,
        productName: this.productForm.get('productName')?.value,
        productType: {
          id: this.productForm.get('productType')?.value,
        },
      };



      this.productService.editProduct(editedProduct).subscribe((res) => {
        console.log('editProduct', res);
      });
    }
  }

    getProductTypes() {
      this.productTypeService.listTypeProduct().subscribe((res) => {
        this.productsTypes = res.modelsis.result.data;
        console.log(this.productsTypes);
      });
    }

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private productTypeService: CategoriService
  ) {}
}

