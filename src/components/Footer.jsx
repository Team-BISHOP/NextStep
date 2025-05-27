import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-4 px-6 bg-card border-t border-border text-center text-sm text-muted-foreground">
      <p>&copy; {currentYear} NextStep. All rights reserved.</p>
      <p className="mt-1">
        <Link to="/privacy" className="hover:text-primary cursor-pointer">Privacy Policy</Link> | <Link to="/terms" className="hover:text-primary cursor-pointer">Terms of Service</Link>
      </p>
    </footer>
  );
};

export default Footer;