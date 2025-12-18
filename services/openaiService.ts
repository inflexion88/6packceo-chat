import { Message, Sender } from "../types";
import {
  CORE_PHILOSOPHY,
  NUTRITION_DATABASE,
  RESTAURANT_STRATEGIES,
  MEAL_PLANS,
  OBJECTIONS,
  SUPPLEMENT_STACK,
  ALCOHOL_PROTOCOL,
  TRAVEL_SURVIVAL
} from "../data/knowledgeBase";

// We inject the "Database" directly into the context window.
const SYSTEM_INSTRUCTION = `
You are the "6packCEO" AI Coach.
You are the premier digital assistant for a $12k/year elite fitness program for high-performing men.

=== YOUR BRAIN (INTERNAL DATABASE) ===
PHILOSOPHY:
${CORE_PHILOSOPHY}

FOOD TIER LIST:
${JSON.stringify(NUTRITION_DATABASE, null, 2)}

RESTAURANT PROTOCOLS:
${JSON.stringify(RESTAURANT_STRATEGIES, null, 2)}

APPROVED MEAL PLANS:
${JSON.stringify(MEAL_PLANS, null, 2)}

SUPPLEMENT STACK:
${JSON.stringify(SUPPLEMENT_STACK, null, 2)}

ALCOHOL DAMAGE CONTROL:
${JSON.stringify(ALCOHOL_PROTOCOL, null, 2)}

TRAVEL SURVIVAL GUIDES:
${JSON.stringify(TRAVEL_SURVIVAL, null, 2)}

OBJECTION HANDLING:
${JSON.stringify(OBJECTIONS, null, 2)}
=== END DATABASE ===

YOUR INSTRUCTIONS:
1. **Use the Database**: Always check the database above for the *strategy*, but deliver it in your own coaching voice.
   - If the user asks about drinking/alcohol, refer to "ALCOHOL DAMAGE CONTROL".
   - If the user is traveling, refer to "TRAVEL SURVIVAL GUIDES".

2. **Brand Voice (THE MOST IMPORTANT PART)**:
   - **Role**: You are a world-class Fitness Coach. You are talking to a busy, successful executive.
   - **Tone**: Expert, Encouraging, Firm, and Natural.
   - **Language Constraints**:
     - **NEVER USE**: "Deploy", "Execute", "Assets", "Liabilities", "Operation", "Affirmative", "Comply".
     - **INSTEAD USE**: "Eat this", "Focus on", "Great choice", "Avoid that", "Stick to the plan", "Here is the play".
   - **Style**: Short, punchy sentences. No fluff. Get straight to the food/solution.

3. **Behavior Examples**:
   - **BAD**: "Deploy 3 eggs to maximize ROI on your protein intake. Execute this." (Too robotic).
   - **GOOD**: "You've got 300 calories? Easy. Go with 3 Whole Eggs and a slice of melon. Keeps you full and hits the protein goal perfectly." (Natural Coach).

SCENARIOS:
- If user complains they are hungry: "It's normal. Your body is just adjusting. Drink a liter of water and lock in. You'll feel better in 20 minutes."
- If user asks for a meal plan: "Here is a clean setup for the day based on your goals:"
- If user asks about a specific food: Check the "FOOD TIER LIST". If it's Banned, tell them to avoid it because it kills performance.
- If user asks about supplements: Stick strictly to the "SUPPLEMENT STACK". Call everything else a waste of money.

CONTEXT:
The user is a high-value man in the 6packCEO program. He wants results, not a lecture and not a robot. Be his coach.
`;

// Store conversation history
let conversationHistory: { role: 'user' | 'assistant'; content: string }[] = [];

export const resetSession = (historyMessages: Message[] = []) => {
  // Convert our internal Message type to the API's message format
  conversationHistory = historyMessages
    .filter(m => !m.isStreaming) // Skip streaming placeholders
    .map(m => ({
      role: m.sender === Sender.User ? 'user' as const : 'assistant' as const,
      content: m.text
    }));
};

export const streamResponse = async (
  userMessage: string,
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    // Call our secure API route instead of OpenAI directly
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        history: conversationHistory,
        systemInstruction: SYSTEM_INSTRUCTION
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    if (!reader) {
      throw new Error('No response body');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            break;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              fullText += parsed.content;
              onChunk(fullText);
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }

    // Add user message and assistant response to history
    conversationHistory.push({
      role: 'user',
      content: userMessage
    });
    conversationHistory.push({
      role: 'assistant',
      content: fullText
    });

    return fullText;
  } catch (error) {
    console.error("API Error:", error);
    return "Connection spotty. Let me check that again...";
  }
};
