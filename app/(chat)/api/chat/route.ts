import { convertToCoreMessages, Message, streamText } from "ai";
import { NextResponse } from "next/server";
import { geminiProModel } from "@/ai";
import { auth } from "@/app/(auth)/auth";

import { deleteChatById, getChatById, saveChat } from "@/db/queries";
import { chatTools } from "@/lib/chat-tools";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, messages }: { id: string; messages: Array<Message> } = await request.json();
  const coreMessages = convertToCoreMessages(messages).filter(message => message.content.length > 0);

  const result = await streamText({
    model: geminiProModel,
    system: `
      - You help users plan trips, book flights, finalize destinations, and calculate budgets.
      - Your flow includes: choosing a destination, budgeting, booking flights, and finalizing trips.
      - Recommend destinations based on trip type, preferences, and budget.
      - Keep your responses concise and user-friendly.
      - After every tool call, summarize the result for the user in one sentence.
      - Today's date is ${new Date().toLocaleDateString()}.
      - Ask follow-up questions to guide users into the optimal flow.
      - Always confirm details like passenger name, travel dates, and preferences.
      - Follow this expanded flow:
        1. Ask user preferences for destination (e.g., type of trip: adventure, beach, cultural, etc.)
        2. Recommend destinations based on user preferences and provide brief details about each.
        3. Assist in finalizing a destination.
        4. Search for flights.
        5. Choose a flight.
        6. Select seats.
        7. Create a reservation (ask user whether to proceed with payment or modify reservation).
        8. Authorize payment (requires user consent, wait for user to finish payment and confirm when done).
        9. Display boarding pass (DO NOT display boarding pass without verifying payment).
    `,
    messages: coreMessages,
    tools: chatTools,
    onFinish: async ({ responseMessages }) => {
      if (session.user?.id) {
        try {
          await saveChat({
            id,
            messages: [...coreMessages, ...responseMessages],
            userId: session.user.id,
          });
        } catch (error) {
          console.error("Failed to save chat:", error);
        }
      }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });

  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const chat = await getChatById({ id });
    if (chat.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await deleteChatById({ id });
    return NextResponse.json({ message: "Chat deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error processing DELETE request:", error);
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 });
  }
}

