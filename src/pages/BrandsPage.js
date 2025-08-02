import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "../styles/BrandsPage.css";

const GET_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      image
    }
  }
`;

const BrandsPage = () => {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const navigate = useNavigate();

  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <div className="error-message">
        <h2>Oops! Something went wrong</h2>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="brands-page">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-box">M</span> VibeStrings
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Browse top quality <span className="highlight">Guitars</span> online
          </h1>
          <p>
            Explore the widest collection of branded guitars online with
            VibeStrings
          </p>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
            alt="Electric guitar with amplifier"
          />
        </div>
      </section>

      <section className="brands-section">
        <h2>
          Featuring the <span className="highlight">Best Brands</span>
        </h2>
        <p>Select your preferred brand and explore our exquisite collection.</p>

        <div className="brands-grid">
          {loading ? (
            <p>Loading brands...</p>
          ) : error ? (
            <p>Error loading brands. Please try again later.</p>
          ) : (
            data?.findAllBrands?.map((brand) => (
              <div
                key={brand.id}
                className="brand-item"
                onClick={() => navigate(`/models/${brand.id}`)}
                style={{ cursor: "pointer" }}
              >
                {brand.image ? (
                  <img src={brand.image} alt={brand.name} />
                ) : (
                  <span>{brand.name}</span>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="features-section">
        <h2>
          Why try <span className="highlight">VibeStrings</span>?
        </h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🔍</div>
            <h3>SMOOTH BROWSING</h3>
            <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🚚</div>
            <h3>EASY DELIVERY</h3>
            <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💳</div>
            <h3>SWIFT PAYMENTS</h3>
            <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.</p>
          </div>
        </div>
      </section>

      <section className="download-section">
        <div className="download-content">
          <h2>
            Browse and buy your{" "}
            <span className="highlight">favorite guitars</span> with
            VibeStrings.
          </h2>
          <div className="store-buttons">
            <a
              href="https://play.google.com/store"
              className="store-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/google-play.png" alt="Get it on Google Play" />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              className="store-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/app-store.png"
                alt="Download on the App Store"
              />
            </a>
          </div>
        </div>
        <div className="app-preview">
          <div className="app-preview-container">
            <img
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=600&q=80"
              alt="VibeStrings App Your Feed"
              className="app-preview-image"
              style={{
                width: "200px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "25px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                transform: "rotate(-5deg)",
                zIndex: 2,
                position: "relative",
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=600&q=80"
              alt="VibeStrings App Product Details"
              className="app-preview-image second-preview"
              style={{
                width: "200px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "25px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                transform: "rotate(8deg) translateX(-30px)",
                zIndex: 1,
                position: "relative",
              }}
            />
          </div>
          <div className="circle-bg"></div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-box">M</span>
              <span>VibeStrings</span>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <img src="/images/social/email.svg" alt="Email" />
                <span>Enquiry@VibeStrings.com</span>
              </div>
              <div className="contact-item">
                <img src="/images/social/location.svg" alt="Location" />
                <span>San Francisco</span>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h3>PAGES</h3>
              <ul>
                <li>
                  <a href="/store">Store</a>
                </li>
                <li>
                  <a href="/collections">Collections</a>
                </li>
                <li>
                  <a href="/support">Support</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>PRODUCT</h3>
              <ul>
                <li>
                  <a href="/terms">Terms</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/copyright">Copyright</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>FOLLOW US</h3>
              <div className="social-links">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/social/facebook.svg" alt="Facebook" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/social/twitter.svg" alt="Twitter" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/social/instagram.svg" alt="Instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2022 Copyright VibeStrings</p>
        </div>
      </footer>
    </div>
  );
};

export default BrandsPage;
