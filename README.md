# MetaPhoto - Photo Library Manager

A modern React-based photo library management application built with TypeScript and Vite. MetaPhoto provides an intuitive interface for browsing, filtering, and viewing photos with advanced search capabilities.

## Features

- **Photo Gallery**: Browse through a comprehensive collection of photos with pagination
- **Advanced Filtering**: Filter photos by ID, title, album title, and user email
- **Modal View**: Click on photos to view them in a detailed modal overlay
- **Responsive Design**: Optimized for desktop and mobile devices using Bulma CSS framework
- **Real-time Search**: Dynamic filtering with instant results
- **Loading States**: Smooth loading indicators and error handling

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Bulma CSS framework for responsive design
- **HTTP Client**: Axios for API communication
- **Code Quality**: ESLint with TypeScript support

## Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd relish-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Code Quality

Run linting to check code quality:
```bash
npm run lint
```

Run type checking:
```bash
npm run type-check
```

## Testing

Run tests (single execution):
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests with UI:
```bash
npm run test:ui
```

## Project Structure

```
src/
├── components/          # React components
│   ├── FilterSection.tsx
│   ├── LoadingSpinner.tsx
│   ├── Pagination.tsx
│   ├── PhotoCard.tsx
│   ├── PhotoGrid.tsx
│   └── PhotoModal.tsx
├── services/           # API services
│   └── api.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## API Integration

The application integrates with a RESTful API for photo data. The API service is located in `src/services/api.ts` and handles:

- Photo retrieval with pagination
- Advanced filtering capabilities
- Error handling and response processing

## Docker

### Development

Run the application in development mode with Docker:
```bash
docker-compose up dev
```

### Production

Build and run the production container:
```bash
docker-compose up app
```

Or run on a custom port:
```bash
docker-compose up app-custom
```

### Manual Docker Commands

Build the production image:
```bash
docker build -t relish-app .
```

Run the production container:
```bash
docker run -p 80:80 relish-app
```

## Railway Deployment

The application is configured for deployment on Railway. The deployment uses:

- **Dockerfile.railway**: Optimized Dockerfile for Railway
- **railway.json**: Railway-specific configuration
- **nginx.conf**: Production web server configuration

## CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline using GitHub Actions that:

- **Testing**: Runs tests on multiple Node.js versions (18.x, 20.x)
- **Code Quality**: Performs type checking and linting
- **Coverage**: Generates and uploads test coverage reports
- **Building**: Creates optimized production builds
- **Deployment**: Automatically deploys to GitHub Pages on main branch

The pipeline is triggered on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
