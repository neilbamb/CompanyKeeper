
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface CompanyFormFooterProps {
  onCancel: () => void;
  isLoading: boolean;
  isEditMode: boolean;
}

const CompanyFormFooter: React.FC<CompanyFormFooterProps> = ({
  onCancel,
  isLoading,
  isEditMode
}) => {
  return (
    <CardFooter className="flex justify-between">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
      </Button>
    </CardFooter>
  );
};

export default CompanyFormFooter;
