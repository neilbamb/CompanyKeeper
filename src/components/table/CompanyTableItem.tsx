
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { Company } from '@/types/Company';

interface CompanyTableItemProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
}

const CompanyTableItem: React.FC<CompanyTableItemProps> = ({ 
  company, 
  onEdit, 
  onDelete 
}) => {
  return (
    <TableRow 
      key={company.id} 
      className="transition-colors hover:bg-muted/50"
    >
      <TableCell className="font-medium">{company.name}</TableCell>
      <TableCell>{company.stockTicker}</TableCell>
      <TableCell>{company.exchange}</TableCell>
      <TableCell>{company.isin}</TableCell>
      <TableCell>
        {company.website ? (
          <a 
            href={company.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            Visit <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        ) : (
          <span className="text-muted-foreground">N/A</span>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(company)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(company.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CompanyTableItem;
