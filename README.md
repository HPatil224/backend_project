# VideoTube — Backend

The backend API for **VideoTube**, a full-stack, YouTube-style video sharing platform. Built with Node.js, Express, and MongoDB, it handles authentication, video uploads, comments, likes, subscriptions, tweets, playlists, and channel analytics.

- **Live demo:** [videotube-frontend-two.vercel.app](https://videotube-frontend-two.vercel.app/)
- **Frontend repo:** [videotube-frontend](https://github.com/HPatil224/videotube-frontend)

> Note: the backend is hosted on Render's free tier, so the first request after a period of inactivity may take 30–60 seconds while the server spins back up.

## Features

- User authentication with JWT access/refresh tokens, httpOnly cookies, and bcrypt password hashing
- Video upload and streaming via Cloudinary, including chunked uploads for larger files
- Comments, likes (on videos, comments, and tweets), and subscriptions
- Playlists — create, update, add/remove videos
- A Twitter-style "tweets" feature for short text posts
- Channel dashboard with aggregated stats (subscribers, views, likes) via MongoDB aggregation pipelines
- Paginated video and comment feeds
- Ownership-based authorization — users can only edit or delete their own content

## Tech stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens (JWT), bcrypt
- **File uploads:** Multer (local handling) + Cloudinary (storage/CDN)
- **Other:** cookie-parser, CORS, dotenv

## API overview

All routes are prefixed with `/api/v1`.

| Module | Base route | Description |
|---|---|---|
| Users | `/users` | Register, login, logout, refresh token, profile updates |
| Videos | `/videos` | Upload, fetch, update, delete, publish toggle |
| Comments | `/comments` | Add, fetch (paginated), update, delete |
| Likes | `/likes` | Toggle likes on videos/comments/tweets, fetch liked videos |
| Subscriptions | `/subscriptions` | Subscribe/unsubscribe, fetch subscribers and subscriptions |
| Tweets | `/tweets` | Create, fetch by user, update, delete |
| Playlists | `/playlist` | Create, fetch, add/remove videos, update, delete |
| Dashboard | `/dashboard` | Channel stats and video list for the logged-in user |
| Healthcheck | `/healthcheck` | Simple uptime check |

## Getting started locally

### Prerequisites

- Node.js (v18+)
- A MongoDB Atlas connection string (or local MongoDB instance)
- A Cloudinary account (free tier works)

### Setup

```bash
git clone https://github.com/HPatil224/backend_project.git
cd backend_project
npm install
```

Create a `.env` file in the project root:

```env
PORT=8000
CORS_ORIGIN=http://localhost:5173

MONGODB_URL=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the dev server:

```bash
npm run dev
```

The API will be available at `http://localhost:8000`.

## Deployment

This backend is deployed on [Render](https://render.com). Environment variables are configured directly in the Render dashboard rather than committed to the repo. `CORS_ORIGIN` is set to the deployed frontend's URL in production.

## Project structure

```
src/
├── controllers/   # request handlers for each resource
├── models/        # Mongoose schemas
├── routes/        # Express routers
├── middleware/    # auth (JWT verification) and multer config
├── utils/         # ApiError, ApiResponse, asyncHandler, Cloudinary helpers
├── db/            # MongoDB connection
├── app.js         # Express app setup
└── index.js        # entry point
```

## License

ISC
