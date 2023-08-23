import { DataSource } from '@angular/cdk/collections';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Subscription, tap, takeUntil, Subject, Observable, map, debounce, timer, debounceTime } from 'rxjs';
import { combineLatest, combineLatestInit } from 'rxjs/internal/observable/combineLatest';
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
  private scroll$: BehaviorSubject<number>;
  private LIMIT: number = 10;
  private timer$: BehaviorSubject<number>;
  private subscription: Subscription;
  private heightScroll!: number | null;

  constructor(private itemService: ItemService,
    private scrollDispatcher: ScrollDispatcher) {
    this.subscription = new Subscription();
    this.filter$ = new BehaviorSubject<string[]>([]);
    this.scroll$ = new BehaviorSubject<number>(1);
    this.destroy$ = new Subject<void>();
    this.listItems$ = new BehaviorSubject<IItem[]>([]);
    this.timer$ = new BehaviorSubject<number>(300);
    this.subscription.add(
    this.scrollDispatcher.scrolled().subscribe((x) => {
      if( x?.measureScrollOffset('top') && x?.measureScrollOffset('top') >= (x?.getElementRef().nativeElement.scrollHeight - x?.getElementRef().nativeElement.offsetHeight-100) && (!this.heightScroll || this.heightScroll!==x?.getElementRef().nativeElement.scrollHeight)) {
        this.heightScroll = x?.getElementRef().nativeElement.scrollHeight;
        this.scroll$.next(this.scroll$.value + 1);
        // this.itemService.setScroll(this.scrollOffset);
      }
    })
    )
  }

  ngOnInit(): void {
    this.listItems$ = combineLatest([
      this.itemService.currentListItems$.pipe(filter(Boolean)),
      this.filter$,
      this.scroll$,
    ])
    .pipe(
      map(([list,filter, scroll]: [IItem[], string[], number])=>{
        const newValueList = filter.length ? list?.filter((item)=>filter?.some((a)=>a === item.id)): list;
        return newValueList.slice(0, scroll*this.LIMIT);
      }),
      tap(console.log),
      takeUntil(this.destroy$)
    )
  }

  ngOnDestroy(): void {
   this.destroy$.next();
   this.subscription.unsubscribe()
  }

  public editArray(event: number): void {
    this.scroll$.next(1);
    this.heightScroll = null;
    this.itemService.setTotal(event+ '');
  }

  public editTimer(event: number): void {
    this.timer$.next(event);
    this.itemService.setInterval(event);
  }

  public editArrayId(event: string[]): void {
    this.scroll$.next(1);
    this.heightScroll = null;
    this.filter$.next(event);
   // this.itemService.setFilter(event);
  }
}

