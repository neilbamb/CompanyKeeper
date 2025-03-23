
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import SearchForm from '@/components/SearchForm';

interface CompanySidebarProps {
  onSearchById: (id: number) => void;
  onSearchByIsin: (isin: string) => void;
  onAddCompany: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const CompanySidebar: React.FC<CompanySidebarProps> = ({
  onSearchById,
  onSearchByIsin,
  onAddCompany,
  onRefresh,
  isLoading
}) => {
  return (
    <div className="md:col-span-1 space-y-6">
      <SearchForm 
        onSearchById={onSearchById} 
        onSearchByIsin={onSearchByIsin}
        isLoading={isLoading}
      />
      
      <div className="flex flex-col gap-4">
        <Button 
          onClick={onAddCompany}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Company
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onRefresh}
          className="w-full"
          disabled={isLoading}
        >
          <RefreshCcw className="mr-2 h-4 w-4" /> Refresh All
        </Button>
      </div>
    </div>
  );
};

export default CompanySidebar;
