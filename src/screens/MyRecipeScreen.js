import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useNavigation } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useIsFocused } from '@react-navigation/native';

  
  export default function MyRecipeScreen() {
    const navigation = useNavigation();
    const [recipes, setrecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();
    useEffect(() => {
      const fetchrecipes = async () => {
        const storedRecipes = await AsyncStorage.getItem("customrecipes");
        if (storedRecipes) {
        setrecipes(JSON.parse(storedRecipes));
      }
      setLoading(false); // Loading is complete
        };
        if (isFocused) {
    fetchrecipes();
  }
  
    }, [isFocused]);
  
    const handleAddrecipe = () => {
      navigation.navigate("RecipesFormScreen");
    };
  
    const handlerecipeClick = (recipe) => {
      navigation.navigate("CustomRecipesScreen", { recipe });
    };
    const deleterecipe = async (index) => {
      try {
      const updatedRecipe = [...recipes];
      updatedRecipe.splice(index, 1); // Remove article from array
      await AsyncStorage.setItem("customrecipes", JSON.stringify(updatedRecipe)); // Update AsyncStorage
      setrecipes(updatedRecipe); // Update state
    } catch (error) {
      console.error("Error deleting the recipe:", error);
    }
    };
  
    const editrecipe = (recipe, index) => {
      navigation.navigate("RecipesFormScreen", { recipeToEdit: recipe, recipeIndex: index });
    };
  
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"Back"}</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={handleAddrecipe} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New recipe</Text>
        </TouchableOpacity>
  
        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {recipes.length === 0 ? (
              <Text style={styles.norecipesText}>No recipes added yet.</Text>
            ) : (
              recipes.map((recipe, index) => (
                <View key={index} style={styles.recipeCard} testID="recipeCard">
                  <TouchableOpacity testID="handlerecipeBtn" onPress={() => handlerecipeClick(recipe)}>
                  {recipe.recipeImage && (
                    <Image
                      source={{ uri: recipe.recipeImage }}
                      style={styles.recipeImage}
                    />
                  )}
                    <Text style={styles.recipeTitle}>{recipe.recipeName}</Text>
                    <Text style={styles.recipeDescription} testID="recipeDescp">
                    {recipe.cookingDescription?.substring(0, 50) + "..."}
                    </Text>
                  </TouchableOpacity>
  
                  {/* Edit and Delete Buttons */}
                  <View style={styles.actionButtonsContainer} testID="editDeleteButtons">
                    <TouchableOpacity
                     onPress={() => editrecipe(recipe, index)}
                     style={styles.editButton}
                     >
                      <Text style={styles.editButtonText}>Edit</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                      onPress={() => deleterecipe(index)}
                      style={styles.deleteButton}
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: wp(4),
      backgroundColor: "#F9FAFB",
    },
    backButton: {
      marginBottom: hp(1.5),
    },
    backButtonText: {
      fontSize: hp(2.2),
      color: "#4F75FF",
    },
    addButton: {
      backgroundColor: "#4F75FF",
      padding: wp(.7),
      alignItems: "center",
      borderRadius: 5,
      width:300,
     marginLeft:"50%"
      // marginBottom: hp(2),
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: hp(2.2),
    },
    scrollContainer: {
      paddingBottom: hp(2),
      height:'auto',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      flexWrap:'wrap'
    },
    norecipesText: {
      textAlign: "center",
      fontSize: hp(2),
      color: "#6B7280",
      marginTop: hp(5),
    },
    recipeCard: {
      width: 400, // Make recipe card width more compact
      height: 300, // Adjust the height of the card to fit content
      backgroundColor: "#fff",
      padding: wp(3),
      borderRadius: 8,
      marginBottom: hp(2),
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3, // for Android shadow
    },
    recipeImage: {
      width: 300, // Set width for recipe image
      height: 150, // Adjust height of the image
      borderRadius: 8,
      marginBottom: hp(1),
    },
    recipeTitle: {
      fontSize: hp(2),
      fontWeight: "600",
      color: "#111827",
      marginBottom: hp(0.5),
    },
    recipeDescription: {
      fontSize: hp(1.8),
      color: "#6B7280",
      marginBottom: hp(1.5),
    },
    actionButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: hp(1),
    },
    editButton: {
      backgroundColor: "#34D399",
      padding: wp(.5),
      borderRadius: 5,
      width: 100, // Adjust width of buttons to be more compact
      alignItems: "center",
    },
    editButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: hp(1.8),
    },
    deleteButton: {
      backgroundColor: "#EF4444",
      padding: wp(.5),
      borderRadius: 5,
      width: 100, // Adjust width of buttons to be more compact
      alignItems: "center",
    },
    deleteButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: hp(1.8),
    },
  });
  