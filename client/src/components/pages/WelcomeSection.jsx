import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import RecipeIcon from "@mui/icons-material/RestaurantMenu"; // Иконка для визуального элемента

const WelcomeSection = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      {/* Заголовок страницы */}
      <Typography variant="h3" component="h1" gutterBottom>
        Добро пожаловать в наш мир рецептов!
      </Typography>
      {/* Краткое описание */}
      <Typography variant="body1" color="textSecondary" paragraph>
        Здесь вы найдете разнообразные рецепты на любой вкус, сможете сохранять
        избранные и даже делиться собственными кулинарными идеями.
      </Typography>

      {/* Информационные карточки */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        justifyContent="center"
        mt={5}
      >
        {/* Карточка с иконкой и текстом */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <RecipeIcon color="primary" fontSize="large" />
            </Box>
            <Typography variant="h6" component="div">
              Просматривайте рецепты
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="textSecondary">
              Найдите идеальный рецепт для вашего ужина или праздничного стола.
            </Typography>
          </CardContent>
        </Card>
        {/* Добавить больше карточек по желанию */}
      </Stack>

      {/* Кнопка с новым названием */}
      <Box mt={4}>
        <Button variant="contained" color="primary" size="large">
          Начать знакомство
        </Button>
      </Box>
    </Container>
  );
};

export default WelcomeSection;
