-   API made for general technology questions for college students platform: https://github.com/jpedro-cf/college-ui

# API Endpoints

## Authentication

-   **POST** `/api/auth/register`: Registers a new user in the system.
-   **POST** `/api/auth/login`: Authenticates a user and sets an access token via httponly.
-   **GET** `/api/auth/me`: Retrieves information about the current authenticated user.

## Answers

-   **POST** `/api/answers`: Creates a new answer, user can answer a question only once.
-   **GET** `/api/answers`: Retrieves all answers made by the user.
-   **GET** `/api/answers/:id`: Retrieves a specific answer by its ID.

## Categories

-   Admin only
-   **POST** `/api/categories`: Creates a new category.
-   **GET** `/api/categories`: Retrieves all categories.
-   **PUT** `/api/categories/:id`: Updates a specific category by its ID.
-   **DELETE** `/api/categories/:id`: Deletes a specific category by its ID.

## Questions

-   **POST** `/api/questions`: Creates a new question (admin only).
-   **GET** `/api/questions`: Retrieves all questions.
-   **PUT** `/api/questions/:id`: Updates a specific question by its ID (admin only).
-   **DELETE** `/api/questions/:id`: Deletes a specific question by its ID (admin only).
