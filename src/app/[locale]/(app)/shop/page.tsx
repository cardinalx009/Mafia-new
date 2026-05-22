const demoItems = [
  {
    name: "Extra life",
    description: "Bir marta o‘limdan qutulish (faqat ayrim rejimlarda).",
    price: 500,
    currency: "coins",
  },
  {
    name: "Identity hide",
    description: "Ovoz berishda ismingizni vaqtincha yashirish.",
    price: 25,
    currency: "diamonds",
  },
];

export default function ShopPage() {
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {demoItems.map((it) => (
          <div key={it.name} className="rounded-xl border p-5">
            <div className="text-sm font-semibold">{it.name}</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {it.description}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm font-semibold">
                {it.price} {it.currency}
              </div>
              <button
                disabled
                className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white opacity-60"
              >
                Buy (soon)
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-zinc-500">
        To‘lovlar “keyinroq” deganingiz uchun hozircha shop demo ko‘rinishda.
        Keyingi bosqichda coin/diamond balans, purchase, va inventarga qo‘shish
        ishlari ulanadi.
      </div>
    </section>
  );
}

