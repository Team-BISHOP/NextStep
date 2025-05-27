import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6 bg-background dark:bg-brand-gray-dark"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AlertTriangle className="h-24 w-24 text-destructive mb-6 animate-pulse" />
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-foreground mb-3">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or maybe you just mistyped the URL.
      </p>
      <img  class="max-w-sm w-full mb-8 rounded-lg shadow-lg" alt="Illustration of a lost robot or a broken link" src="https://images.unsplash.com/photo-1601027191903-f97442c175c2" />
      <Button asChild size="lg" className="bg-brand-blue-default hover:bg-brand-blue-dark text-primary-foreground">
        <Link to="/">
          <Home className="mr-2 h-5 w-5" />
          Go Back to Homepage
        </Link>
      </Button>
      <p className="mt-6 text-sm text-muted-foreground">
        If you believe this is an error, please <Link to="/contact" className="text-primary hover:underline">contact support</Link>.
      </p>
    </motion.div>
  );
};

export default NotFoundPage;