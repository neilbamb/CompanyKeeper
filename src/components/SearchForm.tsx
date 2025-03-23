
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface SearchFormProps {
  onSearchById: (id: number) => void;
  onSearchByIsin: (isin: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  onSearchById, 
  onSearchByIsin,
  isLoading
}) => {
  const [id, setId] = useState<string>('');
  const [isin, setIsin] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleIdSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      setError('Please enter a valid ID');
      return;
    }
    
    onSearchById(idNum);
  };

  const handleIsinSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isin.trim()) {
      setError('Please enter an ISIN');
      return;
    }
    
    onSearchByIsin(isin);
  };

  return (
    <Card className="w-full max-w-md animate-fade-in glass-effect">
      <CardHeader>
        <CardTitle className="text-center">Search Companies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <form onSubmit={handleIdSearch} className="space-y-2">
            <Label htmlFor="id-search">Search by ID</Label>
            <div className="flex space-x-2">
              <Input
                id="id-search"
                type="number"
                placeholder="Enter company ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search by ID</span>
              </Button>
            </div>
          </form>
        </div>
        
        <div>
          <form onSubmit={handleIsinSearch} className="space-y-2">
            <Label htmlFor="isin-search">Search by ISIN</Label>
            <div className="flex space-x-2">
              <Input
                id="isin-search"
                placeholder="Enter company ISIN"
                value={isin}
                onChange={(e) => setIsin(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search by ISIN</span>
              </Button>
            </div>
          </form>
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default SearchForm;
