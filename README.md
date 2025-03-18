# BlueBird Frontend

A modern, responsive web application built with React, TypeScript, and Vite. This project implements a Twitter-like interface with real-time updates and modern UI components.

## 🚀 Features

- Modern React with TypeScript for type safety
- Real-time updates using Socket.IO
- Material-UI components for consistent design
- Responsive layout with SCSS styling
- React Query for efficient data fetching
- Framer Motion for smooth animations
- Timeago.js for relative time formatting
- React Router for navigation

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Material-UI, SCSS
- **State Management:** React Query
- **Real-time:** Socket.IO
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **HTTP Client:** Axios

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd blueBird-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
├── fonts/         # Custom fonts
├── images/        # Static images
├── pages/         # Page components
├── utils/         # Utility functions
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
VITE_SOCKET_URL=your_socket_url
```

## 🚀 Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

- Ayo Niyi - Initial work
