import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {RatingService} from '../services/rating.service';
import {Rating} from '../model/rating';
import {User} from '../model/user';

@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.css']
})
export class SupplierProfileComponent implements OnInit {
  public userId: string;
  currentUser: User = new User();
  ratingsList: Rating[] = [];
  ratings: Rating[] = [];
  avgRating = 0;

  constructor(private route: ActivatedRoute, public userService: AuthService, private ratingService: RatingService) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('userId');
    });
    this.userService.getUserByUserId(this.userId).then(user => {
      this.currentUser = user;
    });
    this.userService.getOffersFromSelectedUser(this.userId);
    this.loadRatingByUser(this.userId);
    this.loadAverageRatingByUser(this.userId);
  }
  ngOnInit(): void {
  }

  loadRatingByUser(userId: string): void {
    this.ratingService.getRatingByUser(userId).then(ratings => {
      this.ratingsList = ratings;
    });
  }

  loadAverageRatingByUser(userId: string): void {
    this.ratingService.getAverageRatingByUser(userId).then(avg => {
      this.avgRating = avg;
    });
  }
}
