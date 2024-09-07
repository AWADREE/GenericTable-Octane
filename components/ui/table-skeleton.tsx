import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

const TableSkeleton = ({ rowCount }: { rowCount: number }) => {
  const renderTableSkeletonRows = () => {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push(
        <Skeleton key={i} className="w-full rounded-lg">
          <div className="h-10 w-4/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      );
    }
    return rows;
  };

  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      className="w-full p-6  rounded-lg"
    >
      <Skeleton className="rounded-lg mb-10">
        <div className="h-16 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">{renderTableSkeletonRows()}</div>
    </div>
  );
};

export default TableSkeleton;
