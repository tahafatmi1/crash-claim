import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              About Crash Claim
            </h3>
            <p className="text-muted-foreground">
              We provide a streamlined platform for submitting and managing crash claims, making the process simple, secure, and efficient.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/form" className="block text-muted-foreground hover:text-primary transition-colors">
                Submit Claim
              </Link>
              <Link to="/privacy-policy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms and Conditions
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Contact Us
            </h3>
            <div className="text-muted-foreground space-y-2">
              <p>Email: support@crashclaim.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Hours: Mon-Fri, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>{currentYear} Crash Claim</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
