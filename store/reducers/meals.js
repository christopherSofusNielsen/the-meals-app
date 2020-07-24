import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const itemIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (itemIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(itemIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavMeals,
        };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal),
        };
      }

    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        return !(
          (appliedFilters.glutenFree && !meal.isGlutenFree) ||
          (appliedFilters.lactoseFree && !meal.isLactoseFree) ||
          (appliedFilters.vegan && !meal.isVegan) ||
          (appliedFilters.vegetarian && !meal.isVegetarian)
        );
      });
      return {
        ...state,
        filteredMeals,
      };

    default:
      return state;
  }
};

export default mealsReducer;
