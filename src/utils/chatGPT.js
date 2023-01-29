import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function chatGPTBlogTitle(prompt) {
  if (prompt === "") return "Please write a blog topic";
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give me only five blog title and separate each title with 
        comma, based on this blog topic ${prompt}`,
      temperature: 0,
      max_tokens: 100,
    });
    return response.data.choices[0].text + "\n";
  } catch (error) {
    console.log(error);
  }
}

export async function chatGPTBlogSH(prompt) {
  if (prompt === "")
    return "Please copy your selected blog title from the above";
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give me more details subheadings based on this blog title ${prompt} 
        and separate each subheading with comma`,
      temperature: 0,
      max_tokens: 100,
    });
    return response.data.choices[0].text + "\n";
  } catch (error) {
    console.log(error);
  }
}

export async function chatGPTBlogSHContent(prompt) {
  if (prompt === "") return "Please copy and paste your subheading from above";
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write the content of this subheading "${prompt}" and make a rich and informative content`,
      temperature: 0,
      max_tokens: 400,
    });
    return response.data.choices[0].text + "\n";
  } catch (error) {
    console.log(error);
  }
}
