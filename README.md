# Stock Photos Generator

This is a React application that fetches and displays photos from the Unsplash API. The application includes features such as dark mode toggle, search functionality, and infinite scrolling.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/theSamyak/stock-photos-generator.git
   cd stock-photos-generator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and add your Unsplash API access key:

   ```env
   REACT_APP_ACCESS_KEY=your_unsplash_access_key
   ```

## Usage

To start the development server:

```bash
npm start
```

or

```bash
yarn start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Features

- **Search Photos:** Use the search bar to find photos.
- **Infinite Scrolling:** Automatically loads more photos as you scroll.
- **Dark Mode:** Switch between light and dark mode.
- **Responsive Design:** Adapted for all device sizes.

## Project Structure

Here is an overview of the project structure:

```plaintext
├── public
│   └── index.html
├── src
│   ├── components
│   │   └── Photo.js
│   ├── hooks
│   │   ├── useDarkMode.js
│   │   ├── useDebounce.js
│   │   └── useFetchImages.js
│   ├── styles
│   │   └── index.css
│   ├── App.js
│   ├── index.js
│   └── .env
├── .gitignore
├── package.json
├── README.md
└── yarn.lock / package-lock.json
```

## API Usage

The app uses the [Unsplash API](https://unsplash.com/developers) to fetch photos. Obtain an access key from Unsplash and add it to your `.env` file.

### Endpoints

- **Main URL:** `https://api.unsplash.com/photos/`
- **Search URL:** `https://api.unsplash.com/search/photos/`

### Example API Request

```javascript
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the existing style and conventions.

1. **Fork the repository.**
2. **Create a new branch:**

   ```bash
   git checkout -b feature-branch-name
   ```

3. **Make your changes.**
4. **Commit your changes:**

   ```bash
   git commit -m 'Add some feature'
   ```

5. **Push to the branch:**

   ```bash
   git push origin feature-branch-name
   ```

6. **Open a pull request.**
