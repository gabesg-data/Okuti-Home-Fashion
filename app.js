const { useState, useEffect, useMemo, useRef } = React;

const SUPABASE_URL = "https://tvzulbtgbanvyvlszcnq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_us0IGKG-_f-Dc7M1kSWEBA_jgDLGHD5";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

/* =========================================================
   CONFIG — store admin edits these constants for their business
   ========================================================= */
const STORE = {
  name: "Okuti Home & Fashion",
  tagline: "Namibian-made, built to last",
  whatsappNumber: "264836768165", // international format, no +, no spaces
  phoneDisplay: "+264 83 676 8165",
  email: "okutifurnitures@gmail.com",
  address: "Windhoek",
  hours: [
    ["Monday – Friday", "08:00 – 18:00"],
    ["Saturday", "09:00 – 16:00"],
    ["Sunday", "Closed"],
  ],
  social: {
    facebook: "https://facebook.com/okutifurniture",
    instagram: "https://instagram.com/okutifurniture",
  },
};

const CATEGORIES = [
  { id: "couches", name: "Couches", icon: "sofa" },
  { id: "beds", name: "Beds", icon: "bed" },
  { id: "tables", name: "Tables", icon: "table" },
  { id: "chairs", name: "Chairs", icon: "chair" },
  { id: "wardrobes", name: "Wardrobes", icon: "wardrobe" },
  { id: "tvstands", name: "TV Stands", icon: "tv" },
  { id: "fashion", name: "Fashion", icon: "other" },
  { id: "other", name: "Other", icon: "other" },
];

const STATUS = { AVAILABLE: "AVAILABLE", OUT_OF_STOCK: "OUT_OF_STOCK", SOLD: "SOLD" };

const STATUS_LABEL = {
  AVAILABLE: "Available",
  OUT_OF_STOCK: "Out of stock",
  SOLD: "Sold",
};

function seedProducts() {
  const img = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;
  return [
    {
      id: "p1",
      name: "Kalahari 3-Seater Couch",
      category: "couches",
      price: 8500,
      description: "A deep, generously cushioned 3-seater upholstered in stone-grey woven fabric. Solid hardwood frame built for everyday Windhoek living, with removable covers for easy cleaning.",
      status: STATUS.AVAILABLE,
      images: [
        img("photo-1555041469-a586c61ea9bc"),
        img("photo-1493663284031-b7e3aefcae8e"),
      ],
      createdAt: Date.now() - 8000000,
    },
    {
      id: "p2",
      name: "Windhoek Oak Dining Table",
      category: "tables",
      price: 6200,
      description: "Solid oak dining table seating six comfortably. Hand-finished top with a natural oil sealant that highlights the grain. Pairs well with our Etosha chairs.",
      status: STATUS.AVAILABLE,
      images: [img("photo-1617806118233-18e1de247200")],
      createdAt: Date.now() - 7000000,
    },
    {
      id: "p3",
      name: "Etosha Dining Chair (Set of 2)",
      category: "chairs",
      price: 2400,
      description: "Curved backrest dining chairs in tan leatherette with black powder-coated legs. Sold as a set of two, stackable for storage.",
      status: STATUS.AVAILABLE,
      images: [img("photo-1519947486511-46149fa0a254")],
      createdAt: Date.now() - 6000000,
    },
    {
      id: "p4",
      name: "Namib Queen Bed Frame",
      category: "beds",
      price: 5400,
      description: "Low-profile queen bed frame in walnut-stained pine with an upholstered headboard. Slatted base, no box spring required.",
      status: STATUS.OUT_OF_STOCK,
      images: [img("photo-1505693416388-ac5ce068fe85")],
      createdAt: Date.now() - 5000000,
    },
    {
      id: "p5",
      name: "Swakop 3-Door Wardrobe",
      category: "wardrobes",
      price: 7100,
      description: "Spacious three-door wardrobe with a full-length mirror on the centre panel, two hanging rails and four internal shelves.",
      status: STATUS.AVAILABLE,
      images: [img("photo-1595428774223-ef52624120d2")],
      createdAt: Date.now() - 4000000,
    },
    {
      id: "p6",
      name: "Erongo TV Console",
      category: "tvstands",
      price: 3200,
      description: "Low media console with two soft-close cabinets and open cable-routed shelving. Fits TVs up to 65 inches.",
      status: STATUS.AVAILABLE,
      images: [img("photo-1591129841117-3adfd313e34f")],
      createdAt: Date.now() - 3000000,
    },
    {
      id: "p7",
      name: "Fish River Corner Couch",
      category: "couches",
      price: 12800,
      description: "L-shaped corner couch in charcoal fabric, seats five. Reversible chaise, pocket-sprung cushions for lasting comfort.",
      status: STATUS.SOLD,
      images: [img("photo-1568470173347-3ab6b3f9e88f")],
      createdAt: Date.now() - 2000000,
    },
    {
      id: "p8",
      name: "Otavi Coffee Table",
      category: "tables",
      price: 1850,
      description: "Round coffee table with a solid timber top and black hairpin legs. A compact centrepiece for small lounges.",
      status: STATUS.AVAILABLE,
      images: [img("photo-1567538096630-e0c55bd6374c")],
      createdAt: Date.now() - 1000000,
    },
    {
      id: "p9",
      name: "Waterberg Armchair",
      category: "chairs",
      price: 3600,
      description: "Wide-seat accent armchair in mustard bouclé with tapered wooden legs. A statement piece for reading corners.",
      status: STATUS.AVAILABLE,
      images: [img("photo-1506439773649-6e0eb8cfb237")],
      createdAt: Date.now() - 900000,
    },
    {
      id: "p10",
      name: "Zambezi Bunk Bed",
      category: "beds",
      price: 4700,
      description: "Sturdy pinewood bunk bed with an integrated ladder and full safety rail on the top bunk. Ideal for growing families.",
      status: STATUS.AVAILABLE,
      images: [img("photo-1595526114035-0d45ed16cfbf")],
      createdAt: Date.now() - 800000,
    },
    {
      id: "p11",
      name: "Caprivi 2-Door Wardrobe",
      category: "wardrobes",
      price: 4300,
      description: "Compact two-door wardrobe finished in soft white with brushed brass handles. Great for smaller bedrooms.",
      status: STATUS.AVAILABLE,
      images: [img("photo-1616486338812-3dadae4b4ace")],
      createdAt: Date.now() - 700000,
    },
    {
      id: "p12",
      name: "Brukkaros Bar Stool (Set of 2)",
      category: "other",
      price: 1600,
      description: "Counter-height bar stools with a moulded wooden seat and steel frame. Sold as a pair.",
      status: STATUS.AVAILABLE,
      images: [img("photo-1503602642458-232111445657")],
      createdAt: Date.now() - 600000,
    },
  ];
}

/* =========================================================
   PERSISTENCE — Supabase database
   ========================================================= */
const STORAGE_BUCKET = "product-images";

function mapProductRow(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    description: row.description || "",
    status: row.status,
    images: Array.isArray(row.images) ? row.images : [],
    createdAt: Number(row.created_at),
  };
}

function mapOrderRow(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    whatsapp: row.whatsapp || "",
    location: row.location || "",
    productId: row.product_id || "",
    productName: row.product_name || "",
    productPrice: Number(row.product_price || 0),
    quantity: Number(row.quantity || 1),
    message: row.message || "",
    status: row.status,
    createdAt: Number(row.created_at),
  };
}

async function loadProducts() {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load products:", error);
    return seedProducts();
  }

  if (data && data.length) return data.map(mapProductRow);

  const seeded = seedProducts();
  const rows = seeded.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    description: p.description,
    status: p.status,
    images: p.images,
    created_at: p.createdAt,
  }));

  const { error: seedError } = await supabaseClient.from("products").insert(rows);
  if (seedError) console.error("Could not seed products:", seedError);

  return seeded;
}

async function loadOrders() {
  const { data, error } = await supabaseClient
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load orders:", error);
    return [];
  }

  return (data || []).map(mapOrderRow);
}

async function insertProduct(product) {
  const { error } = await supabaseClient.from("products").insert({
    id: product.id,
    name: product.name,
    category: product.category,
    price: Number(product.price),
    description: product.description || "",
    status: product.status,
    images: product.images || [],
    created_at: product.createdAt || Date.now(),
  });
  if (error) throw error;
}

async function updateProduct(product) {
  const { error } = await supabaseClient
    .from("products")
    .update({
      name: product.name,
      category: product.category,
      price: Number(product.price),
      description: product.description || "",
      status: product.status,
      images: product.images || [],
    })
    .eq("id", product.id);
  if (error) throw error;
}

async function deleteProduct(id) {
  const { error } = await supabaseClient.from("products").delete().eq("id", id);
  if (error) throw error;
}

async function insertOrder(order) {
  const { error } = await supabaseClient.from("orders").insert({
    id: order.id,
    name: order.name,
    phone: order.phone,
    whatsapp: order.whatsapp,
    location: order.location,
    product_id: order.productId,
    product_name: order.productName,
    product_price: Number(order.productPrice || 0),
    quantity: Number(order.quantity || 1),
    message: order.message || "",
    status: order.status,
    created_at: order.createdAt,
  });
  if (error) throw error;
}

async function updateOrderStatus(id, status) {
  const { error } = await supabaseClient
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

async function uploadProductImage(file) {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabaseClient.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { upsert: false, contentType: file.type || "image/jpeg" });

  if (error) throw error;

  const { data } = supabaseClient.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

function loadSession() {
  return false;
}

function saveSession() {}

function formatNAD(amount) {
  return "N$ " + Number(amount).toLocaleString("en-NA", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function genOrderRef() {
  return "OK-" + Math.random().toString(36).slice(2, 6).toUpperCase() + Date.now().toString().slice(-4);
}
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function waLink(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/* =========================================================
   ICONS — minimal inline SVGs (no external icon library needed)
   ========================================================= */
const Icon = {
  search: (p) => <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  menu: (p) => <svg {...p} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  close: (p) => <svg {...p} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  whatsapp: (p) => <svg {...p} viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-3-.3-.4.3-.4.7-1.3.1-.2 0-.4-.1-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.6 4.1 2.3.9 2.7.7 3.2.6.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.2L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3.2.8.9-3.1-.2-.3C4 14.6 3.8 13.3 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"/></svg>,
  phone: (p) => <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></svg>,
  pin: (p) => <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock: (p) => <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  chevRight: (p) => <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>,
  check: (p) => <svg {...p} viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>,
  plus: (p) => <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>,
  trash: (p) => <svg {...p} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>,
  edit: (p) => <svg {...p} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  layout: (p) => <svg {...p} viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  box: (p) => <svg {...p} viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg>,
  clipboard: (p) => <svg {...p} viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="12" height="18" rx="2"/><path d="M9 4V2h6v2"/><path d="M9 11h6M9 15h6"/></svg>,
  tag: (p) => <svg {...p} viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.6 12.6L12.9 20.3a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1 0-2.8L10.8 2.8a2 2 0 0 1 1.4-.6H19a2 2 0 0 1 2 2v6.4a2 2 0 0 1-.6 1.4z"/><circle cx="15" cy="8" r="1.5"/></svg>,
  logout: (p) => <svg {...p} viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>,
  upload: (p) => <svg {...p} viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/></svg>,
  lock: (p) => <svg {...p} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  sofa: (p) => <svg {...p} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M3 11h18v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z"/><path d="M3 14v4M21 14v4"/></svg>,
  bed: (p) => <svg {...p} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 18v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6"/><path d="M2 21v-3M22 21v-3"/><path d="M4 12V7a2 2 0 0 1 2-2h5v5"/></svg>,
  table: (p) => <svg {...p} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h18l-2 3H5l-2-3z"/><path d="M6 11v9M18 11v9"/></svg>,
  chair: (p) => <svg {...p} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 10V4h10v6"/><path d="M5 10h14l-1 6H6l-1-6z"/><path d="M7 16l-1 5M17 16l1 5"/></svg>,
  wardrobe: (p) => <svg {...p} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18"/><circle cx="9" cy="12" r=".6" fill="currentColor"/><circle cx="15" cy="12" r=".6" fill="currentColor"/></svg>,
  tv: (p) => <svg {...p} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="12" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>,
  shirt: (p) => <svg {...p} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4l-5 3 3 5 3-2v10h6V10l3 2 3-5-5-3c-.8 1.2-2 2-4 2s-3.2-.8-4-2z"/></svg>,
  other: (p) => <svg {...p} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>,
  facebook: (p) => <svg {...p} viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.8c0-.5.2-.8.5-.8z"/></svg>,
  instagram: (p) => <svg {...p} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>,
  mail: (p) => <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>,
};
function CategoryIcon({ id, ...rest }) {
  const map = { couches: Icon.sofa, beds: Icon.bed, tables: Icon.table, chairs: Icon.chair, wardrobes: Icon.wardrobe, tvstands: Icon.tv,fashion: Icon.shirt, other: Icon.other };
  const Cmp = map[id] || Icon.other;
  return <Cmp {...rest} />;
}

/* =========================================================
   SHARED UI PIECES
   ========================================================= */
function StatusBadge({ status }) {
  const cls = status === STATUS.AVAILABLE ? "badge-available" : status === STATUS.OUT_OF_STOCK ? "badge-oos" : "badge-sold";
  return <span className={`badge ${cls}`}><span className="badge-dot" />{STATUS_LABEL[status]}</span>;
}

function WhatsAppButton({ text = "Chat with us on WhatsApp", message, className = "", size }) {
  const msg = message || `Hi ${STORE.name}, I'd like to know more about your furniture.`;
  return (
    <a href={waLink(STORE.whatsappNumber, msg)} target="_blank" rel="noopener noreferrer"
       className={`btn btn-whatsapp ${size === "sm" ? "btn-sm" : ""} ${className}`}>
      <Icon.whatsapp /> {text}
    </a>
  );
}

function FloatingWhatsApp() {
  return (
    <a href={waLink(STORE.whatsappNumber, `Hi ${STORE.name}, I have a question about your furniture.`)}
       target="_blank" rel="noopener noreferrer" className="fab-whatsapp" aria-label="Chat on WhatsApp" title="Chat with us on WhatsApp">
      <Icon.whatsapp />
    </a>
  );
}

function Header({ page, goTo, search, setSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" },
  ];
  function handleNav(id) {
    goTo(id);
    setMobileOpen(false);
  }
  function submitSearch(e) {
    e.preventDefault();
    goTo("shop");
    setMobileOpen(false);
  }
  return (
    <header className="site-header">
      <div className="announce">
        Free delivery within Windhoek on orders over N$5,000 · <a href={waLink(STORE.whatsappNumber, "Hi, I have a question about delivery.")} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>
      </div>
      <div className="header-row">
        <button className="logo" onClick={() => handleNav("home")} style={{ background: "none", border: "none", padding: 0 }} aria-label="Go to homepage">
          <span className="logo-mark">{STORE.name}</span>
          <span className="logo-sub">{STORE.tagline}</span>
        </button>
        <nav className="main-nav" aria-label="Main">
          {navItems.map((n) => (
            <button key={n.id} className={page === n.id ? "active" : ""} onClick={() => handleNav(n.id)}>{n.label}</button>
          ))}
        </nav>
        <form className="header-search" onSubmit={submitSearch} role="search">
          <Icon.search />
          <input placeholder="Search furniture…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search furniture" />
        </form>
        <div className="header-actions">
          <a className="icon-btn" href={waLink(STORE.whatsappNumber, `Hi ${STORE.name}, I have a question.`)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us" title="WhatsApp us" style={{ color: "#25D366" }}>
            <Icon.whatsapp />
          </a>
          <button className="icon-btn mobile-menu-btn" onClick={() => setMobileOpen((v) => !v)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <Icon.close /> : <Icon.menu />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-panel">
          <form className="mobile-search" onSubmit={submitSearch}>
            <Icon.search />
            <input placeholder="Search furniture…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search furniture" />
          </form>
          {navItems.map((n) => (
            <button key={n.id} onClick={() => handleNav(n.id)}>{n.label}</button>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer({ goTo }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">{STORE.name}</div>
            <p>{STORE.tagline}. Quality furniture for Namibian homes, delivered across Windhoek and beyond.</p>
            <div className="social-row">
              {STORE.social.facebook && <a className="social-chip" href={STORE.social.facebook} target="_blank" rel="noopener noreferrer" style={{ color: "var(--sand-100)", borderColor: "rgba(250,246,239,0.25)" }}><Icon.facebook /> Facebook</a>}
              {STORE.social.instagram && <a className="social-chip" href={STORE.social.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "var(--sand-100)", borderColor: "rgba(250,246,239,0.25)" }}><Icon.instagram /> Instagram</a>}
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <a onClick={() => goTo("home")}>Home</a>
            <a onClick={() => goTo("shop")}>Shop</a>
            <a onClick={() => goTo("about")}>About Us</a>
            <a onClick={() => goTo("contact")}>Contact</a>
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href={waLink(STORE.whatsappNumber, `Hi ${STORE.name}, I have a question.`)} target="_blank" rel="noopener noreferrer">Order via WhatsApp</a>
            <a href={`tel:${STORE.phoneDisplay.replace(/\s/g, "")}`}>{STORE.phoneDisplay}</a>
            <p style={{ marginBottom: 0 }}>{STORE.address}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {STORE.name}. All rights reserved.</span>
          <a className="footer-admin-link" onClick={() => goTo("admin")}>Admin</a>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   HOME PAGE
   ========================================================= */
function ProductCard({ product, onOpen }) {
  return (
    <button className="product-card" onClick={() => onOpen(product.id)}>
      <div className="thumb-wrap">
        <StatusBadge status={product.status} />
        <span className="cat-pill">{CATEGORIES.find((c) => c.id === product.category)?.name || "Furniture"}</span>
        <img src={product.images[0]} alt={product.name} loading="lazy" />
      </div>
      <div className="info">
        <span className="name">{product.name}</span>
        <span className="price">{formatNAD(product.price)}</span>
        <span className="desc-snip">{product.description}</span>
      </div>
    </button>
  );
}

function HomePage({ products, goTo, openProduct, setCategory }) {
  const featured = products.filter((p) => p.status === STATUS.AVAILABLE).slice(0, 8);
  return (
    <div>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Windhoek's furniture workshop</p>
            <h1>Furniture that feels<br />like home.</h1>
            <p className="lead">Solid, handsome pieces for Namibian living rooms, bedrooms and dining tables — built to last, priced fairly, delivered to your door.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => goTo("shop")}>Shop the collection</button>
              <WhatsAppButton text="Order via WhatsApp" />
            </div>
          </div>
          <div className="hero-media">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80" alt="A warmly lit Namibian living room with a couch and wooden table" />
          </div>
        </div>
      </section>

      <section className="cat-section container">
        <div className="section-head">
          <h2>Shop by category</h2>
        </div>
        <div className="cat-scroller">
          {CATEGORIES.map((c) => (
            <button key={c.id} className="cat-card" onClick={() => { setCategory(c.id); goTo("shop"); }}>
              <CategoryIcon id={c.id} className="cat-icon" />
              <span className="cat-name">{c.name}</span>
              <span className="cat-count">{products.filter((p) => p.category === c.id).length} items</span>
            </button>
          ))}
        </div>
      </section>

      <section className="cat-section container" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Available now</h2>
          <button className="btn btn-outline btn-sm" onClick={() => goTo("shop")}>View all <Icon.chevRight /></button>
        </div>
        {featured.length === 0 ? (
          <div className="empty-state"><h3>New stock arriving soon</h3><p>Check back shortly, or message us on WhatsApp for the latest availability.</p></div>
        ) : (
          <div className="product-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} onOpen={openProduct} />)}
          </div>
        )}
      </section>

      <section style={{ background: "var(--walnut-950)", padding: "48px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ color: "var(--sand-100)", fontSize: 26, marginBottom: 6 }}>Not sure what fits your space?</h2>
            <p style={{ color: "var(--sand-300)", maxWidth: 480 }}>Send us a photo of your room on WhatsApp and we'll help you pick the right piece.</p>
          </div>
          <WhatsAppButton text="Ask about this furniture" />
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   SHOP PAGE
   ========================================================= */
function ShopPage({ products, search, setSearch, category, setCategory, openProduct }) {
  const [sort, setSort] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (statusFilter !== "all") list = list.filter((p) => p.status === statusFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === "newest") list.sort((a, b) => b.createdAt - a.createdAt);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, category, statusFilter, search, sort]);

  return (
    <div className="container" style={{ padding: "36px 24px 64px" }}>
      <div className="section-head">
        <div>
          <p className="eyebrow">Full collection</p>
          <h2>Shop furniture</h2>
        </div>
      </div>

      <div className="cat-scroller" style={{ marginBottom: 28 }}>
        <button className={`cat-card ${category === "all" ? "active" : ""}`} onClick={() => setCategory("all")} style={{ alignItems: "flex-start" }}>
          <Icon.other className="cat-icon" />
          <span className="cat-name">All items</span>
          <span className="cat-count">{products.length} items</span>
        </button>
        {CATEGORIES.map((c) => (
          <button key={c.id} className={`cat-card ${category === c.id ? "active" : ""}`} onClick={() => setCategory(c.id)}>
            <CategoryIcon id={c.id} className="cat-icon" />
            <span className="cat-name">{c.name}</span>
            <span className="cat-count">{products.filter((p) => p.category === c.id).length} items</span>
          </button>
        ))}
      </div>

      <div className="shop-toolbar">
        <span className="small-muted">{filtered.length} item{filtered.length === 1 ? "" : "s"}</span>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <select className="select-pill" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by availability">
            <option value="all">All availability</option>
            <option value={STATUS.AVAILABLE}>Available</option>
            <option value={STATUS.OUT_OF_STOCK}>Out of stock</option>
            <option value={STATUS.SOLD}>Sold</option>
          </select>
          <select className="select-pill" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No furniture matches your search</h3>
          <p>Try a different category, or ask us directly — we may have it in the workshop.</p>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
            <WhatsAppButton text="Ask about this furniture" />
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => <ProductCard key={p.id} product={p} onOpen={openProduct} />)}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PRODUCT DETAIL PAGE
   ========================================================= */
function ProductDetailPage({ product, goTo, openOrderModal }) {
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => { setActiveImg(0); }, [product?.id]);

  if (!product) {
    return (
      <div className="empty-state">
        <h3>Product not found</h3>
        <p>This item may have been removed.</p>
        <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={() => goTo("shop")}>Back to shop</button>
      </div>
    );
  }

  const catName = CATEGORIES.find((c) => c.id === product.category)?.name || "Furniture";
  const canOrder = product.status === STATUS.AVAILABLE;
  const waMsg = `Hi ${STORE.name}, I'm interested in the "${product.name}" (${formatNAD(product.price)}). Is it still available?`;

  return (
    <div className="container">
      <div className="pdp-grid">
        <div>
          <div className="pdp-main-img">
            <img src={product.images[activeImg]} alt={`${product.name} photo ${activeImg + 1}`} />
          </div>
          {product.images.length > 1 && (
            <div className="pdp-thumbs">
              {product.images.map((img, i) => (
                <button key={i} className={`pdp-thumb ${i === activeImg ? "active" : ""}`} onClick={() => setActiveImg(i)} aria-label={`View photo ${i + 1}`}>
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pdp-info">
          <span className="cat-pill-static">{catName}</span>
          <h1>{product.name}</h1>
          <div style={{ marginBottom: 4 }}><StatusBadge status={product.status} /></div>
          <p className="pdp-price">{formatNAD(product.price)}</p>
          <p className="pdp-desc">{product.description}</p>

          {product.status === STATUS.OUT_OF_STOCK && (
            <div className="pdp-status-note oos">This piece is currently out of stock. Message us on WhatsApp to ask about restock timing or similar alternatives.</div>
          )}
          {product.status === STATUS.SOLD && (
            <div className="pdp-status-note sold">This piece has been sold and can no longer be ordered. Browse similar items in the shop, or ask us about a made-to-order version.</div>
          )}

          <div className="pdp-actions">
            <button className="btn btn-primary btn-block" disabled={!canOrder} onClick={() => openOrderModal(product)}>
              {canOrder ? "Order now" : product.status === STATUS.SOLD ? "Already sold" : "Currently unavailable"}
            </button>
            <WhatsAppButton text="Ask about this furniture" message={waMsg} className="btn-block" />
          </div>
          <p className="wa-inline-note"><Icon.whatsapp style={{ color: "#25D366", flexShrink: 0 }} /> Prefer to chat? We reply fastest on WhatsApp.</p>

          <div className="divider" />
          <p className="small-muted">Free delivery within Windhoek on orders over N$5,000. Delivery elsewhere in Namibia quoted on request.</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ORDER MODAL
   ========================================================= */
function OrderModal({ product, products, onClose, onSubmitOrder }) {
  const [step, setStep] = useState("form"); // form | confirmed
  const [orderRef, setOrderRef] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", whatsapp: "", location: "",
    productId: product ? product.id : "", quantity: 1, message: "",
  });
  const [errors, setErrors] = useState({});

  const availableProducts = products.filter((p) => p.status === STATUS.AVAILABLE);
  const selectedProduct = products.find((p) => p.id === form.productId);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.phone.trim()) e.phone = "Please enter a phone number.";
    if (!form.whatsapp.trim()) e.whatsapp = "Please enter a WhatsApp number.";
    if (!form.location.trim()) e.location = "Please enter a delivery location.";
    if (!form.productId) e.productId = "Please select a product.";
    if (!form.quantity || form.quantity < 1) e.quantity = "Quantity must be at least 1.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const ref = genOrderRef();
    const order = {
      id: ref,
      ...form,
      productName: selectedProduct ? selectedProduct.name : "",
      productPrice: selectedProduct ? selectedProduct.price : 0,
      status: "NEW",
      createdAt: Date.now(),
    };
    const saved = await onSubmitOrder(order);
    if (!saved) return;
    setOrderRef(ref);
    setStep("confirmed");
  }

  const waFollowUp = selectedProduct
    ? `Hi ${STORE.name}, I just placed order ${orderRef} for ${form.quantity} x "${selectedProduct.name}" — following up here on WhatsApp.`
    : `Hi ${STORE.name}, I just placed order ${orderRef}.`;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-label={step === "form" ? "Place an order" : "Order confirmed"}>
        {step === "form" ? (
          <>
            <div className="modal-head">
              <h3 style={{ fontSize: 20 }}>Place your order</h3>
              <button className="modal-close" onClick={onClose} aria-label="Close"><Icon.close /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Product <span className="req">*</span></label>
                <select value={form.productId} onChange={(e) => update("productId", e.target.value)}>
                  <option value="">Select a product…</option>
                  {availableProducts.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — {formatNAD(p.price)}</option>
                  ))}
                </select>
                {errors.productId && <div className="field-error">{errors.productId}</div>}
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Your name <span className="req">*</span></label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Maria Shikongo" />
                  {errors.name && <div className="field-error">{errors.name}</div>}
                </div>
                <div className="field">
                  <label>Quantity <span className="req">*</span></label>
                  <input type="number" min="1" value={form.quantity} onChange={(e) => update("quantity", Number(e.target.value))} />
                  {errors.quantity && <div className="field-error">{errors.quantity}</div>}
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Phone number <span className="req">*</span></label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="081 234 5678" />
                  {errors.phone && <div className="field-error">{errors.phone}</div>}
                </div>
                <div className="field">
                  <label>WhatsApp number <span className="req">*</span></label>
                  <input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="081 234 5678" />
                  {errors.whatsapp && <div className="field-error">{errors.whatsapp}</div>}
                </div>
              </div>

              <div className="field">
                <label>Delivery location <span className="req">*</span></label>
                <input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Suburb, street, town" />
                {errors.location && <div className="field-error">{errors.location}</div>}
              </div>

              <div className="field">
                <label>Message (optional)</label>
                <textarea rows="3" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Colour preference, delivery timing, anything else we should know…" />
              </div>

              <button type="submit" className="btn btn-primary btn-block">Submit order</button>
              <p className="field-hint text-center" style={{ marginTop: 12 }}>We'll confirm your order and delivery details by phone or WhatsApp.</p>
            </form>
          </>
        ) : (
          <div className="confirm-panel">
            <div className="confirm-icon"><Icon.check /></div>
            <h3>Order received, thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}!</h3>
            <p>We've received your order for</p>
            <p style={{ fontWeight: 700, color: "var(--walnut-950)" }}>{form.quantity} × {selectedProduct?.name}</p>
            <div className="order-ref">{orderRef}</div>
            <p className="small-muted">Keep this reference for your records. Our team will contact you on {form.phone || form.whatsapp} to confirm delivery to {form.location}.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              <WhatsAppButton text="Confirm via WhatsApp now" message={waFollowUp} className="btn-block" />
              <button className="btn btn-outline btn-block" onClick={onClose}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   ABOUT PAGE
   ========================================================= */
function AboutPage({ goTo }) {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="eyebrow">Our story</p>
          <h1>Built in Windhoek, made for Namibian homes.</h1>
          <p>{STORE.name} started a small workshop in Windhoek. We sell items in a the way Namibian families actually live — solid, practical, and priced with local budgets in mind.</p>
        </div>
      </div>

      <div className="container">
        <div className="about-block">
          <img src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=900&q=80" alt="Craftsman working on a wooden furniture piece" />
          <div>
            <p className="eyebrow">How we work</p>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>From workshop to living room</h2>
            <p>Every piece we sell is chosen  with everyday Namibian life in mind — heat, dust, and hard use included. We work with local carpenters and trusted regional suppliers to keep quality high and prices fair.</p>
          </div>
        </div>

        <div className="about-block reverse">
          <img src="https://images.unsplash.com/photo-1595515769909-7ac2fbde9d5c?auto=format&fit=crop&w=900&q=80" alt="Delivery van outside a furniture showroom" />
          <div>
            <p className="eyebrow">Delivery you can rely on</p>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>We deliver across Namibia</h2>
            <p>Most orders within Windhoek arrive within 2–3 working hours. For deliveries outside the city, message us on WhatsApp for a quote — we regularly deliver to Swakopmund, Walvis Bay, Okahandja and beyond.</p>
          </div>
        </div>

        <div className="section-head" style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 26 }}>What we stand for</h2>
        </div>
        <div className="value-grid">
          <div className="value-card">
            <Icon.box className="val-icon" />
            <h3>Built to last</h3>
            <p>Solid frames and honest materials — furniture that survives real family life, not just a showroom.</p>
          </div>
          <div className="value-card">
            <Icon.tag className="val-icon" />
            <h3>Fair pricing</h3>
            <p>Every price is listed upfront in Namibian Dollars. No hidden costs, no surprise mark-ups.</p>
          </div>
          <div className="value-card">
            <Icon.whatsapp className="val-icon" style={{ color: "#25D366" }} />
            <h3>Always reachable</h3>
            <p>Real people answer on WhatsApp — ask questions, request photos, or place an order directly.</p>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "8px 0 56px" }}>
          <button className="btn btn-dark" onClick={() => goTo("shop")}>Browse the collection</button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CONTACT PAGE
   ========================================================= */
function ContactPage() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="eyebrow">We'd love to hear from you</p>
          <h1>Get in touch</h1>
          <p>Questions about a product, delivery, or a custom order? Reach us any of the ways below — WhatsApp is fastest.</p>
        </div>
      </div>
      <div className="container">
        <div className="contact-grid">
          <div>
            <div className="contact-card">
              <div className="c-icon" style={{ background: "#DCF8E4", color: "#1B8A3D" }}><Icon.whatsapp /></div>
              <div style={{ flex: 1 }}>
                <h3>WhatsApp</h3>
                <p>Fastest way to reach us — ask about stock, prices or delivery.</p>
                <div style={{ marginTop: 10 }}><WhatsAppButton text="Chat with us on WhatsApp" size="sm" /></div>
              </div>
            </div>
            <div className="contact-card">
              <div className="c-icon"><Icon.phone /></div>
              <div>
                <h3>Phone</h3>
                <p><a href={`tel:${STORE.phoneDisplay.replace(/\s/g, "")}`}>{STORE.phoneDisplay}</a></p>
              </div>
            </div>
            <div className="contact-card">
              <div className="c-icon"><Icon.mail /></div>
              <div>
                <h3>Email</h3>
                <p><a href={`mailto:${STORE.email}`}>{STORE.email}</a></p>
              </div>
            </div>
            <div className="contact-card">
              <div className="c-icon"><Icon.pin /></div>
              <div>
                <h3>Available</h3>
                <p>{STORE.address}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="contact-card" style={{ flexDirection: "column", gap: 0 }}>
              <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                <div className="c-icon"><Icon.clock /></div>
                <h3 style={{ alignSelf: "center" }}>Business hours</h3>
              </div>
              <table className="hours-table">
                <tbody>
                  {STORE.hours.map(([day, time]) => (
                    <tr key={day}><td>{day}</td><td>{time}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="contact-card" style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <h3 style={{ marginBottom: 8 }}>Follow us</h3>
              <p style={{ marginBottom: 12 }}>See new arrivals and workshop updates.</p>
              <div className="social-row">
                {STORE.social.facebook && <a className="social-chip" href={STORE.social.facebook} target="_blank" rel="noopener noreferrer"><Icon.facebook /> Facebook</a>}
                {STORE.social.instagram && <a className="social-chip" href={STORE.social.instagram} target="_blank" rel="noopener noreferrer"><Icon.instagram /> Instagram</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN — LOGIN
   ========================================================= */
function AdminLogin({ onLogin, onExit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    const { data, error: authError } = await supabaseClient.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setBusy(false);

    if (authError) {
      setError(authError.message || "Unable to sign in. Check your email and password.");
      return;
    }

    if (data?.user) onLogin(data.user);
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <span className="logo-mark">{STORE.name}</span>
        <p className="lead">Admin dashboard — sign in to manage products and orders.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Admin email</label>
            <input type="email" autoFocus value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder={STORE.email} required />
          </div>
          <div className="field">
            <label>Admin password</label>
            <input type="password" value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter password" required />
            {error && <div className="field-error">{error}</div>}
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            <Icon.lock /> {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={onExit}>Back to website</button>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN — PRODUCT FORM (add / edit)
   ========================================================= */
function emptyProductDraft() {
  return { id: null, name: "", category: CATEGORIES[0].id, price: "", description: "", status: STATUS.AVAILABLE, images: [] };
}

function AdminProductForm({ draft, setDraft, onSave, onCancel }) {
  const fileInputRef = useRef(null);

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      const urls = [];
      for (const file of files) urls.push(await uploadProductImage(file));
      setDraft((d) => ({ ...d, images: [...d.images, ...urls] }));
    } catch (err) {
      console.error(err);
      alert("Could not upload the image. Check that the product-images bucket exists and is configured correctly.");
    }
    e.target.value = "";
  }
  function removeImage(idx) {
    setDraft((d) => ({ ...d, images: d.images.filter((_, i) => i !== idx) }));
  }
  function replaceImage(idx) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const url = await uploadProductImage(file);
        setDraft((d) => {
          const imgs = [...d.images];
          imgs[idx] = url;
          return { ...d, images: imgs };
        });
      } catch (err) {
        console.error(err);
        alert("Could not upload the replacement image.");
      }
    };
    input.click();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!draft.name.trim() || !draft.price || draft.images.length === 0) return;
    onSave();
  }

  const valid = draft.name.trim() && Number(draft.price) > 0 && draft.images.length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-card">
        <h3>{draft.id ? "Edit product" : "Add new product"}</h3>
        <div className="field-row">
          <div className="field">
            <label>Product name <span className="req">*</span></label>
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Kalahari 3-Seater Couch" />
          </div>
          <div className="field">
            <label>Price (N$) <span className="req">*</span></label>
            <input type="number" min="0" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} placeholder="e.g. 4500" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Category <span className="req">*</span></label>
            <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Availability status <span className="req">*</span></label>
            <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
              <option value={STATUS.AVAILABLE}>Available</option>
              <option value={STATUS.OUT_OF_STOCK}>Out of stock</option>
              <option value={STATUS.SOLD}>Sold</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label>Description <span className="req">*</span></label>
          <textarea rows="4" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Describe the materials, size, and finish…" />
        </div>
        <div className="field">
          <label>Product photos <span className="req">*</span> <span className="field-hint" style={{ display: "inline" }}>(add multiple, tap × to remove, or replace individually)</span></label>
          <div className="img-manager-grid">
            {draft.images.map((img, i) => (
              <div className="img-slot" key={i}>
                <img src={img} alt={`Product photo ${i + 1}`} onClick={() => replaceImage(i)} style={{ cursor: "pointer" }} title="Click to replace" />
                <button type="button" className="remove-img" onClick={() => removeImage(i)} aria-label="Remove photo"><Icon.close /></button>
              </div>
            ))}
            <button type="button" className="img-add-slot" onClick={() => fileInputRef.current.click()}>
              <Icon.upload />
              Add photo
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={handleFiles} />
          </div>
          {draft.images.length === 0 && <div className="field-error">Add at least one product photo.</div>}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button type="submit" className="btn btn-primary" disabled={!valid}>{draft.id ? "Save changes" : "Add product"}</button>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

/* =========================================================
   ADMIN — PRODUCTS TAB
   ========================================================= */
function AdminProducts({ products, setProducts }) {
  const [mode, setMode] = useState("list"); // list | add | edit
  const [draft, setDraft] = useState(emptyProductDraft());
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [customCategories, setCustomCategories] = useState([]);

  function startAdd() {
    setDraft(emptyProductDraft());
    setMode("add");
  }
  function startEdit(product) {
    setDraft({ ...product, price: String(product.price) });
    setMode("edit");
  }
  async function handleSave() {
    try {
      if (mode === "add") {
        const newProduct = { ...draft, id: "p" + Date.now(), price: Number(draft.price), createdAt: Date.now() };
        await insertProduct(newProduct);
        setProducts((prev) => [newProduct, ...prev]);
      } else {
        const updated = { ...draft, price: Number(draft.price) };
        await updateProduct(updated);
        setProducts((prev) => prev.map((p) => (p.id === draft.id ? updated : p)));
      }
      setMode("list");
    } catch (err) {
      console.error(err);
      alert("Could not save the product. Check your Supabase connection and admin permissions.");
    }
  }
  async function handleDelete(id) {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete the product.");
    }
  }
  async function handleStatusChange(id, status) {
    try {
      const product = products.find((p) => p.id === id);
      if (!product) return;
      await updateProduct({ ...product, status });
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    } catch (err) {
      console.error(err);
      alert("Could not update the product status.");
    }
  }

  const list = categoryFilter === "all" ? products : products.filter((p) => p.category === categoryFilter);

  if (mode === "add" || mode === "edit") {
    return <AdminProductForm draft={draft} setDraft={setDraft} onSave={handleSave} onCancel={() => setMode("list")} />;
  }

  return (
    <div>
      <div className="admin-topbar">
        <h1>Products</h1>
        <button className="btn btn-primary" onClick={startAdd}><Icon.plus /> Add product</button>
      </div>

      <div className="shop-toolbar">
        <select className="select-pill" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <span className="small-muted">{list.length} product{list.length === 1 ? "" : "s"}</span>
      </div>

      {list.length === 0 ? (
        <div className="empty-admin">
          <h3 style={{ color: "var(--walnut-950)", marginBottom: 6 }}>No products yet</h3>
          <p>Add your first furniture item to get started.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="prod-thumb-cell">
                        <img src={p.images[0]} alt="" />
                        <span style={{ fontWeight: 600 }}>{p.name}</span>
                      </div>
                    </td>
                    <td>{CATEGORIES.find((c) => c.id === p.category)?.name || p.category}</td>
                    <td>{formatNAD(p.price)}</td>
                    <td>
                      <select className="status-select" value={p.status} onChange={(e) => handleStatusChange(p.id, e.target.value)}>
                        <option value={STATUS.AVAILABLE}>Available</option>
                        <option value={STATUS.OUT_OF_STOCK}>Out of stock</option>
                        <option value={STATUS.SOLD}>Sold</option>
                      </select>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => startEdit(p)}><Icon.edit /></button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}><Icon.trash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   ADMIN — ORDERS TAB
   ========================================================= */
function AdminOrders({ orders, setOrders }) {
  const [statusFilter, setStatusFilter] = useState("all");
  async function updateStatus(id, status) {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error(err);
      alert("Could not update the order status.");
    }
  }
  const list = (statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter)).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      <div className="admin-topbar">
        <h1>Orders</h1>
      </div>
      <div className="shop-toolbar">
        <select className="select-pill" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <span className="small-muted">{list.length} order{list.length === 1 ? "" : "s"}</span>
      </div>

      {list.length === 0 ? (
        <div className="empty-admin">
          <h3 style={{ color: "var(--walnut-950)", marginBottom: 6 }}>No orders yet</h3>
          <p>Customer orders will appear here as soon as they're placed.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.productName} <span className="small-muted">({formatNAD(o.productPrice)})</span></td>
                    <td>{o.quantity}</td>
                    <td>
                      <a href={waLink(o.whatsapp, `Hi ${o.name}, this is ${STORE.name} following up on your order ${o.id}.`)} target="_blank" rel="noopener noreferrer" style={{ color: "#1B8A3D", fontWeight: 600 }}>
                        {o.phone}
                      </a>
                    </td>
                    <td>{o.location}</td>
                    <td>
                      <select className="status-select" value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   ADMIN — CATEGORIES TAB (view/reference; categories are curated)
   ========================================================= */
function AdminCategories({ products }) {
  return (
    <div>
      <div className="admin-topbar"><h1>Categories</h1></div>
      <p className="small-muted" style={{ marginBottom: 20 }}>Products are organised into these categories. Assign a category to each product from the Products tab.</p>
      <div className="admin-table-wrap">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead><tr><th>Category</th><th>Products</th></tr></thead>
            <tbody>
              {CATEGORIES.map((c) => (
                <tr key={c.id}>
                  <td style={{ display: "flex", alignItems: "center", gap: 10 }}><CategoryIcon id={c.id} width="20" height="20" style={{ color: "var(--clay-700)" }} /> {c.name}</td>
                  <td>{products.filter((p) => p.category === c.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN — DASHBOARD SHELL
   ========================================================= */
function AdminDashboard({ products, setProducts, orders, setOrders, onLogout, onExit }) {
  const [tab, setTab] = useState("overview");

  const stats = {
    total: products.length,
    available: products.filter((p) => p.status === STATUS.AVAILABLE).length,
    outOfStock: products.filter((p) => p.status === STATUS.OUT_OF_STOCK).length,
    newOrders: orders.filter((o) => o.status === "NEW").length,
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: Icon.layout },
    { id: "products", label: "Products", icon: Icon.box },
    { id: "orders", label: "Orders", icon: Icon.clipboard },
    { id: "categories", label: "Categories", icon: Icon.tag },
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <span className="logo-mark">{STORE.name}</span>
        <span className="admin-tag">Admin dashboard</span>
        {navItems.map((n) => (
          <button key={n.id} className={`admin-nav-btn ${tab === n.id ? "active" : ""}`} onClick={() => setTab(n.id)}>
            <n.icon width="17" height="17" /> {n.label}
          </button>
        ))}
        <div className="admin-exit" style={{ display: "flex", gap: 4 }}>
          <button className="admin-nav-btn" onClick={onExit}><Icon.chevRight style={{ transform: "rotate(180deg)" }} /> View site</button>
          <button className="admin-nav-btn" onClick={onLogout}><Icon.logout /> Log out</button>
        </div>
      </aside>
      <main className="admin-main">
        {tab === "overview" && (
          <div>
            <div className="admin-topbar"><h1>Overview</h1></div>
            <div className="stat-row">
              <div className="stat-card"><div className="stat-num">{stats.total}</div><div className="stat-label">Total products</div></div>
              <div className="stat-card"><div className="stat-num">{stats.available}</div><div className="stat-label">Available</div></div>
              <div className="stat-card"><div className="stat-num">{stats.outOfStock}</div><div className="stat-label">Out of stock</div></div>
              <div className="stat-card"><div className="stat-num">{stats.newOrders}</div><div className="stat-label">New orders</div></div>
            </div>
            <div className="admin-card">
              <h3>Recent orders</h3>
              {orders.length === 0 ? <p className="small-muted">No orders yet.</p> : (
                <div className="admin-table-scroll">
                  <table className="admin-table">
                    <thead><tr><th>Ref</th><th>Customer</th><th>Product</th><th>Status</th></tr></thead>
                    <tbody>
                      {[...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5).map((o) => (
                        <tr key={o.id}>
                          <td style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{o.id}</td>
                          <td>{o.name}</td>
                          <td>{o.productName}</td>
                          <td><span className={`pill-tag order-status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <button className="btn btn-outline btn-sm" style={{ marginTop: 14 }} onClick={() => setTab("orders")}>View all orders</button>
            </div>
          </div>
        )}
        {tab === "products" && <AdminProducts products={products} setProducts={setProducts} />}
        {tab === "orders" && <AdminOrders orders={orders} setOrders={setOrders} />}
        {tab === "categories" && <AdminCategories products={products} />}
      </main>
    </div>
  );
}

/* =========================================================
   ROOT APP
   ========================================================= */
function App() {
  const [products, setProductsState] = useState([]);
  const [orders, setOrdersState] = useState([]);
  const [page, setPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [orderModalProduct, setOrderModalProduct] = useState(null);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initialise() {
      try {
        const [{ data: sessionData }, remoteProducts] = await Promise.all([
          supabaseClient.auth.getSession(),
          loadProducts(),
        ]);

        if (!mounted) return;
        setAdminLoggedIn(Boolean(sessionData?.session?.user));
        setProductsState(remoteProducts);

        if (sessionData?.session?.user) {
          setOrdersState(await loadOrders());
        }
      } catch (err) {
        console.error("Initialisation error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initialise();

    const { data: listener } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      setAdminLoggedIn(Boolean(session?.user));
      if (session?.user) {
        try { setOrdersState(await loadOrders()); }
        catch (err) { console.error(err); }
      } else {
        setOrdersState([]);
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  function setProducts(updater) {
    setProductsState((prev) => typeof updater === "function" ? updater(prev) : updater);
  }

  function setOrders(updater) {
    setOrdersState((prev) => typeof updater === "function" ? updater(prev) : updater);
  }

  function goTo(id) {
    setPage(id);
    window.scrollTo(0, 0);
  }

  function openProduct(id) {
    setSelectedProductId(id);
    goTo("product");
  }

  function openOrderModal(product) {
    setOrderModalProduct(product);
  }

  async function handleSubmitOrder(order) {
    try {
      await insertOrder(order);
      setOrdersState((prev) => [order, ...prev]);
      return true;
    } catch (err) {
      console.error(err);
      alert("We couldn't submit the order. Please try again or order via WhatsApp.");
      return false;
    }
  }

  async function handleAdminLogout() {
    await supabaseClient.auth.signOut();
    setAdminLoggedIn(false);
    setOrdersState([]);
    goTo("home");
  }

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  if (loading) {
    return (
      <div className="login-shell">
        <div className="login-card">
          <span className="logo-mark">{STORE.name}</span>
          <p className="lead">Loading the furniture catalogue…</p>
        </div>
      </div>
    );
  }

  if (page === "admin") {
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={() => setAdminLoggedIn(true)} onExit={() => goTo("home")} />;
    }

    return (
      <AdminDashboard
        products={products}
        setProducts={setProducts}
        orders={orders}
        setOrders={setOrders}
        onLogout={handleAdminLogout}
        onExit={() => goTo("home")}
      />
    );
  }

  return (
    <div>
      <Header page={page} goTo={goTo} search={search} setSearch={setSearch} />
      {page === "home" && <HomePage products={products} goTo={goTo} openProduct={openProduct} setCategory={setCategory} />}
      {page === "shop" && <ShopPage products={products} search={search} setSearch={setSearch} category={category} setCategory={setCategory} openProduct={openProduct} />}
      {page === "product" && <ProductDetailPage product={selectedProduct} goTo={goTo} openOrderModal={openOrderModal} />}
      {page === "about" && <AboutPage goTo={goTo} />}
      {page === "contact" && <ContactPage />}
      <Footer goTo={goTo} />
      <FloatingWhatsApp />
      {orderModalProduct && (
        <OrderModal product={orderModalProduct} products={products} onClose={() => setOrderModalProduct(null)} onSubmitOrder={handleSubmitOrder} />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
