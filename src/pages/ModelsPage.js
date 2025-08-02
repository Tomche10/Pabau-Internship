import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import "../styles/ModelsPage.css";

const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      image
    }
  }
`;

const mockGuitarModels = [
  // Gibson guitars (brandId: "1")
  {
    id: "1",
    name: "The Essential Les Paul",
    price: "1299.00",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "1", name: "Gibson" },
  },
  {
    id: "4",
    name: "Gibson SG Standard",
    price: "1499.00",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "1", name: "Gibson" },
  },
  {
    id: "7",
    name: "Gibson Les Paul Studio",
    price: "899.00",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "1", name: "Gibson" },
  },
  {
    id: "10",
    name: "Gibson ES-335",
    price: "2999.00",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Hollow Body",
    brand: { id: "1", name: "Gibson" },
  },
  {
    id: "13",
    name: "Gibson Flying V",
    price: "1799.00",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "1", name: "Gibson" },
  },
  {
    id: "16",
    name: "Gibson Explorer",
    price: "1999.00",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "1", name: "Gibson" },
  },
  {
    id: "19",
    name: "J-45 Studio",
    price: "1849.00",
    type: "Acoustic",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    brand: { id: "1", name: "Gibson" },
  },
  {
    id: "20",
    name: "L-1 Tribute",
    price: "2099.00",
    type: "Acoustic",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    brand: { id: "1", name: "Gibson" },
  },

  // Fender guitars (brandId: "2")
  {
    id: "2",
    name: "Fender Player Stratocaster",
    price: "849.99",
    image:
      "https://images.unsplash.com/photo-1559241512-e17a7befe305?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "2", name: "Fender" },
  },
  {
    id: "5",
    name: "Fender American Ultra Jazzmaster",
    price: "2099.99",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "2", name: "Fender" },
  },
  {
    id: "8",
    name: "Fender Mustang 90",
    price: "599.99",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "2", name: "Fender" },
  },
  {
    id: "11",
    name: "Fender Duo-Sonic",
    price: "499.99",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "2", name: "Fender" },
  },
  {
    id: "14",
    name: "Fender Lead II",
    price: "699.99",
    image:
      "https://images.unsplash.com/photo-1559241512-e17a7befe305?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "2", name: "Fender" },
  },
  {
    id: "17",
    name: "Fender Telecaster",
    price: "1099.99",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "2", name: "Fender" },
  },

  // Ibanez guitars (brandId: "3")
  {
    id: "3",
    name: "Ibanez RG550",
    price: "999.00",
    image:
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6fa?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "3", name: "Ibanez" },
  },
  {
    id: "6",
    name: "Ibanez AZ2204",
    price: "1899.00",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "3", name: "Ibanez" },
  },
  {
    id: "9",
    name: "Ibanez Artcore AS73",
    price: "499.00",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Hollow Body",
    brand: { id: "3", name: "Ibanez" },
  },
  {
    id: "12",
    name: "Ibanez RG421",
    price: "399.00",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "3", name: "Ibanez" },
  },
  {
    id: "15",
    name: "Ibanez S670QM",
    price: "699.00",
    image:
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6fa?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "3", name: "Ibanez" },
  },
  {
    id: "18",
    name: "Ibanez RGA42FM",
    price: "499.00",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "3", name: "Ibanez" },
  },

  // Martin guitars (brandId: "4")
  {
    id: "21",
    name: "Martin D-28",
    price: "3199.00",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Acoustic",
    brand: { id: "4", name: "Martin" },
  },
  {
    id: "22",
    name: "Martin 000-28",
    price: "2899.00",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Acoustic",
    brand: { id: "4", name: "Martin" },
  },
  {
    id: "23",
    name: "Martin X Series D-X1AE",
    price: "499.00",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Acoustic",
    brand: { id: "4", name: "Martin" },
  },

  // Taylor guitars (brandId: "5")
  {
    id: "24",
    name: "Taylor 814ce",
    price: "4199.00",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Acoustic",
    brand: { id: "5", name: "Taylor" },
  },
  {
    id: "25",
    name: "Taylor 314ce",
    price: "2499.00",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Acoustic",
    brand: { id: "5", name: "Taylor" },
  },

  // PRS guitars (brandId: "6")
  {
    id: "26",
    name: "PRS SE Custom 24",
    price: "829.00",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "6", name: "PRS" },
  },
  {
    id: "27",
    name: "PRS Silver Sky",
    price: "2549.00",
    image:
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6fa?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "6", name: "PRS" },
  },
  {
    id: "28",
    name: "PRS SE Paul's Guitar",
    price: "999.00",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "6", name: "PRS" },
  },

  // Yamaha guitars (brandId: "7")
  {
    id: "29",
    name: "Yamaha FG830",
    price: "199.99",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Acoustic",
    brand: { id: "7", name: "Yamaha" },
  },
  {
    id: "30",
    name: "Yamaha Pacifica 112V",
    price: "349.99",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "7", name: "Yamaha" },
  },

  // ESP guitars (brandId: "8")
  {
    id: "31",
    name: "ESP LTD EC-1000",
    price: "1099.00",
    image:
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6fa?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "8", name: "ESP" },
  },
  {
    id: "32",
    name: "ESP LTD MH-417",
    price: "799.00",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "8", name: "ESP" },
  },

  // Epiphone guitars (brandId: "9")
  {
    id: "33",
    name: "Epiphone Les Paul Standard",
    price: "599.00",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Electric",
    brand: { id: "9", name: "Epiphone" },
  },
  {
    id: "34",
    name: "Epiphone Casino",
    price: "549.00",
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Hollow Body",
    brand: { id: "9", name: "Epiphone" },
  },

  // Gretsch guitars (brandId: "10")
  {
    id: "35",
    name: "Gretsch G2622 Streamliner",
    price: "499.00",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400&q=80",
    type: "Hollow Body",
    brand: { id: "10", name: "Gretsch" },
  },
];

const ModelsPage = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BRANDS);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const brand = useMemo(() => {
    if (!data?.findAllBrands || !brandId) return null;
    return data.findAllBrands.find((b) => b.id === brandId);
  }, [data?.findAllBrands, brandId]);

  const brandModels = useMemo(() => {
    if (!brand) return [];
    return mockGuitarModels.filter((model) => model.brand?.id === brand.id);
  }, [brand]);

  const availableTypes = useMemo(() => {
    const types = brandModels.map((model) => model.type).filter(Boolean);
    return [...new Set(types)];
  }, [brandModels]);

  const filteredModels = useMemo(() => {
    return brandModels.filter((model) => {
      const matchesSearch = model.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "all" || model.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [brandModels, searchTerm, selectedType]);

  const totalPages = Math.ceil(filteredModels.length / itemsPerPage);
  const totalResults = filteredModels.length;

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedModels = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredModels.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredModels, currentPage, itemsPerPage]);

  const handleBackToHome = () => navigate("/");

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const generatePaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 10;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-button ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(
        1,
        Math.min(currentPage - 4, totalPages - maxVisiblePages + 1)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-button ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(
            <span key="ellipsis" className="pagination-dots">
              ...
            </span>
          );
        }
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`page-button ${
              currentPage === totalPages ? "active" : ""
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="models-page">
        <div className="header-section">
          <div className="back-to-home" onClick={handleBackToHome}>
            ← Back To Home
          </div>
          <div className="logo">
            <span className="logo-box">M</span> VibeStrings
          </div>
        </div>
        <div className="status-message">
          <div className="loading-message">Loading guitars...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="models-page">
        <div className="header-section">
          <div className="back-to-home" onClick={handleBackToHome}>
            ← Back To Home
          </div>
          <div className="logo">
            <span className="logo-box">M</span> VibeStrings
          </div>
        </div>
        <div className="status-message">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>Error: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="models-page">
        <div className="header-section">
          <div className="back-to-home" onClick={handleBackToHome}>
            ← Back To Home
          </div>
          <div className="logo">
            <span className="logo-box">M</span> VibeStrings
          </div>
        </div>
        <div className="status-message">
          <div className="error-message">
            <h2>Brand not found</h2>
            <p>The requested brand could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="models-page">
      {/* Header */}
      <div className="header-section">
        <div className="back-to-home" onClick={handleBackToHome}>
          ← Back To Home
        </div>
        <div className="logo">
          <span className="logo-box">M</span> VibeStrings
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-brand-section">
        <div className="hero-content">
          <h1>
            Play like a <span className="highlight">Rock star</span>
          </h1>
          <p>
            With a legacy dating back to the 1950s, {brand.name} blends expert
            craftsmanship with cutting-edge innovation to deliver guitars that
            inspire musicians worldwide.
          </p>
        </div>
        <div className="brand-logo-circle">
          {brand.image ? (
            <img src={brand.image} alt={brand.name} />
          ) : (
            <div className="brand-name-circle">{brand.name}</div>
          )}
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <h2>
          Check out the <span className="highlight">Selection</span>
        </h2>
        <div className="filters-container">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-dropdown"
          >
            <option value="all">Filter by type</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
      </section>

      {/* Guitar Grid */}
      <section className="guitars-section">
        {paginatedModels.length === 0 ? (
          <div className="no-results">
            <p>No guitars found matching your criteria.</p>
            <p>Try adjusting your search or filter settings.</p>
          </div>
        ) : (
          <div className="guitar-grid">
            {paginatedModels.map((guitar) => (
              <div key={guitar.id} className="guitar-card">
                <div className="guitar-image">
                  {guitar.image ? (
                    <img
                      src={guitar.image}
                      alt={guitar.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="placeholder-image"
                    style={{ display: guitar.image ? "none" : "flex" }}
                  >
                    <span>🎸</span>
                    <span>No Image</span>
                  </div>
                </div>
                <div className="guitar-info">
                  <h4>{guitar.name}</h4>
                  <p className="guitar-type">{guitar.type}</p>
                  <p className="guitar-price">
                    {guitar.price
                      ? `$${parseFloat(guitar.price).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : "Price not available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="pagination-section">
          <div className="pagination-info">
            <p>
              Showing {paginatedModels.length} of {totalResults} guitars
            </p>
          </div>
          <div className="pagination">{generatePaginationButtons()}</div>
        </section>
      )}

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
          <p>© 2024 Copyright VibeStrings</p>
        </div>
      </footer>
    </div>
  );
};

export default ModelsPage;
