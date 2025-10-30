import { InferenceClient } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

// Make sure you set an environment variable in Scrimba 
// for HF_ACCESS_TOKEN
const hf = new InferenceClient(import.meta.env.VITE_HUGGINGFACE_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.textGeneration({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            inputs: `${SYSTEM_PROMPT}\n\nUser: I have ${ingredientsString}. Please give me a recipe you'd recommend I make!\n\nAssistant:`,
            parameters: {
                max_new_tokens: 1024,
                temperature: 0.7,
            }
        })
        return response.generated_text
    } catch (err) {
        console.error(err.message)
        return (
            "generated recipe (free chỉ thế thôi), but there was an error fetching it from the API. Please try again later."
        )
    }
}