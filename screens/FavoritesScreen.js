import React from "react";

import MealList from "../components/MealList";
import { useSelector } from "react-redux";
import { View ,StyleSheet} from "react-native";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = (props) => {
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  }

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  content:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",

  }
})

export default FavoritesScreen;
