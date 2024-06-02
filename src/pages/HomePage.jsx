import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getallmeals } from "../services/mealservice";
import "./homepage.scss";
import useAuth from "../config/hooks/useAuth";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getallmeals()
      .then((res) => {
        setMeals(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const results = meals.filter((meal) =>
      meal.mealName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(results);
  }, [searchTerm, meals]);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleOrder = () => {
    if (isAuthenticated) {
      navigate("/orders");
    } else {
      navigate("/login");
    }
  };

  const handleMealClick = (id) => {
    navigate(`/meal/${id}`);
  };

  return (
    <div className="home-page">
      <div className="hero">
        <div className="content">
          <h1>Welcome to the Meal Ordering App</h1>
          <p>Discover and order your favorite meals.</p>
          <div className="middle-sec">
            <video loop autoPlay height={200} width={200}>
              <source src="./anime1.webm" type="video/webm" />
            </video>
            <input
              type="text"
              placeholder="Search for meals"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button onClick={() => handleOrder()}>Order here</button>
        </div>
      </div>
      <div className="meal-cards">
        {filteredMeals?.map((meal) => (
          <div
            key={meal.id}
            onClick={() => handleMealClick(meal.id)}
            className="meal-card"
          >
            <img src={meal.mealImage} alt={meal.mealName[0]} />
            <h3>{meal.mealName}</h3>
            {/* <p>{meal.mealDescription}</p> */}
            <p>${meal.mealPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
