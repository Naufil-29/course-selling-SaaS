# Fix 404 on Refresh / Direct URL (e.g. /payment-success) on Render

Your app is a **Single Page Application (SPA)**. Routes like `/payment-success`, `/courses`, `/course/123` exist only in React Router—there are no real files at those paths on the server.

When Stripe redirects to `https://your-app.onrender.com/payment-success?session_id=...`, Render looks for a file at `/payment-success`, doesn't find one, and returns **404 Not Found**. The React app never loads.

## Fix: Add a Rewrite Rule on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Open your **frontend** static site (the one that serves the React app, e.g. `cousera-959f`)
3. Go to **Redirects/Rewrites** (in the left sidebar or under Settings)
4. Add a **Rewrite** rule:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** **Rewrite** (not Redirect)
5. Save. Redeploy if needed.

After this, any path (e.g. `/payment-success`, `/courses`) will serve `index.html`, and React Router will show the correct page.
