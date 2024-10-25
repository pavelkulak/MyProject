import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

const UserPage = ({ user }) => {
  const [likedCocktails, setLikedCocktails] = useState([]);
  const navigate = useNavigate(); // Инициализируем навигацию

  useEffect(() => {
    const fetchLikedCocktails = async () => {
      try {
        const response = await axiosInstance.get(`/likes/${user.id}`);
        setLikedCocktails(response.data);
      } catch (error) {
        console.error("Ошибка при получении лайкнутых коктейлей:", error);
      }
    };

    if (user) fetchLikedCocktails();
  }, [user]);

  const handleDelete = async (cocktailId) => {
    try {
      await axiosInstance.delete(`/likes/${cocktailId}`, {
        data: { userId: user.id },
      });

      setLikedCocktails((prev) =>
        prev.filter((cocktail) => cocktail.cocktailId !== cocktailId)
      );
    } catch (error) {
      console.error("Ошибка при удалении лайка:", error);
    }
  };

  const handleCardClick = (cocktailId) => {
    navigate(`/cocktail/${cocktailId}`);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Liked Cocktails
      </Typography>
      <Grid container spacing={3}>
        {likedCocktails.map((cocktail) => (
          <Grid item xs={12} sm={6} md={4} key={cocktail.cocktailId}>
            <Card
              sx={{ position: "relative", cursor: "pointer" }}
              onClick={() => handleCardClick(cocktail.cocktailId)} // Обработчик для перехода
            >
              <CardMedia
                component="img"
                height="200"
                image={cocktail.cocktailImageUrl}
                alt={cocktail.cocktailName}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {cocktail.cocktailName}
                </Typography>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // Предотвращаем переход при нажатии на кнопку удаления
                    handleDelete(cocktail.cocktailId);
                  }}
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    position: "absolute",
                    top: 8,
                    right: 8,
                    "&:hover": {
                      backgroundColor: "black",
                    },
                    width: 32,
                    height: 32,
                  }}
                >
                  <Delete fontSize="small" />
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
