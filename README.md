# Front End Auth Module Project

## ✨ Requirements

1. Node >= 18.x
2. Git Bash (Windows users)

## ✨ Usage

1. `npm install`
2. `npm run dev`

## Introduction

Welcome to your Module Project! In this project, you will use front end authentication to register new users, log in existing users and control access to one of the routes.

The main goal is to implement a form that can POST register and login requests, and handle authentication tokens appropriately, in order to fetch data from a protected endpoint.

## 🥷 Tasks

### 👉 TASK 1 - Study the finished product

Watch the first few minutes of the Module Project Solution Video to get a demo of the finished product.

### 👉 TASK 2 - Study the API using Postman

#### Endpoint A: [POST] `http://localhost:3003/api/auth/login`

This endpoint allows to log users in by sending a valid username and password in the request body.

The response includes an authorization token in its body.

**The following users already exist in the system:**

- `{ "username": "fish", "password": "12345678" }`
- `{ "username": "ben", "password": "password" }`

❗ You should never use passwords like that in the real world!

#### Endpoint B: [POST] `http://localhost:3003/api/auth/register`

This endpoint allows to create a new user by sending a valid username and password in the request body.

The response includes a welcome message in its body.

**Example of a new user:**

- `{ "username": "jess", "password": "abcdefgh" }`

#### Endpoint C: [GET] `http://localhost:3003/api/stars`

This endpoint allows you to GET a list of Hollywood stars by sending a valid token in the Authorization header of the request, otherwise the response is a 401 Unauthorized.

**Example of the Authorization header:**

`Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJiZW4etc`

### 👉 TASK 3 - Fix the Auth Screen

Inside [AuthForm.js](./frontend/components/AuthForm.js) lives the one form used to log in and register

1. Import `axios` from Axios and the `useNavigate` hook from React Router
2. Create a submit handler for the form and wire it to the JSX
3. The component tracks in state whether the mode is login or register
4. On register, POST username and password to the proper endpoint and set the welcome message (or error) in component state
5. On login, POST username and password to the proper endpoint:
    - If login succeeds, set the token in browser local storage and navigate to the Stars route
    - If login fails, set the error message in component state

### 👉 TASK 4 - Fix the Stars Screen

Inside [StarsList.js](./frontend/components/StarsList.js) lives the list of stars obtained from the API

1. Import `axios` from Axios and the `useNavigate` hook from React Router
2. Create a `logout` handler for the logout button and wire it to the JSX
3. On logout, the token is removed from local storage, and the user navigated to the Auth route
4. Create an effect that fires after first render
5. If after first render there is no token in local storage, log the user out
6. Else GET the stars from the proper endpoint, appending the token to the `Authorization` header of the request
7. If the response arrives with a 401 Unauthorized, log the user out

## FAQ

<details>
  <summary>I feel very stuck. What can I do?</summary>

Do not struggle for an unreasonable amount of time! Watch the Solution Video. Request support via one of the available channels.

</details>

<details>
  <summary>How do I run tests against my code?</summary>

This project includes no tests, but feel free to write some.

</details>

<details>
  <summary>I am getting errors when I run npm install. What is going on?</summary>

This project requires Node to be correctly installed on your computer to work. Try deleting the `node_modules` folder and running `npm install`. If that fails, try deleting both `node_modules` and `package-lock.json` before reinstalling. If all fails, please request support!

</details>

<details>
  <summary>Do I need to install extra libraries with NPM?</summary>

No. Everything you need should be installed already.

</details>

<details>
  <summary>Can I edit the styles?</summary>

Of course! Have at it. But solve the challenges first.

</details>
