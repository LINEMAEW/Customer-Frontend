import React, { useEffect, useState } from "react";

const MenuTable = () => {
  const [menus, setMenus] = useState([]);
  const [orderAmounts, setOrderAmounts] = useState({});
  
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(
          "https://linemaew.onrender.com/api/restaurant/1/all_menu"
        );
        const data = await response.json();
        setMenus(data.all_menus);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchMenus();
  }, []);

  const handleOrderAmountChange = (menuId, amount) => {
    setOrderAmounts((prevOrderAmounts) => ({
      ...prevOrderAmounts,
      [menuId]: amount
    }));
  };

  const handleOrderSubmit = async () => {
    try {
      // Prepare the order data
      const orderData = {
        user_id: 1,
        restaurant_id: 1,
        order_date: new Date().toISOString(),
        menu: Object.entries(orderAmounts).map(([itemId, amount]) => ({
          item_id: parseInt(itemId),
          quantity: parseInt(amount)
        }))
      };
      
      // Send the order data to the backend API
      const response = await fetch(
        "https://linemaew.onrender.com/api/order/ordering",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        }
      );
      
      if (response.ok) {
        console.log("Order submitted successfully!");
        // Reset the order amounts state after submitting the order
        setOrderAmounts({});
        window.reload();
      } else {
        console.error("Failed to submit order:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="bg">
      <h1>Menus</h1>
      <table>
        <thead>
          <tr className="bar-col">
            <th scope="col">Item ID</th>
            <th scope="col">Menu Name</th>
            <th scope="col">Menu Description</th>
            <th scope="col">Order Amount</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.item_id}>
              <td className="gaegu">{menu.item_id}</td>
              <td className="gaegu">{menu.menu_name}</td>
              <td className="gaegu">{menu.menu_description}</td>
              <td className="gaegu">{menu.price}</td>
              <td>
                <input
                  type="number"
                  value={orderAmounts[menu.item_id] || 0}
                  onChange={(e) =>
                    handleOrderAmountChange(menu.item_id, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <button className="btn" onClick={handleOrderSubmit}>Submit Order</button>
      <button className="btn" onClick={()=>{window.location.href = "/"}}>Back</button>
    </div>
  );
};

export default MenuTable;
