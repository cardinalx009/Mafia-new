export default function InventoryPage() {
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-5">
          <div className="text-sm font-semibold">Wallet</div>
          <div className="mt-3 grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <div>
              <span className="text-zinc-500">Coins:</span> 0
            </div>
            <div>
              <span className="text-zinc-500">Diamonds:</span> 0
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-5 md:col-span-2">
          <div className="text-sm font-semibold">Items</div>
          <div className="mt-3 rounded-lg border bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300">
            Hozircha itemlar yo‘q. Keyingi bosqichda shopdan sotib olingan
            funksiyalar shu yerda ko‘rinadi (masalan: “extra life”, “identity
            hide”, va h.k.).
          </div>
        </div>
      </div>
    </section>
  );
}

