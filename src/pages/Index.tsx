
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CompanyTable from '@/components/CompanyTable';
import CompanyFormDialog from '@/components/CompanyFormDialog';
import DeleteCompanyDialog from '@/components/DeleteCompanyDialog';
import CompanySidebar from '@/components/CompanySidebar';
import { useCompanyData } from '@/hooks/useCompanyData';
import { Company } from '@/types/Company';

const Index = () => {
  const {
    companies,
    isLoading,
    isSubmitting,
    isDeleting,
    fetchCompanies,
    searchById,
    searchByIsin,
    createNewCompany,
    updateExistingCompany,
    deleteExistingCompany
  } = useCompanyData();

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setCompanyToDelete(id);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedCompany(null);
  };

  const handleFormSubmit = async (company: Omit<Company, 'id'>) => {
    let success = false;
    
    if (selectedCompany) {
      success = await updateExistingCompany(selectedCompany.id, company);
    } else {
      success = await createNewCompany(company);
    }
    
    if (success) {
      setIsFormOpen(false);
      setSelectedCompany(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (companyToDelete === null) return;
    
    const success = await deleteExistingCompany(companyToDelete);
    
    if (success) {
      setCompanyToDelete(null);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CompanySidebar
          onSearchById={searchById}
          onSearchByIsin={searchByIsin}
          onAddCompany={() => setIsFormOpen(true)}
          onRefresh={fetchCompanies}
          isLoading={isLoading}
        />
        
        <div className="md:col-span-2">
          <CompanyTable 
            companies={companies} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      <CompanyFormDialog
        isOpen={isFormOpen}
        selectedCompany={selectedCompany}
        isSubmitting={isSubmitting}
        onClose={handleFormCancel}
        onSubmit={handleFormSubmit}
      />
      
      <DeleteCompanyDialog
        isOpen={companyToDelete !== null}
        isDeleting={isDeleting}
        onClose={() => setCompanyToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Layout>
  );
};

export default Index;
