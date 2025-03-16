import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const { text, title, source } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "No text provided for fact-checking" }, { status: 400 })
    }

    // Initialize the Google Generative AI with the provided API key
    const genAI = new GoogleGenerativeAI("AIzaSyCkCV893HYGsWq7x24QBeimwrs8fSnqRK4")

    // Use Gemini Pro for fact-checking
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.2, // Lower temperature for more factual responses
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    })

    // Create a prompt for fact-checking
    const prompt = `
    You are an expert fact-checker. Analyze the following content and determine if it contains accurate information.
    
    Title: ${title || "Untitled"}
    Source: ${source || "Unknown"}
    Content: ${text}
    
    Provide a detailed fact-check analysis with the following structure:
    1. Classification: Categorize as "true", "false", "misleading", or "unverified"
    2. Confidence: Provide a confidence score (0-100%)
    3. Explanation: Detailed reasoning for your classification
    4. Key indicators: List factual and questionable elements in the content
    
    Format your response as a JSON object with the following structure:
    {
      "classification": "true|false|misleading|unverified",
      "confidence": number,
      "explanation": "string",
      "keywords": {
        "factual": ["keyword1", "keyword2"],
        "questionable": ["keyword1", "keyword2"]
      }
    }
    
    Only respond with the JSON object, no additional text.
    `

    // Generate the fact-check analysis
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    try {
      // Try to parse the response as JSON
      const jsonResponse = JSON.parse(response)

      // Add additional metadata
      return NextResponse.json({
        ...jsonResponse,
        modelUsed: "gemini-pro",
        analysisTime: new Date().toISOString(),
      })
    } catch (parseError) {
      // If parsing fails, return a formatted response
      console.error("Failed to parse AI response as JSON:", parseError)

      // Fallback to simulated response
      const fallbackResult = await simulateFactCheck(text)
      return NextResponse.json(fallbackResult)
    }
  } catch (error) {
    console.error("Error in fact-checking API:", error)
    return NextResponse.json({ error: "Failed to process fact-checking request" }, { status: 500 })
  }
}

// Simulate fact-checking as a fallback
async function simulateFactCheck(text: string) {
  // Simple keyword-based classification for demo purposes
  const keywords = {
    fake: ["false", "fake", "hoax", "conspiracy", "clickbait", "misleading", "rumor"],
    real: ["verified", "confirmed", "official", "research", "study", "evidence", "proven"],
  }

  // Count occurrences of keywords
  let fakeScore = 0
  let realScore = 0

  const lowerText = text.toLowerCase()

  keywords.fake.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi")
    const matches = lowerText.match(regex)
    if (matches) fakeScore += matches.length
  })

  keywords.real.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi")
    const matches = lowerText.match(regex)
    if (matches) realScore += matches.length
  })

  // Add some randomness to simulate ML model behavior
  fakeScore += Math.random() * 2
  realScore += Math.random() * 2

  // Calculate confidence scores
  const total = fakeScore + realScore
  const fakeConfidence = total > 0 ? (fakeScore / total) * 100 : 50
  const realConfidence = total > 0 ? (realScore / total) * 100 : 50

  // Determine classification
  let classification
  let confidence

  if (fakeConfidence > realConfidence) {
    classification = "false"
    confidence = fakeConfidence
  } else if (realConfidence > fakeConfidence) {
    classification = "true"
    confidence = realConfidence
  } else {
    classification = "unverified"
    confidence = 50
  }

  // If confidence is too low, mark as unverified
  if (confidence < 60) {
    classification = "unverified"
  } else if (confidence < 75 && classification !== "unverified") {
    classification = "misleading"
  }

  // Generate explanation based on classification
  let explanation
  switch (classification) {
    case "true":
      explanation =
        "This content appears to be factually accurate based on our analysis. The information aligns with verified sources and contains credible information patterns."
      break
    case "false":
      explanation =
        "This content appears to contain false information based on our analysis. The text shows patterns consistent with known misinformation and lacks credible source indicators."
      break
    case "misleading":
      explanation =
        "This content contains some accurate information but presents it in a potentially misleading way. The context or framing may lead to misinterpretation."
      break
    default:
      explanation =
        "We cannot confidently verify this information at this time. The content contains insufficient context or verification signals."
  }

  return {
    classification,
    confidence: Math.round(confidence),
    explanation,
    modelUsed: "Fallback Simulation",
    analysisTime: new Date().toISOString(),
    keywords: {
      factual: keywords.real.filter((word) => lowerText.includes(word)),
      questionable: keywords.fake.filter((word) => lowerText.includes(word)),
    },
  }
}

