# Us 💖 — Relationship System

A cute, full-featured website for couples. Includes:
- **"Do you love me?"** landing page with an evasive No button and negative-thought popups
- **Memory wall** with photos
- **Love notes** board
- **Date night planner**
- **Our playlist**
- Stats: days together & countdown

Built to deploy on **Vercel** with a **Supabase** backend.

---

## 📁 Project Structure

```
index.html
css/style.css
js/supabase.js   <-- add your Supabase keys here
js/app.js        <-- app logic
supabase-schema.sql
vercel.json
README.md
.env.example
```

---

## 🚀 Step 1: Set up Supabase (Database)

1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Create a new project (choose a name like "us-relationship").
3. Once ready, go to **Settings → API** and copy:
   - **Project URL**
   - **Project API Key** (the `anon public` key)
4. Go to the **SQL Editor** in your Supabase dashboard.
5. Paste the entire contents of `supabase-schema.sql` and click **Run**.
   - This creates the `memories`, `love_notes`, `dates`, and `songs` tables.
   - It also enables public read/write so you and your girlfriend can use it without logging in.

---

## 🔑 Step 2: Add your Supabase keys

Open `js/supabase.js` and replace the placeholder values:

```js
const SUPABASE_URL = 'https://your-project-ref.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

Save the file.

---

## 🌐 Step 3: Deploy to Vercel

### Option A — Vercel Dashboard (easiest)

1. Push this folder to a GitHub repository.
2. Go to [https://vercel.com](https://vercel.com), log in, and click **Add New → Project**.
3. Import your GitHub repo.
4. Framework preset: **Other** (or leave default).
5. Click **Deploy**.

### Option B — Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from inside the project folder
vercel
```

---

## 📱 How to use the site

- **Home:** Answer "Do you love me?" — the No button runs away when you hover! Clicking Yes shows a sweet message.
- **Memories:** Add photos, titles, and dates of your favorite moments.
- **Love Notes:** Write little notes for each other.
- **Date Nights:** Plan upcoming dates with time & location.
- **Playlist:** Add songs that remind you of each other with links to Spotify/YouTube.

All data is stored in your Supabase database, so it stays saved even if you close the browser.

---

## 🎨 Customizing

- **Start date:** In `js/app.js`, change `START_DATE` to when you two started dating.
- **Colors:** Edit `css/style.css` (look at the `:root` variables at the top).
- **Negative thoughts:** Edit the `negativeThoughts` array in `js/app.js`.

---

## 🔒 Privacy note

The default Supabase policies allow anyone with the link to read and write data. If you want user accounts/login, enable **Supabase Auth** and update the RLS policies in `supabase-schema.sql` to use `auth.uid()`.
