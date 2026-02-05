// shared/config.js
(() => {
  // If index.html already defined window.BIZ (the normal case), keep it.
  // If not, create it.
  const BIZ = (window.BIZ && typeof window.BIZ === "object") ? window.BIZ : {};
  window.BIZ = BIZ;

  // Default tier if nothing else provided
  if (!BIZ.tier) BIZ.tier = "starter";

  const normalizeTier = (t) => {
    t = (t || "").toString().trim().toLowerCase();
    return (t === "starter" || t === "pro" || t === "elite") ? t : null;
  };

  const pickTierFromUrl = () => {
    // Preferred: ?tier=elite
    const qsTier = normalizeTier(new URLSearchParams(window.location.search).get("tier"));

    // Hash support: #tier=elite or #?tier=elite
    const rawHash = (window.location.hash || "").replace(/^#/, "");
    const hashQuery = rawHash.startsWith("?") ? rawHash.slice(1) : rawHash;
    const hashTier = normalizeTier(new URLSearchParams(hashQuery).get("tier"));

    const tier = qsTier || hashTier;
    if (tier) BIZ.tier = tier;
  };

  pickTierFromUrl();
  window.addEventListener("hashchange", pickTierFromUrl);
})();
