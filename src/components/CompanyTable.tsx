
import React from 'react';
import { 
  Table, 
  TableBody
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import CompanyTableHeader from './table/CompanyTableHeader';
import CompanyTableItem from './table/CompanyTableItem';
import LoadingCompanyState from './states/LoadingCompanyState';
import EmptyCompanyState from './states/EmptyCompanyState';
import { Company } from '@/types/Company';

interface CompanyTableProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ 
  companies, 
  onEdit, 
  onDelete,
  isLoading
}) => {
  return (
    <Card className={`w-full ${isLoading ? 'animate-pulse' : 'animate-fade-in'} glass-effect`}>
      <CardHeader>
        <CardTitle className="text-center">Companies</CardTitle>
      </CardHeader>
      
      {isLoading ? (
        <LoadingCompanyState />
      ) : companies.length === 0 ? (
        <EmptyCompanyState />
      ) : (
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <CompanyTableHeader />
              <TableBody>
                {companies.map((company) => (
                  <CompanyTableItem 
                    key={company.id}
                    company={company}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CompanyTable;
