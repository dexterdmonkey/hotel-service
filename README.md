**README.md:**

# Hotel Service API

This project is a simple Hotel Service API built with Node.js, Express.js, and PostgreSQL using the Sequelize ORM. It follows the Model-Service-Controller (MSC) pattern for better organization and separation of concerns.

## Prerequisites

- Node.js
- PostgreSQL

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dexterdmonkey/hotel-service.git
cd hotel-service
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your database configuration:

```plaintext
DB_DIALECT=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=rahasia
```

4. Initialize the database:

Make sure your PostgreSQL server is running and then create the database specified in the `.env` file.

### Running the Server

Start the server with:

```bash
node index.js
```

By default, the server will run on `http://localhost:3000`.

## Running Tests

To run the tests, use:

```bash
npm test
```

This will execute the tests defined in the `tests` directory using Jest and Supertest.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
