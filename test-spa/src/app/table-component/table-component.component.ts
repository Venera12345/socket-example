import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IItem } from '../app.models';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponentComponent {
  @Input()
  public dataSource!: IItem[];
}
