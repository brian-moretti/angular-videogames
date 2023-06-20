import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId!: string;
  game!: Game;
  routeSubscriber!: Subscription;
  gameSubscriber!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.routeSubscriber = this.activatedRoute.params.subscribe(
      (params: Params) => {
        console.log(params);

        this.gameId = params['id'];
        this.getGameDetail(this.gameId);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.gameSubscriber) {
      this.gameSubscriber.unsubscribe();
    }

    if (this.routeSubscriber) {
      this.routeSubscriber.unsubscribe();
    }
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  getGameDetail(id: string) {
    this.gameSubscriber = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        console.log(gameResp);
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }
}
