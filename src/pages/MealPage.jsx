import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealbyId } from "../services/mealservice";
import { addtoFavorites, removefromFavorites } from "../services/userservices";
import useAuth from "../config/hooks/useAuth";
import "./MealPage.scss"; // Import SCSS file
import { Button } from "@mui/material";
import { useMealContext } from "../config/context/MealContext";

const MealPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState(user?.favorites || []);
  const { addToOrderList, orderList } = useMealContext();
  const [meal, setMeal] = useState(null);
  const [orderUpdated, setOrderUpdated] = useState(false); // Track order updates

  useEffect(() => {
    getMealbyId(id).then((res) => {
      setMeal(res.data);
    });
  }, [id]);

  useEffect(() => {
    if (user) {
      setFavorites(user.favorites);
    }
  }, [user]);

  const handleAddToFavorites = () => {
    addtoFavorites(user.id, id).then((updatedUser) => {
      setFavorites(updatedUser.favorites);
    });
  };
  const handleRemoveFromFavorites = () => {
    removefromFavorites(user.id, id).then((updatedUser) => {
      setFavorites(updatedUser.favorites);
    });
  };

  const handleAddToOrder = () => {
    addToOrderList(meal);
    setOrderUpdated(true); // Set to true when order list is updated
  };

  useEffect(() => {
    if (orderUpdated) {
      console.log("Order List Updated:", orderList);
      setOrderUpdated(false); // Reset after logging
    }
  }, [orderList, orderUpdated]);

  if (!meal) return <div>Loading...</div>;

  const isFavorite = isAuthenticated && favorites && favorites.includes(id);

  return (
    <div className="meal-page">
      <div className="meal-image-container">
        <img className="meal-image" src={meal.mealImage} alt={meal.mealName} />
        {isAuthenticated && (
          <button
            className="favorite-button"
            onClick={() => {
              if (isFavorite) {
                handleRemoveFromFavorites();
              } else {
                handleAddToFavorites();
              }
            }}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        )}
        <Button className="order-button" onClick={handleAddToOrder}>
          Add to Order
        </Button>
      </div>
      <div className="meal-details-container">
        <h2 className="meal-name">{meal.mealName}</h2>
        <p className="meal-description">{meal.mealDescription}</p>
        <p className="meal-type">Type: {meal.mealType}</p>
        <p className="meal-price">Price: ${meal.mealPrice}</p>
      </div>
    </div>
  );
};

export default MealPage;
