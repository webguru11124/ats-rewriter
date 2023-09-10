

# TypeScript File Transformation with ts-morph

This project demonstrates how to transform TypeScript source code files using the `ts-morph` library. It provides a Node.js script that reads TypeScript code from input files, replaces occurrences of specific terms, and writes the transformed code to output files. Additionally, it includes a basic HTML page and an Express.js server for interacting with the transformation process.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)
- [File Transformation](#file-transformation)
- [HTML Interface](#html-interface)
- [Express.js API](#expressjs-api)
- [Contributing](#contributing)
- [License](#license)

## Features

- Transform TypeScript code files by replacing specified terms.
- Utilizes the `ts-morph` library for efficient TypeScript code manipulation.
- Provides an HTML interface to interact with the transformation process.
- An Express.js API for triggering code transformation and fetching results.

## Requirements

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Usage

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/ts-rewriter.git
   cd ts-rewriter
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

## File Transformation

The heart of this project is the `transformFile` function, which takes TypeScript code as input and replaces specific terms, generating transformed code. To use it programmatically:

```typescript
import transformCode from './rewrite';

const inputCode = `function EntityClass() {
  // ...
}`;

const entityName = 'Renamed';

const transformedCode = transformCode(inputCode, entityName);
console.log(transformedCode);
```

## HTML Interface

An included HTML page (`public/index.html`) allows users to interact with the transformation process via a web interface. It features:

- Three columns: Left (input code), Middle (input entity name), and Right (transformed code).
- A "Transform" button to initiate code transformation.
- User-friendly input and output display.

To use the HTML interface:

1. Start the Express.js server (see [Express.js API](#expressjs-api)).
2. Open `http://localhost:3000` in your web browser.
3. Enter TypeScript code in the left textarea.
4. Provide the desired entity name in the middle input field.
5. Click the "Transform" button to trigger the transformation process.
6. The transformed code will appear in the right textarea.

## Express.js API

This project also provides an Express.js API for programmatic code transformation. It offers an endpoint to send data and receive transformed code. To start the Express server:

```bash
npm start
```

The server will run on port 3000 by default.

### API Endpoint

- **POST /api/rewrite**

  To programmatically transform TypeScript code, send a POST request to this endpoint with a JSON payload containing the `code` and `entityName` fields. The server will respond with the transformed code.

  Example Request:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"payload": "function EntityClass() {}", "entityName": "Renamed"}' http://localhost:3000/api/rewrite
  ```

  Example Response:

  ```json
  {
    "transformedCode": "function RenamedClass() {}"
  }
  ```

## Contributing

Contributions to this project are welcome. Feel free to submit issues, pull requests, or suggestions to help improve it.
