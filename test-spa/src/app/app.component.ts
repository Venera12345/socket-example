import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Subscription, tap, takeUntil, Subject, Observable, map } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { IItem } from './app.models';
import { ItemService } from './_service/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ItemService],

})
export class AppComponent implements OnInit, OnDestroy {
  public arraySizeInput: number = 10;
  public additionalArrayIdsInput: string = '';
  public timerInput: number = 300;
  public listItems$: Observable<IItem[]>;
  private destroy$: Subject<void>;
  private filter$: BehaviorSubject<string[]>;
  private timer$: BehaviorSubject<number>;
  private subscription: Subscription;

  constructor(private itemService: ItemService) {
    this.subscription = new Subscription();
    this.filter$ = new BehaviorSubject<string[]>([]);
    this.destroy$ = new Subject<void>();
    this.listItems$ = new BehaviorSubject<IItem[]>([]);
    this.timer$ = new BehaviorSubject<number>(300);
  }

  ngOnInit(): void {
    this.listItems$ = combineLatest([
      this.itemService.currentListItems$.pipe(filter(Boolean)),
      this.filter$,
    ])
    .pipe(
      map(([list,filter]: [IItem[], string[]])=>{
        const newValueList = filter.length ? list?.filter((item)=>filter?.some((a)=>a === item.id)): list;
        return newValueList;
      }),
      takeUntil(this.destroy$)
    )
  }

  ngOnDestroy(): void {
   this.destroy$.next();
   this.subscription.unsubscribe()
  }

  public editArray(event: number): void {
    this.itemService.setTotal(event+ '');
  }

  public editTimer(event: number): void {
    this.timer$.next(event);
    this.itemService.setInterval(event);
  }

  public editArrayId(event: string[]): void {
    this.filter$.next(event);
  }

}

