import {Component, OnInit} from '@angular/core';
import {CategoriService} from "../../../service/categori.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.css']
})
export class ListTypeComponent implements OnInit{
  productsTypes!: any[];

  ngOnInit() {
    this.productTypeService.listTypeProduct().subscribe(res =>{
      this.productsTypes = res.modelsis.result.data;
      console.log(this.productsTypes)
    })
  }

  constructor(private productTypeService:CategoriService,private router:Router) {
  }


  navigate(id:any) {
    console.log(id)
    this.router.navigate(['/productType/form',id])
  }


  onDelete(idTypeProduct: string) {
    this.productTypeService.deleteProduct(idTypeProduct).subscribe(res=>{
      console.log(res)
    },error => {
      console.log(error)
    })
    
  }

}
