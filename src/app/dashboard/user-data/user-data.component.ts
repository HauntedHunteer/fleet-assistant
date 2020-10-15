import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.router.navigate(['dashboard/userData/details']);
  }

}
