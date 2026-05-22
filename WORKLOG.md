## 2026-05-22

### Qilingan ishlar
- Repo holati o‘rganildi: Next.js (App Router) + Tailwind + NextAuth + Prisma + Socket.IO
- Matchmaking/room state xatosi tuzatildi: endi har socket o‘z player profili bilan xonaga qo‘shiladi, disconnect bo‘lsa xonadan o‘chadi
- Lobby player list’ga real avatar chiqarish qo‘shildi (Google profili)
- Next Image remotePatterns yangilandi (Google avatarlar uchun)
- Git ignore: local dev.db endi commit bo‘lmaydi

### Fayllar
- API socket: src/pages/api/socket.ts
- Lobby UI: src/app/[locale]/(app)/lobby/[roomCode]/lobby-client.tsx
- Next config: next.config.ts
- Ignore: .gitignore

### Keyingi qadam (reja)
- Dizayn sistemasi (ranglar/komponentlar) va Play/Lobby UI’ni “qaytib kirgisi keladigan” ko‘rinishga olib kelish
- Game loop: day/night, voting, role actions (player count’ga mos rollar)
- Economy: coin (match + daily + sotib olish) va diamond paketlar (Stripe)
