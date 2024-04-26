# AI-Powered Text Analysis Application

This is a React application that allows users to input long text and generates quotes, summaries, and insights based on the provided text.

## Features

- Language selection for the output
- Generation of quotes, summaries, and insights from the provided text
- Real-time updates on the processing status of the text

## Usage

1. Start the development server:

   ```bash
   yarn start
   ```

2. Open the application in your browser at `http://localhost:3000`.

3. On the input page, paste your long text into the provided textarea and select the desired output language from the dropdown.

4. Click the "Upload" button to submit the text for processing.

5. The application will navigate to the output page, where you can view the generated quotes, summary, and insights.

6. Use the navigation buttons to switch between the different tabs (Summary, Quotes, Insights) to view the corresponding results.

7. To go back to the input page, click the back button in the top-left corner.

## Project Structure

The project follows a modular structure, with the main components and services organized as follows:

- `src/api`: Contains the API integration logic for communicating with the backend.
- `src/services/TextInput`: Handles the text input functionality and language selection.
- `src/services/TextAnalysis`: Manages the display of the generated quotes, summary, and insights.
- `src/shared`: Contains reusable components, icons, and Lottie assets used throughout the application.
- `src/utils`: Provides utility functions and constants used in the project.

## API Integration

The application integrates with a backend API to process the input text and generate the quotes, summary, and insights. The API endpoints are defined in the `src/api/index.ts` file.

The main API functions are:

- `writeContent`: Sends the input text and selected language to the backend for processing.
- `getContent`: Retrieves the processed content from the backend based on the content ID.

## Testing

The project includes unit tests to ensure the correctness of the application. The tests are located in the `src/App.test.tsx` file.

To run the tests, use the following command:

```bash
yarn test
```

## Dependencies

The project relies on the following main dependencies:

- React: JavaScript library for building user interfaces.
- React Router: Routing library for handling navigation within the application.
- Axios: Promise-based HTTP client for making API requests.
- Formik: Form library for handling form state and validation.
- Yup: Object schema validation library.
- Tailwind CSS: Utility-first CSS framework for styling.
- Lottie: Library for rendering animations.

For a complete list of dependencies, refer to the `package.json` file.

## Configuration

The project uses environment variables for configuration. The following variables can be set in the `.env` file:

- `REACT_APP_BACKEND`: URL of the backend API.

Make sure to create a `.env` file based on the provided `.env.example` file and set the appropriate values.
