import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriService } from '../../service/categori.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CONSTANTES } from '../../constantes/constantes';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  idProduct: any;
  productsTypes!: any;
  type!: any;
  dialogTitle!: string;
  action!: string;
  constantes = CONSTANTES.TYPEACTION;
  productForm: FormGroup = new FormGroup<any>({
    productName: new FormControl(''),
    productType: new FormControl('')
  });

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private productTypeService: CategoriService,
    public matDialogRef: MatDialogRef<FormComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    if (_data.action === this.constantes.NEW) {
      this.dialogTitle = 'Ajouter un ';
      this.action = this.constantes.NEW;
    } else if (_data.action === this.constantes.EDIT) {
      this.dialogTitle = 'Modifier un ';
      this.idProduct = _data.information.idProduct;
      this.type = _data.information.type;
      this.getProduct(this.idProduct);
      this.action = this.constantes.EDIT;
    }
  }

  ngOnInit() {
    this.getProductTypes();
  }

  onSave() {
    if (this.action === this.constantes.NEW) {
      this.save();
    } else if (this.action === this.constantes.EDIT) {
      this.edit();
    }
  }

  getProduct(idProduct: string) {
    if (this.idProduct) {
      this.productService.product(this.idProduct).subscribe(res => {
        const product = res.modelsis.result.data;
        this.productForm.patchValue({
          productName: product.name,
          productType: product.type
        });

        if (this.productsTypes && this.productsTypes.length > 0) {
          const selectedProductType = this.productsTypes.find((type: any) => type.id === product.type.id);
          if (selectedProductType) {
            this.productForm.get('productType')?.setValue(selectedProductType.type);
          }
        }
      });
    }
  }

  getProductTypes() {
    this.productTypeService.listTypeProduct().subscribe(res => {
      this.productsTypes = res.modelsis.result.data;
      console.log('type de produits', this.productsTypes);
    });
  }

  private save() {
    this.productForm.patchValue({ productType: { id: this.productForm.get('productType')?.value } });
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(res => {
        this.matDialogRef.close(res);
        this.changeDetectorRef.markForCheck();
        console.log('ajout', res);
        if (res.modelsis.result.status === 'Success') {
          swal.fire({
            title: res.modelsis.result.status,
            text: res.modelsis.result.message,
            icon: 'success'
          });
        } else {
          swal.fire({
            title: res.modelsis.result.status,
            text: res.modelsis.result.message,
            icon: 'error'
          });
        }
      }, (error) => {
        swal.fire({
          title: 'Failed',
          text: 'Failed to add the product',
          icon: 'error'
        });
      });
    }
  }


  private edit() {
    if (this.productForm.valid) {
      const editedProduct = {
        id: this.idProduct,
        productName: this.productForm.get('productName')?.value,
        productType: {
          id: this.productForm.get('productType')?.value
        }
      };
      this.productService.editProduct(editedProduct).subscribe((res) => {
        this.matDialogRef.close(res);
        this.changeDetectorRef.markForCheck();
        console.log('Edition du produit :', res);

        if (res.modelsis.result.status === 'Success') {
          swal.fire({
            title: res.modelsis.result.status,
            text: res.modelsis.result.message,
            icon: 'success'
          });
        } else {
          swal.fire({
            title: res.modelsis.result.status,
            text: res.modelsis.result.message,
            icon: 'error'
          });
        }
      }, (error) => {
        swal.fire({
          title: 'Failed',
          text: 'Failed to edit the product',
          icon: 'error'
        });
      });
    }
  }

}
