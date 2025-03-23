
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyFormField from './form/CompanyFormField';
import CompanyFormFooter from './form/CompanyFormFooter';
import { validateCompanyForm, FormErrors, CompanyFormData } from '@/utils/formValidation';
import { Company } from '@/types/Company';

interface CompanyFormProps {
  company?: Company;
  onSubmit: (company: Omit<Company, 'id'>) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ 
  company, 
  onSubmit, 
  onCancel,
  isLoading
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    stockTicker: '',
    exchange: '',
    isin: '',
    website: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (company) {
      const { id, ...rest } = company;
      setFormData(rest);
    }
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateCompanyForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      await onSubmit(formData);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md animate-fade-in glass-effect">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {company ? 'Edit Company' : 'Create Company'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <CompanyFormField
            id="name"
            label="Company Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Company Name"
            required
          />
          
          <CompanyFormField
            id="stockTicker"
            label="Stock Ticker"
            value={formData.stockTicker}
            onChange={handleChange}
            error={errors.stockTicker}
            placeholder="AAPL"
            required
          />
          
          <CompanyFormField
            id="exchange"
            label="Exchange"
            value={formData.exchange}
            onChange={handleChange}
            error={errors.exchange}
            placeholder="NASDAQ"
            required
          />
          
          <CompanyFormField
            id="isin"
            label="ISIN"
            value={formData.isin}
            onChange={handleChange}
            error={errors.isin}
            placeholder="US0378331005"
            required
          />
          
          <CompanyFormField
            id="website"
            label="Website (Optional)"
            value={formData.website || ''}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </CardContent>
        
        <CompanyFormFooter
          onCancel={onCancel}
          isLoading={isLoading}
          isEditMode={!!company}
        />
      </form>
    </Card>
  );
};

export default CompanyForm;
