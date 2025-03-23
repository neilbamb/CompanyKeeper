
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
        <h2 className="text-6xl font-bold mb-4">404</h2>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
