import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { Product } from '../_model/product.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Nume', 'Descriere', 'Pret', 'Actiune'];

  cartDetails: Product[] = [];
  product: Product[] = [];
  

  constructor(
    private productService: ProductService,
    private router: Router,
  
  ) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: any) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        console.log(resp);
        this.getCartDetails();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCartDetails() {


    this.productService.getCartDetails()
      
      .subscribe(
        (response: any) => {
          console.log(response);
          this.cartDetails = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  checkout() {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false,
      id: 0
    }]);

  }
}
