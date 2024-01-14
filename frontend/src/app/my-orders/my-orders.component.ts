import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  displayedColumns = ['Nume', 'Adresa', 'Numar contact', 'Suma', 'Statut'];

  myOrderDetails: MyOrderDetails[] = [];

  constructor(private productService: ProductService) { } 
  
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.productService.getMyOrders().subscribe(
      (resp: MyOrderDetails[]) => {
        console.log(resp);
        this.myOrderDetails = resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
