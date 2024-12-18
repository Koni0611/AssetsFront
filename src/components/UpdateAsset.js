import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateAsset() {
  const { type, id } = useParams(); 
  console.log("Type:", type, "ID:", id);
  const navigate = useNavigate();
  const [assetData, setAssetData] = useState({});
  const [assetTypeFields, setAssetTypeFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Define fields for each asset type
  const assetTypeOptions = {
    computers: [
      { name: "computerForm", label: "Computer Form" },
      { name: "computerManufacturer", label: "Manufacturer" },
      { name: "computerModelName", label: "Model Name" },
      { name: "computerModelNumber", label: "Model Number" },
      { name: "serialNumber", label: "Serial Number" },
      { name: "operationSystem", label: "Operating System" },
      { name: "processor", label: "Processor" },
      { name: "randomAccesMemory", label: "RAM" },
      { name: "hardDriveCapacity", label: "Hard Drive Capacity" },
      { name: "monitorManufacturer", label: "Monitor Manufacturer" },
      { name: "keyboardManufacturer", label: "Keyboard Manufacturer" },
      { name: "mouseManufacturer", label: "Mouse Manufacturer" },
    ],
    mobiles: [
      { name: "mobilePhoneManufacturer", label: "Mobile Manufacturer" },
      { name: "mobilePhoneModel", label: "Model" },
      { name: "mobilePhoneSerialNumber", label: "Serial Number" },
      { name: "mobilePhoneImeiNumber", label: "IMEI Number" },
      { name: "mobileNumber", label: "Mobile Number" },
      { name: "mobileNumberOperator", label: "Mobile Operator" },
    ],
    printers: [
      { name: "printerManufacturer", label: "Manufacturer" },
      { name: "printerModel", label: "Model" },
      { name: "printerSerilaNumber", label: "Serial Number" },
    ],
    dongles: [
      { name: "dongleOrRouterManfacturer", label: "Manufacturer" },
      { name: "dongleOrRouterModel", label: "Model" },
      { name: "dongleOrRouterImeiNumber", label: "IMEI Number" },
      { name: "dongleOrRouterSerialNumber", label: "Serial Number" },
      { name: "mobileNumber", label: "Mobile Number" },
      { name: "mobileNumberOperator", label: "Mobile Operator" },
    ],
  };
  

  // Fetch asset details
  useEffect(() => {
    const fetchAssetDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/assets/${type}/${id}`);
        console.log("Fetched Data:", response.data);
        setAssetData(response.data);
        setAssetTypeFields(assetTypeOptions[type.toLowerCase()] || []);
      } catch (error) {
        console.error("Error Fetching Asset:", error);
        alert("Failed to fetch asset details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssetDetails();
  }, [type, id]);
  

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData({ ...assetData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/assets/${type}/${id}`, assetData);
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
      navigate("/view-assets"); // Redirect to view assets
    } catch (error) {
      alert("Failed to update asset.");
    }
  };

  // Loading state
  if (isLoading) return <p>Loading...</p>;

  // Render form
  return (
    <div>
      <h2>Update {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      {isLoading ? (
        <p>Loading asset details...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              {assetTypeFields.map((field) => (
                <tr key={field.name}>
                  <td>
                    <label>{field.label}:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name={field.name}
                      value={assetData[field.name] || ""}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => navigate("/view-assets")}>Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      )}
    </div>
  );
  
  
}

export default UpdateAsset;
