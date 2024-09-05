export enum ColumnType {
  Text = "text",
  Number = "number",
  Date = "date",
  JSX = "jsx",
}

export type Types = {
  [key: PropertyKey]: ColumnType;
};
