import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Define a recursive type for chat options
interface ChatOption {
  option: string;
  response?: string;
  question?: string;
  next?: {
    options: ChatOption[];
  };
}

interface ChatFlow {
  question: string;
  response?: string;
  next?: {
    options: ChatOption[];
  };
}

interface ChatData {
  flows: ChatFlow[];
}

// Use a more persistent storage solution in production
let userState: Record<string, ChatFlow> = {};

async function loadChatResponses(): Promise<ChatData> {
  try {
    const filePath = path.join(process.cwd(), 'app/api/chatbot/chat_responses.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents) as ChatData;
  } catch (error) {
    console.error('Error loading chat responses:', error);
    throw new Error('Failed to load chat responses');
  }
}

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();
    const data = await loadChatResponses();

    // Normalize message for better matching
    const normalizedMessage = message.toLowerCase().trim();
    const currentFlow = userState[userId];

    if (!currentFlow) {
      // Initial flow
      const initialFlow = data.flows.find((flow) =>
        normalizedMessage.includes(flow.question.toLowerCase())
      );

      if (initialFlow) {
        userState[userId] = initialFlow;
        return NextResponse.json({
          reply: initialFlow.response || initialFlow.question,
          options: initialFlow.next?.options,
        });
      }

      return NextResponse.json({
        reply: 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?',
        error: true
      });
    }

    // Handle subsequent flows
    const nextFlow = currentFlow.next?.options.find((option) =>
      normalizedMessage.includes(option.option.toLowerCase())
    );

    if (nextFlow) {
      if (nextFlow.response && !nextFlow.next) {
        // End of conversation flow
        delete userState[userId];
        return NextResponse.json({
          reply: nextFlow.response,
          finished: true
        });
      }

      // Continue conversation
      userState[userId] = {
        question: nextFlow.question || '',
        next: nextFlow.next
      };

      return NextResponse.json({
        reply: nextFlow.question || nextFlow.response,
        options: nextFlow.next?.options
      });
    }

    return NextResponse.json({
      reply: 'No entiendo esa opción. Por favor, elige una de las opciones disponibles.',
      error: true,
      options: currentFlow.next?.options // Resend available options
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({
      reply: 'Ha ocurrido un error. Por favor, intenta de nuevo.',
      error: true
    }, { status: 500 });
  }
}