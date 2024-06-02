import React, { useEffect, useState } from "react";
import { getAllMeals } from "../services/mealservice";
import "./menupage.scss";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [sortBy, setSortBy] = useState("mealName");
  const [order, setOrder] = useState("asc");
  const [filterByType, setFilterByType] = useState("");

  useEffect(() => {
    getAllMeals(sortBy, order, filterByType)
      .then((res) => {
        console.log(res.data);
        setMeals(res?.data);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
        setMeals([]);
      });
  }, [sortBy, order, filterByType]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterByType(e.target.value);
  };

  const handleMealClick = (id) => {
    navigate(`/meal/${id}`);
  };

  return (
    <div className="menu-page">
      <div className="controls">
        <select onChange={handleSortChange} value={sortBy}>
          <option value="mealName">Name</option>
          <option value="mealPrice">Price</option>
          <option value="createdDate">Recently Added</option>
        </select>
        <select onChange={handleOrderChange} value={order}>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
        <select onChange={handleFilterChange} value={filterByType}>
          <option value="">All Types</option>
          <option value="main_course">Main Course</option>
          <option value="side">Side</option>
          <option value="snack">Snack</option>
          <option value="drink">Drink</option>
        </select>
      </div>
      <div className="meal-cards">
        {meals?.map((meal) => (
          <div
            key={meal.id}
            className="meal-card"
            onClick={() => handleMealClick(meal.id)}
          >
            <img src={meal.mealImage} alt={meal.mealName} />
            <h3>{meal.mealName}</h3>
            <p>{meal.mealDescription}</p>
            <p>${meal.mealPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
