export interface IItem {
  id: string;
  int: number;
  float: number;
  color: string;
  child: IChild;
}

export interface IChild {
  id: string;
  color: string;
}
