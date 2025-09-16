import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image } = body;

    const apiKey = process.env.ROBOFLOW_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 400 });
    }

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    /**
     * Replace this URL with the URL you see in the "Deploy" section of your workflow
     * For example: https://serverless.roboflow.com/infer/workflows/{your_workspace_name}/{your_workflow_slug}
     */
    const response = await fetch(
      "https://serverless.roboflow.com/infer/workflows/templates/detect-faces",
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

    return NextResponse.json({ result: result });
  } catch {
    return NextResponse.json(
      { error: "Failed to detect faces" },
      { status: 500 }
    );
  }
}
