import { useState, useEffect, useRef } from "react";
import singleSharingImg from "./single_sharing.png";
import doubleSharingImg from "./double_sharing.jpg";
import facadeImg from "./gallery_facade.jpg";
import doubleSharingRoomImg from "./gallery_double.jpg";
import singleSharingRoomImg from "./gallery_single.jpg";
import diningImg from "./gallery_dining.jpg";

const COLORS = {
  navy: "#0B1F3A",
  blue: "#1A56DB",
  blueLight: "#3B82F6",
  orange: "#F97316",
  orangeLight: "#FB923C",
  white: "#FFFFFF",
  offWhite: "#F8FAFF",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray400: "#9CA3AF",
  gray600: "#4B5563",
  gray800: "#1F2937",
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(32px)", down: "translateY(-32px)", left: "translateX(-32px)", right: "translateX(32px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transforms[direction],
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>{children}</div>
  );
};

const NAV_LINKS = ["Home", "About", "Rooms", "Gallery", "Amenities", "Pricing", "Location", "Contact", "FAQ"];

const ROOMS = [
  { type: "Single Sharing", emoji: "🛏️", price: 19000, features: ["Private Space", "Study Table with Chair", "2 Wardrobe", "TV"], color: "#EFF6FF", accent: "#1A56DB", img: singleSharingImg },
  { type: "Double Sharing", emoji: "🛏️🛏️", price: 11000, features: ["Shared Room", "Study Table with Chair", "2 Wardrobes", "TV"], color: "#FFF7ED", accent: "#F97316", img: doubleSharingImg, popular: true },
  { type: "Triple Sharing", emoji: "🛏️🛏️🛏️", price: 8000, features: ["Shared Room", "Study Table with Chair", "3 wardrobe", "TV"], color: "#F0FDF4", accent: "#16A34A", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80" },
];

const GALLERY_IMAGES = [
  { img: facadeImg, caption: "Building Exterior", desc: "Jaya Co-Living building facade with premium night illumination" },
  { img: doubleSharingRoomImg, caption: "Double Sharing Room", desc: "Spacious double sharing room layout with individual wardrobes and study desks" },
  { img: singleSharingRoomImg, caption: "Single Sharing Room", desc: "Comfortable single sharing room with premium bedding and modern amenities" },
  { img: diningImg, caption: "Dining & Lounge Area", desc: "Spacious and hygienic dining hall and recreation area" },
];

const AMENITIES = [
  { icon: "📶", label: "Free Wi-Fi", desc: "High-speed internet 24/7" },
  { icon: "📺", label: "TV Entertainment", desc: "Enjoy your favorite shows" },
  { icon: "🧹", label: "Housekeeping", desc: "Daily cleaning service" },
  { icon: "📷", label: "CCTV Security", desc: "24/7 surveillance" },
  { icon: "⚡", label: "Power Backup", desc: "Uninterrupted electricity" },
  { icon: "👕", label: "Laundry", desc: "Wash & fold service" },
  { icon: "🍽️", label: "Healthy Food", desc: "Home-cooked meals" },
  { icon: "🏍️", label: "Parking", desc: "Secure vehicle parking" },
];

const PRICING = [
  { plan: "Basic", price: 8000, type: "Triple Sharing", features: ["Shared Room", "Free Wi-Fi", "CCTV Security", "Power Backup", "Common Washroom"], popular: false },
  { plan: "Standard", price: 11000, type: "Double Sharing", features: ["Shared Room", "Free Wi-Fi", "CCTV Security", "Power Backup", "Attached Washroom", "Housekeeping"], popular: true },
  { plan: "Premium", price: 19000, type: "Single Sharing", features: ["Private Room", "Free Wi-Fi", "CCTV Security", "Power Backup", "Private Washroom", "Housekeeping"], popular: false },
];


const FAQS = [
  { q: "What documents are required for admission?", a: "You need a valid government ID (Aadhaar/Passport), recent photograph, address proof, and an emergency contact number. Students should also carry their college ID." },
  { q: "Is food included in the rent?", a: "Food is optional and can be added as an add-on for ₹2,500/month. We provide nutritious home-cooked breakfast, lunch, and dinner. Vegetarian and non-vegetarian options available." },
  { q: "What are the visiting hours?", a: "Guests can visit between 9 AM to 8 PM. For security reasons, overnight guests are not permitted. Residents can return until 11 PM on weekdays and midnight on weekends." },
  { q: "Is there a security deposit?", a: "Yes, a refundable security deposit of 2 months' rent is required at the time of admission. It is fully refunded within 15 days of vacating, subject to no damage." },
  { q: "How is the internet speed?", a: "We offer 100 Mbps fiber-optic broadband shared across the property. Each resident gets dedicated bandwidth ensuring smooth streaming and work-from-home capability." },
  { q: "Can I book a room before visiting?", a: "Yes! You can book a room online by paying a token advance of ₹1,000. This holds your room for up to 7 days. We also offer free virtual tours via video call." },
];

const NEARBY = [
  { name: "Osmania University", type: "🎓 University", dist: "1.2 km" },
  { name: "Whitefield Tech Park", type: "💼 IT Hub", dist: "1.2 km" },
  { name: "Outer Ring Road", type: "🚗 Main Highway", dist: "0.5 km" },
  { name: "Manipal Hospital", type: "🏥 Hospital", dist: "2.1 km" },
  { name: "MG Road Metro", type: "🚇 Metro Station", dist: "2.8 km" },
  { name: "Brigade Gateway", type: "🛍️ Shopping Mall", dist: "1.5 km" },
  { name: "Bangalore Airport", type: "✈️ Airport", dist: "38 km" },
];

export default function StayNest() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [bookingData, setBookingData] = useState({ fullName: "", phone: "", date: "", time: "", roomType: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bookSubmitted, setBookSubmitted] = useState(false);
  const whatsappNumber = "919700053541"; // Contact number from footer

  const HERO_SLIDES = [
    { bg: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=80", caption: "Modern Rooms" },
    { bg: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80", caption: "Comfortable Living" },
    { bg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80", caption: "Homely Vibes" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(s => (s + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const bg = dark ? "#0F172A" : COLORS.offWhite;
  const text = dark ? "#F1F5F9" : COLORS.navy;
  const cardBg = dark ? "#1E293B" : COLORS.white;
  const borderC = dark ? "#334155" : COLORS.gray200;
  const mutedText = dark ? "#94A3B8" : COLORS.gray600;

  const filteredRooms = ROOMS.filter(r =>
    !searchQuery || r.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleFormChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleBookingChange = (e) => setBookingData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleConfirmVisit = () => {
    if (!bookingData.fullName || !bookingData.phone || !bookingData.date || !bookingData.time || !bookingData.roomType) {
      alert("Please fill in all fields!");
      return;
    }
    
    const message = `*Booking Enquiry - Jaya Co Living*\n\n📝 *Details:*\n👤 Name: ${bookingData.fullName}\n📞 Phone: ${bookingData.phone}\n📅 Date: ${bookingData.date}\n🕐 Time: ${bookingData.time}\n🏠 Room Type: ${bookingData.roomType}\n\nPlease confirm the booking.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    setBookSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 800);
  };

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Nunito', 'Segoe UI', sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? (dark ? "rgba(15,23,42,0.97)" : "rgba(255,255,255,0.97)") : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.12)" : "none",
        transition: "all 0.3s",
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 70,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.orange})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏠</div>
          <span style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Playfair Display', serif", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Jaya Co Living</span>
        </div>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {["Home", "Rooms", "Gallery", "Amenities", "Pricing", "Contact"].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none", cursor: "pointer", color: scrolled ? text : "#fff",
              fontWeight: 600, fontSize: 14, padding: "6px 12px", borderRadius: 8,
              transition: "all 0.2s",
            }}>{l}</button>
          ))}
          <button onClick={() => setEnquiryOpen(true)} style={{
            background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
            border: "none", color: "#fff", fontWeight: 700, padding: "8px 20px", borderRadius: 20, cursor: "pointer", fontSize: 14,
          }}>Enquire Now</button>
          <button onClick={() => setDark(d => !d)} style={{ background: "none", border: `1.5px solid ${borderC}`, borderRadius: 20, padding: "6px 12px", cursor: "pointer", fontSize: 16, color: text }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <button onClick={() => setMenuOpen(m => !m)} style={{ display: "none", background: "none", border: "none", fontSize: 26, cursor: "pointer", color: scrolled ? text : "#fff" }} className="mobile-menu-btn">☰</button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: 70, left: 0, right: 0, background: dark ? "#0F172A" : "#fff", zIndex: 99, padding: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "12px 0", fontSize: 16, fontWeight: 600, color: text, cursor: "pointer", borderBottom: `1px solid ${borderC}` }}>{l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {HERO_SLIDES.map((slide, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${slide.bg})`, backgroundSize: "cover", backgroundPosition: "center",
            opacity: i === activeSlide ? 1 : 0, transition: "opacity 1s ease",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,31,58,0.82) 0%, rgba(11,31,58,0.5) 60%, rgba(26,86,219,0.3) 100%)" }} />
          </div>
        ))}
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 5%", paddingTop: 70 }}>
          <div style={{ animation: "fadeUp 1s ease forwards", opacity: 0 }}>
            <span style={{ background: `${COLORS.orange}22`, border: `1.5px solid ${COLORS.orange}`, color: COLORS.orange, borderRadius: 30, padding: "6px 18px", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>🏆 #1 Rated PG in Bangalore</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", color: "#fff", margin: "20px 0 16px", lineHeight: 1.15, fontWeight: 900 }}>
              Find Your Perfect Stay<br /><span style={{ color: COLORS.orange }}>Away From Home</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 580, margin: "0 auto 32px" }}>
              Affordable, Safe & Comfortable PG Accommodation for Students & Working Professionals
            </p>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
            <button onClick={() => scrollTo("rooms")} style={{ background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueLight})`, border: "none", color: "#fff", padding: "14px 32px", borderRadius: 30, fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 8px 24px ${COLORS.blue}55` }}>
              📅 Book Now
            </button>
            <button onClick={() => scrollTo("contact")} style={{ background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", padding: "14px 32px", borderRadius: 30, fontWeight: 700, fontSize: 15, cursor: "pointer", backdropFilter: "blur(8px)" }}>
              📞 Contact Us
            </button>
          </div>

          {/* Search bar */}
          <div style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 50, padding: "8px 8px 8px 24px", display: "flex", alignItems: "center", gap: 12, maxWidth: 480, width: "90%" }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); scrollTo("rooms"); }} placeholder="Search rooms (single, double, AC...)" style={{ background: "none", border: "none", outline: "none", color: "#fff", fontSize: 14, flex: 1, fontFamily: "inherit" }} />
            <button onClick={() => scrollTo("rooms")} style={{ background: COLORS.orange, border: "none", color: "#fff", padding: "10px 20px", borderRadius: 40, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Search</button>
          </div>

          {/* Slide dots */}
          <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setActiveSlide(i)} style={{ width: i === activeSlide ? 24 : 8, height: 8, borderRadius: 4, background: i === activeSlide ? COLORS.orange : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.2)", display: "flex", justifyContent: "center", gap: "clamp(20px, 6vw, 80px)", padding: "16px 5%" }}>
          {[["50+", "Happy Residents"], ["4.9★", "Average Rating"], ["5+", "Years Experience"], ["24/7", "Support"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ color: COLORS.orange, fontWeight: 900, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontFamily: "'Playfair Display', serif" }}>{num}</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(10px, 1.5vw, 13px)", fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "90px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <FadeIn direction="left">
            <div style={{ position: "relative" }}>
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Jaya Co Living building" style={{ width: "100%", borderRadius: 20, objectFit: "cover", height: 400 }} />
              <div style={{ position: "absolute", bottom: -20, right: -20, background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`, borderRadius: 16, padding: "20px 24px", boxShadow: "0 8px 32px rgba(249,115,22,0.4)" }}>
                <div style={{ color: "#fff", fontSize: 28, fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>50+</div>
                <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 600 }}>Happy Residents</div>
              </div>
              <div style={{ position: "absolute", top: -16, left: -16, background: cardBg, border: `2px solid ${COLORS.blue}`, borderRadius: 16, padding: "12px 18px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                <div style={{ color: COLORS.blue, fontSize: 22, fontWeight: 900 }}>4.9 ⭐</div>
                <div style={{ color: mutedText, fontSize: 12 }}>Google Rating</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <div>
              <span style={{ color: COLORS.orange, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>About Jaya Co Living</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", margin: "12px 0 20px", lineHeight: 1.2 }}>Your Home Away<br />From <span style={{ color: COLORS.blue }}>Home</span></h2>
              <p style={{ color: mutedText, lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
                Jaya Co Living was founded with a simple mission: to provide a safe, comfortable, and affordable living space for students and working professionals. With over 2+ years of excellence, we've become Bangalore's most trusted PG accommodation.
              </p>
              <p style={{ color: mutedText, lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
                We believe that where you live shapes who you become. That's why we go beyond just providing a roof — we foster a community of growth, safety, and warmth.
              </p>
              {[
                ["🛡️", "Safety First", "24/7 CCTV & security personnel"],
                ["🏡", "Home Comfort", "Fully furnished rooms with all amenities"],
                ["💰", "Best Value", "Transparent pricing, no hidden charges"],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `${COLORS.blue}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{title}</div>
                    <div style={{ color: mutedText, fontSize: 13 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ROOMS GALLERY */}
      <section id="rooms" style={{ padding: "90px 5%", background: dark ? "#0F172A" : COLORS.gray50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 54 }}>
              <span style={{ color: COLORS.orange, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>Room Gallery</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", margin: "12px 0 14px" }}>Choose Your <span style={{ color: COLORS.blue }}>Perfect Room</span></h2>
              <p style={{ color: mutedText, maxWidth: 500, margin: "0 auto", fontSize: 15 }}>Spacious, well-ventilated rooms designed for comfort and productivity</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {(filteredRooms.length > 0 ? filteredRooms : ROOMS).map((room, i) => (
              <FadeIn key={room.type} delay={i * 120}>
                <div style={{ background: cardBg, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `1.5px solid ${room.popular ? COLORS.orange : borderC}`, position: "relative", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; }}>
                  {room.popular && <div style={{ position: "absolute", top: 14, right: 14, zIndex: 3, background: COLORS.orange, color: "#fff", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>⭐ Most Popular</div>}
                  <div style={{ position: "relative", height: 220 }}>
                    <img src={room.img} alt={room.type} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)" }} />
                    <div style={{ position: "absolute", bottom: 14, left: 16, color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700 }}>{room.type}</div>
                  </div>
                  <div style={{ padding: "20px 22px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <div>
                        <span style={{ fontSize: 26, fontWeight: 900, color: room.accent, fontFamily: "'Playfair Display', serif" }}>₹{room.price.toLocaleString()}</span>
                        <span style={{ color: mutedText, fontSize: 13 }}> /month</span>
                      </div>
                      <div style={{ background: `${room.accent}18`, color: room.accent, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>Available</div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                      {room.features.map(f => (
                        <span key={f} style={{ background: dark ? "#1E293B" : COLORS.gray100, color: mutedText, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>✓ {f}</span>
                      ))}
                    </div>
                    <button onClick={() => setBookOpen(true)} style={{ width: "100%", background: room.popular ? `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})` : `${room.accent}15`, border: `1.5px solid ${room.accent}`, color: room.popular ? "#fff" : room.accent, padding: "11px 0", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>
                      Book This Room →
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "90px 5%", background: dark ? "#1E293B" : COLORS.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 54 }}>
              <span style={{ color: COLORS.orange, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>Photo Gallery</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", margin: "12px 0 14px" }}>Experience <span style={{ color: COLORS.blue }}>Jaya Co-Living</span></h2>
              <p style={{ color: mutedText, maxWidth: 500, margin: "0 auto", fontSize: 15 }}>A sneak peek into our luxury space, comfortable rooms, and clean dining areas</p>
            </div>
          </FadeIn>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            {GALLERY_IMAGES.map((imgItem, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{
                  background: cardBg,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  border: `1.5px solid ${borderC}`,
                  transition: "transform 0.3s, box-shadow 0.3s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                }}>
                  <div style={{ height: 240, overflow: "hidden", position: "relative" }}>
                    <img src={imgItem.img} alt={imgItem.caption} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} 
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    <h4 style={{ fontWeight: 800, fontSize: 16, marginBottom: 6, color: text }}>{imgItem.caption}</h4>
                    <p style={{ color: mutedText, fontSize: 13, lineHeight: 1.5 }}>{imgItem.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" style={{ padding: "90px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 54 }}>
              <span style={{ color: COLORS.orange, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>World-Class Amenities</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", margin: "12px 0 14px" }}>Everything You <span style={{ color: COLORS.blue }}>Need</span></h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {AMENITIES.map((a, i) => (
              <FadeIn key={a.label} delay={i * 80}>
                <div style={{ background: cardBg, border: `1.5px solid ${borderC}`, borderRadius: 18, padding: "28px 22px", textAlign: "center", transition: "all 0.3s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.blue; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${COLORS.blue}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = borderC; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 38, marginBottom: 12 }}>{a.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 6 }}>{a.label}</div>
                  <div style={{ color: mutedText, fontSize: 13 }}>{a.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "90px 5%", background: dark ? "#0F172A" : COLORS.gray50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 54 }}>
              <span style={{ color: COLORS.orange, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>Pricing Plans</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", margin: "12px 0 14px" }}>Simple, <span style={{ color: COLORS.blue }}>Transparent</span> Pricing</h2>
              <p style={{ color: mutedText, maxWidth: 480, margin: "0 auto", fontSize: 15 }}>No hidden fees. Pick the plan that fits your lifestyle and budget.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24, alignItems: "start" }}>
            {PRICING.map((p, i) => (
              <FadeIn key={p.plan} delay={i * 120}>
                <div style={{
                  background: p.popular ? `linear-gradient(135deg, ${COLORS.blue}, #1D4ED8)` : cardBg,
                  borderRadius: 22, padding: "34px 28px",
                  border: p.popular ? "none" : `1.5px solid ${borderC}`,
                  boxShadow: p.popular ? `0 20px 60px ${COLORS.blue}44` : "0 4px 20px rgba(0,0,0,0.06)",
                  position: "relative", transform: p.popular ? "scale(1.04)" : "none",
                }}>
                  {p.popular && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: COLORS.orange, color: "#fff", borderRadius: 20, padding: "5px 20px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>⭐ Most Popular</div>}
                  <div style={{ color: p.popular ? "rgba(255,255,255,0.7)" : COLORS.orange, fontWeight: 700, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{p.type}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: p.popular ? "#fff" : text, marginBottom: 4 }}>{p.plan}</div>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 38, fontWeight: 900, color: p.popular ? "#fff" : COLORS.blue, fontFamily: "'Playfair Display', serif" }}>₹{p.price.toLocaleString()}</span>
                    <span style={{ color: p.popular ? "rgba(255,255,255,0.65)" : mutedText, fontSize: 14 }}>/month</span>
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${p.popular ? "rgba(255,255,255,0.12)" : borderC}`, fontSize: 14, color: p.popular ? "rgba(255,255,255,0.9)" : text }}>
                        <span style={{ color: p.popular ? COLORS.orangeLight : COLORS.blue, fontWeight: 700 }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => scrollTo("rooms")} style={{
                    width: "100%",
                    background: p.popular ? `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})` : `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueLight})`,
                    border: "none", color: "#fff", padding: "13px 0", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer",
                    boxShadow: p.popular ? `0 6px 20px ${COLORS.orange}55` : `0 6px 20px ${COLORS.blue}44`,
                  }}>Book Now →</button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" style={{ padding: "90px 5%", background: dark ? "#0F172A" : COLORS.gray50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 54 }}>
              <span style={{ color: COLORS.orange, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>Our Location</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", margin: "12px 0 14px" }}>Perfectly <span style={{ color: COLORS.blue }}>Located</span></h2>
              <p style={{ color: mutedText }}>Near top colleges, IT hubs, hospitals & metro stations in Bangalore</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, alignItems: "start" }}>
            <FadeIn direction="left">
              <div style={{ background: cardBg, borderRadius: 20, overflow: "hidden", border: `1.5px solid ${borderC}` }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124262.50326685715!2d77.54745441562501!3d13.193843000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf00ef62e9af627a0!2sWhitefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1698000000000!5m2!1sen!2sin"
                  width="100%" height="320" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" title="Jaya Co Living Location"
                />
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>📍 Jaya Co Living</div>
                  <div style={{ color: mutedText, fontSize: 13 }}>Whitefield, Bangalore, Karnataka 560066</div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {NEARBY.map(n => (
                  <div key={n.name} style={{ background: cardBg, border: `1.5px solid ${borderC}`, borderRadius: 14, padding: "16px 18px", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.blue; e.currentTarget.style.boxShadow = `0 4px 16px ${COLORS.blue}20`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = borderC; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ fontSize: 11, color: mutedText, marginBottom: 4 }}>{n.type}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{n.name}</div>
                    <div style={{ color: COLORS.blue, fontSize: 12, fontWeight: 700 }}>{n.dist} away</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "90px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 54 }}>
              <span style={{ color: COLORS.orange, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>Contact Us</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", margin: "12px 0 14px" }}>Let's Get You <span style={{ color: COLORS.blue }}>Settled</span></h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <FadeIn direction="left">
              <div>
                {[["📞", "Call Us", "+91 97000 53541", "tel:+919700053541"],
                  ["📧", "Email Us", "msrdy@7gmail.com", "mailto:msrdy@7gmail.com"],
                  ["💬", "WhatsApp", "+91 97000 53541", "https://wa.me/919700053541"],
                  ["📍", "Visit Us", "Whitefield, Bangalore", null]
                ].map(([icon, label, val, href]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", background: cardBg, border: `1.5px solid ${borderC}`, borderRadius: 14, marginBottom: 14, cursor: href ? "pointer" : "default" }}
                    onClick={() => href && window.open(href, "_blank")}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${COLORS.blue}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ color: mutedText, fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{label}</div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: href ? COLORS.blue : text }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div style={{ background: cardBg, border: `1.5px solid ${borderC}`, borderRadius: 20, padding: "34px 30px" }}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 10 }}>Message Received!</h3>
                    <p style={{ color: mutedText }}>We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} style={{ marginTop: 20, background: COLORS.blue, border: "none", color: "#fff", padding: "10px 24px", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>Send Another</button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 24 }}>Send a Message</h3>
                    {[["name", "Your Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number", "tel"]].map(([name, placeholder, type]) => (
                      <input key={name} name={name} type={type} placeholder={placeholder} value={formData[name]} onChange={handleFormChange}
                        style={{ width: "100%", marginBottom: 14, padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${borderC}`, background: dark ? "#1E293B" : "#F9FAFB", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    ))}
                    <textarea name="message" placeholder="Your message..." value={formData.message} onChange={handleFormChange} rows={4}
                      style={{ width: "100%", marginBottom: 18, padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${borderC}`, background: dark ? "#1E293B" : "#F9FAFB", color: text, fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
                    <button onClick={() => { if (formData.name && formData.email) setSubmitted(true); }} style={{ width: "100%", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueLight})`, border: "none", color: "#fff", padding: "14px 0", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
                      Send Message 🚀
                    </button>
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "90px 5%", background: dark ? "#0F172A" : COLORS.gray50 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 54 }}>
              <span style={{ color: COLORS.orange, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>FAQ</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", margin: "12px 0 14px" }}>Frequently Asked <span style={{ color: COLORS.blue }}>Questions</span></h2>
            </div>
          </FadeIn>
          {FAQS.map((f, i) => <FAQItem key={i} f={f} i={i} cardBg={cardBg} borderC={borderC} mutedText={mutedText} text={text} />)}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.navy, color: "#fff", padding: "60px 5% 30px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.orange})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏠</div>
                <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Playfair Display', serif", color: "#fff" }}>Jaya Co Living</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>Your trusted PG accommodation partner in Bangalore. Safe, comfortable, and affordable living for students and professionals.</p>
              <div style={{ display: "flex", gap: 12 }}>
                {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                  <button key={i} style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</button>
                ))}
              </div>
            </div>
            {[
              ["Quick Links", ["Home", "About Us", "Rooms", "Amenities", "Pricing", "Contact"]],
              ["Services", ["Single Room", "Double Room", "Triple Room", "Food Service", "Laundry"]],
              ["Contact", ["📞 +91 91000 53541", "📧 info@jayacoliving.com", "📍 Whitefield, Bangalore", "⏰ 9AM - 9PM (Support)"]],
            ].map(([title, items]) => (
              <div key={title}>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 18, color: "#fff" }}>{title}</div>
                {items.map(item => (
                  <div key={item} style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = COLORS.orange}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>© 2025 Jaya Co Living. All rights reserved. Made with ❤️ in Bangalore</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Service"].map(l => <span key={l} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer" }}>{l}</span>)}
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOATING BUTTON */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 200,
        width: 56, height: 56, borderRadius: "50%",
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, boxShadow: "0 6px 24px rgba(37,211,102,0.5)",
        textDecoration: "none", transition: "transform 0.3s",
        animation: "pulse 2.5s infinite",
      }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        💬
      </a>

      {/* ENQUIRY MODAL */}
      {enquiryOpen && (
        <Modal onClose={() => setEnquiryOpen(false)} title="Quick Enquiry" dark={dark} cardBg={cardBg} borderC={borderC} text={text} mutedText={mutedText}>
          <p style={{ color: mutedText, marginBottom: 20, fontSize: 14 }}>Tell us what you're looking for and we'll get back to you within the hour!</p>
          {[["Name", "text"], ["Email", "email"], ["Phone", "tel"], ["Preferred Room Type", "text"]].map(([ph, type]) => (
            <input key={ph} type={type} placeholder={ph} style={{ width: "100%", marginBottom: 12, padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${borderC}`, background: dark ? "#1E293B" : "#F9FAFB", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
          ))}
          <button onClick={() => setEnquiryOpen(false)} style={{ width: "100%", marginTop: 8, background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`, border: "none", color: "#fff", padding: "13px 0", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
            Submit Enquiry 🚀
          </button>
        </Modal>
      )}

      {/* BOOK VISIT MODAL */}
      {bookOpen && (
        <Modal onClose={() => { setBookOpen(false); setBookSubmitted(false); setBookingData({ fullName: "", phone: "", date: "", time: "", roomType: "" }); }} title="Book a Visit" dark={dark} cardBg={cardBg} borderC={borderC} text={text} mutedText={mutedText}>
          {bookSubmitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 50, marginBottom: 12 }}>🎉</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 10, color: text }}>Visit Booked!</h3>
              <p style={{ color: mutedText, fontSize: 14 }}>We'll confirm your slot via WhatsApp/call. See you soon!</p>
            </div>
          ) : (
            <>
              <p style={{ color: mutedText, marginBottom: 20, fontSize: 14 }}>Schedule a free property visit at your convenience!</p>
              {[["fullName", "Full Name", "text"], ["phone", "Phone Number", "tel"], ["date", "Preferred Date", "date"], ["time", "Preferred Time", "time"]].map(([name, ph, type]) => (
                <input key={name} type={type} name={name} placeholder={ph} value={bookingData[name]} onChange={handleBookingChange} style={{ width: "100%", marginBottom: 12, padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${borderC}`, background: dark ? "#1E293B" : "#F9FAFB", color: text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
              ))}
              <select name="roomType" value={bookingData.roomType} onChange={handleBookingChange} style={{ width: "100%", marginBottom: 16, padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${borderC}`, background: dark ? "#1E293B" : "#F9FAFB", color: text, fontSize: 14, outline: "none", fontFamily: "inherit" }}>
                <option value="">Select Room Type</option>
                <option value="Single Sharing - ₹19,000/mo">Single Sharing - ₹19,000/mo</option>
                <option value="Double Sharing - ₹11,000/mo">Double Sharing - ₹11,000/mo</option>
                <option value="Triple Sharing - ₹8,000/mo">Triple Sharing - ₹8,000/mo</option>
              </select>
              <button onClick={handleConfirmVisit} style={{ width: "100%", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueLight})`, border: "none", color: "#fff", padding: "13px 0", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
                📅 Confirm Visit
              </button>
            </>
          )}
        </Modal>
      )}

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @keyframes pulse { 0%,100% { box-shadow: 0 6px 24px rgba(37,211,102,0.5); } 50% { box-shadow: 0 6px 40px rgba(37,211,102,0.8); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: #9CA3AF; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          footer > div > div[style*="grid-template-columns: 2fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function FAQItem({ f, i, cardBg, borderC, mutedText, text }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`, marginBottom: 12 }}>
      <div onClick={() => setOpen(o => !o)} style={{ background: cardBg, border: `1.5px solid ${open ? "#1A56DB" : borderC}`, borderRadius: 14, padding: "18px 22px", cursor: "pointer", transition: "all 0.2s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: text }}>{f.q}</span>
          <span style={{ color: "#1A56DB", fontSize: 20, flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.3s" }}>+</span>
        </div>
        {open && <p style={{ color: mutedText, fontSize: 14, lineHeight: 1.75, marginTop: 14 }}>{f.a}</p>}
      </div>
    </div>
  );
}

function Modal({ children, onClose, title, dark, cardBg, borderC, text }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", background: cardBg, border: `1.5px solid ${borderC}`, borderRadius: 22, padding: "32px 30px", maxWidth: 460, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.3)", animation: "fadeUp 0.35s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: text }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: text, lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const useInViewHook = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};
