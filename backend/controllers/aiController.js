import { GoogleGenAI } from "@google/genai";


export const askQuestions = async (req, res) => {
  try {
    
    const { question } = req.body;
    const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // Gemini Model
   const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question,
        });
        console.log(response)
   

    res.json({
      success: true,
      answer: response.text,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}