import { Twitter, Linkedin, Github, MessageCircle } from "lucide-react";
import '../home.css';

// Footer Component
export function Footer() {
  return (
    <footer className="home-footer">
      {/* Dark blue aesthetic spots */}
      <div className="home-footer-spots home-footer-spot-1"></div>
      <div className="home-footer-spots home-footer-spot-2"></div>
      
      <div className="home-footer-container">
        <div className="home-footer-grid">
          <div className="home-footer-brand">
            <div className="home-footer-logo">
              <span className="home-footer-logo-white">Class</span><span className="home-footer-logo-blue">X</span>
            </div>
            <p className="home-footer-description">
              Empowering developers worldwide with cutting-edge courses and real-world projects. Join the community of successful developers.
            </p>
            <div className="home-footer-social">
              <a href="#" className="home-footer-social-link">
                <Twitter className="home-footer-social-icon" />
              </a>
              <a href="#" className="home-footer-social-link">
                <Linkedin className="home-footer-social-icon" />
              </a>
              <a href="#" className="home-footer-social-link">
                <Github className="home-footer-social-icon" />
              </a>
              <a href="#" className="home-footer-social-link">
                <MessageCircle className="home-footer-social-icon" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="home-footer-section-title">Courses</h3>
            <ul className="home-footer-links">
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">Web Development</a>
              </li>
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">Mobile Development</a>
              </li>
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">Data Science</a>
              </li>
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">DevOps</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="home-footer-section-title">Support</h3>
            <ul className="home-footer-links">
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">Help Center</a>
              </li>
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">Contact Us</a>
              </li>
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">Community</a>
              </li>
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="home-footer-section-title">Company</h3>
            <ul className="home-footer-links">
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">About</a>
              </li>
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">Careers</a>
              </li>
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">Blog</a>
              </li>
              <li className="home-footer-link-item">
                <a href="#" className="home-footer-link">Privacy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="home-footer-bottom">
          <p className="home-footer-copyright">
            © 2024 ClassX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
