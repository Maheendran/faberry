import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultData from '../data.json';
import '../index.css';

const Admin = () => {
  const [items, setItems] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage or fallback to defaultData
    const storedItems = localStorage.getItem('topItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems(defaultData);
    }
  }, []);

  const handleInputChange = (id, field, value) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setIsSaved(false);
  };

  const saveChanges = () => {
    localStorage.setItem('topItems', JSON.stringify(items));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to reset all items to default?")) {
      setItems(defaultData);
      localStorage.setItem('topItems', JSON.stringify(defaultData));
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--secondary-color)', minHeight: '100vh', padding: '3rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>Admin Dashboard</h2>
          <Link to="/" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem' }}>Back to Home</Link>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Update the Top 3 Items below. Changes will be saved locally. For a production environment, this would be connected to a database.
        </p>

        {items.map((item, index) => (
          <div key={item.id} style={{ marginBottom: '2.5rem', padding: '1.5rem', border: '1px solid var(--primary-light)', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1rem', fontFamily: "'Outfit', sans-serif" }}>Item {index + 1}</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Title</label>
              <input 
                type="text" 
                value={item.title} 
                onChange={(e) => handleInputChange(item.id, 'title', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: "'Outfit', sans-serif" }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Image URL</label>
              <input 
                type="text" 
                value={item.image} 
                onChange={(e) => handleInputChange(item.id, 'image', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: "'Outfit', sans-serif" }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Description</label>
              <textarea 
                value={item.description} 
                onChange={(e) => handleInputChange(item.id, 'description', e.target.value)}
                rows="3"
                style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: "'Outfit', sans-serif", resize: 'vertical' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Badge (Optional, e.g. "Bestseller")</label>
              <input 
                type="text" 
                value={item.badge || ''} 
                onChange={(e) => handleInputChange(item.id, 'badge', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: "'Outfit', sans-serif" }}
              />
            </div>
          </div>
        ))}
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={saveChanges} className="btn btn-primary">Save Changes</button>
          <button onClick={resetToDefault} className="btn btn-outline">Reset to Default</button>
          {isSaved && <span style={{ color: 'var(--whatsapp-color)', fontWeight: 500 }}>✓ Changes saved successfully!</span>}
        </div>

      </div>
    </div>
  );
};

export default Admin;
