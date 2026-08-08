document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("product-form"); const list = document.getElementById("admin-products"); const message = document.getElementById("admin-message"); const cancel = document.getElementById("cancel-edit");
  let editingId = null;

  async function loadProducts() {
    const response = await fetch("/api/products");
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    list.innerHTML = result.data.map(p => `<div class="admin-product"><div><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.category)} · Rp${p.price.toLocaleString("id-ID")} · Stok ${p.stock}</small></div><div class="form-actions"><button class="btn btn--small" data-edit="${p.id}">Edit</button><button class="btn btn--danger btn--small" data-delete="${p.id}">Hapus</button></div></div>`).join("") || "Belum ada produk.";
    list.querySelectorAll("[data-edit]").forEach(btn => btn.addEventListener("click", () => startEdit(Number(btn.dataset.edit))));
    list.querySelectorAll("[data-delete]").forEach(btn => btn.addEventListener("click", () => deleteProduct(Number(btn.dataset.delete))));
  }

  async function startEdit(id) {
    const response = await fetch(`/api/products/${id}`); const result = await response.json(); if (!response.ok) return show(result.message);
    const p = result.data; editingId = p.id; document.getElementById("product-id").value = p.id; document.getElementById("name").value = p.name; document.getElementById("category").value = p.category; document.getElementById("price").value = p.price; document.getElementById("stock").value = p.stock; document.getElementById("unit").value = p.unit; document.getElementById("description").value = p.description; document.getElementById("form-title").textContent = "Edit Produk"; cancel.hidden = false; window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteProduct(id) {
    if (!confirm("Hapus produk ini?")) return;
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" }); const result = await response.json(); show(result.message); if (response.ok) loadProducts();
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const payload = { name: document.getElementById("name").value.trim(), category: document.getElementById("category").value.trim(), price: Number(document.getElementById("price").value), stock: Number(document.getElementById("stock").value), unit: document.getElementById("unit").value.trim(), description: document.getElementById("description").value.trim() };
    if (!payload.name || !payload.category || !Number.isFinite(payload.price) || payload.price < 0 || !Number.isInteger(payload.stock) || payload.stock < 0) return show("Periksa input produk terlebih dahulu.");
    const method = editingId ? "PUT" : "POST"; const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const result = await response.json(); show(result.message);
    if (response.ok) { resetForm(); loadProducts(); }
  });

  cancel.addEventListener("click", resetForm);
  document.getElementById("logout-btn").addEventListener("click", async () => { await fetch("/api/logout", { method: "POST" }); window.location.href = "/login"; });
  function resetForm() { editingId = null; form.reset(); document.getElementById("unit").value = "pcs"; document.getElementById("form-title").textContent = "Tambah Produk"; cancel.hidden = true; }
  function show(text) { message.textContent = text; }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c])); }
  loadProducts().catch(e => show(e.message));
});
