# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Coffee R Us Admin Portal

A React-based Single Page Application (SPA) administrator portal for an e-commerce coffee website. This project demonstrates advanced React concepts including state management through hooks, event handling, data fetching, client-side routing, and comprehensive testing.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Component Tree](#component-tree)
- [Grading Criteria Alignment](#grading-criteria-alignment)
- [Known Limitations](#known-limitations)

## Features

- **Landing Page**: Store information and navigation overview
- **Product Inventory**: View all coffee products with responsive grid layout
- **Dynamic Search**: Real-time product filtering by name, description, or origin
- **Add Product**: Form to create new products via POST request
- **Edit Product**: Pre-populated form to update existing products via PATCH request
- **Delete Product**: Remove products with confirmation dialog
- **Responsive Design**: Mobile-first Tailwind CSS layout
- **Simulated Backend**: JSON Server provides REST API from `db.json`

## Technologies

- React 18
- React Router DOM 6
- Vite
- Tailwind CSS
- Vitest + React Testing Library
- JSON Server

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/coffee-admin-portal.git
   cd coffee-admin-portal