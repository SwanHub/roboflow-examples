# Hot Dog vs Not Hot Dog - Roboflow CLIP Template

A Next.js web application that uses Roboflow's CLIP (Contrastive Language-Image Pre-training) model to classify images as either "hot dog" or "not hot dog". This project serves as a template for building image classification applications using Roboflow's powerful AI models.

## 🎯 Overview

This application is inspired by the famous "Not Hotdog" app from Silicon Valley and demonstrates how to build a real-time image classification system using:

- **Roboflow CLIP Model**: For zero-shot image classification
- **Next.js 15**: For the web application framework
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling

## 🚀 Features

- **Real-time Image Classification**: Upload images or take photos to instantly classify them
- **CLIP-based Classification**: Uses Roboflow's CLIP model for accurate hot dog detection
- **Mobile-First Design**: Responsive design that works on phones and desktop
- **Beautiful UI**: Modern interface with smooth animations and transitions
- **API Key Management**: Secure handling of Roboflow API keys
- **Drag & Drop Support**: Easy image upload with drag and drop functionality

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI/ML**: Roboflow CLIP Classification API
- **Icons**: Lucide React, React Icons

## 📋 Prerequisites

- Node.js 18+
- A Roboflow account and API key
- Modern web browser

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hotdog-nothotdog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Your Roboflow API Key

1. Sign up for a free account at [Roboflow](https://roboflow.com)
2. Get your API key from your account dashboard
3. The app will prompt you to enter your API key on first use

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🎮 How to Use

1. **Enter API Key**: Click the settings icon and enter your Roboflow API key
2. **Upload Image**: Either drag and drop an image or click "Select Photo"
3. **Take Photo**: Use the "Take Picture" button (camera functionality)
4. **View Results**: The app will classify your image as either "Hotdog" or "Not hotdog"
5. **Try Again**: Click the "Again" button to classify another image

## 🔧 How It Works

### CLIP Classification

This application uses Roboflow's CLIP model, which is trained to understand the relationship between images and text. The model compares the uploaded image against two text descriptions:

- "hot dog"
- "not hot dog"

The model returns the most similar class, providing accurate classification without needing to train a custom model.

### API Integration

The application sends base64-encoded images to Roboflow's CLIP classification endpoint:

```
POST https://serverless.roboflow.com/infer/workflows/templates/clip-classify-hotdog
```

### Frontend Architecture

- **ImageZone Component**: Handles image upload, drag & drop, and displays classification results
- **State Management**: Uses React hooks to manage application state
- **Responsive Design**: Mobile-first approach with phone-like interface

## 🎨 Customization

### Changing Classification Classes

To classify different objects, you can modify the CLIP workflow in Roboflow:

1. Go to your Roboflow workspace
2. Create a new CLIP classification workflow
3. Update the text classes to match your use case
4. Update the API endpoint in `src/app/api/classify/route.ts`

### Styling

The application uses Tailwind CSS for styling. Key styling files:

- `src/app/globals.css`: Global styles
- `src/app/_components/ImageZone.tsx`: Main component styling

## 📱 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security

- API keys are stored locally in the browser
- No sensitive data is sent to external servers except Roboflow
- Images are processed securely through Roboflow's infrastructure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the "Not Hotdog" app from HBO's Silicon Valley
- Built with Roboflow's powerful CLIP model
- Uses Next.js for the web framework

## 📞 Support

For issues related to:

- **Roboflow API**: Contact [Roboflow Support](https://roboflow.com/support)
- **Application Issues**: Open an issue in this repository

---

**Note**: This is a template project. You can easily adapt it for other classification tasks by modifying the CLIP workflow and updating the UI text accordingly.
