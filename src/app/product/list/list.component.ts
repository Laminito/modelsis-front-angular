import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CONSTANTES} from "../../constantes/constantes";
import {FormComponent} from "../form/form.component";
import swal from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
products!: any[];
dialogRef: any;
constantes = CONSTANTES.TYPEACTION;
  ngOnInit() {
    this.getList();
  }

  getList(){
    this.productService.listProduct().pipe(
      tap((res)=>{
        console.log(res)
        this.products = res.modelsis.result.data;
        console.log(this.products)
      })
    ).subscribe()
  }

  constructor(private productService:ProductService,
              private router:Router,
              private _matDialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,) {
  }


  navigate(id:any) {
    this.router.navigate(['/add',id])
  }

  onDelete(idProduct: any) {
   this.productService.deleteProduct(idProduct).subscribe(res => {
     console.log(res)
     this.changeDetectorRefs.markForCheck();
     this.getList();

     swal.fire({
       title: res.modelsis.result.status,
       text: res.modelsis.result.message,
       icon: "success"
     });
   },error => {
     console.log(error)
   })
  }

  openModal(action: string, information?: any){
    console.log('informations', information)
    this.dialogRef = this._matDialog.open(FormComponent, {
      panelClass: 'event-form-dialog',
      disableClose: true,
      width: "40rem",

      data: {
        action: action,
        information:information
      }
    });
    this.dialogRef.afterClosed().subscribe((resp: any) => {
      this.getList();
    });
  }
}
