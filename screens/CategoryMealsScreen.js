import React from "react";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";

//components
import MealList from "../components/MealList";

const findCategory = (catId) => {
  return CATEGORIES.find((cat) => cat.id === catId);
};

const findMeals = (catId) => {
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  return availableMeals.filter((meal) => {
    return meal.categoryIds.indexOf(catId) >= 0;
  });
};

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const displayedMeals = findMeals(catId);

  return <MealList data={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navData) => {
  const catId = navData.navigation.getParam("categoryId");
  const title = findCategory(catId).title;

  return {
    headerTitle: title,
  };
};

export default CategoryMealsScreen;
