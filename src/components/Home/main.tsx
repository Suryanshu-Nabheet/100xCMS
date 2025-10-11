import { Navigation, Hero, ImageSlider, TechSkills, Footer } from './components';
import './home.css';

// Main App Component
export default function Main() {
  return (
    <div className="home-page">
      {/* Left and Right Side Shadows */}
      <div className="home-side-shadows">
        {/* Left shadow */}
        <div className="home-side-shadow-left"></div>
        {/* Right shadow */}
        <div className="home-side-shadow-right"></div>
      </div>
      
      <Navigation />
      <Hero />
      <ImageSlider />
      <TechSkills />
      <Footer />
    </div>
  );
}