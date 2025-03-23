
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CompanyTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Stock Ticker</TableHead>
        <TableHead>Exchange</TableHead>
        <TableHead>ISIN</TableHead>
        <TableHead>Website</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CompanyTableHeader;
