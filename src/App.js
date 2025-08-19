import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("profile");
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 5;

  // Dummy article data with varied statuses
  const articles = Array.from({ length: 23 }, (_, i) => {
    const statuses = ["Published", "Draft", "Under Review", "Rejected"];
    const status = statuses[i % statuses.length];
    
    return {
      id: i + 1,
      title: `How to Build Modern Web Applications - Part ${i + 1}`,
      status: status,
      publishDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
      views: Math.floor(Math.random() * 10000) + 100
    };
  });

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case "Published": return "success";
      case "Draft": return "warning";
      case "Under Review": return "primary";
      case "Rejected": return "danger";
      default: return "secondary";
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "☰" : "×"}
        </button>
        
        {!collapsed && <div className="sidebar-title">Dashboard</div>}
        
        <ul>
          <li 
            onClick={() => setActivePage("profile")}
            className={activePage === "profile" ? "active" : ""}
          >
            <span className="nav-icon">👤</span>
            {!collapsed && <span>Profile</span>}
          </li>
          <li 
            onClick={() => setActivePage("articles")}
            className={activePage === "articles" ? "active" : ""}
          >
            <span className="nav-icon">📝</span>
            {!collapsed && <span>My Articles</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activePage === "profile" && (
          <div className="profile-section">
            <h1 className="page-title">Profile</h1>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-pic-container">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                    alt="Profile"
                    className="profile-pic"
                  />
                  <div className="online-indicator"></div>
                </div>
              </div>
              
              <div className="profile-info">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>John Alexander Doe</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Email Address</label>
                    <p>john.doe@authorhub.com</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Date Joined</label>
                    <p>March 15, 2023</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Member Status</label>
                    <Badge bg="success" pill>✓ Verified Author</Badge>
                  </div>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-number">{articles.length}</div>
                    <div className="stat-label">Total Articles</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{articles.filter(a => a.status === 'Published').length}</div>
                    <div className="stat-label">Published</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{articles.filter(a => a.status === 'Draft').length}</div>
                    <div className="stat-label">Drafts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === "articles" && (
          <div className="articles-section">
            <div className="articles-header">
              <h1 className="page-title">My Articles</h1>
              <button className="btn btn-primary">
                + New Article
              </button>
            </div>

            <div className="articles-container">
              <div className="articles-list">
                {currentArticles.map((article) => (
                  <div key={article.id} className="article-item-enhanced">
                    <div className="article-content">
                      <h3 className="article-title">{article.title}</h3>
                      <div className="article-meta">
                        <span>Published: {article.publishDate}</span>
                        <span>Views: {article.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="article-actions">
                      <Badge
                        bg={getBadgeVariant(article.status)}
                        pill
                      >
                        {article.status}
                      </Badge>
                      <div className="action-buttons">
                        <button className="btn-icon edit-btn" title="Edit">✏️</button>
                        <button className="btn-icon delete-btn" title="Delete">🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Pagination */}
              <div className="pagination-container">
                <div className="pagination-info">
                  Showing {((currentPage - 1) * articlesPerPage) + 1} to {Math.min(currentPage * articlesPerPage, articles.length)} of {articles.length} articles
                </div>
                
                <div className="pagination-controls">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  >
                    Previous
                  </button>
                  
                  {generatePageNumbers().map((pageNum, idx) => (
                    <button
                      key={idx}
                      onClick={() => typeof pageNum === 'number' ? handlePageChange(pageNum) : null}
                      disabled={pageNum === '...'}
                      className={`pagination-btn ${
                        pageNum === currentPage ? 'active' : ''
                      } ${pageNum === '...' ? 'disabled' : ''}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;