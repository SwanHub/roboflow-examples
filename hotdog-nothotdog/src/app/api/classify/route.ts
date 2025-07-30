import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, apiKey } = body;

    if (!image || !apiKey) {
      return NextResponse.json(
        { error: "Image and API key are required" },
        { status: 400 }
      );
    }

    // Send request to Roboflow
    const response = await fetch(
      "https://serverless.roboflow.com/infer/workflows/templates/clip-classify-hotdog",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          inputs: {
            image: { type: "base64", value: image },
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Roboflow API error: ${response.status}`);
    }

    const result = await response.json();

    // Extract the classification result
    if (result && result.outputs[0] && result.outputs[0].clip_comparison) {
      const classification =
        result.outputs[0].clip_comparison.most_similar_class;
      return NextResponse.json({ result: classification });
    } else {
      throw new Error("Invalid response format from Roboflow");
    }
  } catch (error) {
    console.error("Classification error:", error);
    return NextResponse.json(
      { error: "Failed to classify image" },
      { status: 500 }
    );
  }
}
