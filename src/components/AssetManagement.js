import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AssetManagement() {
  const [assetData, setAssetData] = useState({});
  const [assetTypeFields, setAssetTypeFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/login');
    }
  }, [navigate]);

  const assetTypeOptions = {
    Computer: [
      { name: 'computerForm', label: 'Computer Form' },
      { name: 'computerManufacturer', label: 'Manufacturer' },
      { name: 'computerModelName', label: 'Model Name' },
      { name: 'computerModelNumber', label: 'Computer Model Number' },
      { name: 'serialNumber', label: 'Serial Number' },
      { name: 'operationSystem', label: 'Operating System' },
      { name: 'processor', label: 'Processor' },
      { name: 'randomAccesMemory', label: 'RAM' },
      { name: 'hardDriveCapacity', label: 'Hard Drive Capacity' },
      { name: 'monitorManufacturer', label: 'Monitor Manufacturer' },
      { name: 'keyboardManufacturer', label: 'Keyboard Manufacturer' },
      { name: 'mouseManufacturer', label: 'Mouse Manufacturer' },
    ],
    Mobile: [
      { name: 'mobilePhoneManufacturer', label: 'Manufacturer' },
      { name: 'mobilePhoneModel', label: 'Model' },
      { name: 'mobilePhoneSerialNumber', label: 'Serial Number' },
      { name: 'mobilePhoneImeiNumber', label: 'IMEI Number' },
      { name: 'mobileNumber', label: 'Mobile Number' },
      { name: 'mobileNumberOperator', label: 'Mobile Operator' },
    ],
    Printer: [
      { name: 'printerManufacturer', label: 'Manufacturer' },
      { name: 'printerModel', label: 'Model' },
      { name: 'printerSerilaNumber', label: 'Serial Number' },
    ],
    DongleAndWifi: [
      { name: 'dongleOrRouterManfacturer', label: 'Manufacturer' },
      { name: 'dongleOrRouterModel', label: 'Model' },
      { name: 'dongleOrRouterImeiNumber', label: 'IMEI Number' },
      { name: 'dongleOrRouterSerialNumber', label: 'Serial Number' },
      { name: 'mobileNumber', label: 'Mobile Number' },
      { name: 'mobileNumberOperator', label: 'Mobile Operator' },
    ],
  };

  const handleAssetTypeChange = (e) => {
    const selectedType = e.target.value;
    setAssetData({ type: selectedType });
    setAssetTypeFields(assetTypeOptions[selectedType] || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData({ ...assetData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dynamically construct the endpoint URL
      const endpoint = assetData.type.toLowerCase() === 'dongleandwifi'
        ? 'http://localhost:8080/api/assets/dongles'  // Ensure you're using the correct endpoint for dongles and wifi
        : `http://localhost:8080/api/assets/${assetData.type.toLowerCase()}s`;

      // Send the POST request to the correct endpoint
      await axios.post(endpoint, assetData);
      alert(`${assetData.type} registered successfully!`);

      // Clear the form data
      setAssetData({});
    } catch (error) {
      // Enhanced error message
      alert(`Error registering ${assetData.type}: ${error.response?.data || error.message}`);
    }
  };

  const handleViewAssets = () => {
    navigate('/view-assets');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div>
      <h2>Asset Management</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <select name="type" value={assetData.type || ''} onChange={handleAssetTypeChange} required>
                    <option value="">Select Asset Type</option>
                    {Object.keys(assetTypeOptions).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              {assetTypeFields.map((field) => (
                <tr key={field.name}>
                  <td>
                    <label>{field.label}:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name={field.name}
                      value={assetData[field.name] || ''}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">
                  <button type="submit">Register Asset</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleViewAssets}>View Registered Assets</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default AssetManagement;
