import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CocktailSearch = () => {
  const [ingredient, setIngredient] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false); // Для обработки отсутствия коктейлей
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const fetchCocktails = async () => {
    try {
      setError(null);
      setNoResults(false);
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

      // Проверяем, что response.data.drinks является массивом
      if (Array.isArray(response.data.drinks)) {
        setCocktails(response.data.drinks);
      } else {
        setNoResults(true); // Если коктейли не найдены
        setCocktails([]);
      }
    } catch (err) {
      setError('Error fetching data, please try again.');
      setCocktails([]); // Если произошла ошибка, сбрасываем массив коктейлей
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (ingredient) fetchCocktails();
  };

  const handleCardClick = (cocktailId) => {
    navigate(`/cocktail/${cocktailId}`);
  };

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
      <Typography variant="h4" align="center" gutterBottom>
        Cocktail Search
      </Typography>

      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <TextField
          label="Enter an ingredient"
          variant="outlined"
          value={ingredient}
          onChange={handleInputChange}
          sx={{ marginRight: 2 }}
        />
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
          type="submit"
        >
          Search
        </Button>
      </form>

      {/* Если произошла ошибка, показываем ее */}
      {error && (
        <Typography color="error" align="center" variant="body2">
          {error}
        </Typography>
      )}

      {/* Если коктейлей не найдено, показываем сообщение */}
      {noResults && (
        <Typography align="center" variant="body2" color="error">
          No cocktails found for the specified ingredient.
        </Typography>
      )}

      <Grid container spacing={3} justifyContent="center">
        {cocktails && Array.isArray(cocktails) && cocktails.length > 0 && (
          cocktails.map((cocktail) => (
            <Grid item xs={12} sm={6} md={4} key={cocktail.idDrink}>
              <Card
                onClick={() => handleCardClick(cocktail.idDrink)}
                sx={{
                  backgroundColor: "#ffccbc",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease-in-out",
                  cursor: 'pointer',
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">
                    {cocktail.strDrink}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default CocktailSearch;
