
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CompanyForm from '@/components/CompanyForm';
import { Company } from '@/types/Company';

interface CompanyFormDialogProps {
  isOpen: boolean;
  selectedCompany: Company | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (company: Omit<Company, 'id'>) => Promise<void>;
}

const CompanyFormDialog: React.FC<CompanyFormDialogProps> = ({
  isOpen,
  selectedCompany,
  isSubmitting,
  onClose,
  onSubmit
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen => !setOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedCompany ? 'Edit Company' : 'Create Company'}
          </DialogTitle>
          <DialogDescription>
            {selectedCompany 
              ? 'Update company information' 
              : 'Enter details to create a new company'}
          </DialogDescription>
        </DialogHeader>
        
        <CompanyForm 
          company={selectedCompany || undefined}
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CompanyFormDialog;
