# Roboflow Examples

Live demo websites powered by [Roboflow Templates](https://templates.roboflow.com).

## List of sites

- **[Remove Image Background](./remove-image-bg)** - Automatically remove backgrounds from images using AI. Clone of the well-known site [remove.bg](https://remove.bg).
- **[Face Detection Test](./face-detection-test/)** - Simple Nextjs site to detect faces in an image. Upload an image and see the result.
- **[Hot dog / Not hot dog](./hotdog-nothotdog/)** - Classify an image as "hot dog" or "not hot dog". Based on the Silicon Valley show meme.

## Getting Started

Each subfolder in this repo is its own independent, fully-functional Nextjs app that shows off a common computer vision use case. To spin up a local version of one of these websites, follow these instructions:

1. **Clone this repository**

   ```bash
   git clone https://github.com/SwanHub/roboflow-templates
   ```

2. **Extract one of the examples** and navigate inside.

   ```bash
   cp -r roboflow-templates/face-detection-test ./face-detection-test
   cd face-detection-test
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Create an env file with your Roboflow API key**

[Find your Roboflow API key](https://docs.roboflow.com/developer/authentication/find-your-roboflow-api-key).

```bash
echo "ROBOFLOW_API_KEY={YOUR_API_KEY_HERE}" > .env.local
```

5. **Replace inference endpoint**

Look for `inferenceUrl` in the `api/{route_name}/route.tsx` file and replace it with YOUR inference endpoint. You can find this endpoint by:

1. Signing into [Roboflow](https://app.roboflow.com)
2. Navigating to Workflows > Your relevant workflow
3. Click on the "Deploy" button, copy the `https://serverless.roboflow.com/infer...` endpoint and set `inferenceUrl` equal to that value.

4. **Run the development server**

   ```bash
   npm run dev
   ```

## Contributing

We welcome contributions! Please feel free to submit a new template via Pull Request.
