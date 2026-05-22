## Railway deploy (Mafia Web)

### 1) Repo ulash
- Railway → New Project → Deploy from GitHub
- Repository: `cardinalx009/Mafia-new`
- Root directory: repo `mafia-web` bo‘lsa o‘zi topadi; bo‘lmasa Settings → Root Directory = `mafia-web`

### 2) Build/Start
- Build: `npm run build`
- Start: `npm run start`
- Railway odatda `PORT` beradi, Next.js `next start` shu portni o‘zi oladi

### 3) Environment variables (Required)
- `NEXTAUTH_URL` = Railway domeningiz (masalan: `https://mafia-new-production.up.railway.app`)
- `NEXTAUTH_SECRET` = uzun random string (kamida 32+ belgi)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `DATABASE_URL`
  - Hozirgi Prisma `sqlite` ishlatyapti (dev uchun `file:./dev.db`)
  - Production’da SQLite persistent bo‘lmasligi mumkin, shuning uchun keyingi bosqichda Postgres’ga o‘tamiz

### 4) Google OAuth (Muhim)
- Google Cloud Console → OAuth Client → Authorized redirect URIs:
  - `https://<railway-domain>/api/auth/callback/google`
- Authorized JavaScript origins:
  - `https://<railway-domain>`

### 5) Prisma / DB
- Hozir MVP: SQLite (tez test uchun)
- Tavsiya: Railway Postgres qo‘shib, keyin Prisma provider’ni `postgresql`ga ko‘chirish

### 6) Socket.IO
- Matchmaking/chat `Socket.IO` orqali ishlaydi
- Railway’da odatda websocket ishlaydi; agar proxy/timeout bo‘lsa, keyingi bosqichda Redis + persistent state qilinadi

### 7) Tekshiruv
- Deploy bo‘lgach:
  - `/uz/play` ochiladi
  - Play → Find Match (2 ta tab ochib tekshirish)
  - Lobby chat real-time ishlashi kerak
