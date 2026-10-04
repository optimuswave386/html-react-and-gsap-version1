# Personal Website

A personal website built with React that combines three things in one place: a **storefront** for books and electronics, a **portfolio** of projects, and an **about** section with background on the creator. It also includes a user account area with a dashboard and order history, and a help center for support requests.

<img width="928" height="713" alt="Screenshot" src="https://github.com/user-attachments/assets/ca8e886a-e26d-46e7-82ae-027fcf022cc2" />

## Features

- **Storefront**: browse products, add items to a cart, and check out
- **Portfolio**: selected projects with context on the challenge, approach and result
- **About, Interests, Links and Resume** pages
- **User accounts**: sign in, register, and forgot password, each on its own route
- **Dashboard and Orders**: charts and order history, available after sign-in
- **Help center**: FAQs and a support request form
- **Protected routes**: dashboard and orders redirect to the login page when signed out
- **Shared login state**: managed with Redux Toolkit, persisted across page refreshes

## Tech Stack

- [React](https://react.dev/) with [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) (HashRouter)
- [Redux Toolkit](https://redux-toolkit.js.org/) and React Redux
- [Bootstrap](https://getbootstrap.com/) and React Bootstrap
- [Axios](https://axios-http.com/) for API requests
- [Chart.js](https://www.chartjs.org/) with react-chartjs-2 for dashboard charts
- [GSAP](https://gsap.com/) for scroll animations

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- The companion Express API running locally (see [Backend API](#backend-api))

### Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_EXPRESSAPI_URL=http://localhost:3000/
```

Keep the trailing slash: the app appends routes such as `user/login` directly to this value.

```env
VITE_EXPRESSAPI_URL_WITHOUT_SLASH=http://localhost:3000
```
Ditch the forward slash where the app uses routes such as `/cart`


### Run the development server

```bash
npm run dev
```

Then open the local address shown in the terminal.

### Build for production

```bash
npm run build
npm run preview
```

The production files are written to the `dist` folder.

## Project Structure

```
src/
├── assets/        CSS, images, video and Bootstrap files
├── components/    Reusable components (header, footer, page headers, forms)
├── pages/         One file per page/route
├── redux/         Redux store and slices (auth, cart, and others)
├── utilities/     Small helpers
├── app.jsx        Routes
├── index.jsx      Home page
└── main.jsx       Entry point
```

## Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/products` | Storefront | Public |
| `/cart` | Shopping cart | Public |
| `/checkout` | Checkout | Public |
| `/portfolio` | Portfolio | Public |
| `/about` | About | Public |
| `/interests` | Interests | Public |
| `/links` | Links | Public |
| `/myresume` | Resume | Public |
| `/helpcenter` | Help center | Public |
| `/login` | Sign in | Public |
| `/register` | Create account | Public |
| `/forgot-password` | Password reset | Public |
| `/dashboard` | Dashboard | Signed-in users |
| `/orders` | Orders | Signed-in users |

## Authentication

Login state is stored in a Redux `auth` slice (`src/redux/authSlice.jsx`). On sign-in, the token from the API is saved to `localStorage` and the user's email to a cookie, so the session survives a page refresh. Signing out clears both. The dashboard also validates the token with the API and signs the user out if it is rejected.

## Backend API

This repository contains the front end only. It expects a separate Express API that provides, among others:

- `POST user/login`, `user/register`, `user/forgot-password`
- `POST user/auth/:email` (token validation)
- `GET cart`
- `GET payment/orders`
- `POST log-support-request`

Some pages currently call `http://localhost:3000` directly. Update those URLs, or move them to `VITE_EXPRESSAPI_URL`, before deploying.

## Deployment

Run `npm run build` and upload the contents of `dist` to any static host (GitHub Pages, Netlify, Vercel and similar). The app uses hash-based routing, so it works on static hosting without extra server configuration. The API must be hosted separately and reachable from the deployed site.

## License

MIT license, copyright 2021-2026.
