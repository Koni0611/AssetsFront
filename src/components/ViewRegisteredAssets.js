import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewRegisteredAssets() {
  const [assets, setAssets] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAssets = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("User ID not found in local storage. Please log in again.");
          return;
        }
        const response = await axios.get(`http://localhost:8080/api/assets/user/${userId}`);
        setAssets(response.data); // Store assets data
      } catch (err) {
        setError("An error occurred while fetching assets. Please try again later.");
      }
    };
    fetchUserAssets();
  }, []);

  // Handle Update Action
  const handleUpdate = (type, id) => {
    console.log("userId:", localStorage.getItem("userId"));
    console.log("Navigating to:", `/update-asset/${type}/${id}`);
    navigate(`/update-asset/${type}/${id}`);
  };

  // Handle Delete Action
  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;

    try {
      const endpoint = `http://localhost:8080/api/assets/${type}/${id}`;
      await axios.delete(endpoint);
      alert(`${type} asset deleted successfully.`);
      window.location.reload(); // Refresh the asset list after deletion
    } catch (error) {
      alert(`Failed to delete ${type} asset.`);
      console.error(error);
    }
  };

  // Render table for each asset type with buttons
  const renderTable = (assetType, data) => {
    if (!data || data.length === 0) return null; // Don't render if no assets exist

    const headers = Object.keys(data[0]).filter((key) => key !== "id" && key !== "userId");

    return (
      <div key={assetType} className="table-container">
        <h3>{assetType.charAt(0).toUpperCase() + assetType.slice(1)}</h3>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header.replace(/([A-Z])/g, " $1").toUpperCase()}</th>
              ))}
              <th>Actions</th> {/* Column for buttons */}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {headers.map((header) => (
                  <td key={header}>{item[header] || "N/A"}</td>
                ))}
                <td>
                  <button onClick={() => handleUpdate(assetType, item.id)}>Update</button>
                  <button onClick={() => handleDelete(assetType, item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <h2>Your Registered Assets</h2>
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        Object.keys(assets).length > 0 ? (
          <div>
            {Object.keys(assets).map((assetType) => {
              const data = assets[assetType];
              return renderTable(assetType, data); // Only render if data exists
            })}
          </div>
        ) : (
          <p>No assets registered.</p>
        )
      )}
      <button onClick={() => navigate("/assets")}>Back to Asset Management</button>
    </div>
  );
}

export default ViewRegisteredAssets;
