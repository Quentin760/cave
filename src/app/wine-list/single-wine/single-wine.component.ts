import { Component, OnInit } from '@angular/core';
import { Wine } from 'src/app/models/wine.model';
import { WinesService } from 'src/app/services/wines.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-single-wine',
  templateUrl: './single-wine.component.html',
  styleUrls: ['./single-wine.component.css']
})
export class SingleWineComponent implements OnInit {

  wine: Wine;

  constructor(private route:ActivatedRoute, private winesService: WinesService,
    private router:Router) { }

  ngOnInit() {
    this.wine = new Wine('', '');
    const id = this.route.snapshot.params['id'];
    this.winesService.getSinglewine(+id).then(
      (wine: Wine) => {
        this.wine = wine;
      }
    );
  }
  onBack() {
    this.router.navigate(['/wines']);
  }
}
