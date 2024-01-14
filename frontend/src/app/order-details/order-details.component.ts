import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { OrderDetails } from '../_model/order-details.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  displayedColumns: string[] = ['Id', 'Nume client', 'Adresa', 'Numar contact', 'Statut', 'Actiune'];
  dataSource: MyOrderDetails[] = [];
  status: string = 'All';

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParam:string) {
    this.productService.getAllOrderDetailsForAdmin(statusParam).subscribe(
      (resp) => {
        console.log(resp);
        this.dataSource = resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId: any) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (resp) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
