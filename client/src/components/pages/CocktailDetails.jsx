import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Container,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";

const CocktailDetails = () => {
  const { id } = useParams(); // получаем ID коктейля из URL
  const [cocktail, setCocktail] = useState(null);

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

    fetchCocktailDetails();
  }, [id]);

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
        </CardContent>
      </Card>
    </Container>
  );
};

export default CocktailDetails;
