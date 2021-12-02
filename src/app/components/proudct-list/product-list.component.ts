import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-proudct-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId:number;
  searchMode:Boolean;
  constructor(private productService: ProductService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    
    if(this.searchMode){
      this.handleSearchProduct();
    }
    else{this.handleListProduct();}
  }

  handleSearchProduct() {
    const theKeyword: string = String(this.route.snapshot.paramMap.get('keyword'));
    console.log("theKeyword"+theKeyword);
    this.productService.searchProducts(theKeyword).subscribe(
      data=>{
        this.products=data;
      }
    )
  }
handleListProduct(){
 // check if "id" parameter is available
 const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

 if (hasCategoryId) {
  // get the "id" param string. convert string to a number using the "+" symbol
  this.currentCategoryId =  Number(this.route.snapshot.paramMap.get("id"));
}
else {
  // not category id available ... default to category id 1
  this.currentCategoryId =1;
}

// now get the products for the given category id
this.productService.getProductList(this.currentCategoryId).subscribe(
  data => {
    this.products = data;
  }
)
}
}
