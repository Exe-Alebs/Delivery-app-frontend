import React from "react";
import useAuth from "../config/hooks/useAuth";
import "./profilepage.scss";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <div className="profile-details">
        <p>
          <strong>First Name:</strong> {user?.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user?.createdOn).toLocaleDateString()}
        </p>
      </div>
      {user?.favourite.length > 0 && (
        <div className="favorite-meals">
          <h2>Your Favorite Meals</h2>
          <ul>
            {user?.favourite.map((meal) => (
              <li key={meal.id}>
                {meal.mealName}
                {""}
                {" $" + meal?.mealPrice}
              </li>
            ))}
          </ul>
        </div>
      )}
      {user?.orders.length > 0 && (
        <div className="order-history">
          <h2>Your Order History</h2>
          <ul>
            {user?.orders.map((order) => (
              <li key={order.id}>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdOn).toLocaleDateString()}
                </p>
                <p>
                  <strong>Order Status:</strong> {order.orderStatus}
                </p>
                <p>
                  <strong>Order Address:</strong> {order.orderAddress}
                </p>
                <p>
                  <strong>Order Phone:</strong> {order.orderPhone}
                </p>
                <p>
                  <strong>Meals:</strong> {order?.meals?.length || 0}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
