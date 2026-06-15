# Event-X – Digital Event Discovery Platform

A full-stack event discovery and registration platform built with React, Firebase, and EmailJS, enabling students and professionals to discover, save, and register for workshops, webinars, seminars, and bootcamps through a centralized platform.

This project demonstrates modern frontend architecture, authentication workflows, real-time database integration, event management, and automated email notifications.

---

## Problem Statement

Finding relevant technical and professional events is often fragmented across multiple platforms.

Users face challenges such as:

* Discovering relevant events
* Tracking registrations
* Managing saved events
* Receiving timely reminders
* Accessing a centralized event platform

Event-X addresses these challenges by providing a unified event discovery and registration experience for both attendees and organizers.

---

## System Architecture

```text
              ┌─────────────┐
              │    User     │
              └──────┬──────┘
                     │
                     ▼
             ┌──────────────┐
             │ React Client │
             └──────┬───────┘
                    │
         ┌──────────┼──────────┐
         ▼                     ▼
 ┌──────────────┐      ┌──────────────┐
 │ Firebase Auth│      │  Firestore   │
 │ Google Login │      │ Event Storage│
 └──────────────┘      └──────────────┘
                    │
                    ▼
              ┌──────────┐
              │ EmailJS  │
              │ Reminders│
              └──────────┘
```

---

## Core Features

### Event Discovery

Browse workshops, webinars, seminars, and bootcamps through a centralized platform.

### Advanced Filtering

Filter events based on:

* Level
* Type
* Format

to quickly find relevant opportunities.

### Google Authentication

Secure sign-in using Firebase Authentication and Google OAuth.

### Event Registration

Register for upcoming events and manage participation seamlessly.

### Save Events

Bookmark events to revisit and register later.

### Organizer Dashboard

Allows organizers to:

* Create events
* Manage event listings
* Monitor registrations

### Automated Email Reminders

EmailJS-powered notifications help registered users stay informed before event start times.

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend & Database

* Firebase Firestore

### Authentication

* Firebase Authentication
* Google OAuth

### Notifications

* EmailJS

### Deployment

* AWS

---

## Project Structure

```text
EventX/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── stores/
│   └── App.jsx
├── package.json
└── README.md
```

---

## Running the Project

### Prerequisites

* Node.js
* Firebase Project
* EmailJS Account

### Installation

```bash
git clone https://github.com/SaajidAhamed007/Event-X

cd event-x

npm install

npm run dev
```

---

## Engineering Concepts Demonstrated

* Component-Based Architecture
* State Management
* Firebase Authentication
* Real-Time Database Integration
* Event-Driven Notifications
* Responsive UI Design
* Cloud Deployment
* Client-Side Routing

---

## Future Enhancements

* Event Recommendation System
* Calendar Integration
* QR-Based Event Check-In
* Event Analytics Dashboard
* Role-Based Access Control
* Push Notifications

---

## Live Demo

https://d2adaqnbiflue6.cloudfront.net/

---

## Author

**Saajid Ahamed**

Frontend Development, Firebase Integration, Event Management, UI/UX Design, and Testing.
