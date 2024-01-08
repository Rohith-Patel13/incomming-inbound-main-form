import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

const FormV2 = () => {
  const [date, setDate] = useState("");
  const [item_name, setItemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [po_number, setPoNumber] = useState("");
  const [unit_of_measurement, setUnitOfMeasurement] = useState("KG");
  const [receiver_name, setUserName] = useState("");

  const handleItemName = (e) => {
    e.preventDefault();
    setItemName(e.target.value);
  };






  const handleReceiverNameChange = (e) => {
    const selectedValue = e.target.value;

    // If the selected value is "other", clear the custom name field
    if (selectedValue === "other") {
      setCustomReceiverName("");
    }

    setReceiverName(selectedValue);
  };

  const handleCustomReceiverNameChange = (e) => {
    setCustomReceiverName(e.target.value);
  };

  const handleUnitOfMeasurementChange = (e) => {
    setUnitOfMeasurement(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const setData = () => {
      setDate("");
      setItemName("");
      setQuantity("");
      setPoNumber("");
      setUserName("");
      setUnitOfMeasurement("KG"); // Reset the
    };

    const formattedDate = dateToSerialNumber(date);


    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbyZQqVdQmHpv3S32tMHjfx9z-dFqUC8p7FhWDDguYCrXgeE9QC8D-HU_n-BAmjmHYFvTw/exec"
        // "https://script.google.com/macros/s/AKfycbyJvS2g5_sDRcSfN3Y4NJFygGnGMj0hrF3_RB0pTiCy9pZiH-Gc1GUjXF2u8DQsksOhrA/exec";

      const formData = new FormData();
      formData.append("date", formattedDate);
      formData.append("item_name", item_name);
      formData.append("Quantity", Quantity);
      formData.append("item_name", item_name);
      formData.append("po_number", po_number);
      formData.append("unit_of_measurement", unit_of_measurement);
      formData.append("receiver_name", receiver_name);

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.result === "success") {
        toast.success("Form submitted successfully");
      } else {
        toast.error("Form submission failed");
      }
    } catch (error) {
      toast.error("Form submission failed");
      console.error("Error!", error.message);
    }
    setData();
  };

  // Function to convert the date to the serial number format
  const dateToSerialNumber = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYY-MM-DD").format("YYYY-MM-DD");
    return formattedDate;
  };

  return (
    <section className="section">
      <form className="form" onSubmit={handleSubmit}>
        <h4>The Affordable Organic Store Inbound Inventory Form</h4>
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

        <div className="form-row">
          <label htmlFor="nameID" className="form-label">
            Receiver Name
          </label>
          <select
            id="nameID"
            value={receiver_name}
            onChange={handleReceiverNameChange}
            className="form-input"
            required
          >
            <option value="">Select Receiver Name</option>
            <option value="simran meel">Simran Meel</option>
            <option value="nathya">Nathya</option>
            <option value="other">Other</option>
          </select>
          {receiver_name === "other" && (
            <input
              type="text"
              id="customNameID"
              value={customReceiverName}
              onChange={handleCustomReceiverNameChange}
              className="form-input"
              placeholder="Enter custom name"
              required
            />
          )}
        </div>
        <br></br>
        <button className="btn btn-submit">submit</button>
      </form>
    </section>
  );
};
export default FormV2;
