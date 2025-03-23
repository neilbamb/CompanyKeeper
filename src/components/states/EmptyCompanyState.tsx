
import React from 'react';
import { CardContent } from "@/components/ui/card";

const EmptyCompanyState: React.FC = () => {
  return (
    <CardContent>
      <div className="h-64 flex items-center justify-center">
        <p className="text-muted-foreground">No companies found. Add your first company!</p>
      </div>
    </CardContent>
  );
};

export default EmptyCompanyState;
