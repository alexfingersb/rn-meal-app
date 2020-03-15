import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import Colors from "../constants/Colors";

const CategoryMealScreen = props => {
  const catId = props.navigation.getParam("categoryId");

  const avaiableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = avaiableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <Text style={styles.textColor}>
          No meals found, maybe check your filters?
        </Text>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textColor: {
    color: Colors.textColor,
    fontSize: 16
  }
});

export default CategoryMealScreen;
