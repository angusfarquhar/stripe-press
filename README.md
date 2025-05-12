# 📚 Stripe Press

**Stripe Press** is an online bookstore powered by Stripe!

This application serves as a demo for integrating **Stripe Elements** into a custom checkout flow, specifically showcasing the **Payment Element**.

The frontend and backend of the application is built on [Next.js](https://nextjs.org/), styled using [Tailwind CSS](https://tailwindcss.com/), and uses [Stripe’s Node SDK](https://github.com/stripe/stripe-node) to handle requests made to Stripe's Products, Prices and Payment Intents APIs.

---

## 🚀 Getting Started

### 🔧 Prerequisites

Before you begin, make sure you have the following tools installed:

- **Homebrew** (macOS package manager):

  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```

- **Node.js** (install via Homebrew):

  ```bash
  brew install node
  ```

---

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/stripe-press.git
   cd stripe-press
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Stripe keys:**

   - Go to the [Stripe Dashboard](https://dashboard.stripe.com/apikeys) and copy your **Secret Key** and **Publishable Key**.
   - Create a `.env` file in the root of the project. A `sample.env` is provided for you at the root of the repository, you just need to change the name to `.env`:

     ```
     STRIPE_SECRET_KEY=your_secret_key_here
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
     NEXT_PUBLIC_BASE_URL = http://localhost:3000/api
     ```

---

## 🧪 Running the App Locally

To start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧾 Features

- View products using Stripe's Products and Prices APIs.
- Create Payment Intent using Stripe's `idempotency_key` for safe retryable requests.
- Checkout with Stripe Elements (Payment Element).
- View payment status using Stripe Payment Intents API.

---
