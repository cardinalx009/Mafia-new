export default function RulesPage() {
  return (
    <section className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>Mafia qoidalari (classic)</h1>

      <h2>Rollar</h2>
      <ul>
        <li>
          <strong>Mafia</strong> — tun payti bitta o‘yinchini “o‘ldirish” uchun
          ovoz beradi.
        </li>
        <li>
          <strong>Doctor</strong> — tun payti bitta o‘yinchini “davolaydi”
          (o‘ldirilishdan saqlaydi).
        </li>
        <li>
          <strong>Detective</strong> — tun payti bitta o‘yinchining mafiyaligini
          tekshiradi.
        </li>
        <li>
          <strong>Citizen</strong> — maxsus qobiliyat yo‘q, kunduzgi ovoz
          berishda faol qatnashadi.
        </li>
      </ul>

      <h2>O‘yin bosqichlari</h2>
      <ol>
        <li>
          <strong>Tun</strong>: Mafia tanlaydi, Doctor davolaydi, Detective
          tekshiradi.
        </li>
        <li>
          <strong>Kun</strong>: natija e’lon qilinadi (kim chiqdi/saqlandi),
          chatda muhokama bo‘ladi.
        </li>
        <li>
          <strong>Ovoz berish</strong>: o‘yinchilar bitta odamni chiqazishga
          ovoz beradi (ko‘pchilik ovoz).
        </li>
      </ol>

      <h2>G‘alaba shartlari</h2>
      <ul>
        <li>
          <strong>City</strong> (Doctor/Detective/Citizens) — barcha mafiyalar
          topilib chiqarilsa.
        </li>
        <li>
          <strong>Mafia</strong> — mafiyalar soni oddiy o‘yinchilar soniga teng
          yoki ko‘p bo‘lib qolsa.
        </li>
      </ul>

      <h2>Kengaytma (keyin)</h2>
      <p>
        Keyingi versiyalarda qo‘shimcha rollar (Bodyguard, Jester va h.k.) va
        inventar itemlari bilan balanslangan rejimlar qo‘shiladi.
      </p>
    </section>
  );
}

