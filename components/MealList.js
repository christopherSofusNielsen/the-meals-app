import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

//Components
import MealItem from "./MealItem";

const MealList = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = ({ item }) => {
    const isFavorite = favoriteMeals.some((meal) => meal.id === item.id);
    return (
      <MealItem
        {...item}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: { mealId: item.id, mealTitle: item.title, isFavorite },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={props.data}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default MealList;
