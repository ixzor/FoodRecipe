import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useDispatch, useSelector } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function CustomRecipesScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const route = useRoute();
    console.log(route.params);
    const { recipe } = route.params || {}; // Pass the  object as a parameter
    console.log('recipe',recipe);
    
    const favoriterecipes = useSelector(
      (state) => state.favorites.favoriterecipes
    );
    console.log('favoriteRecipe from custom',favoriterecipes);
    
    const isFavourite = favoriterecipes?.some(
    (favrecipe) => favrecipe.idFood === recipe.idFood
  ); 
  
    if (!recipe) {
      return (
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>No Recipe Details Available</Text>
        </View>
      );
    }
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite(recipe)); // Adjust the action to handle recipe
    };
  
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent} testID="scrollContent"
      >
        
        <View style={styles.imageContainer} testID="imageContainer">
        {recipe.recipeImage && (
            <Image source={{ uri: recipe.recipeImage }} style={styles.recipeImage} />
          )}
        </View>
        <View
          style={styles.topButtonsContainer} testID="topButtonsContainer"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
          >
            <Text>{isFavourite ? "♥" : "♡"}</Text>
          </TouchableOpacity>
        </View>
  
        
        <View style={styles.contentContainer} testID="contentContainer">
        <Text style={styles.recipeTitle}>{recipe.recipeName}</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Content</Text>
          <Text style={styles.contentText}>{recipe.cookingDescription}</Text>
        </View>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    imageContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    recipeImage: {
      width: wp(98),
      height: hp(50),
      borderRadius: 35,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      marginTop: 4,
    },
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(4),
    },
    recipeTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(2),
    },
    sectionContainer: {
      marginBottom: hp(2),
    },
    sectionTitle: {
      fontSize: hp(2.5),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(1),
    },
    topButtonsContainer: {
      width: "100%",
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: hp(4),
    },
    backButton: {
      padding: 8,
      borderRadius: 50,
      marginLeft: wp(5),
      backgroundColor: "white",
    },
    favoriteButton: {
      padding: 8,
      borderRadius: 50,
      marginRight: wp(5),
      backgroundColor: "white",
    },
    contentText: {
      fontSize: hp(1.6),
      color: "#4B5563",
    },
  });
  