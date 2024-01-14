import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout: string|null = '';
  productDetails: Product[] = [];
  isOrderDetailsInvalid: boolean = false;

  orderDetails: OrderDetails = {
    fullName: '',
    fullAdress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { productId: x.productId, quantity: 1 }
      )
    );

    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {

    if (!this.isOrderDetailsValid()) {
     
      return;
    }
  

    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"]);
      },
      (err) => {
        console.log(err);
      }

    );
  }

  private isOrderDetailsValid(): boolean {
    
    const isFullNameValid = this.orderDetails.fullName.trim() !== '';
    const isFullAddressValid = this.orderDetails.fullAdress.trim() !== '';
    const isContactNumberValid = this.orderDetails.contactNumber.trim() !== '';

    const isValid = isFullNameValid && isFullAddressValid && isContactNumberValid;

    this.isOrderDetailsInvalid = !isValid;

    return isValid;
  }

  getQuantityForProduct(productId: any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: any, productActualPrice: any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productActualPrice;
  }

  onQuantityChanged(q: any, productId: any) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;

  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productActualPrice;
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );

    return grandTotal;
  }


}
