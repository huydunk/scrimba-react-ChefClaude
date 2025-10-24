import { useState } from "react"
import ClaudeRecipe from "./ClaudeRecipe.jsx"
import IngredientsList from "./IngredientsList.jsx"
import {getRecipeFromMistral} from "../ai.js"

export default function Main() {
    const [ingredients, setIngredients] = useState(
        ["all the main spices", "pasta", "ground beef"]
    )
    const [recipe, setRecipe] = useState("")

   

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
                ingredients={ingredients}
                getRecipe={getRecipe}
            />
            {recipe && <ClaudeRecipe recipe={recipe}/>}

        </main>
    )

}