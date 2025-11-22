// ============================================================
//   Logger – Premium VTC IDF
// ============================================================

export const log = (...msg) => {
  console.log("📘 LOG:", ...msg);
};

export const warn = (...msg) => {
  console.warn("⚠️ WARNING:", ...msg);
};

export const error = (...msg) => {
  console.error("❌ ERROR:", ...msg);
};
