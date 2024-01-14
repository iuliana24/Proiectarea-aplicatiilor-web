import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProccessingService } from '../image-proccessing.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Numele produsului', 'Descriere', 'Pret redus', 'Pret', 'Actiuni'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProccessingService: ImageProccessingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword: any) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);

  }

  public getAllProducts(searchKeyword: string = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKeyword)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProccessingService.createImages(product)))
      )
      .subscribe(

        (resp: Product[]) => {
          console.log(resp);
          resp.forEach(product => this.productDetails.push(product));
          this.showTable = true;

          if (resp.length == 12) {
            this.showLoadMoreProductButton = true;
          } else {
            this.showLoadMoreProductButton = false;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  deleteProduct(productId: any) {
    this.productService.deleteProduct(productId).subscribe(

      (resp) => {
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId: any) {
    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }

}
