import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import { MEALS } from "../data/dummy-data";
import BodyText from "../components/BodyText";

const findMeal = (mealId) => {
  return MEALS.find((meal) => meal.id === mealId);
};

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <BodyText>{props.children}</BodyText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const meal = findMeal(mealId);

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
  const mealId = navData.navigation.getParam("mealId");
  const meal = findMeal(mealId);

  return {
    headerTitle: meal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => console.log("Favorite pressed")}
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
