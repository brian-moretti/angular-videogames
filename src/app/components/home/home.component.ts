import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games: Array<Game> | undefined;

  private routeSubscriber: Subscription = new Subscription();
  private gameSubscriber: Subscription = new Subscription();

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscriber = this.activatedRoute.params.subscribe(
      (params: Params) => {
        console.log(params, params['game-search']);

        if (params['game-search']) {
          this.searchGames('metacrit', params['game-search']);
        } else {
          this.searchGames('metacrit');
        }
      }
    );
    console.log(this.games);
  }

  searchGames(sort: string, search?: string) {
    this.gameSubscriber = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  openGameDetail(id: string) {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSubscriber) {
      this.gameSubscriber.unsubscribe();
    }

    if (this.routeSubscriber) {
      this.routeSubscriber.unsubscribe();
    }
  }
}
