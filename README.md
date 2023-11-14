# Libray Management System

## Overview

Library management system designed to efficiently manage books, members, and book borrowings. This system enables users to handle member records, book transactions, and book details seamlessly. Members can borrow books and are responsible for returning them within the stipulated time.

## Environment Variables

Before running the application, make sure to set up the required environment variables. Create a .env file in the root of the back and front folder and add the following variables:

## Back Routes

### Users

- **GET /users:** Retrieve all users.
- **GET /users/:id:** Retrieve a user by ID.
- **POST /users:** Create a new user.
- **PUT /users/:id:** Update a user's information.
- **DELETE /users/:id:** Delete a user.

### Members

- **GET /members:** Retrieve all members.
- **POST /members:** Create a new member.
- **PUT /members/:id:** Update a member's information.
- **DELETE /members/:id:** Delete a member.
- **PUT /members/change-status/:id:** Change the status of a member.

### Borrows

- **GET /borrows:** Retrieve all book borrowings.
- **POST /borrows:** Create a new book borrowing.
- **DELETE /borrows/:id:** Delete a book borrowing.

### Books

- **GET /books:** Retrieve all books.
- **GET /books/:id:** Retrieve a book by ID.
- **POST /books:** Create a new book.
- **PUT /books/:id:** Update a book's information.
- **DELETE /books/:id:** Delete a book.

### Authentication

- **POST /auth/login:** User authentication.

## Back Setup

1. Navigate to the back folder.
2. Run the back migration scripts: `npm run migrate:up`
3. Install dependencies: `npm install`
4. Start the back development server: `npm run dev`

## Front Setup

1. Navigate to the front folder.
2. Install dependencies: `npm install`
3. Start the front development server: `npm run dev`

## Credentials

- Username: admin
- Password: admin
