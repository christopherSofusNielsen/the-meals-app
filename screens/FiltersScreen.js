import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import BodyText from "../components/BodyText";
import Colors from "../constants/Colors";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <BodyText>{props.label}</BodyText>
      <Switch
        value={props.value}
        onValueChange={props.onChange}
        trackColor={{ true: Colors.primary }}
        thumbColor={Colors.primary}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    console.log(appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filters</Text>
      <FilterSwitch
        label="Gluten Free"
        value={isGlutenFree}
        onChange={setIsGlutenFree}
      />
      <FilterSwitch
        label="Lactose Free"
        value={isLactoseFree}
        onChange={setIsLactoseFree}
      />
      <FilterSwitch label="Vegan" value={isVegan} onChange={setIsVegan} />
      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        onChange={setIsVegetarian}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter meals",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="save"
          iconName="ios-save"
          onPress={() => {
            navData.navigation.getParam("save")();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 5,
  },
  switch: {},
});

export default FiltersScreen;
