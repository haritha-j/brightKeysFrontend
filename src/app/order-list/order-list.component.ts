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
  public options = {
    scales :{
     
yAxes: [{
  display: true,
  ticks: {
      beginAtZero: true,
      steps:6,
      max:60
  }
}]
    }
  }
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [{data:[], label:"score"}]
  ;

  users;
  
  ngOnInit() {
    this.getUsers();
  
  }


  
  getUsers = () =>
    this.ordersService
      .getUsers()
      .subscribe(res => {
        this.users = res; 
        var dataObject = this.users[0].payload.doc.data().depression_score;
        var currentDate = dataObject[0].date.toDate().getDate();
        var currentMonth = dataObject[0].date.toDate().getMonth();
        var currentYear = dataObject[0].date.toDate().getYear();
        var currentScore = 0;
        var scoreCount = 0;

        for (var i = 0; i< dataObject.length; i++){
          if (dataObject[i].date.toDate().getDate() == currentDate && dataObject[i].date.toDate().getMonth() == currentMonth && dataObject[i].date.toDate().getYear() == currentYear){
            currentScore = (currentScore*scoreCount + parseFloat(dataObject[i].score))/(scoreCount+1);
            scoreCount++;
          
          }
          else{
            this.barChartData[0].data.push(currentScore*100);
            this.barChartLabels.push(currentDate);
            scoreCount =1;
            currentScore = parseFloat(dataObject[i].score);

          }
        }

        this.barChartData[0].data.push(currentScore*100);
        this.barChartLabels.push(currentDate.toString()+"/" + (currentMonth+1).toString());
        
      });


  
  deleteOrder = data => this.ordersService.deleteCoffeeOrder(data);

  markCompleted = data => this.ordersService.updateCoffeeOrder(data);
}


