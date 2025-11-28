// ...existing code...
function filterMembers() {
  const q = document.getElementById("q").value.trim().toLowerCase();
  const cards = document.querySelectorAll("#members .card");
  cards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const tags = card.dataset.tags.toLowerCase();
    const text = (card.innerText || "").toLowerCase();
    const matches =
      q === "" || name.includes(q) || tags.includes(q) || text.includes(q);
    card.style.display = matches ? "" : "none";
  });
}

function filterTag(tag) {
  const cards = document.querySelectorAll("#members .card");
  if (tag === "all") {
    cards.forEach((c) => (c.style.display = ""));
    document.getElementById("q").value = "";
    return;
  }
  cards.forEach((c) => {
    const tags = c.dataset.tags.split(",").map((s) => s.trim());
    c.style.display = tags.includes(tag) ? "" : "none";
  });
}

function openModal(e, btn) {
  // 親のカードを探す
  const card = btn.closest(".card");
  if (!card) return;
  const name = card.dataset.name;
  const role = card.querySelector(".role").innerText;
  const bio = card.querySelector(".bio").innerText;
  const tags = card.dataset.tags.split(",").map((s) => s.trim());

  document.getElementById("modalName").innerText = name;
  document.getElementById("modalRole").innerText = role;
  document.getElementById("modalBio").innerText = bio;
  const av = document.getElementById("modalAvatar");
  av.innerText = name.charAt(0);

  const tagsEl = document.getElementById("modalTags");
  tagsEl.innerHTML = "";
  tags.forEach((t) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.innerText = t;
    tagsEl.appendChild(span);
  });

  const backdrop = document.getElementById("modalBackdrop");
  backdrop.style.display = "flex";
  backdrop.setAttribute("aria-hidden", "false");

  // Escapeで閉じる
  document.addEventListener("keydown", escListener);
}
function escListener(e) {
  if (e.key === "Escape") closeModal();
}
function closeModal() {
  const backdrop = document.getElementById("modalBackdrop");
  backdrop.style.display = "none";
  backdrop.setAttribute("aria-hidden", "true");
  document.removeEventListener("keydown", escListener);
}

// アクセシビリティ: カードをEnterで開く
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#members .card").forEach((card) => {
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") card.querySelector("button")?.click();
    });
  });
});
// ...existing code...
