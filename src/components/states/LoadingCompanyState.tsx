
import React from 'react';
import { CardContent } from "@/components/ui/card";

const LoadingCompanyState: React.FC = () => {
  return (
    <CardContent>
      <div className="h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Loading companies...</p>
      </div>
    </CardContent>
  );
};

export default LoadingCompanyState;
