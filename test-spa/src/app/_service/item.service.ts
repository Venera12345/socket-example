import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IItem } from '../app.models';

@Injectable()

export class ItemService extends Socket implements OnDestroy {
  public currentListItems$ = this.fromEvent<IItem[]>('listItems');
  private timer: number = 300;
  constructor() { 
    super({ url: 'http://localhost:4444', options: {} })
  }

  public setTotal(arryaSize: string) {
    setTimeout(()=>{
      this.emit('setTotal', arryaSize);
    }, this.timer)
  }

  public setInterval(timer: number): void {
    this.timer = timer;
    this.ioSocket.timeout(timer)
  }

  ngOnDestroy(): void {
      this.disconnect()
  }
}