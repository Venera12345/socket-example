import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { InputComponentComponent } from './input-component/input-component.component';
import { ItemService } from './_service/item.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableComponentComponent } from './table-component/table-component.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    InputComponentComponent,
    TableComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule,
    ScrollingModule,
    MatTableModule,
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
