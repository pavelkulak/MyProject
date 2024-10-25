import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { Typography, Container, CardMedia, CardContent, Card, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const CocktailDetails = ({ user }) => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setCocktail(response.data.drinks[0]);
      } catch (err) {
        console.error("Error fetching cocktail details:", err);
      }
    };

    const checkIfLiked = async () => {
      const response = await axiosInstance.get(`/likes/${user.id}/${id}`);
      setIsLiked(response.data.isLiked);
    };

    fetchCocktailDetails();
    if (user) checkIfLiked();
  }, [id, user]);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await axiosInstance.delete(`/likes/${id}`, { data: { userId: user.id } });
      } else {
        await axiosInstance.post('/likes', {
          userId: user.id,
          cocktailId: id,
          cocktailName: cocktail.strDrink,
          cocktailImageUrl: cocktail.strDrinkThumb,
        });
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  if (!cocktail) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 4,
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: "8px",
        padding: "32px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        color: "#fff",
      }}
    >
      <Card
        sx={{
          backgroundColor: "#ffccbc",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
        />
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {cocktail.strDrink}
          </Typography>

          <Typography variant="h6">Ingredients:</Typography>
          <ul>
            {[...Array(15)].map((_, i) => {
              const ingredient = cocktail[`strIngredient${i + 1}`];
              const measure = cocktail[`strMeasure${i + 1}`];
              return ingredient ? (
                <li key={i}>
                  {measure ? `${measure} ` : ""}
                  {ingredient}
                </li>
              ) : null;
            })}
          </ul>

          <Typography variant="h6">Instructions:</Typography>
          <Typography variant="body1">{cocktail.strInstructions}</Typography>

          <IconButton
            onClick={handleLikeToggle}
            sx={{
              color: isLiked ? "#ff4081" : "#fff",
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CocktailDetails;
