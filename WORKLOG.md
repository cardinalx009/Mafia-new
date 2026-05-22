## 2026-05-22

### Qilingan ishlar
- Repo holati o‘rganildi: Next.js (App Router) + Tailwind + NextAuth + Prisma + Socket.IO
- Matchmaking/room state xatosi tuzatildi: endi har socket o‘z player profili bilan xonaga qo‘shiladi, disconnect bo‘lsa xonadan o‘chadi
- Lobby player list’ga real avatar chiqarish qo‘shildi (Google profili)
- Next Image remotePatterns yangilandi (Google avatarlar uchun)
- Git ignore: local dev.db endi commit bo‘lmaydi
- GitHub push muammolari (user.name/user.email, SSH key) bo‘yicha yo‘l-yo‘riq berildi va SSH public key yaratildi
- Railway build’dagi TypeScript xato tuzatildi: next-intl request locale undefined bo‘lishi mumkinligi uchun guard qo‘shildi
- Railway build’dagi TypeScript xato tuzatildi: NextApiResponse socket type’da null bo‘lishi mumkinligi uchun NonNullable bilan type guard qo‘shildi
- Railway build’dagi TypeScript xato tuzatildi: NextApiResponse socket type’da `server` typing yo‘qligi uchun socket type soddalashtirildi
- Railway build’dagi TypeScript xato tuzatildi: Socket.IO server constructor overload’i uchun real `res.socket.server` instance’ga `as any` orqali ulash qilindi
- Railway build’dagi Prisma xato tuzatildi: production install’da Prisma Client generate bo‘lmagani uchun build’dan oldin `prisma generate` ishga tushirildi (postinstall + build script)
- Railway build’da Prisma engine xato tuzatildi: Prisma Client `engineType` aniq `binary` qilib belgilandi, app layout esa build paytida DB/auth yiqilmasligi uchun dynamic qilindi
- Railway build’da Prisma engine xato uchun Node versiya pin qilindi: Prisma binary engine mosligi uchun `package.json`ga `engines.node = 20.x` qo‘shildi
- Railway build’da Prisma constructor xato tuzatildi: env (`DATABASE_URL`) yo‘q paytda PrismaClient umuman yaratilmaydi (lazy init), NextAuth esa vaqtincha `jwt` session strategy bilan build’dan o‘tadi

### Fayllar
- API socket: src/pages/api/socket.ts
- Lobby UI: src/app/[locale]/(app)/lobby/[roomCode]/lobby-client.tsx
- Next config: next.config.ts
- Ignore: .gitignore
- i18n config: src/i18n/request.ts
- Prisma schema: prisma/schema.prisma
- App layout: src/app/[locale]/(app)/layout.tsx
- Prisma client init: src/server/db.ts
- NextAuth config: src/server/auth.ts

### Keyingi qadam (reja)
- Dizayn sistemasi (ranglar/komponentlar) va Play/Lobby UI’ni “qaytib kirgisi keladigan” ko‘rinishga olib kelish
- Game loop: day/night, voting, role actions (player count’ga mos rollar)
- Economy: coin (match + daily + sotib olish) va diamond paketlar (Stripe)
