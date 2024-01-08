import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

// Component for the inbound inventory form
const FormV2 = () => {
  // State variables for form fields
  const [date, setDate] = useState("");
  const [item_name, setItemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [po_number, setPoNumber] = useState("");
  const [unit_of_measurement, setUnitOfMeasurement] = useState("KG");
  const [receiver_name, setUserName] = useState("");
  const [customName, setCustomName] = useState("");
  
  // Event handler for updating item name
  const handleItemName = (e) => {
    e.preventDefault();
    setItemName(e.target.value);
  };

  // Event handler for changing unit of measurement
  const handleUnitOfMeasurementChange = (e) => {
    setUnitOfMeasurement(e.target.value);
  };
  // Event handler for updating user name
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  // Event handler for updating custom name
  const handleCustomName = (e) => {
    setCustomName(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Function to reset form fields after submission
    const setData = () => {
      setDate("");
      setItemName("");
      setQuantity("");
      setPoNumber("");
      setUserName("");
      setUnitOfMeasurement("KG");
    };
  
    // Format the date to the serial number format
    const formattedDate = dateToSerialNumber(date);
  
    const formObject = {
      date: formattedDate,
      item_name: item_name,
      Quantity: Quantity,
      unit_of_measurement: unit_of_measurement,
      po_number: po_number,
      receiver_name: receiver_name === "Other" ? customName : receiver_name,
    };
    
    const formData = new FormData();
    
    for (const key in formObject) {
      formData.append(key, formObject[key]);
    }  
    try {
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbxJOXvWFH_LKg5fjGYXYkwXI-TKJyIzv_c7wMjhRSowKZGBv5ufWoySW6xBaopKHi-xSw/exec";


        const response = await fetch(scriptURL, {
          method: "POST",
          body: formData,
        });




      
      const data = await response.json();
      if (data.result === "success") {
        toast.success("Form submitted successfully");
      }
    } catch (error) {
      toast.error("Form submission failed");
      console.error("Error during form submission:", error);
    }
    setData();
  };
  

  // Function to convert the date to the serial number format
  const dateToSerialNumber = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYY-MM-DD").format("YYYY-MM-DD");
    return formattedDate;
  };

  // JSX structure for the form
  return (
    <section className="section">
      <form className="form" onSubmit={handleSubmit}>
        <h4>The Affordable Organic Store Inbound Inventory Form</h4>

        {/* Date Selection */}
        <div className="form-row">
          <label htmlFor="dateID" className="form-label">
            Date
          </label>
          <input
            type="date"
            id="dateID"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
            placeholder="date"
            required
          ></input>
        </div>

        {/* Item Information */}
        <div className="form-row">
          <label htmlFor="itemNameID" className="form-label">
            Item name
          </label>
          <input
            type="text"
            className="form-input"
            id="itemNameID"
            value={item_name}
            onChange={handleItemName}
            placeholder="Item name"
            required
          ></input>
        </div>
        <div className="form-row">
          <label htmlFor="quantityID" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            id="quantityID"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-input"
            placeholder="quantity"
            required
          ></input>
          {/* Unit of Measurement */}
          <div className="form-row">
            <label htmlFor="unitOfMeasurementID" className="form-label">
              Unit of Measurement
            </label>
            <select
              id="unitOfMeasurementID"
              value={unit_of_measurement}
              onChange={handleUnitOfMeasurementChange}
              className="form-input"
            >
              <option value="KG">KG</option>
              <option value="gms">gms</option>
              <option value="pcs">pcs</option>
              <option value="pkts">pkts</option>
            </select>
          </div>
        </div>

        {/* PO Number */}
        <div className="form-row">
          <label htmlFor="POID" className="form-label">
            Po number
          </label>
          <input
            type="number"
            id="POID"
            value={po_number}
            onChange={(e) => setPoNumber(e.target.value)}
            className="form-input"
            placeholder="PO Number"
          ></input>
        </div>

        {/* Receiver Information */}
        <div className="form-row">
          <label htmlFor="nameID" className="form-label">
            Receiver Name
          </label>
          <select
            id="nameID"
            value={receiver_name}
            onChange={handleUserName}
            className="form-input"
            required
          >
            <option value="">Select Name</option>
            <option value="Nithya">Nithya</option>
            <option value="Simran Meet">Simran Meel</option>
            <option value="Other">Other</option>
          </select>

          {/* Custom Receiver Name for "Other" option */}
          {receiver_name === "Other" && (
            <>
              {" "}
              <label htmlFor="nameID" className="form-label">
                Receiver Name
              </label>
              <input
                type="text"
                id="customNameID"
                value={customName}
                onChange={handleCustomName}
                className="form-input"
                placeholder="Enter custom name"
                required
              />
            </>
          )}
        </div>

        <br></br>

        {/* Submit Button */}
        <button className="btn btn-submit">submit</button>
      </form>
    </section>
  );
};

export default FormV2;
