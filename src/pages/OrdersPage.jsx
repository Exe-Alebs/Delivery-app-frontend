// OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { CreateOrder, getOrderbyUser } from "../services/orderservice";
import "./OrdersPage.scss";
import useAuth from "../config/hooks/useAuth";
import { useMealContext } from "../config/context/MealContext";
import { Button } from "@mui/material";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();
  const { orderList } = useMealContext();

  useEffect(() => {
    if (user) {
      getOrderbyUser(user.id)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [user]);

  const handleCreateOrder = () => {
    CreateOrder({
      userId: user.id,
      orderAddress: user.address,
      orderPhone: user.phone,
      mealIds: orderList.map((meal) => meal.id),
    })
      .then((response) => {
        console.log("Order created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };
  useEffect(() => {
    console.log(orderList);
  }, [orderList]);

  return (
    <div className="orders-page">
      <div className="order-form">
        <h2>Create Order</h2>
        <form>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={user.id}
            readOnly
          />
          <label htmlFor="orderAddress">Order Address:</label>
          <input
            type="text"
            id="orderAddress"
            name="orderAddress"
            value=""
            readOnly
          />
          <label htmlFor="orderPhone">Order Phone:</label>
          <input
            type="text"
            id="orderPhone"
            name="orderPhone"
            value=""
            readOnly
          />
          <label htmlFor="mealIds">Meal IDs:</label>
          <input
            type="text"
            id="mealIds"
            name="mealIds"
            value={orderList}
            readOnly
          />
        </form>
        <Button onClick={() => handleCreateOrder()}>Create Order</Button>
      </div>

      <div className="order-list">
        <h2>Your Orders</h2>
        {orders?.map((order) => (
          <div key={order.id} className="order-item">
            <p>Total Price: ${order.orderTotal}</p>
            <p>Order Address: {order.orderAddress}</p>
            <p>Order Phone: {order.orderPhone}</p>
            <p>Order Status: {order.orderStatus}</p>
            <p>Order Date: {order.createdOn}</p>
            <p>Tracking Number: {order.trackingNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
