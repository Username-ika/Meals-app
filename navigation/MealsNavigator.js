import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import CustomHeaderButton from "../components/CustomHeaderButton";

import Colors from "../constants/Colors";
import { Platform, Text, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitleAlign: "center",
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: (navigationData) => {
        return {
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigationData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
          headerTitle: "Meal Categories",
        };
      },
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
      navigationOptions: (navigationData) => {
        const catId = navigationData.navigation.getParam("categoryId");
        const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

        return {
          headerTitle: selectedCategory.title,
        };
      },
    },
    MealDetail: {
      screen: MealDetailScreen,
      navigationOptions: (navigationData) => {
        const mealTitle = navigationData.navigation.getParam("mealTitle");

        return {
          headerTitle: mealTitle,
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Favorite"
                  iconName={
                    navigationData.navigation.getParam("isFav")
                      ? "ios-star"
                      : "ios-star-outline"
                  }
                  onPress={navigationData.navigation.getParam("toggleFav")}
                />
              </HeaderButtons>
            );
          },
        };
      },
    },
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: (navigationData) => {
        return {
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigationData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
          headerTitle: "Your Favorites",
        };
      },
    },
    MealDetail: {
      screen: MealDetailScreen,
      navigationOptions: (navigationData) => {
        const mealTitle = navigationData.navigation.getParam("mealTitle");

        return {
          headerTitle: mealTitle,
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Favorite"
                  iconName={
                    navigationData.navigation.getParam("isFav")
                      ? "ios-star"
                      : "ios-star-outline"
                  }
                  onPress={navigationData.navigation.getParam("toggleFav")}
                />
              </HeaderButtons>
            );
          },
        };
      },
    },
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const tabScreenConfig = {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
        tabBarColor: Colors.primaryColor,
        tabBarLabel:
          Platform.OS === "android" ? (
            <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
          ) : (
            "Meals"
          ),
      },
    },
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.accentColor,
        tabBarLabel:
          Platform.OS === "android" ? (
            <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
          ) : (
            "Favorites"
          ),
      },
    },
  },
  MealsFavTabNavigator =
    Platform.OS === "android"
      ? createMaterialBottomTabNavigator(tabScreenConfig, {
          activeColor: "white",
          shifting: true,
        })
      : createBottomTabNavigator(tabScreenConfig, {
          tabBarOptions: {
            labelStyle: { fontFamily: "open-sans" },
            activeTintColor: Colors.accentColor,
          },
        });

const FiltersNavigator = createStackNavigator(
  {
    Filters: {
      screen: FiltersScreen,
      navigationOptions: (navigationData) => {
        return {
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigationData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Save"
                  iconName="ios-save"
                  onPress={navigationData.navigation.getParam("save")}
                />
              </HeaderButtons>
            );
          },
          headerTitle: "Filter Meals",
        };
      },
    },
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: { drawerLabel: "Meals" },
    },
    Filters: { screen: FiltersNavigator },
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
      },
    },
  }
);

export default createAppContainer(MainNavigator);
