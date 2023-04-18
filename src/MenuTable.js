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
    <div>
      <h1>Menus</h1>
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Menu Name</th>
            <th>Menu Description</th>
            <th>Order Amount</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.item_id}>
              <td>{menu.item_id}</td>
              <td>{menu.menu_name}</td>
              <td>{menu.menu_description}</td>
              <td>{menu.price}</td>
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
      <button onClick={handleOrderSubmit}>Submit Order</button>
      <button onClick={()=>{window.location.href = "/"}}>Back</button>
    </div>
  );
};

export default MenuTable;
