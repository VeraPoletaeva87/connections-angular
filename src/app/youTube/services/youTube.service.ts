import { Injectable } from '@angular/core';
import {
  Item,
  ResultData,
  Statistics,
  StatisticsData,
  WholeVideoData,
  WholeDataCustom
} from '../../shared/types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, debounceTime, filter, from, mergeMap, of, map, switchMap, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getItems } from 'src/app/redux/selectors/videoList.selector';
import { State } from '../../redux/state.models';

@Injectable({ providedIn: 'root' })
export class YouTubeService {
  API_KEY = 'AIzaSyCMFGPQRRaXj6uji1J4k4ZS6SF6BSFiBuM';

  items$: Observable<WholeDataCustom[]>;

  private searchQuery$: BehaviorSubject<string> = new BehaviorSubject('');
  private sortDirection: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private detailId: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient, private store: Store<State>) {
    this.items$ = this.getItems$();
  }

  getCustomItems(): WholeDataCustom[] {

    const ls = localStorage.getItem('customCards');

    let customItems: WholeDataCustom[] = [];
    this.store
    .pipe(
      select((state) => getItems(state))
    )
  .subscribe((items: WholeDataCustom[]) => customItems = items)
     return customItems;
  }

  getDetail$(): Observable<WholeDataCustom> {
    return this.detailId.pipe(
      switchMap((id: string) => this.getItem(id).pipe(
        mergeMap((data: Item) => {
          return this.getStatistics(data.id.videoId).pipe(
             map((res: Statistics) => {
               return { id: data.id.videoId, snippet: data.snippet, statistics: res }; 
              })
           );
         })
      ))
    );
  }

  getItems$(): Observable<WholeDataCustom[]> {
    return this.searchQuery$.pipe(
      filter((query: string) => query.length >= 3),
      debounceTime(300),
      switchMap((query: string) => this.getItems(query)),
      // Time
      switchMap((data: Item[]) => {
        const wholeData: WholeVideoData[] = [];

        return from(data).pipe(
          mergeMap((item: Item) =>
            this.getStatistics(item.id.videoId).pipe(
              tap((res: Statistics) => {
                wholeData.push({
                  id: item.id.videoId,
                  snippet: item.snippet,
                  statistics: res,
                });
              }),
              map(() => wholeData.concat(this.getCustomItems())
              )
            )
          )
        );
      }),
      // wholeData[]
      map((wholeData: WholeVideoData[]) => {
        return wholeData.sort();
      }),
      // wholeData[] sorted
      switchMap((wholeData: WholeVideoData[]) => {
        return this.sortDirection.pipe(
          map((direction: boolean) => {
            return wholeData.sort();
          })
        );
      })
    );
  }

  setDetailId(value: string) {
   this.detailId.next(value);
  }
  setSearchQuery(value: string): void {
    this.searchQuery$.next(value);
  }

  setSortParams(value: string, direction: boolean): void {
    this.sortDirection.next(direction);
  }

  getItems(searchString: string): Observable<Item[]> {
    // get list of videos
    const urlBase = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1`;
    const params = new URLSearchParams({ q: searchString });
    const paramsString = params.toString();
    let url = searchString ? `${urlBase}&${paramsString}` : urlBase;

    return this.http.get<ResultData>(url).pipe(
      map((results: ResultData) => results.items),
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }

  getStatistics(id: string): Observable<Statistics> {
    const empty = {
      likeCount: '',
      favoriteCount: '',
      commentCount: '',
      viewCount: ''
    };
    // get Statistics for the video
    const urlBase = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}`;
    return this.http.get<StatisticsData>(urlBase).pipe(
      map((data: StatisticsData) => data.items[0].statistics),
      catchError(this.handleError<Statistics>('getStatistics', empty))
    );
  }

  getItem(id: string): Observable<Item> {
    const urlBase = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${id}`;
    return this.http.get<ResultData>(urlBase).pipe(
      map((results: ResultData) => results.items[0])
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: string): Observable<T> => {
  
      console.error(error); 
  
      return of(result as T);
    };
  }  
}
