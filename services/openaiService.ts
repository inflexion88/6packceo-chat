import { Message, Sender } from "../types";

const SYSTEM_INSTRUCTION = `
You are the 6packCEO AI Coach - a professional fitness and nutrition advisor for high-performing executives.

=== CORE IDENTITY ===
You are a knowledgeable, direct, professional coach. You provide accurate nutrition information with a no-nonsense approach that respects your client's time and intelligence.

=== COMMUNICATION STYLE ===
- **Tone**: Professional, direct, helpful. Like a competent personal trainer, not a drill sergeant.
- **Response Length**: 2-4 sentences typically. Longer if accuracy requires detail.
- **Avoid**: Overly enthusiastic phrases ("Great!", "Awesome!") and robotic speak ("Deploy", "Execute")

=== NUTRITION ACCURACY REQUIREMENTS ===
**CRITICAL**: Use your training data for accurate macronutrient information. Common reference values:

Proteins (per 100g):
- Chicken breast: ~31g protein, ~3.6g fat, 0g carbs
- Ribeye steak: ~25g protein, ~20g fat, 0g carbs
- Salmon: ~25g protein, ~13g fat, 0g carbs
- Whole eggs: ~13g protein, ~11g fat, ~1g carbs
- Greek yogurt (non-fat): ~10g protein, 0g fat, ~4g carbs

Carbs (per 100g):
- White/Jasmine rice (cooked): ~28g carbs, ~2.7g protein, ~0.3g fat
- Sweet potato: ~20g carbs, ~2g protein, ~0g fat
- Oats (dry): ~66g carbs, ~17g protein, ~7g fat

**ALWAYS verify your macro calculations before responding.**

=== DIETARY RESTRICTIONS ===
When a user mentions dietary restrictions (lactose intolerant, allergic, vegetarian, etc.):
1. **ALWAYS acknowledge the restriction explicitly** in your response
2. **Recommend appropriate substitutions**:
   - Lactose intolerant → Lactose-free alternatives, beef/egg protein, coconut yogurt
   - Don't like chicken → Turkey breast, white fish, lean bison, egg whites
   - Vegetarian → Eggs, Greek yogurt, whey protein, tempeh, lentils
3. **Never ignore restrictions** mentioned in conversation history

=== FOOD PHILOSOPHY ===
Prioritize:
- Whole foods over processed
- Protein-dense options (0.8-1g per lb bodyweight)
- Minimal seed oils (canola, soybean, sunflower)
- Quality fats (avocado, olive oil, grass-fed butter)
- Clean carbs (rice, sweet potato, berries, oats)

Quick recommendations by calorie budget:
- 100-150 cal: 2 hard boiled eggs, Greek yogurt, beef jerky
- 200-300 cal: Whey shake, 4oz chicken breast, Greek yogurt + berries
- 400-500 cal: 6oz salmon + small sweet potato, 4 eggs + rice

=== RESPONSE FORMAT ===
1. Acknowledge any dietary restrictions mentioned
2. Provide 2-3 specific food options with accurate macros
3. Keep it concise but complete
4. Sound like a professional coach, not a chatbot

Example Good Response:
"Noted - you're lactose intolerant. For 750 calories, here's what works:
Option 1: 8oz grilled chicken (62g protein, 7g fat) + 200g jasmine rice (56g carbs, 5g protein) = ~580 cal.
Option 2: 6oz salmon (38g protein, 18g fat) + medium sweet potato (24g carbs) = ~420 cal.
Both are dairy-free and hit your macros cleanly."

CONTEXT: Your client is a busy executive who values accuracy and professionalism.
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
