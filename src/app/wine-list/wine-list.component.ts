import { Component, OnInit, OnDestroy } from '@angular/core';
import { Wine } from '../models/wine.model';
import { Subscription } from 'rxjs';
import { WinesService } from '../services/wines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css']
})
export class WineListComponent implements OnInit, OnDestroy {

  wines: Wine[];
  winesSubscription: Subscription;

  constructor(private winesService: WinesService, private router: Router) { }

  ngOnInit() {
    this.winesSubscription = this.winesService.winesSubject.subscribe(
      (wines: Wine[]) => {
      this.wines= wines;
      }
      );
      this.winesService.emitWines();
  }

  onNewWine() {
    this.router.navigate(['/wines','new']);
  }

  onDeleteWine(wine: Wine) {
    this.winesService.removeWine(wine);
  }

  onViewWine(id: number) {

    this.router.navigate(['/wines', 'view', id]);
  }
  
  ngOnDestroy() {
    this.winesSubscription.unsubscribe();
  }

}
