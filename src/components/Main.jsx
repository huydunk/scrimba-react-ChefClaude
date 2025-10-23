import { useState } from "react"
import ClaudeRecipe from "./ClaudeRecipe.jsx"
import IngredientsList from "./IngredientsList.jsx"

export default function Main() {
    const [ingredients, setIngredients] = useState(
        ["all the main spices", "pasta", "ground beef"]
    )
    const [recipeShown, setRecipeShown] = useState(false)

   

    function addIngredients(formData) {
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient)
        setIngredients(prevIngredients => [
            ...prevIngredients,
            newIngredient
        ]
        )

    }
    function toggleRecipeShown() {
        setRecipeShown(prevRecipeShown => !prevRecipeShown)
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
                toggleRecipeShown={toggleRecipeShown}
            />
            {recipeShown && <ClaudeRecipe />}

        </main>
    )

}