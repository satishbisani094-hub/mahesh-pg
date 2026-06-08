export const CONTACT_WHATSAPP = "919700053541";
export const CONTACT_PHONE_DISPLAY = "+91 97000 53541";
export const OWNER_EMAIL = "msrdy@7gmail.com";

export function buildBookingMessage({ name, phone, visitDate, roomType }) {
  return [
    "🏠 *New Visit Booking – Jaya Co Living*",
    "",
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*Visit:* ${visitDate}`,
    `*Room Type:* ${roomType}`,
  ].join("\n");
}

/** Optional: email alert via Web3Forms (free key at https://web3forms.com – takes ~1 min). */
export async function sendBookingEmail({ name, phone, visitDate, roomType, message }) {
  const accessKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "").trim();
  if (!accessKey) return false;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New Visit Booking – Jaya Co Living",
        from_name: name,
        phone,
        visit_date: visitDate,
        room_type: roomType,
        message,
      }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

/** Opens WhatsApp to your number with booking details pre-filled (visitor taps Send). */
export function openBookingWhatsApp(message) {
  const url = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(message)}`;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export async function submitBooking({ name, phone, visitDate, roomType }) {
  const message = buildBookingMessage({ name, phone, visitDate, roomType });
  const emailSent = await sendBookingEmail({ name, phone, visitDate, roomType, message });
  openBookingWhatsApp(message);
  return { emailSent, message };
}
