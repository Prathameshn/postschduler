# Post Sceduler

Post Sceduler Project for building RESTful APIs and microservices using Node.js, Express and MongoDB

## Features

CRUD operations(Create, Read, Update, Delete): Create a Post list App with
appropriate validations and store the data in the database(whatever you want). Use any
repo storage system like GitHub, GitLab or BitBucket and upload the code.

Use Cases & Features
    ● User should be able to login and signUp
    ● User should be able to create a post with the following details
        🌕 Title
        🌕 Description
        🌕 Media (Image or Video anyone in a task)
        🌕 Target Date
        🌕 schedule Date
        🌕 account details
    ● User should be able to see the list of post already created
        🌕 If there are more than 20 posts then pagination should be there for the user.
    ● User can see the posts details along with account details like accountName and
    type
    ● User can update the post details
    ● Users can remove any post from the available posts. User should be allowed to
    remove multiple posts at a time.
    ● User should be able to sort the post based on the schedule Date,Target Date
    ● User can search from Title,Description,accountname where results shows in the
    ascending order of the Target Date

Submission Must Have:
    ● Frequent commit with proper commit messages
    ● Proper DB Modal design it inculdes account table(facebook,linkedin,instagram
    account details),post table and user table
    ● Proper naming convention for variables and functions
    ● Proper validation whenever you fill it is required
    ● Deployed on server and we will be able to run it
    ● For checking perfomance of database query you need to have more than 10000
    dummy record in database
    ● For checking api perfomance api needs to give resopnse in 15s maximum
    Submission will stand a better chance of selection if:
    ● No-SQL Database is used (MongoDB)

#### Install dependencies:

```bash
npm i
```

#### Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
npm run dev
```
