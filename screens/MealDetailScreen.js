import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";

import CustomHeaderButton from "../components/HeaderButton";

import BodyText from "../components/BodyText";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <BodyText>{props.children}</BodyText>
    </View>
  );
};

const findMeal = (mealId) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  return availableMeals.find((meal) => meal.id === mealId);
};

const isFavorite = (mealId) => {
  return useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
};

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const isFavoriteMeal = isFavorite(mealId);
  const meal = findMeal(mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFavorite: isFavoriteMeal });
  }, [isFavoriteMeal]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: meal.imageUrl }} />
      <View style={styles.details}>
        <BodyText>{meal.duration}m</BodyText>
        <BodyText>{meal.complexity.toUpperCase()}</BodyText>
        <BodyText>{meal.affordability.toUpperCase()}</BodyText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      <View style={styles.listContainer}>
        {meal.ingredients.map((ingredient, index) => (
          <ListItem key={index}>{ingredient}</ListItem>
        ))}
      </View>
      <Text style={styles.title}>Steps</Text>
      <View style={styles.listContainer}>
        {meal.steps.map((step, index) => (
          <ListItem key={index}>{step}</ListItem>
        ))}
      </View>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("mealTitle");
  const toggleFav = navData.navigation.getParam("toggleFav");
  const isFavorite = navData.navigation.getParam("isFavorite");
  console.log(isFavorite);

  return {
    headerTitle: title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  listContainer: {
    padding: 20,
  },
  listItem: {
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 22,
    textAlign: "center",
  },
});

export default MealDetailScreen;
