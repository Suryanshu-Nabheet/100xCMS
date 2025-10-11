import { useState } from "react";
import { Menu, X, Twitter, Linkedin, Github, MessageCircle } from "lucide-react";
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import '../home.css';

// Navigation Component
export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="home-nav">
      <div className="home-nav-container">
        <div className="home-nav-content">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="home-logo">
                <span className="home-logo-white">Class</span><span className="home-logo-blue">X</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="home-nav-buttons">
              <SignInButton 
                mode="modal"
                appearance={{
                  elements: {
                    modalContent: "bg-black border border-white/10",
                    headerTitle: "text-white",
                    headerSubtitle: "text-white/80",
                    socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                    socialButtonsBlockButtonText: "text-white",
                    formFieldInput: "bg-white/5 border border-white/10 text-white",
                    formFieldLabel: "text-white",
                    identityPreviewText: "text-white",
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                    footerActionLink: "text-blue-400 hover:text-blue-300",
                    formResendCodeLink: "text-blue-400 hover:text-blue-300",
                    formFieldSuccessText: "text-green-400",
                    formFieldErrorText: "text-red-400",
                    alertText: "text-white"
                  }
                }}
              >
                <button className="home-nav-button">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton 
                mode="modal"
                appearance={{
                  elements: {
                    modalContent: "bg-black border border-white/10",
                    headerTitle: "text-white",
                    headerSubtitle: "text-white/80",
                    socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                    socialButtonsBlockButtonText: "text-white",
                    formFieldInput: "bg-white/5 border border-white/10 text-white",
                    formFieldLabel: "text-white",
                    identityPreviewText: "text-white",
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                    footerActionLink: "text-blue-400 hover:text-blue-300",
                    formResendCodeLink: "text-blue-400 hover:text-blue-300",
                    formFieldSuccessText: "text-green-400",
                    formFieldErrorText: "text-red-400",
                    alertText: "text-white"
                  }
                }}
              >
                <button className="home-nav-button home-nav-button-primary">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              className="text-white/80 hover:text-white p-1.5 bg-transparent border-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              <SignInButton 
                mode="modal"
                appearance={{
                  elements: {
                    modalContent: "bg-black border border-white/10",
                    headerTitle: "text-white",
                    headerSubtitle: "text-white/80",
                    socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                    socialButtonsBlockButtonText: "text-white",
                    formFieldInput: "bg-white/5 border border-white/10 text-white",
                    formFieldLabel: "text-white",
                    identityPreviewText: "text-white",
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                    footerActionLink: "text-blue-400 hover:text-blue-300",
                    formResendCodeLink: "text-blue-400 hover:text-blue-300",
                    formFieldSuccessText: "text-green-400",
                    formFieldErrorText: "text-red-400",
                    alertText: "text-white"
                  }
                }}
              >
                <button className="home-nav-button w-full">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton 
                mode="modal"
                appearance={{
                  elements: {
                    modalContent: "bg-black border border-white/10",
                    headerTitle: "text-white",
                    headerSubtitle: "text-white/80",
                    socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
                    socialButtonsBlockButtonText: "text-white",
                    formFieldInput: "bg-white/5 border border-white/10 text-white",
                    formFieldLabel: "text-white",
                    identityPreviewText: "text-white",
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                    footerActionLink: "text-blue-400 hover:text-blue-300",
                    formResendCodeLink: "text-blue-400 hover:text-blue-300",
                    formFieldSuccessText: "text-green-400",
                    formFieldErrorText: "text-red-400",
                    alertText: "text-white"
                  }
                }}
              >
                <button className="home-nav-button home-nav-button-primary w-full">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
