
import {GoogleGenAI} from "@google/genai";

const SYSTEM_INSTRUCTION = `
당신은 역사적 통찰력이 뛰어난 'AI 세계사 가이드'입니다. 
학생들이 역사의 흐름을 단순 암기가 아닌 '인과관계'와 '연결'로 이해하도록 돕습니다.
1. 인물 대화 시: 해당 시대의 말투와 가치관을 반영하여 답변하세요.
2. 시대 비교 시: 지리적, 경제적, 문화적 연결고리를 찾아 설명하세요.
3. 친절하고 흥미진진한 스토리텔링 방식을 사용하세요.
마크다운 형식을 사용하여 가독성 있게 답변하세요.
`;

export const getGeminiResponse = async (prompt: string, modelType: 'flash' | 'pro' = 'flash') => {
  // Use the API key directly from process.env.API_KEY as per the library guidelines.
  const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
  const modelName = modelType === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
  
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // Directly access the .text property from GenerateContentResponse
    return response.text || "죄송합니다. 답변을 생성하지 못했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "API 호출 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.";
  }
};