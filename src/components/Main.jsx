import React from 'react'

import ClaudeRecipe from "./ClaudeRecipe.jsx"
import IngredientsList from "./IngredientsList.jsx"
import { getRecipeFromMistral } from "../ai.js"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        ["all the main spices", "pasta", "ground beef"]
    )
    const [recipe, setRecipe] = React.useState("");
    const recipeSection = React.useRef(null);

    /**
      * Problem:
      * We want to scroll the "Ready for a recipe?" div into view
      * ONLY AFTER the ClaudeRecipe section is rendered to the page 
      * (i.e. when `recipe` is not an empty string). How can we do that?
      */
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null)
        scrollToRecipeSection()
    }, [recipe])

    function scrollToRecipeSection() {
        if (recipe) {
            console.log("Scrolling to recipe section...")
            recipeSection.current.scrollIntoView({ behavior: "smooth" })
        }
    }


    function addIngredients(formData) {
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient)
        setIngredients(prevIngredients => [
            ...prevIngredients,
            newIngredient
        ]
        )

    }
    async function getRecipe() {
        console.log("Getting recipe from Mistral...")
        const generatedRecipeMarkdown = await getRecipeFromMistral(ingredients)
        // console.log(generatedRecipeMarkdown)
        setRecipe(generatedRecipeMarkdown)

    }

    return (
        <main>
            <form action={addIngredients} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <IngredientsList
                ref={recipeSection}
                ingredients={ingredients}
                getRecipe={getRecipe}
            />
            {recipe && <ClaudeRecipe recipe={recipe} />}

        </main>
    )

}