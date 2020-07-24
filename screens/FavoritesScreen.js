import React from "react";
import { useSelector } from "react-redux";

//Components
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import MealList from "../components/MealList";
import { View, StyleSheet } from "react-native";
import BodyText from "../components/BodyText";

const FavoritesScreen = (props) => {
  const favoritesMeals = useSelector((state) => state.meals.favoriteMeals);

  if (favoritesMeals.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <BodyText>No favorite meals selected!</BodyText>
      </View>
    );
  }

  return <MealList data={favoritesMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
