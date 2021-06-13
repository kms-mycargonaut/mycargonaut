import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.css']
})
export class SupplierProfileComponent implements OnInit {
  public userId: string;

  constructor(private route: ActivatedRoute, public userService: AuthService) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('userId');
    });
    this.userService.getUserByUserId(this.userId);
    this.userService.getOffersFromSelectedUser(this.userId);
  }

  ngOnInit(): void {
  }

}
