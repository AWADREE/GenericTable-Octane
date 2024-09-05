import { ColumnType, Types } from "@/types/generic-table.type";
import React, { ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

type GenericTableProps<T extends Record<PropertyKey, any>> = {
  data: T[];
  types: Types;
  specialFields?: {
    specialFieldName: PropertyKey;
    rendering: (row: { [key: PropertyKey]: any }, types: Types) => ReactNode;
  }[];
};

const GenericTable = <T extends Record<PropertyKey, any>>({
  data,
  types,
  specialFields,
}: GenericTableProps<T>) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const allSpecialFieldNames = specialFields?.map((field) => {
    return field.specialFieldName;
  });

  const classNames = React.useMemo(
    () => ({
      wrapper: ["min-h-[88vh]", "max-h-[88vh]"],
      th: ["bg-transparent", "text-default-500", "bg-gray-200"],
      td: ["border-t", "border-divider", "py-3"],
    }),
    []
  );

  return (
    <>
      <div>
        <Table classNames={classNames} isCompact selectionMode="multiple">
          <TableHeader>
            {headers.map((header) => (
              <TableColumn key={header}>{header}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} style={{ cursor: "pointer" }}>
                {headers.map((header) => {
                  const cellValue = row[header];
                  const columnType = types[header] || ColumnType.Text;

                  let cellContent;

                  const specialObject = specialFields?.find((item) => {
                    return item.specialFieldName === header;
                  });

                  if (allSpecialFieldNames?.includes(header)) {
                    return (
                      <TableCell>
                        {specialObject?.rendering(row, types)}
                      </TableCell>
                    );
                  }

                  switch (columnType) {
                    case ColumnType.Number:
                      cellContent = cellValue.toLocaleString();
                      break;
                    case ColumnType.Date:
                      cellContent = new Date(cellValue).toLocaleDateString();
                      break;
                    case ColumnType.JSX:
                      cellContent = cellValue;
                      break;
                    default:
                      cellContent = cellValue.toString();
                      break;
                  }

                  return <TableCell key={header}>{cellContent}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default GenericTable;
