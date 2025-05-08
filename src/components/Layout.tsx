import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="font-urbanist bg-black text-white overflow-x-hidden scroll-smooth">
      <Navbar />
      <main className="min-h-screen mb-20 mt-32">
        {children}
      </main>
    </div>
  );
} 