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
import {
  Pagination,
  // PaginationItem,
  // PaginationCursor,
} from "@nextui-org/pagination";
type GenericTableProps<T extends Record<PropertyKey, any>> = {
  data: T[];
  types: Types;
  specialFields?: {
    specialFieldName: PropertyKey;
    rendering: (
      row: { [key: PropertyKey]: any },
      types: Types,
      enumsOptions?: { [key: PropertyKey]: string[] }
    ) => ReactNode;
  }[];
  enumsOptions?: { [key: PropertyKey]: string[] };
  extraColumns?: string[];
};

const GenericTable = <T extends Record<PropertyKey, any>>({
  data,
  types,
  specialFields,
  enumsOptions = {},
  extraColumns = [],
}: GenericTableProps<T>) => {
  const headers =
    data.length > 0 ? [...Object.keys(data[0]), ...extraColumns] : [];

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

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
    <>
      <div>
        <Table
          bottomContent={
            <div className="flex w-full justify-center fixed bottom-12">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={classNames}
          isCompact
          // removeWrapper
          selectionMode="multiple"
        >
          <TableHeader>
            {headers.map((header) => (
              <TableColumn key={header}>{header}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {items.map((row, rowIndex) => (
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
                        {specialObject?.rendering(row, types, enumsOptions)}
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
