# CS-360-Project


## Introduction

The Employee Attendance and Leave Management project aims to create an efficient system for tracking employee attendance and leave, addressing the need for automation and accuracy. Implementation of this system is intended to enhance productivity, reduce errors, and improve overall workforce management. The project will result in a user-friendly platform for employees to record attendance and request leaves while providing supervisors with advanced tools for monitoring attendance and generating reports. The project will require suitable hardware and software components, including servers with ample storage capacity and user-friendly applications compatible with standard operating systems and web browsers to achieve these goals.


## Setup

### Node and npm

You will require Node.js and Node Package Manager which you can download from the [official website](https://nodejs.org/en/download).

### Clone the Repo

First clone the repository using:

```shell
git clone https://github.com/Haris-Asghar/CS-360-Project
cd CS-360-Project
```

### Install Dependencies

After cloning the repository, simply navigate to both the client and server directories one after the other and run:
```shell
npm install
```

### MongoDB

*Install MongoDB:*
   - Visit the MongoDB download page: [MongoDB Download](https://www.mongodb.com/try/download/community)
   - Download the appropriate version of MongoDB for your operating system.
   - Follow the installation instructions provided for your operating system

*Start MongoDB Server:*
   - After installing MongoDB, you can start the MongoDB server by typing the following in CMD:
     ```shell
     mongod
     ```

This will install all the dependencies for the project.

### Start Dev Servers

To run the project, run the following in both the client and server directories:
```shell
npm start
```


## Directory Structure

client - Contains the client-side code of the project

    ├── /public - Static assets and HTML template files

    ├── /src - Source code files for React components, styles, etc.


server - Contains the server-side code of the project

    ├── src/routes - Express route 
    
    ├── src/models - Mongoose models for MongoDB
    
    ├── src/index.js - Main server file


## References

- MongoDB: https://www.mongodb.com/
- React: https://reactjs.org/
- Node.js: https://nodejs.org/
- MERN Stack Tutorial: https://www.mongodb.com/languages/mern-stack-tutorial/
