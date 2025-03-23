
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Company } from '@/types/Company';
import { 
  getAllCompanies, 
  getCompanyById, 
  getCompanyByIsin, 
  createCompany, 
  updateCompany,
  deleteCompany
} from '@/services/api';

export function useCompanyData() {
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCompanies();
      setCompanies(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch companies",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchById = async (id: number) => {
    try {
      const company = await getCompanyById(id);
      setCompanies([company]);
      toast({
        title: "Company Found",
        description: `Found company: ${company.name}`,
      });
    } catch (error) {
      toast({
        title: "Company Not Found",
        description: error instanceof Error ? error.message : "No company found with that ID",
        variant: "destructive",
      });
    }
  };

  const searchByIsin = async (isin: string) => {
    try {
      const company = await getCompanyByIsin(isin);
      setCompanies([company]);
      toast({
        title: "Company Found",
        description: `Found company: ${company.name}`,
      });
    } catch (error) {
      toast({
        title: "Company Not Found",
        description: error instanceof Error ? error.message : "No company found with that ISIN",
        variant: "destructive",
      });
    }
  };

  const createNewCompany = async (company: Omit<Company, 'id'>) => {
    setIsSubmitting(true);
    try {
      const newCompany = await createCompany(company);
      setCompanies(prev => [...prev, newCompany]);
      toast({
        title: "Success",
        description: "Company created successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create company",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateExistingCompany = async (id: number, company: Omit<Company, 'id'>) => {
    setIsSubmitting(true);
    try {
      const updatedCompany = await updateCompany(id, company);
      setCompanies(prev => 
        prev.map(c => c.id === id ? updatedCompany : c)
      );
      toast({
        title: "Success",
        description: "Company updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update company",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteExistingCompany = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteCompany(id);
      setCompanies(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Success",
        description: "Company deleted successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete company",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
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
  };
}
