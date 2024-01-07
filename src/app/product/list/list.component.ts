import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
products!: any[];
  ngOnInit() {
    this.productService.listProduct().pipe(
      tap((res)=>{
        console.log(res)
        this.products = res.modelsis.result.data;
        console.log(this.products)
      })
    ).subscribe()
  }



  constructor(private productService:ProductService,private router:Router) {
  }


  navigate(id:any) {
    this.router.navigate(['/add',id])
  }

  onDelete(idProduct: any) {
   this.productService.deleteProduct(idProduct).subscribe(res => {
     console.log(res)
   },error => {
     console.log(error)
   })
  }
}
