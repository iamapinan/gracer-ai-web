import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f5f8] font-urbanist text-[#2a2930] scroll-smooth">
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
} 
