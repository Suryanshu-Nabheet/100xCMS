import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import '../home.css';

// Hero Component
export function Hero() {
  return (
    <section className="home-hero">
      {/* Dark blue aesthetic spots */}
      <div className="home-hero-spots home-hero-spot-1"></div>
      <div className="home-hero-spots home-hero-spot-2"></div>
      <div className="home-hero-spots home-hero-spot-3"></div>
      <div className="home-hero-spots home-hero-spot-4"></div>
      <div className="home-hero-spots home-hero-spot-5"></div>
      
      <div className="home-hero-content">
        <h1 className="home-hero-title">
          <span className="home-hero-title-white">Master Modern</span>{" "}
          <span className="home-hero-title-blue">Development</span>
        </h1>
        
        <p className="home-hero-description">
          Join thousands of developers building the future. Learn cutting-edge technologies, work on real projects, and get industry-ready with our comprehensive courses.
        </p>
        
        <div className="home-hero-buttons">
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
            <button className="home-hero-button home-hero-button-primary">
              Get Started
            </button>
          </SignUpButton>
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
            <button className="home-hero-button home-hero-button-secondary">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    </section>
  );
}
