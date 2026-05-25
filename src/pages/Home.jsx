import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Star, Sparkles, Scissors } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../index.css';
import defaultData from '../data.json';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [topItems, setTopItems] = useState([]);

  // Social Links
  const INSTAGRAM_URL = "https://instagram.com/faberryclothing";
  // Replace with actual business WhatsApp number including country code
  const WHATSAPP_URL = "https://wa.me/1234567890?text=Hello%20Faberry%20Clothing!%20I'm%20interested%20in%20your%20dresses.";

  useEffect(() => {
    // Load top items dynamically from localStorage if exists, else from data.json
    const storedItems = localStorage.getItem('topItems');
    if (storedItems) {
      setTopItems(JSON.parse(storedItems));
    } else {
      setTopItems(defaultData);
      localStorage.setItem('topItems', JSON.stringify(defaultData));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo">Faberry <span className="logo-dot">.</span></div>
          
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#designer">The Designer</a>
            <a href="#top-items">Top 3 Items</a>
            <a href="#custom-design">Custom Design</a>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#home" onClick={toggleMobileMenu}>Home</a>
        <a href="#designer" onClick={toggleMobileMenu}>The Designer</a>
        <a href="#top-items" onClick={toggleMobileMenu}>Top 3 Items</a>
        <a href="#custom-design" onClick={toggleMobileMenu}>Custom Design</a>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="container hero-content text-center">
          <div className="hero-text fade-in">
            <p className="hero-subtitle" style={{ color: 'var(--text-primary)' }}>Maison de Couture</p>
            <h1 className="hero-title">Where Little Dreams Wear Beautiful Dresses</h1>
            <p className="hero-description mx-auto" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Discover our exclusive boutique collection of children's dresses and tailored custom designs, crafted with love and elegance for your little ones.
            </p>
            <a href="#top-items" className="btn btn-primary">Explore Masterpieces</a>
          </div>
        </div>
      </section>

      {/* Designer Section */}
      <section id="designer" className="designer-section section">
        <div className="container designer-content">
          <div className="designer-image-wrapper fade-in">
             <img src="/designer.png" alt="Mahesweary KP - Fashion Designer" className="designer-image" />
          </div>
          <div className="designer-text fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="section-subtitle-small">Meet the Visionary</p>
            <h2 className="section-title">Mahesweary KP</h2>
            <div className="title-divider"></div>
            <p className="designer-description">
              With a profound passion for elegance and an eye for the finest details, Mahesweary KP founded <strong>Faberry Clothing</strong> to bring haute couture craftsmanship to children's wear. 
            </p>
            <p className="designer-description">
              Her designs blend classic silhouettes with modern, whimsical touches, ensuring every child feels like royalty. Each bespoke piece is a testament to her dedication to quality, premium fabrics, and timeless beauty.
            </p>
            <div className="designer-signature">Mahesweary K.P.</div>
          </div>
        </div>
      </section>

      {/* Top 3 Items Section */}
      <section id="top-items" className="section container">
        <div className="text-center fade-in">
          <p className="section-subtitle-small">Curated Selection</p>
          <h2 className="section-title">Our Top 3 Items</h2>
          <div className="title-divider center"></div>
          <p className="section-subtitle">Delicate fabrics, premium quality, and beautiful silhouettes designed for princesses.</p>
        </div>
        
        <div className="collection-grid">
          {topItems.map((item, index) => (
            <div key={item.id} className="collection-card fade-in" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
              <div className="card-img-wrapper">
                <img src={item.image} alt={item.title} className="card-img" />
                {item.badge && <div className="badge">{item.badge}</div>}
              </div>
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Design Section */}
      <section id="custom-design" className="custom-design section">
        <div className="container custom-content">
          <div className="custom-image-wrapper fade-in">
            <img src="/custom.png" alt="Custom tailored boutique dress" className="custom-image" />
          </div>
          <div className="custom-text fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="section-subtitle-small">Bespoke Creations</p>
            <h2 className="section-title">Custom Tailored Magic</h2>
            <div className="title-divider"></div>
            <p className="hero-description" style={{ marginBottom: '1.5rem' }}>
              Looking for something completely unique? At Faberry Clothing, we specialize in bespoke custom designs tailored perfectly to your child's measurements and your specific vision.
            </p>
            <ul className="custom-features">
              <li>
                <div className="feature-icon"><Scissors size={18} /></div>
                Personalized Design Consultations
              </li>
              <li>
                <div className="feature-icon"><Star size={18} /></div>
                Premium Fabric Selection
              </li>
              <li>
                <div className="feature-icon"><Sparkles size={18} /></div>
                Handcrafted Details & Embroidery
              </li>
            </ul>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaWhatsapp size={18} /> Discuss a Custom Design
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="footer-logo">Faberry <span className="logo-dot">.</span></div>
            <p>Premium boutique children's dresses and exclusive custom designs crafted by Mahesweary KP.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#designer">The Designer</a>
            <a href="#top-items">Top 3 Items</a>
            <a href="#custom-design">Custom Designs</a>
            <Link to="/admin" style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>Admin Portal</Link>
          </div>
          <div>
            <h4>Contact Us</h4>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <FaInstagram size={18} /> @faberryclothing
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <FaWhatsapp size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Faberry Clothing. All rights reserved.
        </div>
      </footer>

      {/* Floating Social Icons */}
      <div className="floating-socials">
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-btn instagram" data-tooltip="Follow us on Instagram">
          <FaInstagram size={24} />
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="social-btn whatsapp" data-tooltip="Chat on WhatsApp">
          <FaWhatsapp size={24} fill="currentColor" />
        </a>
      </div>
    </div>
  );
};

export default Home;
