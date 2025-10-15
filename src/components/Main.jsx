import { useState } from "react"

export default function Main() {
    const [ingredients, setIngredients] = useState(["Chicken", "Oregano", "Tomatoes"])

    function submitIngredients(formData) {
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient)
        setIngredients(prevIngredients => [
            ...prevIngredients,
            newIngredient
        ]
        )

    }

    return (
        <main>
            <form action={submitIngredients} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>

            </form>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
        </main>
    )

}