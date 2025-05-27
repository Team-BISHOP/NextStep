import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // md breakpoint
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize(); // Call on initial load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'md:ml-[4.5rem]'}`}>
          {children}
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;