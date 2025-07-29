# Remove Image Background Template

A Next.js application that automatically removes backgrounds from images using Roboflow's AI-powered background removal model.

## Features

- 🖼️ **Drag & Drop Interface** - Upload images by dragging and dropping anywhere on the page
- 🎯 **One-Click Background Removal** - Remove backgrounds with a single click
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔍 **Image Preview** - Compare original and processed images
- 📥 **Download Results** - Download processed images directly
- 🔑 **API Key Management** - Secure API key input with show/hide functionality

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Roboflow API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/roboflow/roboflow-templates.git
   cd roboflow-templates/remove-image-bg
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Get your Roboflow API key**

   - Sign up at [Roboflow](https://roboflow.com)
   - Navigate to your [API key page](https://docs.roboflow.com/developer/authentication/find-your-roboflow-api-key)
   - Copy your Private API key

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

6. **Enter your API key**
   - Click the API key input in the header
   - Enter your Roboflow API key
   - Start removing backgrounds!

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `ROBOFLOW_API_KEY` with your API key
   - Deploy!

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Connect your GitHub repo and add environment variables
- **Railway**: Deploy with automatic environment variable support
- **AWS/GCP**: Use Docker or serverless deployment

## Environment Variables

| Variable           | Description           | Required |
| ------------------ | --------------------- | -------- |
| `ROBOFLOW_API_KEY` | Your Roboflow API key | Yes      |

## API Usage

The app uses Roboflow's background removal workflow:

- **Endpoint**: `https://serverless.roboflow.com/infer/workflows/templates/remove-background`
- **Input**: Base64 encoded image
- **Output**: PNG image with transparent background

## Customization

### Styling

- Modify `src/app/globals.css` for global styles
- Update component-specific styles in each `.tsx` file
- Uses Tailwind CSS for styling

### Adding Features

- **New AI Models**: Update the API endpoint in `src/app/api/remove-bg/route.ts`
- **Additional Image Processing**: Add new API routes in `src/app/api/`
- **UI Components**: Create new components in `src/_components/`

### Example Images

Replace images in `public/examples/` with your own sample images.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Roboflow Inference API
- **Deployment**: Vercel (recommended)

## Troubleshooting

### Common Issues

1. **API Key Not Working**

   - Verify your API key is correct
   - Check your Roboflow account has sufficient credits
   - Ensure the key has inference permissions

2. **Images Not Processing**

   - Check file format (JPEG, PNG, WebP supported)
   - Verify file size (max 10MB recommended)
   - Check browser console for errors

3. **Deployment Issues**
   - Ensure environment variables are set correctly
   - Check build logs for TypeScript errors
   - Verify Node.js version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- [Roboflow Documentation](https://docs.roboflow.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/roboflow/roboflow-templates/issues)
