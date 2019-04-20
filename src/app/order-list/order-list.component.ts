import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../shared/orders.service";
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}

  //chart stuff
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [

  ];

  users;
  ngOnInit() {
    this.getUsers();
  
  }


  
  getUsers = () =>
    this.ordersService
      .getUsers()
      .subscribe(res => {
        this.users = res; 
        console.log(this.users[0].payload.doc.data().dates);
        this.barChartLabels = this.users[0].payload.doc.data().dates
        this.barChartData = [{data: this.users[0].payload.doc.data().values, label: "score"}]
      });


  
  deleteOrder = data => this.ordersService.deleteCoffeeOrder(data);

  markCompleted = data => this.ordersService.updateCoffeeOrder(data);
}


