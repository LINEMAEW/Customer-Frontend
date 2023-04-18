import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantTable from './RestaurantTable'; // Update the file path to match your project structure

const AllRestaurants = () => {

  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    try {
      const url_res = "https://linemaew.onrender.com/api/restaurant/all"
      fetch(url_res).then((res_all) => {
        if (res_all.status == 400) {
          console.log("undefind")
        } else {
          res_all.json().then((all_res) => {
            console.log("all", all_res.all_restaurants)
            setAllRestaurants(all_res.all_restaurants)     
          })
        }
      })
    } catch(error) {
      console.log(error)
    }
  
  }, []);

  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    try {
      const url_orders = "https://linemaew.onrender.com/api/order/all/1";
      axios.get(url_orders)
        .then((response) => {
          console.log("all_orders", response.data.all_orders);
          setAllOrders(response.data.all_orders);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1>Restaurant Table</h1>
      <RestaurantTable all_restaurants={allRestaurants} />
      <div>
      <h1>Orders Table</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Restaurant ID</th>
            <th>Order Date</th>
            <th>Total Price</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.user_id}</td>
              <td>{order.restaurant_id}</td>
              <td>{order.order_date}</td>
              <td>{order.total_price}</td>
              <td>{order.payment_status ? 'Paid' : 'Unpaid'}</td>
              <td>{order.delivery_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AllRestaurants;
