import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    const apiKey = process.env.ROBOFLOW_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "400: API key required" },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { error: "400: Image is required" },
        { status: 400 }
      );
    }

    /**
     * Replace inferenceURL with the URL you see in the "Deploy" section of your Workflow
     * For example: https://serverless.roboflow.com/infer/workflows/{your_workspace_name}/{your_workflow_slug}
     */
    const inferenceUrl =
      "https://serverless.roboflow.com/infer/workflows/templates/clip-classify-hotdog";

    const response = await fetch(inferenceUrl, {
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
    });

    if (!response.ok) {
      throw new Error(`Roboflow API error: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json({ result: result });
  } catch {
    return NextResponse.json(
      {
        error:
          "500: Failed to classify image. Make sure your API key and inferenceUrl are correct. See this project's README.md for instructions.",
      },
      { status: 500 }
    );
  }
}
