-   API made for general technology questions for a college students platform: https://github.com/jpedro-cf/college-ui

# API Endpoints

## Authentication

-   **POST** `/api/auth/register`: Registers a new user in the system.
-   **POST** `/api/auth/login`: Authenticates a user and sets an access token via httponly.
-   **GET** `/api/auth/me`: Retrieves information about the current authenticated user.

## Answers

-   **POST** `/api/answers`: Creates a new answer. User can answer a question only once (Authenticated only).
-   **GET** `/api/answers`: Retrieves all answers made by the user (Authenticated only).
-   **GET** `/api/answers/:id`: Retrieves a specific answer by its ID (Authenticated only).
-   **GET** `/api/answers/performance`: Retrieves the current user performance (Authenticated only).

## Categories

-   **POST** `/api/categories`: Creates a new category. (Admin only)
-   **GET** `/api/categories`: Retrieves all categories.
-   **PUT** `/api/categories/:id`: Updates a specific category by its ID. (Admin only)
-   **DELETE** `/api/categories/:id`: Deletes a specific category by its ID. (Admin only)

## Questions

-   **POST** `/api/questions`: Creates a new question (Admin only).
-   **GET** `/api/questions`: Retrieves all questions.
-   **GET** `/api/questions/:id`: Retrieves a specific question by its ID. (Admin only because the body contains the correct answer)
-   **PUT** `/api/questions/:id`: Updates a specific question by its ID (Admin only).
-   **DELETE** `/api/questions/:id`: Deletes a specific question by its ID (Admin only).

## Users

-   **GET** `/api/users`: Retrieves all users. (Admin only)
-   **PUT** `/api/users/:id`: Updates a specific user by its ID. (Admin can edit all users and a user can only edit his own information)
