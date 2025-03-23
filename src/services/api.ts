
import { Company } from '@/types/Company';

const API_URL = 'http://localhost:5000/api';

export async function getAllCompanies(): Promise<Company[]> {
  const response = await fetch(`${API_URL}/companies`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch companies');
  }
  
  return response.json();
}

export async function getCompanyById(id: number): Promise<Company> {
  const response = await fetch(`${API_URL}/companies/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Company not found');
    }
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch company');
  }
  
  return response.json();
}

export async function getCompanyByIsin(isin: string): Promise<Company> {
  const response = await fetch(`${API_URL}/companies/isin/${isin}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Company not found');
    }
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch company');
  }
  
  return response.json();
}

export async function createCompany(company: Omit<Company, 'id'>): Promise<Company> {
  const response = await fetch(`${API_URL}/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create company');
  }
  
  return response.json();
}

export async function updateCompany(id: number, company: Omit<Company, 'id'>): Promise<Company> {
  const response = await fetch(`${API_URL}/companies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update company');
  }
  
  return response.json();
}

export async function deleteCompany(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/companies/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete company');
  }
}
