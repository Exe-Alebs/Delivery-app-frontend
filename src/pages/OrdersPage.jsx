import React, { useEffect, useState } from "react";
import { getOrderbyUser } from "../services/orderservice";
import "./OrdersPage.scss";
import useAuth from "../config/hooks/useAuth";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    getOrderbyUser(user.id)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      <div className="order-list">
        {orders?.map((order) => (
          <div className="order-item" key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Order Date: {order.orderDate}</p>
            <p>Total Price: ${order.totalPrice}</p>
            {/* Additional order details can be displayed here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
