
import React from 'react';
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-6 lg:p-8">
      <main className="container mx-auto max-w-7xl">
        <header className="mb-8 text-center animate-slide-down">
          <h1 className="text-4xl font-bold tracking-tight mb-2">CompanyKeeper</h1>
          <p className="text-muted-foreground">Manage your company records with ease</p>
        </header>
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
