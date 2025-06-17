# Form Builder

A modern, interactive form builder application built with Next.js and React. This application allows users to create and manage multi-page forms with an intuitive drag-and-drop interface.

## Features

- **Multi-page Form Management**
  - Create, rename, and delete form pages
  - Drag and drop pages to reorder them
  - Automatic navigation when adding/removing pages
  - Set any page as the first page

- **Page Operations**
  - Add new pages with custom names
  - Rename existing pages
  - Copy/duplicate pages
  - Delete pages with automatic navigation to previous page
  - Context menu for quick page operations

- **Modern UI/UX**
  - Clean and intuitive interface
  - Drag and drop functionality
  - Responsive design
  - Keyboard navigation support
  - Visual feedback for interactions

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

### Managing Pages

1. **Adding a Page**
   - Click the "+" button between pages or the "Add page" button at the end
   - Enter a name for the new page
   - The new page will be automatically selected

2. **Removing a Page**
   - Right-click on a page or click the menu button (three dots)
   - Select "Delete" from the context menu
   - You'll be automatically navigated to the previous page

3. **Reordering Pages**
   - Drag and drop pages to reorder them
   - The order will be maintained automatically

4. **Page Operations**
   - Right-click on a page or click the menu button to access:
     - Set as first page
     - Rename
     - Copy
     - Duplicate
     - Delete

### Keyboard Navigation

- Use arrow keys to navigate between pages
- Press Home to go to the first page
- Press End to go to the last page

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React DnD (Drag and Drop)

## Development

This project uses:
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code linting
- Next.js for the framework

## License

This project is open source and available under the MIT License.
