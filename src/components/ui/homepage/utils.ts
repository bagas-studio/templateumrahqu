/**
 * Helper murni (tanpa dependency) yang dipakai bersama oleh komponen homepage.
 */

/** Ubah nomor telepon Indonesia jadi format wa.me (62xxxx). */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

/** Bangun URL wa.me lengkap dengan pesan otomatis (sudah ter-encode). */
export function buildWhatsAppUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${normalizePhone(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Format tanggal ISO ke locale Indonesia, mis. "1 Agu 2026". */
export function formatDateID(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Ambil maksimal 2 huruf inisial dari nama untuk avatar fallback. */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}
