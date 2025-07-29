import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image, apiKey } = await request.json();

    if (!image || !apiKey) {
      return NextResponse.json(
        { error: "Missing required fields: image and apiKey" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://serverless.roboflow.com/infer/workflows/templates/remove-background",
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
      const errorText = await response.text();
      console.error("Roboflow API error:", errorText);
      return NextResponse.json(
        { error: "Failed to process image with Roboflow API" },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log(result);

    // Extract the processed image from the result
    const processedImage = result.outputs?.[0]?.annotated_image;

    if (!processedImage) {
      return NextResponse.json(
        { error: "No processed image found in response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      processedImage: processedImage,
    });
  } catch (error) {
    console.error("Error in remove-bg API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
