# Mafia-new

# Mafia Web (prototype)

Web versiya uchun boshlang‘ich platforma:

- Next.js (App Router) + Tailwind
- Google login (NextAuth)
- Regionga qarab avtomatik til: `uz` / `ru` / `en` (Accept-Language)
- Play → matchmaking / private room (Socket.IO, in-memory MVP)
- Lobby → o‘yinchilar ro‘yxati + chat
- Profil / Inventar / Shop / Qoidalar / Sozlamalar sahifalari (skelet)

## Ishga tushirish (dev)

1) `.env.example` ni nusxalab `.env.local` qiling va qiymatlarni to‘ldiring:

```bash
copy .env.example .env.local
```

2) DB migrate + Prisma generate (SQLite):

```bash
npx prisma migrate dev
npx prisma generate
```

3) Dev server:

```bash
npm run dev
```

So‘ng brauzerda: http://localhost:3000

## Prod uchun eslatma

Socket state (matchmaking/rooms) hozircha RAM’da. Production’da Redis + DB bilan qilish kerak.
