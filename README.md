# Roboflow Templates

Full-stack computer vision apps powered by Roboflow, open-sourced and ready for deployment.

## Available Templates

- **[Remove Image Background](./remove-image-bg/)** - Automatically remove backgrounds from images using AI

## Getting Started

1. **Clone or fork this repository**

   ```bash
   git clone https://github.com/roboflow/roboflow-templates.git
   cd roboflow-templates
   ```

2. **Choose a template** and navigate to its directory

   ```bash
   cd remove-image-bg
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up your Roboflow API key**

   - Get your API key from [Roboflow](https://docs.roboflow.com/developer/authentication/find-your-roboflow-api-key)
   - Add it to your environment variables or use it directly in the app

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Deploy to Vercel** (recommended)
   - Connect your GitHub repository to [Vercel](https://vercel.com)
   - Add your Roboflow API key as an environment variable
   - Deploy with one click

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Roboflow Inference API
- **Deployment**: Vercel (recommended)

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.
