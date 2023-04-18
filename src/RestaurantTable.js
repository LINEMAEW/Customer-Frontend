import React from 'react';
import MenuTable from './MenuTable';
import { Link } from "react-router-dom";

const RestaurantTable = ({ all_restaurants }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Restaurant Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {all_restaurants.map(restaurant => (
          <tr key={restaurant.restaurant_name}>
            <td>
              <a style={{color: "blue", textDecoration: 'underline'}} onClick={()=>{window.location.href = "/menu"}}>{restaurant.restaurant_name}</a>
            </td>
            <td>{restaurant.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RestaurantTable;
