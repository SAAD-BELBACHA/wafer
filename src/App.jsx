import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Database } from 'lucide-react'

function App() {
  const [entries, setEntries] = useState([])
  const [formData, setFormData] = useState({
    date: '',
    numberOfWafers: '',
    qualityManager: '',
    typeOfTest: '',
    size: ''
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('waferTestEntries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Save data to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('waferTestEntries', JSON.stringify(entries))
  }, [entries])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate that all fields are filled
    if (!formData.date || !formData.numberOfWafers || !formData.qualityManager || !formData.typeOfTest || !formData.size) {
      alert('Please fill in all fields')
      return
    }

    const newEntry = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    }

    setEntries(prev => [newEntry, ...prev])
    
    // Reset form
    setFormData({
      date: '',
      numberOfWafers: '',
      qualityManager: '',
      typeOfTest: '',
      size: ''
    })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(prev => prev.filter(entry => entry.id !== id))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const totalWafers = entries.reduce((sum, entry) => sum + parseInt(entry.numberOfWafers || 0), 0)
  const uniqueQualityManagers = new Set(entries.map(entry => entry.qualityManager)).size

  return (
    <div className="container">
      <div className="header">
        <h1>Wafer Test Manager</h1>
        <p>Manage your wafer testing data efficiently</p>
      </div>

      {/* Statistics */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">{entries.length}</div>
          <div className="stat-label">Total Entries</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalWafers}</div>
          <div className="stat-label">Total Wafers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{uniqueQualityManagers}</div>
          <div className="stat-label">Quality Managers</div>
        </div>
      </div>

      {/* Add New Entry Form */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Add New Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="numberOfWafers">Number of Wafers</label>
              <input
                type="number"
                id="numberOfWafers"
                name="numberOfWafers"
                value={formData.numberOfWafers}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="qualityManager">Quality Manager</label>
              <input
                type="text"
                id="qualityManager"
                name="qualityManager"
                value={formData.qualityManager}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="typeOfTest">Type of Test</label>
              <select
                id="typeOfTest"
                name="typeOfTest"
                value={formData.typeOfTest}
                onChange={handleInputChange}
                required
              >
                <option value="">Select test type</option>
                <option value="Electrical">Electrical</option>
                <option value="Optical">Optical</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Thermal">Thermal</option>
                <option value="Environmental">Environmental</option>
                <option value="Reliability">Reliability</option>
                <option value="Performance">Performance</option>
                <option value="Quality">Quality</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                required
              >
                <option value="">Select size</option>
                <option value="2 inch">2 inch</option>
                <option value="3 inch">3 inch</option>
                <option value="4 inch">4 inch</option>
                <option value="6 inch">6 inch</option>
                <option value="8 inch">8 inch</option>
                <option value="12 inch">12 inch</option>
                <option value="18 inch">18 inch</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary">
            <Plus size={20} />
            Add Entry
          </button>
        </form>
      </div>

      {/* Entries Table */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Test Entries</h2>
        
        {entries.length === 0 ? (
          <div className="empty-state">
            <Database size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3>No entries yet</h3>
            <p>Add your first wafer test entry using the form above.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Number of Wafers</th>
                  <th>Quality Manager</th>
                  <th>Type of Test</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.id}>
                    <td>{formatDate(entry.date)}</td>
                    <td>{entry.numberOfWafers}</td>
                    <td>{entry.qualityManager}</td>
                    <td>{entry.typeOfTest}</td>
                    <td>{entry.size}</td>
                    <td>
                      <div className="actions">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.5rem', fontSize: '0.9rem' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default App