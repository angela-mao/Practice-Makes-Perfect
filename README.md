# Team H - Practice Makes Perfect

![License](https://img.shields.io/github/license/angela-mao/Practice-Makes-Perfect?style=flat-square)
![Pull Requests](https://img.shields.io/github/issues-pr-raw/angela-mao/Practice-Makes-Perfect?style=flat-square)
![Forks](https://img.shields.io/github/forks/angela-mao/Practice-Makes-Perfect?style=social)

This is a project that is part of the S21 UWaterloo CSC x DSC Project Program!

## Overview

Practice Makes Perfect is a full-stack web application that helps people practice their behavioral and technical interviewing skills by simulating an interview environment using our vast base of interviewing questions.

### Members

Mentor:

- Aaron Choo

Mentees:

- Jinyi Li
- Angela Mao
- Tracy Dong
- Jared He

## About the Project

**Technologies Used:** Javascript, React, SocketIO, Node.js, Express, MySQL.

As co-op students in uWaterloo, practicing our interviewing skills is vital in helping us land the jobs we want. Practice Makes Perfect (PMP) works with users to sharpen their interviewing skills by testing them with a custom set of questions based on what aspects of interviewing they want to improve. You can practice alone or in a group as multiple people can join one "interview room" and view the same questions. We have an extensive database of coding and behavioural questions that we pull on to create a unique interviewing experience.

Users can also add their categories and questions to make a more diverse questions database for the following users!

## Demo

![Picture of interview room](https://github.com/angela-mao/Practice-Makes-Perfect/blob/main/images/interviewRoom.png)

### Quickstart Guide

```bash
# Install dependencies for client and server
yarn

# Install dependencies for client
yarn run install-client

# Install dependencies for server
yarn run install-server

# Run the client & server with concurrently
yarn run watch

# Run client only
yarn run watch-client

# Run server only
yarn run watch-server

```

Server runs on http://localhost:3001 and client on http://localhost:3000

### What's Next For Project Program

A useful future addition would be to add **video recording** for parties interviewing together, so they can look back and see where to improve. Currently they can view the questions together, but there is no way to communicate on our platform. Another improvement to our application would be to add an **admin page** to manage the questions database for easy modifications.
