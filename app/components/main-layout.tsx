"use client";

import Header from "./header";

interface MainLayoutProps {
  children: React.ReactNode;
  showCartButton?: boolean;
}

export default function MainLayout({
  children,
  showCartButton = true,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showCartButton={showCartButton} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
