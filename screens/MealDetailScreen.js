import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/HeaderButton";
import { MEALS } from "../data/dummy-data";

const findMeal = (mealId) => {
  return MEALS.find((meal) => meal.id === mealId);
};

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const meal = findMeal(mealId);

  return (
    <View style={styles.screen}>
      <Text>{meal.title}</Text>
    </View>
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealDetailScreen;
