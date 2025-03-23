
export interface FormErrors {
  [key: string]: string;
}

export interface CompanyFormData {
  name: string;
  stockTicker: string;
  exchange: string;
  isin: string;
  website?: string | null;
}

export function validateCompanyForm(formData: CompanyFormData): FormErrors {
  const errors: FormErrors = {};
  
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!formData.stockTicker.trim()) {
    errors.stockTicker = 'Stock Ticker is required';
  }
  
  if (!formData.exchange.trim()) {
    errors.exchange = 'Exchange is required';
  }
  
  if (!formData.isin.trim()) {
    errors.isin = 'ISIN is required';
  } else if (!/^[A-Za-z]{2}.*$/.test(formData.isin)) {
    errors.isin = 'ISIN must start with two letters';
  }
  
  return errors;
}
