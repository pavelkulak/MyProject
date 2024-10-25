import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Container } from '@mui/material';
import { Delete } from '@mui/icons-material';

const UserPage = ({ user }) => {
  const [likedCocktails, setLikedCocktails] = useState([]);

  useEffect(() => {
    const fetchLikedCocktails = async () => {
      const response = await axios.get(`/api/likes/${user.id}`);
      setLikedCocktails(response.data);
    };
    if (user) fetchLikedCocktails();
  }, [user]);

  const handleDelete = async (cocktailId) => {
    await axios.delete(`/api/likes/${cocktailId}`, { data: { userId: user.id } });
    setLikedCocktails((prev) => prev.filter((cocktail) => cocktail.cocktail_id !== cocktailId));
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Liked Cocktails
      </Typography>
      <Grid container spacing={3}>
        {likedCocktails.map((cocktail) => (
          <Grid item xs={12} sm={6} md={4} key={cocktail.cocktail_id}>
            <Card sx={{ position: 'relative' }}>
              <CardMedia component="img" height="200" image={cocktail.cocktail_image_url} alt={cocktail.cocktail_name} />
              <CardContent>
                <Typography variant="h6" align="center">{cocktail.cocktail_name}</Typography>
                <IconButton
                  onClick={() => handleDelete(cocktail.cocktail_id)}
                  sx={{ color: 'red', position: 'absolute', top: 8, right: 8 }}
                >
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserPage;
