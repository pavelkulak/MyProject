import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate для навигации
import axios from "axios";

const MainPage = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [cocktails, setCocktails] = useState([]);
  const navigate = useNavigate(); // Используем useNavigate для перехода между страницами

  // Функция для получения коктейлей из API
  const fetchCocktails = async () => {
    try {
      const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
      );
      setCocktails(response.data.drinks.slice(0, 3)); // Берем только 3 коктейля
    } catch (error) {
      console.error("Error fetching cocktails:", error);
    }
  };

  useEffect(() => {
    fetchCocktails(); // Вызываем функцию при загрузке компонента
  }, []);

  const handleExploreClick = () => {
    if (!user) {
      setOpen(true); // Показать предупреждение, если пользователь не авторизован
    } else {
      navigate("/CocktailSearch"); // Переход к странице поиска рецептов
    }
  };

  const handleClose = () => {
    setOpen(false); // Закрыть предупреждение
  };

  return (
    <Container>
      <div
        style={{
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          color: "#fff",
          padding: "64px 0",
          textAlign: "center",
          borderRadius: "8px",
          marginBottom: "32px",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: "bold" }}>
          Welcome to Cocktail Paradise!
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontSize: "1.5rem", marginBottom: "32px" }}
        >
          Discover your favorite cocktails and learn how to make them at home
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff4081",
            color: "#fff",
            padding: "12px 32px",
            "&:hover": {
              backgroundColor: "#f50057",
            },
          }}
          size="large"
          onClick={handleExploreClick} // Переход к странице поиска рецептов
        >
          Explore Recipes
        </Button>
      </div>

      <Grid container spacing={4}>
        {cocktails.map((cocktail) => (
          <Grid item key={cocktail.idDrink} xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#ffccbc",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer", // Указываем, что карточка кликабельна
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)} // Переход к странице деталей коктейля
            >
              <CardMedia
                component="img"
                image={cocktail.strDrinkThumb} // Изображение коктейля из API
                alt={cocktail.strDrink}
                sx={{ height: 200 }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    marginBottom: "16px",
                  }}
                >
                  {cocktail.strDrink}
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>
                  A delicious cocktail to enjoy at home!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Please log in to explore recipes!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MainPage;
