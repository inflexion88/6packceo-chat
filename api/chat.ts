import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history, systemInstruction } = req.body;

    if (!message || !systemInstruction) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Build messages array
    const messages: any[] = [
      { role: 'system', content: systemInstruction }
    ];

    // Add conversation history if provided
    if (history && Array.isArray(history)) {
      messages.push(...history);
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    // Stream response from OpenAI
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.5,
      stream: true,
    });

    // Set headers for SSE (Server-Sent Events)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream chunks to client
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message
    });
  }
}
