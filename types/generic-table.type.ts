export enum ColumnType {
  Text = "text",
  Number = "number",
  Date = "date",
  JSX = "jsx",
  Enum = "enum",
}

export type Types = {
  [key: PropertyKey]: ColumnType;
};
