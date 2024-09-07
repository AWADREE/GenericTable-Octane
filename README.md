
# Octane Dashboard - Technical Task

This project is part of the Octane dashboard expansion, which adds two new screens to the dashboard: "Orders Overview" for the sales team and "User Management" for the admin team. The project is built using Next.js, Tailwind CSS, and NextUI, with a reusable table component and integrated API for data fetching.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Code Structure](#code-structure)
- [State Management](#state-management)
- [Additional Considerations](#additional-considerations)

## Features

- **Orders Overview**: Allows the sales team to manage customer orders with functionalities like viewing order details, updating statuses, and deleting orders.
- **User Management**: Allows admins to manage user accounts, including editing user details, activating/deactivating accounts, and deleting users.
- **Reusable Table Component**: A highly configurable table component designed for reuse across different parts of the application.
- **State Management**: Efficient management of application state, ensuring smooth user interactions.
- **API Integration**: Seamless interaction with mock APIs for data fetching, status updates, and deletions.

## Technologies

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [NextUI](https://nextui.org/)
- **State Management**: Zustand state management
- **TypeScript**: Strongly typed components and APIs

## Installation

### Prerequisites

- Node.js (>=14.x.x)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/AWADREE/GenericTable-Octane
cd GenericTable-Octane
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will start in development mode and can be accessed at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run start
```

This command builds the app for production and serves it.

## API Integration

The data for the Orders Overview and User Management screens is fetched from mock REST APIs. You can set up a local JSON server to mock the API responses:

1. Install JSON Server:

   ```bash
   npm install -g json-server
   ```

2. Run JSON Server:

   ```bash
   json-server --watch db.json --port 5000
   ```

   Ensure that your APIs are pointing to `http://localhost:5000` in the application.

## Testing

Automated tests have been implemented using Cypress. To run the tests:

```bash
npm run cy
npm run cy:open
```

Ensure all tests pass, including tests for rendering components, state management, and API interactions.

## Code Structure

- `/orders`: Orders Overview page with table and order actions.
- `/`: User Management page with table and user actions.

## State Management

State management is handled via Zustand and Next.js API routes. The state is shared between components where necessary to ensure consistency and a smooth user experience.

- **orders state**: Managed at the screen level, with actions for fetching, updating, and deleting orders.
- **users state**: Managed similarly, with actions for activating/deactivating accounts and editing user details.

## Additional Considerations

- **Responsiveness**: The UI is fully responsive and optimized for different screen sizes.
- **Accessibility**: The application follows basic accessibility guidelines to ensure usability for all users.
- **Commit History**: Commits are descriptive and follow best practices to provide a clear history of the project development.
