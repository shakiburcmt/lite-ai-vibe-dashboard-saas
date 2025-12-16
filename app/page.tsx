"use client";
import {
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle,
  ChevronRight,
  DollarSign,
  Download,
  Edit3,
  FileText,
  Filter,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Package,
  PauseCircle,
  PlayCircle,
  Plus,
  Printer,
  RefreshCw,
  Save,
  ScanLine,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Sun,
  Trash2,
  TrendingDown,
  TrendingUp,
  Truck,
  UserPlus,
  Users,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * --- MOCK DATA & CONSTANTS ---
 */

const ROLES = { ADMIN: "admin", MANAGER: "manager", CASHIER: "cashier" };

const THEMES = {
  LIGHT: "bg-slate-50 text-slate-900",
  DARK: "bg-slate-900 text-slate-100",
  GLASS_LIGHT: "bg-white/70 backdrop-blur-xl border-white/50 shadow-xl",
  GLASS_DARK:
    "bg-slate-800/70 backdrop-blur-xl border-slate-700/50 shadow-xl text-white",
};

const INITIAL_USERS = [
  {
    id: 1,
    name: "Admin",
    email: "admin@shopsmart.ai",
    role: ROLES.ADMIN,
    avatar: "A",
    permissions: ["all"],
  },
  {
    id: 2,
    name: "Manager",
    email: "manager@shopsmart.ai",
    role: ROLES.MANAGER,
    avatar: "M",
    permissions: ["dashboard", "pos", "products", "inventory", "reports"],
  },
  {
    id: 3,
    name: "Cashier",
    email: "cashier@shopsmart.ai",
    role: ROLES.CASHIER,
    avatar: "C",
    permissions: ["pos", "products_view"],
  },
];

// Enhanced mock data
const INITIAL_PRODUCTS = [
  {
    id: 101,
    name: "Organic Coffee Beans",
    sku: "BV-001",
    price: 18.5,
    cost: 12.0,
    stock: 45,
    category: "Beverages",
    salesLast7Days: 120,
    profitMargin: 35.1,
    supplier: "Organic Farms Inc.",
    reorderPoint: 20,
  },
  {
    id: 102,
    name: "Ceramic Mug Set",
    sku: "HM-022",
    price: 24.99,
    cost: 15.0,
    stock: 12,
    category: "Home",
    salesLast7Days: 35,
    profitMargin: 40.0,
    supplier: "Home Decor Co.",
    reorderPoint: 15,
  },
  {
    id: 103,
    name: "Wireless Headphones",
    sku: "EL-999",
    price: 89.99,
    cost: 65.0,
    stock: 8,
    category: "Electronics",
    salesLast7Days: 15,
    profitMargin: 27.8,
    supplier: "Tech Solutions Ltd.",
    reorderPoint: 10,
  },
  {
    id: 104,
    name: "Artisan Sourdough",
    sku: "BK-101",
    price: 6.5,
    cost: 4.0,
    stock: 0,
    category: "Bakery",
    salesLast7Days: 200,
    profitMargin: 38.5,
    supplier: "Local Bakery",
    reorderPoint: 25,
  },
  {
    id: 105,
    name: "Smart Watch Gen 4",
    sku: "EL-500",
    price: 199.99,
    cost: 150.0,
    stock: 25,
    category: "Electronics",
    salesLast7Days: 45,
    profitMargin: 25.0,
    supplier: "Tech Solutions Ltd.",
    reorderPoint: 15,
  },
  {
    id: 106,
    name: "Yoga Mat",
    sku: "SP-303",
    price: 29.99,
    cost: 18.0,
    stock: 15,
    category: "Sports",
    salesLast7Days: 22,
    profitMargin: 40.0,
    supplier: "Fitness Gear Inc.",
    reorderPoint: 10,
  },
];

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "555-0101",
    points: 1250,
    segment: "VIP",
    lastVisit: "2023-11-01",
    totalSpent: 2450.5,
    visitCount: 24,
    preferences: ["Electronics", "Coffee"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-0102",
    points: 400,
    segment: "Regular",
    lastVisit: "2023-11-15",
    totalSpent: 850.75,
    visitCount: 12,
    preferences: ["Home", "Bakery"],
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "555-0103",
    points: 0,
    segment: "New",
    lastVisit: "2023-11-20",
    totalSpent: 120.0,
    visitCount: 1,
    preferences: ["Sports"],
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "555-0104",
    points: 2200,
    segment: "VIP",
    lastVisit: "2023-10-28",
    totalSpent: 3850.25,
    visitCount: 32,
    preferences: ["Electronics", "Fashion"],
  },
];

// Enhanced sales data for different time periods
const SALES_DATA_7DAYS = [
  { name: "Mon", sales: 4000, orders: 24, customers: 18 },
  { name: "Tue", sales: 3000, orders: 18, customers: 15 },
  { name: "Wed", sales: 2000, orders: 12, customers: 10 },
  { name: "Thu", sales: 2780, orders: 20, customers: 16 },
  { name: "Fri", sales: 1890, orders: 15, customers: 12 },
  { name: "Sat", sales: 6390, orders: 45, customers: 38 },
  { name: "Sun", sales: 7490, orders: 52, customers: 42 },
];

const SALES_DATA_30DAYS = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  sales: Math.floor(Math.random() * 8000) + 1000,
  orders: Math.floor(Math.random() * 60) + 10,
  customers: Math.floor(Math.random() * 50) + 8,
}));

const SALES_DATA_12MONTHS = [
  { name: "Jan", sales: 85000, orders: 520, customers: 420 },
  { name: "Feb", sales: 92000, orders: 580, customers: 460 },
  { name: "Mar", sales: 78000, orders: 490, customers: 390 },
  { name: "Apr", sales: 95000, orders: 600, customers: 480 },
  { name: "May", sales: 110000, orders: 680, customers: 550 },
  { name: "Jun", sales: 105000, orders: 650, customers: 520 },
  { name: "Jul", sales: 98000, orders: 610, customers: 490 },
  { name: "Aug", sales: 120000, orders: 750, customers: 600 },
  { name: "Sep", sales: 115000, orders: 720, customers: 580 },
  { name: "Oct", sales: 135000, orders: 850, customers: 680 },
  { name: "Nov", sales: 125000, orders: 780, customers: 620 },
  { name: "Dec", sales: 150000, orders: 950, customers: 750 },
];

const CATEGORY_SALES = [
  { name: "Electronics", value: 35, color: "#8884d8" },
  { name: "Beverages", value: 25, color: "#82ca9d" },
  { name: "Home", value: 15, color: "#ffc658" },
  { name: "Sports", value: 12, color: "#ff8042" },
  { name: "Bakery", value: 8, color: "#0088fe" },
  { name: "Fashion", value: 5, color: "#ff6b6b" },
];

/**
 * --- ENHANCED AI SERVICES ---
 */

const formatCurrency = (amount, currency = "$") =>
  `${currency}${amount.toFixed(2)}`;

class EnhancedAIService {
  static async generateProductDescription(productName, category = null) {
    await new Promise((r) => setTimeout(r, 800));
    const lowerName = productName.toLowerCase();

    // Enhanced descriptions with more details
    const descriptions = {
      electronics: `Premium ${productName} featuring cutting-edge technology with energy-efficient design. Includes 2-year warranty and 24/7 customer support.`,
      beverages: `Artisan ${productName} crafted from sustainably sourced ingredients. Ethically produced and packaged in eco-friendly materials.`,
      home: `Handcrafted ${productName} combining modern design with traditional craftsmanship. Easy to clean and durable for everyday use.`,
      sports: `Professional-grade ${productName} designed for optimal performance. Ergonomic design with anti-slip technology for safety.`,
      bakery: `Freshly baked ${productName} using organic ingredients. No preservatives added, perfect for health-conscious consumers.`,
      default: `High-quality ${productName} designed for durability and performance. Backed by our 100% satisfaction guarantee.`,
    };

    return descriptions[category?.toLowerCase()] || descriptions.default;
  }

  static async predictCategory(productName) {
    await new Promise((r) => setTimeout(r, 500));
    const lowerName = productName.toLowerCase();

    const categoryMap = {
      electronics:
        /phone|laptop|watch|headphone|electronic|keyboard|mouse|cable|charger|tablet/,
      beverages: /coffee|tea|juice|drink|water|soda|beverage|energy|smoothie/,
      home: /chair|table|lamp|home|bed|sofa|towel|mug|decor|furniture/,
      sports: /bat|ball|sport|yoga|gym|fitness|exercise|workout/,
      bakery: /bread|cake|cookie|pastry|bakery|dough|muffin|croissant/,
      groceries: /egg|milk|cheese|fruit|vegetable|food|meat|rice|pasta|grocery/,
    };

    for (const [category, pattern] of Object.entries(categoryMap)) {
      if (pattern.test(lowerName))
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    return "General";
  }

  static async analyzeCustomerSegment(customer) {
    await new Promise((r) => setTimeout(r, 700));

    const insights = [];
    if (customer.points > 1000) {
      insights.push({
        segment: "High-Value VIP",
        recommendation:
          "Offer exclusive early access to new arrivals and personalized shopping assistance.",
        action:
          "Send VIP-only 25% discount code and invitation to private sale event.",
        priority: "high",
      });
    } else if (customer.points > 300) {
      insights.push({
        segment: "Regular Customer",
        recommendation: "Increase purchase frequency with targeted promotions.",
        action: "Email 15% discount on next purchase within 7 days.",
        priority: "medium",
      });
    } else {
      insights.push({
        segment: "New/Low Engagement",
        recommendation: "Build loyalty with welcome offers and education.",
        action:
          "Send welcome email with 20% off first purchase and loyalty program details.",
        priority: "low",
      });
    }

    // Add personalized recommendations based on preferences
    if (customer.preferences && customer.preferences.length > 0) {
      insights[0].personalized = `Based on interest in ${customer.preferences.join(
        ", "
      )}, recommend related products.`;
    }

    return insights;
  }

  static async generateSalesForecast(timeframe = "7days") {
    await new Promise((r) => setTimeout(r, 1200));

    const forecasts = {
      "7days": {
        prediction: "Sales expected to increase by 15-20% over weekend",
        confidence: 85,
        factors: ["Weekend traffic", "Current promotions", "Weather forecast"],
        recommendations: [
          "Increase staff during peak hours",
          "Restock popular items",
          "Run social media promo",
        ],
      },
      "30days": {
        prediction: "Monthly revenue projected at $125,000 with 12% growth",
        confidence: 78,
        factors: [
          "Seasonal trends",
          "Upcoming holidays",
          "Marketing campaigns",
        ],
        recommendations: [
          "Plan holiday inventory",
          "Launch email campaign",
          "Optimize pricing strategy",
        ],
      },
      "12months": {
        prediction: "Annual growth of 18-22% projected with Q4 being strongest",
        confidence: 82,
        factors: [
          "Economic indicators",
          "Market expansion",
          "Competitor analysis",
        ],
        recommendations: [
          "Expand product categories",
          "Invest in customer retention",
          "Explore new markets",
        ],
      },
    };

    return forecasts[timeframe] || forecasts["7days"];
  }

  static async optimizePricing(product) {
    await new Promise((r) => setTimeout(r, 900));

    const currentMargin =
      ((product.price - product.cost) / product.price) * 100;
    let suggestion = "Maintain current price";
    let newPrice = product.price;
    let expectedImpact = "Neutral";

    if (currentMargin < 25) {
      suggestion = "Consider 5-8% price increase";
      newPrice = product.price * 1.06;
      expectedImpact = "Increase margin by 3-5% with minimal sales impact";
    } else if (currentMargin > 45) {
      suggestion = "Consider 3-5% price reduction";
      newPrice = product.price * 0.96;
      expectedImpact = "Boost sales volume by 8-12% for higher total profit";
    }

    return {
      currentPrice: product.price,
      suggestedPrice: parseFloat(newPrice.toFixed(2)),
      currentMargin: parseFloat(currentMargin.toFixed(1)),
      suggestion,
      expectedImpact,
      confidence: 78,
    };
  }

  static async chatWithAgent(query, context) {
    await new Promise((r) => setTimeout(r, 1000));
    const q = query.toLowerCase();

    if (q.includes("sales") || q.includes("revenue")) {
      const totalRevenue = context.products.reduce(
        (sum, p) => sum + p.price * p.salesLast7Days,
        0
      );
      return `Last 7 days revenue: ${formatCurrency(
        totalRevenue
      )}. Saturday peak at $6,390. AI recommends: 1) Bundle weekend products 2) Offer 2PM-4PM happy hour discount 3) Cross-sell with complementary items.`;
    }

    if (q.includes("stock") || q.includes("inventory")) {
      const lowStock = context.products.filter(
        (p) => p.stock < context.settings.lowStock
      );
      return `Inventory health: ${
        100 - ((lowStock.length / context.products.length) * 100).toFixed(0)
      }%. ${
        lowStock.length
      } items need restocking. AI suggests automated purchase orders for: ${lowStock
        .slice(0, 3)
        .map((p) => p.name)
        .join(", ")}.`;
    }

    if (q.includes("customer") || q.includes("crm")) {
      const vipCount = context.customers.filter(
        (c) => c.segment === "VIP"
      ).length;
      return `Customer insights: ${vipCount} VIPs generating 65% of revenue. AI recommends: 1) Personalized birthday offers 2) Exclusive preview events 3) Referral bonus program.`;
    }

    if (q.includes("forecast") || q.includes("predict")) {
      return `AI forecast: Weekend sales +22%, Electronics category +18%. Recommendations: 1) Increase electronic staff 2) Create weekend bundles 3) Social media push Thursday-Friday.`;
    }

    return "I can analyze sales patterns, optimize inventory, predict trends, and personalize customer experiences. What would you like to know?";
  }
}

/**
 * --- REUSABLE COMPONENTS ---
 */

const Card = ({ children, className = "", noPadding = false, isDark }) => (
  <div
    className={`rounded-2xl transition-all duration-300 ${
      isDark ? THEMES.GLASS_DARK : THEMES.GLASS_LIGHT
    } ${noPadding ? "" : "p-6"} ${className}`}
  >
    {children}
  </div>
);

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  icon: Icon,
  type = "button",
  size = "md",
}) => {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 border border-transparent",
    secondary:
      "bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-600",
    danger:
      "bg-gradient-to-r from-rose-500 to-red-600 text-white hover:shadow-lg hover:shadow-rose-500/30",
    success:
      "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:shadow-emerald-500/30",
    ghost:
      "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400",
    warning:
      "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-500/30",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${sizeStyles[size]} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 18} />}
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-800 border-slate-200",
    success: "bg-emerald-100 text-emerald-800 border-emerald-200",
    warning: "bg-amber-100 text-amber-800 border-amber-200",
    danger: "bg-rose-100 text-rose-800 border-rose-200",
    vip: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-transparent shadow-sm",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
        styles[variant] || styles.default
      }`}
    >
      {children}
    </span>
  );
};

const Input = ({ label, icon: Icon, isDark, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label
        className={`text-xs font-bold uppercase tracking-wider ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </label>
    )}
    <div className="relative group">
      {Icon && (
        <Icon
          className={`absolute left-3 top-3 transition-colors ${
            isDark
              ? "text-slate-500 group-focus-within:text-blue-400"
              : "text-slate-400 group-focus-within:text-blue-600"
          }`}
          size={18}
        />
      )}
      <input
        className={`w-full ${
          Icon ? "pl-10" : "pl-4"
        } pr-4 py-2.5 rounded-xl border-2 outline-none transition-all 
          ${
            isDark
              ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500 focus:bg-slate-800 placeholder-slate-500"
              : "bg-white/50 border-slate-200 text-slate-800 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-100"
          }`}
        {...props}
      />
    </div>
  </div>
);

/**
 * --- MAIN APP COMPONENT ---
 */

export default function ShopSmartUltimate() {
  // --- GLOBAL STATE ---
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [salesTimeframe, setSalesTimeframe] = useState("7days");

  // --- DATA STATE ---
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [orders, setOrders] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [settings, setSettings] = useState({
    storeName: "ShopSmart Hub",
    currency: "$",
    taxRate: 8.0,
    lowStock: 10,
    enableAI: true,
    autoRestock: false,
    loyaltyPointsRate: 1,
  });

  // --- POS STATE ---
  const [cart, setCart] = useState([]);
  const [heldOrders, setHeldOrders] = useState([]);
  const [activeCustomer, setActiveCustomer] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  // --- UI STATE ---
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isAIChatOpen, setAIChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      role: "system",
      content:
        "Hello! I am your ShopSmart AI Assistant. Ask me about sales, inventory, or customer trends.",
    },
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);

  // --- HELPERS ---
  const logAction = (action, details) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      user: user ? user.name : "System",
      role: user ? user.role : "System",
      action,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addNotification = (msg, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, msg, type }]);
    setTimeout(
      () => setNotifications((prev) => prev.filter((n) => n.id !== id)),
      4000
    );
  };

  const handleLogin = (selectedUser) => {
    setUser(selectedUser);
    // Set default view based on role with different options
    if (selectedUser.role === ROLES.CASHIER) {
      setCurrentView("pos");
    } else if (selectedUser.role === ROLES.MANAGER) {
      setCurrentView("dashboard");
    } else {
      setCurrentView("dashboard");
    }
    logAction("LOGIN", `User ${selectedUser.name} logged in.`);
    addNotification(`Welcome back, ${selectedUser.name}!`, "success");
  };

  // --- GLOBAL AI CHAT HANDLER ---
  const handleAIChatSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = { role: "user", content: aiInput };
    setAiMessages((prev) => [...prev, userMsg]);
    setAiInput("");
    setAiTyping(true);

    try {
      const vipCount = customers.filter((c) => c.segment === "VIP").length;
      const response = await EnhancedAIService.chatWithAgent(userMsg.content, {
        products,
        customers,
        settings,
        user,
        vipCount,
      });
      setAiMessages((prev) => [...prev, { role: "ai", content: response }]);
    } catch (err) {
      setAiMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I encountered an error processing that request.",
        },
      ]);
    } finally {
      setAiTyping(false);
    }
  };

  // Get sales data based on timeframe
  const getSalesData = () => {
    switch (salesTimeframe) {
      case "30days":
        return SALES_DATA_30DAYS;
      case "12months":
        return SALES_DATA_12MONTHS;
      default:
        return SALES_DATA_7DAYS;
    }
  };

  // --- VIEW COMPONENTS ---

  const LoginView = () => (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        darkMode ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>

      <Card
        className="w-full max-w-md relative z-10 border-t-4 border-t-blue-500"
        isDark={darkMode}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-500/40">
            <ShoppingBag size={32} />
          </div>
          <h1
            className={`text-3xl font-extrabold mb-2 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            ShopSmart<span className="text-blue-600">.ai</span>
          </h1>
          <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
            Next-Gen Retail Management OS
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center mb-4">
            Select Persona
          </p>
          {INITIAL_USERS.map((u) => (
            <button
              key={u.id}
              onClick={() => handleLogin(u)}
              className={`w-full group flex items-center justify-between p-4 rounded-xl border transition-all duration-200
                ${
                  darkMode
                    ? "bg-slate-800/50 border-slate-700 hover:border-blue-500 hover:bg-slate-800"
                    : "bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-md"
                }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm
                  ${
                    u.role === "admin"
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                      : u.role === "manager"
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                      : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  }`}
                >
                  {u.avatar}
                </div>
                <div className="text-left">
                  <div
                    className={`font-bold ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {u.name}
                  </div>
                  <div className="text-xs text-slate-500 uppercase font-semibold tracking-wide">
                    {u.role}
                  </div>
                </div>
              </div>
              <ChevronRight
                className={`transition-transform group-hover:translate-x-1 ${
                  darkMode ? "text-slate-600" : "text-slate-300"
                }`}
              />
            </button>
          ))}
        </div>
      </Card>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all text-slate-500"
      >
        {darkMode ? (
          <Sun size={20} className="text-amber-400" />
        ) : (
          <Moon size={20} className="text-slate-600" />
        )}
      </button>
    </div>
  );

  const POSView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showHistory, setShowHistory] = useState(false);
    const [showHeldOrders, setShowHeldOrders] = useState(false);
    const [quickAmounts] = useState([10, 20, 50, 100]);

    const categories = ["All", ...new Set(products.map((p) => p.category))];
    const filteredProducts = products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const tax = subtotal * (settings.taxRate / 100);
    const total = subtotal + tax;

    const addToCart = (product) => {
      if (product.stock <= 0)
        return addNotification("Item out of stock!", "error");
      setCart((prev) => {
        const exists = prev.find((i) => i.id === product.id);
        if (exists) {
          if (exists.qty + 1 > product.stock) {
            addNotification("Stock limit reached", "warning");
            return prev;
          }
          return prev.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
    };

    // Park the active cart so the cashier can resume it later without losing items
    const handleHoldOrder = () => {
      if (cart.length === 0) return;
      const holdId = `HLD-${Date.now().toString().slice(-6)}`;
      const held = {
        id: holdId,
        items: cart,
        customer: activeCustomer,
        date: new Date(),
        total: total,
      };
      setHeldOrders((prev) => [held, ...prev]);
      setCart([]);
      setActiveCustomer(null);
      logAction("POS_HOLD", `Order ${holdId} placed on hold.`);
      addNotification(`Order ${holdId} Parked`, "success");
    };

    // Restore a previously held order back into the live cart; only allowed when empty
    const handleResumeOrder = (order) => {
      if (cart.length > 0)
        return addNotification("Clear current cart first", "warning");
      setCart(order.items);
      setActiveCustomer(order.customer);
      setHeldOrders((prev) => prev.filter((o) => o.id !== order.id));
      setShowHeldOrders(false);
      logAction("POS_RESUME", `Order ${order.id} resumed.`);
    };

    // Finalize a sale: persist order, decrement stock, update customer stats, and reset the session
    const handleCheckout = (amountPaid = total) => {
      if (cart.length === 0) return;
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      const newOrder = {
        id: orderId,
        items: [...cart],
        customer: activeCustomer,
        subtotal,
        tax,
        total,
        amountPaid,
        change: amountPaid - total,
        date: new Date().toISOString(),
        cashier: user.name,
        paymentMethod: amountPaid === total ? "Credit Card" : "Cash",
      };
      setOrders((prev) => [newOrder, ...prev]);
      setProducts((prev) =>
        prev.map((p) => {
          const item = cart.find((c) => c.id === p.id);
          return item
            ? {
                ...p,
                stock: p.stock - item.qty,
                salesLast7Days: p.salesLast7Days + item.qty,
              }
            : p;
        })
      );
      if (activeCustomer) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === activeCustomer.id
              ? {
                  ...c,
                  points:
                    c.points + Math.floor(total * settings.loyaltyPointsRate),
                  lastVisit: new Date().toISOString().split("T")[0],
                  totalSpent: (c.totalSpent || 0) + total,
                  visitCount: (c.visitCount || 0) + 1,
                }
              : c
          )
        );
      }
      setLastOrder(newOrder);
      setShowReceipt(true);
      setCart([]);
      setActiveCustomer(null);
      logAction(
        "SALE",
        `Order ${orderId} completed. Total: ${formatCurrency(total)}`
      );
    };

    return (
      <div className="flex h-full gap-6 p-6 overflow-hidden">
        {/* PRODUCTS SIDE */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                isDark={darkMode}
                icon={Search}
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="secondary"
                icon={History}
                onClick={() => setShowHistory(true)}
              >
                History
              </Button>
              <Button
                variant="warning"
                icon={PauseCircle}
                onClick={() => setShowHeldOrders(true)}
              >
                Held ({heldOrders.length})
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                    ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : darkMode
                        ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-2">
            {filteredProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                disabled={p.stock === 0}
                className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden group
                  ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 hover:border-blue-500 hover:bg-slate-750"
                      : "bg-white border-slate-200 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1"
                  } ${p.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div
                  className={`h-24 rounded-xl mb-3 flex items-center justify-center text-4xl transition-transform group-hover:scale-110 ${
                    darkMode ? "bg-slate-700/50" : "bg-slate-50"
                  }`}
                >
                  {p.category === "Beverages"
                    ? "☕"
                    : p.category === "Electronics"
                    ? "🔌"
                    : p.category === "Home"
                    ? "🏠"
                    : p.category === "Sports"
                    ? "⚽"
                    : "📦"}
                </div>
                <h3
                  className={`font-bold text-sm truncate ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {p.name}
                </h3>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-lg font-extrabold text-blue-500">
                    ${p.price}
                  </span>
                  <Badge
                    variant={p.stock < settings.lowStock ? "danger" : "default"}
                  >
                    {p.stock}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CART SIDE */}
        <Card
          isDark={darkMode}
          noPadding
          className="w-96 flex flex-col h-full shadow-2xl border-0 ring-1 ring-slate-900/5"
        >
          <div
            className={`p-4 border-b ${
              darkMode ? "border-slate-700" : "border-slate-100"
            }`}
          >
            {activeCustomer ? (
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold">
                    {activeCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-bold ${
                        darkMode ? "text-blue-300" : "text-blue-800"
                      }`}
                    >
                      {activeCustomer.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <Star size={12} className="text-amber-500" />
                      <p className="text-xs text-blue-500">
                        {activeCustomer.points} pts • {activeCustomer.segment}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveCustomer(null)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <select
                  className={`w-full p-2.5 rounded-lg border appearance-none text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 
                    ${
                      darkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  onChange={(e) => {
                    const c = customers.find(
                      (cust) => cust.id === parseInt(e.target.value)
                    );
                    if (c) setActiveCustomer(c);
                  }}
                  value=""
                >
                  <option value="" disabled>
                    Select Customer...
                  </option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.segment})
                    </option>
                  ))}
                </select>
                <UserPlus
                  size={16}
                  className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                />
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                <ShoppingCart size={48} className="mb-2" />
                <p>Cart is empty</p>
                <p className="text-xs mt-1">Add items to begin</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-center p-3 rounded-xl group ${
                    darkMode ? "bg-slate-800/50" : "bg-slate-50"
                  }`}
                >
                  <div className="flex-1">
                    <div
                      className={`font-semibold text-sm ${
                        darkMode ? "text-slate-200" : "text-slate-800"
                      }`}
                    >
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      ${item.price} x {item.qty}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold ${
                        darkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                    <button
                      onClick={() =>
                        setCart(cart.filter((c) => c.id !== item.id))
                      }
                      className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            className={`p-5 ${
              darkMode ? "bg-slate-800" : "bg-white"
            } border-t ${darkMode ? "border-slate-700" : "border-slate-100"}`}
          >
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Tax ({settings.taxRate}%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div
                className={`flex justify-between text-xl font-black ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleCheckout(amt)}
                  disabled={cart.length === 0}
                  className={`py-1.5 text-xs font-bold rounded border transition-colors
                    ${
                      cart.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : darkMode
                        ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="warning"
                onClick={handleHoldOrder}
                disabled={cart.length === 0}
                icon={PauseCircle}
              >
                Hold Order
              </Button>
              <Button
                onClick={() => handleCheckout(total)}
                disabled={cart.length === 0}
                icon={DollarSign}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </Card>

        {/* MODALS */}
        {showHeldOrders && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card
              isDark={darkMode}
              className="w-full max-w-2xl max-h-[80vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Held Orders
                </h2>
                <button onClick={() => setShowHeldOrders(false)}>
                  <X className="text-slate-400 hover:text-slate-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3">
                {heldOrders.length === 0 ? (
                  <p className="text-center text-slate-500 py-10">
                    No held orders.
                  </p>
                ) : (
                  heldOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`p-4 rounded-xl border flex justify-between items-center ${
                        darkMode
                          ? "border-slate-700 bg-slate-800"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div>
                        <span className="font-mono text-xs bg-slate-200 dark:bg-slate-600 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
                          {order.id}
                        </span>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-slate-200" : "text-slate-800"
                          }`}
                        >
                          {order.customer ? order.customer.name : "Guest"} •{" "}
                          {order.items.length} items
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg">
                          {formatCurrency(order.total)}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleResumeOrder(order)}
                          icon={PlayCircle}
                        >
                          Resume
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        )}

        {showHistory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card
              isDark={darkMode}
              className="w-full max-w-4xl max-h-[80vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Transaction History
                </h2>
                <button onClick={() => setShowHistory(false)}>
                  <X className="text-slate-400 hover:text-slate-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table
                  className={`w-full text-left text-sm ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  <thead
                    className={`font-bold uppercase text-xs ${
                      darkMode
                        ? "bg-slate-800 text-slate-400"
                        : "bg-slate-50 text-slate-500"
                    }`}
                  >
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3 text-right">Total</th>
                      <th className="p-3">Cashier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr
                        key={o.id}
                        className={`border-b ${
                          darkMode ? "border-slate-700" : "border-slate-100"
                        }`}
                      >
                        <td className="p-3 font-mono text-xs">{o.id}</td>
                        <td className="p-3">
                          {new Date(o.date).toLocaleString()}
                        </td>
                        <td className="p-3">
                          {o.customer ? o.customer.name : "Guest"}
                        </td>
                        <td className="p-3 text-right font-bold">
                          {formatCurrency(o.total)}
                        </td>
                        <td className="p-3">{o.cashier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const DashboardView = () => {
    const [forecast, setForecast] = useState(null);
    const [loadingForecast, setLoadingForecast] = useState(false);

    const handleViewFullReport = async () => {
      setLoadingForecast(true);
      try {
        const forecastData = await EnhancedAIService.generateSalesForecast(
          salesTimeframe
        );
        setForecast(forecastData);
        setShowFullReport(true);
      } catch (error) {
        addNotification("Failed to generate forecast", "error");
      } finally {
        setLoadingForecast(false);
      }
    };

    const handleDownloadReport = () => {
      const dataStr = JSON.stringify(
        {
          timeframe: salesTimeframe,
          data: getSalesData(),
          generated: new Date().toISOString(),
        },
        null,
        2
      );
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sales-report-${salesTimeframe}-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addNotification("Report downloaded successfully", "success");
    };

    return (
      <div className="p-8 space-y-8 overflow-y-auto h-full">
        <div className="flex justify-between items-center">
          <div>
            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Dashboard
            </h2>
            <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
              Real-time insights for {settings.storeName}
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-emerald-400"
                : "bg-white border-slate-200 text-emerald-600"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>{" "}
            Live System
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Revenue",
              val: "$24,500",
              trend: "+12%",
              icon: DollarSign,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
            {
              label: "Active Orders",
              val: orders.length + 12,
              trend: "+5",
              icon: ShoppingCart,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              label: "Low Stock",
              val: products.filter((p) => p.stock < settings.lowStock).length,
              trend: "-2",
              icon: AlertTriangle,
              color: "text-rose-500",
              bg: "bg-rose-500/10",
            },
            {
              label: "VIP Customers",
              val: customers.filter((c) => c.segment === "VIP").length,
              trend: "+3",
              icon: Users,
              color: "text-purple-500",
              bg: "bg-purple-500/10",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              isDark={darkMode}
              className="flex items-center justify-between group hover:-translate-y-1 transition-transform"
            >
              <div>
                <p
                  className={`text-sm font-bold ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {stat.label}
                </p>
                <h3
                  className={`text-2xl font-black mt-1 ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {stat.val}
                </h3>
                <span
                  className={`text-xs font-bold flex items-center gap-1 mt-1 ${
                    stat.trend.startsWith("+")
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                  {stat.trend.startsWith("+") ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {stat.trend}
                </span>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card isDark={darkMode} className="lg:col-span-2 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3
                className={`font-bold text-lg ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Revenue Analytics
              </h3>
              <select
                value={salesTimeframe}
                onChange={(e) => setSalesTimeframe(e.target.value)}
                className={`text-sm rounded-lg p-2 border ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="12months">Last 12 Months</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getSalesData()}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={darkMode ? "#334155" : "#e2e8f0"}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: darkMode ? "#94a3b8" : "#64748b" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: darkMode ? "#94a3b8" : "#64748b" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      backgroundColor: darkMode ? "#1e293b" : "#fff",
                      color: darkMode ? "#fff" : "#000",
                    }}
                    formatter={(value) => [formatCurrency(value), "Sales"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none shadow-2xl relative overflow-hidden">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Sparkles size={20} className="text-yellow-300" />
                  </div>
                  <h3 className="font-bold text-lg">AI Forecasting</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-xl backdrop-blur-md border border-white/10">
                    <p className="text-xs text-indigo-200 font-bold uppercase mb-1">
                      Prediction
                    </p>
                    <p className="font-medium">
                      Demand for{" "}
                      <span className="text-yellow-300 font-bold">
                        Electronics
                      </span>{" "}
                      will spike +18% this weekend.
                    </p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl backdrop-blur-md border border-white/10">
                    <p className="text-xs text-indigo-200 font-bold uppercase mb-1">
                      Restock Alert
                    </p>
                    <p className="font-medium">
                      Order <span className="font-bold">25 units</span> of
                      Organic Coffee Beans now.
                    </p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl backdrop-blur-md border border-white/10">
                    <p className="text-xs text-indigo-200 font-bold uppercase mb-1">
                      Customer Insight
                    </p>
                    <p className="font-medium">
                      VIP customers generate{" "}
                      <span className="font-bold">65%</span> of total revenue.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  className="flex-1 bg-white text-indigo-600 hover:bg-indigo-50 shadow-none border-none"
                  onClick={handleViewFullReport}
                  disabled={loadingForecast}
                  icon={loadingForecast ? RefreshCw : FileText}
                >
                  {loadingForecast ? "Loading..." : "View Full AI Report"}
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 border-white/30"
                  onClick={handleDownloadReport}
                  icon={Download}
                />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-50"></div>
          </Card>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card isDark={darkMode}>
            <h3
              className={`font-bold text-lg mb-4 ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Category Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_SALES}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {CATEGORY_SALES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card isDark={darkMode}>
            <h3
              className={`font-bold text-lg mb-4 ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Top Performing Products
            </h3>
            <div className="space-y-3">
              {products
                .sort((a, b) => b.salesLast7Days - a.salesLast7Days)
                .slice(0, 4)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Package
                          size={16}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-slate-500">
                          {product.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${(product.price * product.salesLast7Days).toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {product.salesLast7Days} sales
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>

        {/* Full AI Report Modal */}
        {showFullReport && forecast && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card
              isDark={darkMode}
              className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-6 p-6 pb-0">
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    AI Sales Forecast Report
                  </h2>
                  <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
                    {salesTimeframe === "7days"
                      ? "7-Day"
                      : salesTimeframe === "30days"
                      ? "30-Day"
                      : "Annual"}{" "}
                    Analysis
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={handleDownloadReport}
                    icon={Download}
                  >
                    Download
                  </Button>
                  <button
                    onClick={() => setShowFullReport(false)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                  >
                    <X className="text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`p-4 rounded-xl border ${
                      darkMode
                        ? "border-slate-700 bg-slate-800/50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <p className="text-sm text-slate-500 mb-1">Prediction</p>
                    <p className="font-bold text-lg">{forecast.prediction}</p>
                  </div>
                  <div
                    className={`p-4 rounded-xl border ${
                      darkMode
                        ? "border-slate-700 bg-slate-800/50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <p className="text-sm text-slate-500 mb-1">Confidence</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                          style={{ width: `${forecast.confidence}%` }}
                        ></div>
                      </div>
                      <span className="font-bold">{forecast.confidence}%</span>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-xl border ${
                      darkMode
                        ? "border-slate-700 bg-slate-800/50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <p className="text-sm text-slate-500 mb-1">Timeframe</p>
                    <p className="font-bold">
                      {salesTimeframe === "7days"
                        ? "7 Days"
                        : salesTimeframe === "30days"
                        ? "30 Days"
                        : "12 Months"}
                    </p>
                  </div>
                </div>

                <div>
                  <h3
                    className={`font-bold mb-3 ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Key Factors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {forecast.factors.map((factor, idx) => (
                      <Badge key={idx} variant="blue">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3
                    className={`font-bold mb-3 ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    AI Recommendations
                  </h3>
                  <div className="space-y-3">
                    {forecast.recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 p-3 rounded-lg ${
                          darkMode ? "bg-slate-800/50" : "bg-slate-50"
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Sparkles
                            size={12}
                            className="text-blue-600 dark:text-blue-400"
                          />
                        </div>
                        <p>{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border ${
                    darkMode
                      ? "border-blue-500/30 bg-blue-900/10"
                      : "border-blue-200 bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BrainCircuit className="text-blue-500" />
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      AI Insight
                    </p>
                  </div>
                  <p className="text-sm">
                    Based on historical data and current trends, implementing
                    these recommendations could increase revenue by 15-22% in
                    the selected timeframe.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex justify-end">
                <Button onClick={() => setShowFullReport(false)}>
                  Close Report
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const ProductManagementView = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [generatingDesc, setGeneratingDesc] = useState(false);
    const [predictingCat, setPredictingCat] = useState(false);
    const [showPriceOptimization, setShowPriceOptimization] = useState(null);

    const handleGenerateDesc = async () => {
      setGeneratingDesc(true);
      const desc = await EnhancedAIService.generateProductDescription(
        editForm.name || "New Product",
        editForm.category
      );
      setEditForm((prev) => ({ ...prev, description: desc }));
      setGeneratingDesc(false);
    };

    const handlePredictCategory = async () => {
      if (!editForm.name) return;
      setPredictingCat(true);
      const cat = await EnhancedAIService.predictCategory(editForm.name);
      setEditForm((prev) => ({ ...prev, category: cat }));
      setPredictingCat(false);
    };

    const handleOptimizePrice = async (product) => {
      const optimization = await EnhancedAIService.optimizePricing(product);
      setShowPriceOptimization(optimization);
    };

    const handleSave = () => {
      const price = parseFloat(editForm.price) || 0;
      const stock = parseInt(editForm.stock) || 0;
      const cost = parseFloat(editForm.cost) || price * 0.7;
      if (editForm.id) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editForm.id ? { ...editForm, price, stock, cost } : p
          )
        );
        addNotification("Product updated successfully", "success");
        logAction("PRODUCT_EDIT", `Updated ${editForm.name}`);
      } else {
        const newProd = {
          ...editForm,
          id: Date.now(),
          salesLast7Days: 0,
          price,
          stock,
          cost,
          profitMargin: (((price - cost) / price) * 100).toFixed(1),
          reorderPoint: 10,
          supplier: "Default Supplier",
        };
        setProducts((prev) => [...prev, newProd]);
        addNotification("Product created successfully", "success");
        logAction("PRODUCT_ADD", `Created ${editForm.name}`);
      }
      setIsEditing(false);
    };

    return (
      <div className="p-8 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Product Management
          </h2>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              icon={Filter}
              onClick={() =>
                addNotification("Filter feature coming soon", "info")
              }
            >
              Filter
            </Button>
            <Button
              onClick={() => {
                setIsEditing(true);
                setEditForm({});
              }}
              icon={Plus}
            >
              Add Product
            </Button>
          </div>
        </div>

        <Card isDark={darkMode} noPadding>
          <table
            className={`w-full text-sm text-left ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            <thead
              className={`font-bold uppercase text-xs ${
                darkMode
                  ? "bg-slate-800 text-slate-400"
                  : "bg-slate-50 text-slate-500"
              }`}
            >
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Margin</th>
                <th className="px-6 py-4">Sales (7d)</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                darkMode ? "divide-slate-700" : "divide-slate-100"
              }`}
            >
              {products.map((p) => (
                <tr
                  key={p.id}
                  className={`${
                    darkMode ? "hover:bg-slate-800" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div
                        className={`font-bold ${
                          darkMode ? "text-white" : "text-slate-800"
                        }`}
                      >
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {p.sku} • {p.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold">${p.price.toFixed(2)}</div>
                    <div className="text-xs text-slate-500">
                      Cost: ${p.cost?.toFixed(2) || (p.price * 0.7).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        p.stock < settings.lowStock
                          ? "danger"
                          : p.stock < (p.reorderPoint || 15)
                          ? "warning"
                          : "success"
                      }
                    >
                      {p.stock} units
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`font-bold ${
                        (p.profitMargin ||
                          ((p.price - (p.cost || p.price * 0.7)) / p.price) *
                            100) > 30
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {p.profitMargin?.toFixed(1) ||
                        (
                          ((p.price - (p.cost || p.price * 0.7)) / p.price) *
                          100
                        ).toFixed(1)}
                      %
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={12} className="text-emerald-500" />
                      <span>{p.salesLast7Days}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right gap-2 flex justify-end">
                    <button
                      onClick={() => handleOptimizePrice(p)}
                      className="text-purple-500 hover:text-purple-700 px-2"
                      title="AI Price Optimization"
                    >
                      <Zap size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setEditForm(p);
                        setIsEditing(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 px-2"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${p.name}?`)) {
                          setProducts((prev) =>
                            prev.filter((x) => x.id !== p.id)
                          );
                          logAction("PRODUCT_DELETE", `Deleted ${p.name}`);
                        }
                      }}
                      className="text-rose-500 hover:text-rose-700 px-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {isEditing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card
              isDark={darkMode}
              className="w-full max-w-xl animate-in fade-in zoom-in duration-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h3
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {editForm.id ? "Edit Product" : "Add New Product"}
                </h3>
                <button onClick={() => setIsEditing(false)}>
                  <X className="text-slate-400 hover:text-slate-600" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    isDark={darkMode}
                    label="Product Name"
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    placeholder="e.g. Blue T-Shirt"
                  />
                  <Input
                    isDark={darkMode}
                    label="SKU"
                    value={editForm.sku || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, sku: e.target.value })
                    }
                    placeholder="GEN-001"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    isDark={darkMode}
                    label="Price ($)"
                    type="number"
                    step="0.01"
                    value={editForm.price || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                  />
                  <Input
                    isDark={darkMode}
                    label="Cost ($)"
                    type="number"
                    step="0.01"
                    value={editForm.cost || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, cost: e.target.value })
                    }
                    placeholder="Cost price"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    isDark={darkMode}
                    label="Initial Stock"
                    type="number"
                    value={editForm.stock || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stock: e.target.value })
                    }
                  />
                  <div>
                    <label
                      className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${
                        darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Category
                    </label>
                    <div className="flex gap-2">
                      <input
                        className={`flex-1 px-4 py-2.5 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                            : "bg-white/50 border-slate-200 text-slate-800 focus:border-blue-500"
                        }`}
                        value={editForm.category || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, category: e.target.value })
                        }
                      />
                      <Button
                        variant="secondary"
                        onClick={handlePredictCategory}
                        disabled={predictingCat || !editForm.name}
                        className="whitespace-nowrap"
                      >
                        {predictingCat ? (
                          <RefreshCw size={14} className="animate-spin" />
                        ) : (
                          <Wand2 size={14} />
                        )}{" "}
                        AI Detect
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      className={`text-xs font-bold uppercase tracking-wider ${
                        darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Description
                    </label>
                    <button
                      onClick={handleGenerateDesc}
                      disabled={generatingDesc || !editForm.name}
                      className="text-xs flex items-center gap-1 text-purple-500 font-bold hover:text-purple-400"
                    >
                      {generatingDesc ? (
                        <RefreshCw size={12} className="animate-spin" />
                      ) : (
                        <Sparkles size={12} />
                      )}{" "}
                      AI Generate
                    </button>
                  </div>
                  <textarea
                    className={`w-full px-4 py-2.5 rounded-xl border-2 outline-none transition-all h-24 resize-none ${
                      darkMode
                        ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                        : "bg-white/50 border-slate-200 text-slate-800 focus:border-blue-500"
                    }`}
                    value={editForm.description || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    placeholder="Product description..."
                  ></textarea>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button className="flex-1" onClick={handleSave}>
                    Save Product
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {showPriceOptimization && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card isDark={darkMode} className="w-96 p-6">
              <h3
                className={`font-bold text-lg mb-4 ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                AI Price Optimization
              </h3>
              <div className="space-y-4">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-slate-800/50" : "bg-slate-50"
                  }`}
                >
                  <p className="text-xs text-slate-500">Current Price</p>
                  <p className="font-bold text-lg">
                    ${showPriceOptimization.currentPrice}
                  </p>
                  <p className="text-sm text-slate-500">
                    Margin: {showPriceOptimization.currentMargin}%
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-blue-900/20" : "bg-blue-50"
                  } border border-blue-200`}
                >
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    AI Suggestion
                  </p>
                  <p className="font-bold text-lg">
                    ${showPriceOptimization.suggestedPrice}
                  </p>
                  <p className="text-sm">{showPriceOptimization.suggestion}</p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-emerald-900/20" : "bg-emerald-50"
                  }`}
                >
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Expected Impact
                  </p>
                  <p className="text-sm">
                    {showPriceOptimization.expectedImpact}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Confidence: {showPriceOptimization.confidence}%
                  </p>
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => setShowPriceOptimization(null)}
                  >
                    Keep Current
                  </Button>
                  <Button
                    onClick={() => {
                      setProducts((prev) =>
                        prev.map((p) =>
                          p.id === editForm.id
                            ? {
                                ...p,
                                price: showPriceOptimization.suggestedPrice,
                              }
                            : p
                        )
                      );
                      setShowPriceOptimization(null);
                      addNotification(
                        "Price updated based on AI optimization",
                        "success"
                      );
                    }}
                  >
                    Apply AI Price
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const InventoryView = () => {
    const [restockModal, setRestockModal] = useState(null);
    const [amount, setAmount] = useState(10);
    const lowStockCount = products.filter(
      (p) => p.stock < settings.lowStock
    ).length;

    const handleRestock = () => {
      if (!restockModal) return;
      setProducts((prev) =>
        prev.map((p) =>
          p.id === restockModal.id
            ? { ...p, stock: p.stock + parseInt(amount) }
            : p
        )
      );
      addNotification(
        `Restocked ${restockModal.name} by ${amount} units.`,
        "success"
      );
      logAction(
        "INVENTORY_RESTOCK",
        `Added ${amount} units to ${restockModal.name}`
      );
      setRestockModal(null);
    };

    const handleDownloadReport = () => {
      const reportData = {
        generated: new Date().toISOString(),
        totalProducts: products.length,
        lowStockItems: products.filter((p) => p.stock < settings.lowStock)
          .length,
        outOfStock: products.filter((p) => p.stock === 0).length,
        totalInventoryValue: products.reduce(
          (sum, p) => sum + p.price * p.stock,
          0
        ),
        products: products.map((p) => ({
          name: p.name,
          sku: p.sku,
          stock: p.stock,
          price: p.price,
          category: p.category,
          status: p.stock < settings.lowStock ? "Low Stock" : "In Stock",
        })),
      };

      const dataStr = JSON.stringify(reportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `inventory-report-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addNotification("Inventory report downloaded", "success");
    };

    return (
      <div className="p-8 h-full overflow-y-auto">
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Inventory Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card
            isDark={darkMode}
            className="flex items-center gap-4 border-l-4 border-blue-500"
          >
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Package size={24} />
            </div>
            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Total SKUs
              </p>
              <p
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                {products.length}
              </p>
            </div>
          </Card>
          <Card
            isDark={darkMode}
            className="flex items-center gap-4 border-l-4 border-rose-500"
          >
            <div className="p-3 bg-rose-100 text-rose-600 rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Low Stock
              </p>
              <p
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                {lowStockCount} Items
              </p>
            </div>
          </Card>
          <Card
            isDark={darkMode}
            className="flex items-center gap-4 border-l-4 border-emerald-500"
          >
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <Truck size={24} />
            </div>
            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Total Value
              </p>
              <p
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                {formatCurrency(
                  products.reduce((sum, p) => sum + p.price * p.stock, 0)
                )}
              </p>
            </div>
          </Card>
        </div>

        <Card isDark={darkMode} noPadding>
          <div
            className={`p-4 border-b flex justify-between ${
              darkMode ? "border-slate-700" : "border-slate-100"
            }`}
          >
            <h3
              className={`font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Stock Levels
            </h3>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                icon={Download}
                className="text-xs"
                onClick={handleDownloadReport}
              >
                Download Report
              </Button>
              {settings.autoRestock && (
                <Badge variant="success">Auto-Restock Enabled</Badge>
              )}
            </div>
          </div>
          <table
            className={`w-full text-sm text-left ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            <thead
              className={`font-bold uppercase text-xs ${
                darkMode
                  ? "bg-slate-800 text-slate-400"
                  : "bg-slate-50 text-slate-500"
              }`}
            >
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Reorder At</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                darkMode ? "divide-slate-700" : "divide-slate-100"
              }`}
            >
              {products.map((p) => (
                <tr
                  key={p.id}
                  className={`${
                    darkMode ? "hover:bg-slate-800" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium">
                    {p.name}{" "}
                    <span className="text-xs text-slate-400 block">
                      {p.sku}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        p.stock === 0
                          ? "danger"
                          : p.stock < settings.lowStock
                          ? "warning"
                          : "success"
                      }
                    >
                      {p.stock === 0
                        ? "Out of Stock"
                        : p.stock < settings.lowStock
                        ? "Low Stock"
                        : "In Stock"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-mono">{p.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-medium ${
                        p.stock <= (p.reorderPoint || 10)
                          ? "text-rose-600"
                          : "text-slate-600"
                      }`}
                    >
                      {p.reorderPoint || 10}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant={
                        p.stock < settings.lowStock ? "warning" : "secondary"
                      }
                      size="sm"
                      onClick={() => setRestockModal(p)}
                    >
                      Restock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {restockModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card isDark={darkMode} className="w-96 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`font-bold text-lg ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Restock {restockModal.name}
                </h3>
                <button onClick={() => setRestockModal(null)}>
                  <X className="text-slate-400 hover:text-slate-600" />
                </button>
              </div>
              <div className="space-y-4">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-slate-800/50" : "bg-slate-50"
                  }`}
                >
                  <p className="text-sm text-slate-500">Current Stock</p>
                  <p className="font-bold text-lg">
                    {restockModal.stock} units
                  </p>
                </div>
                <Input
                  isDark={darkMode}
                  label="Quantity to Add"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mb-4"
                />
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-blue-900/20" : "bg-blue-50"
                  }`}
                >
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    AI Recommendation
                  </p>
                  <p className="text-sm">
                    Suggested: {Math.max(restockModal.reorderPoint || 10, 20)}{" "}
                    units
                  </p>
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="secondary"
                    onClick={() => setRestockModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleRestock}>Confirm Restock</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const CustomersView = () => {
    const [isAddMode, setIsAddMode] = useState(false);
    const [newCustomer, setNewCustomer] = useState({});
    const [analyzing, setAnalyzing] = useState(null);
    const [customerInsights, setCustomerInsights] = useState({});
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleAddCustomer = () => {
      const customer = {
        ...newCustomer,
        id: Date.now(),
        points: 0,
        lastVisit: new Date().toISOString().split("T")[0],
        segment: "New",
        totalSpent: 0,
        visitCount: 1,
      };
      setCustomers((prev) => [...prev, customer]);
      addNotification("Customer profile created.", "success");
      logAction("CRM_ADD", `Added customer ${newCustomer.name}`);
      setIsAddMode(false);
      setNewCustomer({});
      setSelectedCustomer(customer);
    };

    const handleAnalyze = async (customer) => {
      setAnalyzing(customer.id);
      try {
        const insights = await EnhancedAIService.analyzeCustomerSegment(
          customer
        );
        setCustomerInsights((prev) => ({ ...prev, [customer.id]: insights }));
        addNotification(
          `AI insights generated for ${customer.name}`,
          "success"
        );
      } catch (error) {
        addNotification("Failed to generate insights", "error");
      } finally {
        setAnalyzing(null);
      }
    };

    const handleSendOffer = (customer, offerType) => {
      const offers = {
        discount: `20% discount code sent to ${customer.email}`,
        vip: `VIP invitation sent to ${customer.name}`,
        loyalty: `Loyalty program details sent to ${customer.email}`,
      };
      addNotification(offers[offerType], "success");
      logAction("CRM_OFFER", `${offerType} offer sent to ${customer.name}`);
    };

    return (
      <div className="p-8 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Customer Relationship Management
            </h2>
            <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
              Manage customer profiles, segments, and AI-driven insights
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              icon={Filter}
              onClick={() =>
                addNotification("Advanced filtering coming soon", "info")
              }
            >
              Filter
            </Button>
            <Button icon={UserPlus} onClick={() => setIsAddMode(true)}>
              Add Customer
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {customers.map((c) => (
            <Card
              key={c.id}
              isDark={darkMode}
              className={`p-6 relative group hover:border-blue-400 transition-colors ${
                selectedCustomer?.id === c.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedCustomer(c)}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                  ${
                    c.segment === "VIP"
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                      : c.segment === "Regular"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                      : "bg-gradient-to-r from-slate-500 to-slate-600"
                  }`}
                >
                  {c.name.charAt(0)}
                </div>
                <Badge
                  variant={
                    c.segment === "VIP"
                      ? "vip"
                      : c.segment === "Regular"
                      ? "blue"
                      : "default"
                  }
                >
                  {c.segment}
                </Badge>
              </div>
              <h3
                className={`font-bold text-lg ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                {c.name}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {c.email}
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div
                  className={`p-2 rounded ${
                    darkMode ? "bg-slate-800" : "bg-slate-50"
                  }`}
                >
                  <p className="text-xs text-slate-400">Loyalty Pts</p>
                  <p
                    className={`font-bold ${
                      darkMode ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {c.points}
                  </p>
                </div>
                <div
                  className={`p-2 rounded ${
                    darkMode ? "bg-slate-800" : "bg-slate-50"
                  }`}
                >
                  <p className="text-xs text-slate-400">Total Spent</p>
                  <p
                    className={`font-bold ${
                      darkMode ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {formatCurrency(c.totalSpent || 0)}
                  </p>
                </div>
              </div>

              {customerInsights[c.id] && (
                <div
                  className={`p-3 rounded-lg mb-3 ${
                    darkMode ? "bg-slate-800/50" : "bg-blue-50"
                  }`}
                >
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
                    AI Insights
                  </p>
                  {customerInsights[c.id].map((insight, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="font-medium">{insight.segment}</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {insight.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1 text-xs"
                  onClick={() => handleAnalyze(c)}
                  disabled={analyzing === c.id}
                >
                  {analyzing === c.id ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <>
                      <BrainCircuit size={14} /> AI Insights
                    </>
                  )}
                </Button>
                {c.segment === "VIP" && (
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleSendOffer(c, "vip")}
                    icon={Star}
                  >
                    VIP Offer
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {selectedCustomer && (
          <div className="mt-6">
            <Card isDark={darkMode}>
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`font-bold text-lg ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Customer Details: {selectedCustomer.name}
                </h3>
                <button onClick={() => setSelectedCustomer(null)}>
                  <X className="text-slate-400 hover:text-slate-600" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4
                    className={`font-bold mb-3 ${
                      darkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Profile Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="font-medium">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <p className="font-medium">{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Last Visit</p>
                      <p className="font-medium">
                        {selectedCustomer.lastVisit}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4
                    className={`font-bold mb-3 ${
                      darkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Purchase Statistics
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500">Total Visits</p>
                      <p className="font-medium">
                        {selectedCustomer.visitCount || 1}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Average Spend</p>
                      <p className="font-medium">
                        {formatCurrency(
                          (selectedCustomer.totalSpent || 0) /
                            (selectedCustomer.visitCount || 1)
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Loyalty Points</p>
                      <div className="flex items-center gap-2">
                        <Star className="text-amber-500" size={16} />
                        <p className="font-medium">{selectedCustomer.points}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h4
                  className={`font-bold mb-3 ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Quick Actions
                </h4>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleSendOffer(selectedCustomer, "discount")
                    }
                  >
                    Send Discount
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleSendOffer(selectedCustomer, "loyalty")}
                  >
                    Loyalty Program
                  </Button>
                  <Button
                    onClick={() => {
                      setActiveCustomer(selectedCustomer);
                      setCurrentView("pos");
                      addNotification(
                        `Customer ${selectedCustomer.name} selected for POS`,
                        "success"
                      );
                    }}
                  >
                    Start Sale
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {isAddMode && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card isDark={darkMode} className="w-96 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`font-bold text-lg ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  New Customer
                </h3>
                <button onClick={() => setIsAddMode(false)}>
                  <X className="text-slate-400 hover:text-slate-600" />
                </button>
              </div>
              <div className="space-y-3">
                <Input
                  isDark={darkMode}
                  label="Name"
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                />
                <Input
                  isDark={darkMode}
                  label="Email"
                  type="email"
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                />
                <Input
                  isDark={darkMode}
                  label="Phone"
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                />
                <div className="flex gap-2 justify-end mt-4 pt-2">
                  <Button
                    variant="secondary"
                    onClick={() => setIsAddMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCustomer}>Create Profile</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const SettingsView = () => {
    const [activeTab, setActiveTab] = useState("general");
    const [localSettings, setLocalSettings] = useState(settings);

    const handleSave = () => {
      setSettings(localSettings);
      logAction("SETTINGS_UPDATE", "System configuration updated");
      addNotification("Settings Saved", "success");
    };

    const handleExportLogs = () => {
      const logsData = {
        exportDate: new Date().toISOString(),
        totalLogs: auditLogs.length,
        logs: auditLogs,
      };

      const dataStr = JSON.stringify(logsData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `audit-logs-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addNotification("Audit logs exported", "success");
    };

    return (
      <div className="p-8 h-full overflow-y-auto max-w-5xl mx-auto">
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Settings & System Configuration
        </h2>
        <div className="flex gap-6">
          <Card
            isDark={darkMode}
            noPadding
            className="w-64 h-fit overflow-hidden"
          >
            {[
              { id: "general", label: "General Config", icon: Settings },
              { id: "logs", label: "Audit Logs", icon: FileText },
              { id: "appearance", label: "Appearance", icon: Moon },
              { id: "ai", label: "AI Settings", icon: BrainCircuit },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 p-4 text-sm font-medium transition-colors border-l-4 ${
                  activeTab === tab.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </Card>
          <div className="flex-1">
            {activeTab === "general" && (
              <Card isDark={darkMode} className="space-y-6">
                <h3
                  className={`font-bold border-b pb-4 mb-4 ${
                    darkMode
                      ? "text-white border-slate-700"
                      : "text-slate-800 border-slate-100"
                  }`}
                >
                  Store Configuration
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    isDark={darkMode}
                    label="Store Name"
                    value={localSettings.storeName}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        storeName: e.target.value,
                      })
                    }
                  />
                  <Input
                    isDark={darkMode}
                    label="Currency Symbol"
                    value={localSettings.currency}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        currency: e.target.value,
                      })
                    }
                  />
                  <Input
                    isDark={darkMode}
                    label="Tax Rate (%)"
                    type="number"
                    step="0.1"
                    value={localSettings.taxRate}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        taxRate: parseFloat(e.target.value),
                      })
                    }
                  />
                  <Input
                    isDark={darkMode}
                    label="Low Stock Threshold"
                    type="number"
                    value={localSettings.lowStock}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        lowStock: parseInt(e.target.value),
                      })
                    }
                  />
                  <Input
                    isDark={darkMode}
                    label="Loyalty Points Rate"
                    type="number"
                    step="0.1"
                    value={localSettings.loyaltyPointsRate}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        loyaltyPointsRate: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="font-bold">Auto-Restock</p>
                    <p className="text-sm text-slate-500">
                      Automatically create purchase orders for low stock items
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setLocalSettings((prev) => ({
                        ...prev,
                        autoRestock: !prev.autoRestock,
                      }))
                    }
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${
                      localSettings.autoRestock
                        ? "bg-emerald-600"
                        : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 bg-white rounded-full absolute transition-transform ${
                        localSettings.autoRestock
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    ></span>
                  </button>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} icon={Save}>
                    Save Changes
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === "ai" && (
              <Card isDark={darkMode} className="space-y-6">
                <h3
                  className={`font-bold border-b pb-4 mb-4 ${
                    darkMode
                      ? "text-white border-slate-700"
                      : "text-slate-800 border-slate-100"
                  }`}
                >
                  AI Configuration
                </h3>
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-xl border ${
                      darkMode
                        ? "border-slate-700 bg-slate-800/50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <BrainCircuit className="text-purple-500" />
                      <p className="font-bold">AI Assistant</p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Enable AI-powered insights and recommendations throughout
                      the system
                    </p>
                    <button
                      onClick={() =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          enableAI: !prev.enableAI,
                        }))
                      }
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${
                        localSettings.enableAI
                          ? "bg-purple-600"
                          : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 bg-white rounded-full absolute transition-transform ${
                          localSettings.enableAI
                            ? "translate-x-7"
                            : "translate-x-1"
                        }`}
                      ></span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-xl border ${
                        darkMode ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <p className="font-bold text-sm mb-1">
                        Price Optimization
                      </p>
                      <p className="text-xs text-slate-500">
                        AI suggests optimal pricing based on market data
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-xl border ${
                        darkMode ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <p className="font-bold text-sm mb-1">
                        Sales Forecasting
                      </p>
                      <p className="text-xs text-slate-500">
                        Predict future sales trends and demand
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-xl border ${
                        darkMode ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <p className="font-bold text-sm mb-1">
                        Customer Insights
                      </p>
                      <p className="text-xs text-slate-500">
                        Personalized customer segmentation and recommendations
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-xl border ${
                        darkMode ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <p className="font-bold text-sm mb-1">
                        Inventory Prediction
                      </p>
                      <p className="text-xs text-slate-500">
                        Forecast inventory needs and optimize stock levels
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "logs" && (
              <Card isDark={darkMode} className="h-[600px] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`font-bold ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    System Audit Logs
                  </h3>
                  <Button
                    variant="secondary"
                    icon={Download}
                    onClick={handleExportLogs}
                  >
                    Export Logs
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2">
                  {auditLogs.length === 0 ? (
                    <p className="text-slate-500 italic">
                      No logs recorded in this session.
                    </p>
                  ) : (
                    <div className="relative border-l border-slate-200 dark:border-slate-700 ml-3 space-y-6">
                      {auditLogs.map((log, idx) => (
                        <div key={idx} className="ml-6 relative">
                          <span
                            className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                              darkMode
                                ? "bg-slate-800 border-blue-500"
                                : "bg-white border-blue-500"
                            }`}
                          ></span>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant={
                                log.action.includes("LOGIN")
                                  ? "success"
                                  : log.action.includes("SALE")
                                  ? "blue"
                                  : log.action.includes("ERROR")
                                  ? "danger"
                                  : "default"
                              }
                            >
                              {log.action}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {log.timestamp}
                            </span>
                          </div>
                          <p
                            className={`text-sm ${
                              darkMode ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            <span
                              className={`font-semibold ${
                                log.role === "admin"
                                  ? "text-purple-500"
                                  : log.role === "manager"
                                  ? "text-emerald-500"
                                  : log.role === "cashier"
                                  ? "text-orange-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {log.user} ({log.role})
                            </span>
                            : {log.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )}

            {activeTab === "appearance" && (
              <Card isDark={darkMode} className="space-y-6">
                <h3
                  className={`font-bold border-b pb-4 mb-4 ${
                    darkMode
                      ? "text-white border-slate-700"
                      : "text-slate-800 border-slate-100"
                  }`}
                >
                  Appearance
                </h3>
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${
                        darkMode
                          ? "bg-slate-700 text-white"
                          : "bg-orange-100 text-orange-500"
                      }`}
                    >
                      {darkMode ? <Moon size={24} /> : <Sun size={24} />}
                    </div>
                    <div>
                      <p
                        className={`font-bold ${
                          darkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Dark Mode
                      </p>
                      <p className="text-sm text-slate-500">
                        Toggle system-wide dark theme
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${
                      darkMode ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 bg-white rounded-full absolute transition-transform ${
                        darkMode ? "translate-x-7" : "translate-x-1"
                      }`}
                    ></span>
                  </button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Role-based navigation configuration
  const getNavigationItems = () => {
    const baseItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        color: "from-blue-500 to-cyan-500",
      },
      {
        id: "pos",
        label: "Point of Sale",
        icon: ScanLine,
        roles: [ROLES.ADMIN, ROLES.CASHIER, ROLES.MANAGER],
        color: "from-emerald-500 to-green-500",
      },
      {
        id: "products",
        label: "Products",
        icon: Package,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        color: "from-purple-500 to-indigo-500",
      },
      {
        id: "inventory",
        label: "Inventory",
        icon: BarChart3,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        color: "from-amber-500 to-orange-500",
      },
    ];

    // Admin only items
    if (user.role === ROLES.ADMIN) {
      baseItems.push(
        {
          id: "customers",
          label: "CRM",
          icon: Users,
          roles: [ROLES.ADMIN],
          color: "from-pink-500 to-rose-500",
        },
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          roles: [ROLES.ADMIN],
          color: "from-slate-500 to-slate-700",
        }
      );
    }

    // Manager specific items (different from admin)
    if (user.role === ROLES.MANAGER) {
      baseItems.push({
        id: "reports",
        label: "Reports",
        icon: FileText,
        roles: [ROLES.MANAGER],
        color: "from-indigo-500 to-purple-500",
      });
    }

    return baseItems;
  };

  if (!user) return <LoginView />;

  return (
    <div
      className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* SIDEBAR */}
      <aside
        className={`transition-all duration-300 z-20 flex flex-col border-r shadow-xl ${
          isSidebarOpen ? "w-64" : "w-20"
        } ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-100"
        }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-transparent">
          <div
            className={`w-10 h-10 bg-gradient-to-br ${
              user.role === ROLES.ADMIN
                ? "from-purple-600 to-indigo-600"
                : user.role === ROLES.MANAGER
                ? "from-emerald-600 to-green-600"
                : "from-orange-600 to-red-600"
            } rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20`}
          >
            {user.role === ROLES.ADMIN ? (
              <Settings size={22} />
            ) : user.role === ROLES.MANAGER ? (
              <Users size={22} />
            ) : (
              <ShoppingCart size={22} />
            )}
          </div>
          {isSidebarOpen && (
            <div className="ml-3">
              <span
                className={`font-bold text-xl tracking-tight ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                ShopSmart
              </span>
              <div className="text-xs font-medium text-slate-500 uppercase">
                {user.role}
              </div>
            </div>
          )}
        </div>
        <nav className="flex-1 py-6 px-3 space-y-2">
          {getNavigationItems()
            .filter((item) => item.roles.includes(user.role))
            .map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "reports") {
                    setCurrentView("dashboard");
                    addNotification(
                      "Reports view integrated into Dashboard",
                      "info"
                    );
                  } else {
                    setCurrentView(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative group ${
                  currentView === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600"
                }`}
              >
                <item.icon size={22} />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                  </div>
                )}
              </button>
            ))}
        </nav>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setUser(null)}
            className="w-full flex items-center gap-3 px-3 py-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <header
          className={`h-20 flex items-center justify-between px-8 z-10 border-b ${
            darkMode
              ? "bg-slate-900/80 border-slate-800"
              : "bg-white/80 border-slate-100"
          } backdrop-blur-md`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "hover:bg-slate-800 text-slate-400"
                  : "hover:bg-slate-100 text-slate-500"
              }`}
            >
              <Menu size={20} />
            </button>
            <h1
              className={`text-2xl font-bold capitalize ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              {currentView.replace("-", " ")}
              {user.role === ROLES.MANAGER &&
                currentView === "dashboard" &&
                " (Manager View)"}
              {user.role === ROLES.CASHIER &&
                currentView === "pos" &&
                " - Quick Sale"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {settings.enableAI && (
              <button
                onClick={() => setAIChatOpen(!isAIChatOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  isAIChatOpen
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-transparent"
                    : darkMode
                    ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <BrainCircuit size={18} />
                <span className="text-sm font-medium">AI Assistant</span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              </button>
            )}
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-full border ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-sm ${
                  user.role === ROLES.ADMIN
                    ? "from-purple-500 to-indigo-500"
                    : user.role === ROLES.MANAGER
                    ? "from-emerald-500 to-green-500"
                    : "from-orange-500 to-red-500"
                }`}
              >
                {user.avatar}
              </div>
              <div className="text-sm">
                <p
                  className={`font-bold leading-none ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {user.name}
                </p>
                <p
                  className={`text-xs uppercase font-semibold ${
                    user.role === ROLES.ADMIN
                      ? "text-purple-500"
                      : user.role === ROLES.MANAGER
                      ? "text-emerald-500"
                      : "text-orange-500"
                  }`}
                >
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {currentView === "dashboard" && <DashboardView />}
          {currentView === "pos" && <POSView />}
          {currentView === "products" && <ProductManagementView />}
          {currentView === "inventory" && <InventoryView />}
          {currentView === "customers" && <CustomersView />}
          {currentView === "settings" && <SettingsView />}

          {/* AI CHAT SIDEBAR */}
          {isAIChatOpen && (
            <div
              className={`absolute right-0 top-0 bottom-0 w-96 shadow-2xl border-l flex flex-col z-30 animate-in slide-in-from-right duration-300 ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="p-4 border-b border-indigo-500/30 flex justify-between items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} />
                  <h3 className="font-bold">AI Assistant</h3>
                  <Badge variant="success" className="!text-xs !py-0.5">
                    Live
                  </Badge>
                </div>
                <button
                  onClick={() => setAIChatOpen(false)}
                  className="hover:bg-white/20 p-1 rounded"
                >
                  <X size={18} />
                </button>
              </div>
              <div
                className={`flex-1 overflow-y-auto p-4 space-y-4 ${
                  darkMode ? "bg-slate-900" : "bg-slate-50"
                }`}
              >
                {aiMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-xl text-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none"
                          : darkMode
                          ? "bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none"
                          : "bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {aiTyping && (
                  <div className="flex justify-start">
                    <div
                      className={`px-4 py-3 rounded-xl rounded-bl-none flex gap-1 ${
                        darkMode
                          ? "bg-slate-800"
                          : "bg-white border border-slate-200"
                      }`}
                    >
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}
              </div>
              <form
                onSubmit={handleAIChatSubmit}
                className={`p-4 border-t ${
                  darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="relative">
                  <input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask about sales, stock, customers..."
                    className={`w-full pl-4 pr-10 py-3 rounded-xl border outline-none text-sm ${
                      darkMode
                        ? "bg-slate-800 border-slate-700 text-white focus:border-indigo-500"
                        : "bg-slate-50 border-slate-200 focus:ring-2 focus:ring-indigo-500"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={!aiInput.trim() || aiTyping}
                    className="absolute right-2 top-2 p-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      setAiInput("What are today's sales predictions?")
                    }
                    className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Sales Forecast
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setAiInput("Which products need restocking?")
                    }
                    className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Inventory Check
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiInput("Give me customer insights")}
                    className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Customer Insights
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* RECEIPT MODAL - Fixed close button */}
        {showReceipt && lastOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[90vh] print:hidden">
              <div className="p-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-center relative">
                <CheckCircle
                  className="mx-auto mb-3 text-emerald-400"
                  size={48}
                />
                <h2 className="text-2xl font-bold">Payment Successful</h2>
                <p className="text-slate-300 text-sm mt-1">
                  Order confirmed and receipt generated
                </p>
              </div>

              <div className="p-6 bg-white flex-1 overflow-y-auto">
                <div className="text-center mb-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building2 className="text-slate-600" size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xl uppercase tracking-wider">
                      {settings.storeName}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      OFFICIAL RECEIPT
                    </p>
                  </div>
                  <div className="inline-block px-4 py-2 bg-slate-100 rounded-full">
                    <p className="text-sm font-mono text-slate-700">
                      Order #{lastOrder.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Order Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider">
                        Date
                      </p>
                      <p className="font-medium text-slate-900">
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider">
                        Time
                      </p>
                      <p className="font-medium text-slate-900">
                        {new Date().toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 p-3 grid grid-cols-12 text-xs font-medium text-slate-700 uppercase tracking-wider">
                      <div className="col-span-7">Description</div>
                      <div className="col-span-2 text-center">Qty</div>
                      <div className="col-span-3 text-right">Amount</div>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {lastOrder.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 grid grid-cols-12 text-sm"
                        >
                          <div className="col-span-7 font-medium text-slate-900">
                            {item.name}
                          </div>
                          <div className="col-span-2 text-center text-slate-600">
                            {item.qty}
                          </div>
                          <div className="col-span-3 text-right font-medium text-slate-900">
                            ${(item.price * item.qty).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium">
                        $
                        {lastOrder.subtotal?.toFixed(2) ||
                          lastOrder.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Tax</span>
                      <span className="font-medium">
                        ${(lastOrder.tax || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                      <span>TOTAL</span>
                      <span>${lastOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                      Payment Method
                    </p>
                    <p className="font-medium text-slate-900">
                      {lastOrder.paymentMethod || "Credit Card"}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Transaction ID: TX-
                      {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-2">
                      Thank you for your purchase!
                      <br />
                      This receipt is valid for tax purposes.
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-[10px] text-slate-400">
                      <span>Powered by</span>
                      <ShoppingBag size={10} />
                      <span className="font-medium">ShopSmart.ai</span>
                      <span>• {window.location.hostname}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setShowReceipt(false)}
                >
                  Close
                </Button>
                <Button
                  className="flex-1 bg-slate-800 hover:bg-slate-900"
                  icon={Printer}
                  onClick={() => {
                    const printWindow = window.open("", "_blank");
                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>Receipt - Order #${lastOrder.id}</title>
                          <style>
                            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                            body { 
                              font-family: 'Inter', sans-serif; 
                              margin: 0; 
                              padding: 40px; 
                              background: white;
                              color: #1e293b;
                            }
                            @media print {
                              @page { margin: 0; size: auto; }
                              body { padding: 20px; }
                            }
                            .receipt-container {
                              max-width: 600px;
                              margin: 0 auto;
                              border: 1px solid #e2e8f0;
                              border-radius: 8px;
                              padding: 40px;
                              background: white;
                            }
                            .header {
                              text-align: center;
                              margin-bottom: 30px;
                              padding-bottom: 20px;
                              border-bottom: 2px solid #0f172a;
                            }
                            .store-name {
                              font-size: 28px;
                              font-weight: 700;
                              color: #0f172a;
                              letter-spacing: 1px;
                              margin-bottom: 5px;
                            }
                            .document-title {
                              font-size: 12px;
                              color: #64748b;
                              text-transform: uppercase;
                              letter-spacing: 2px;
                              margin-bottom: 15px;
                            }
                            .order-number {
                              display: inline-block;
                              background: #f1f5f9;
                              padding: 8px 16px;
                              border-radius: 20px;
                              font-family: monospace;
                              font-size: 14px;
                              color: #475569;
                            }
                            .info-grid {
                              display: grid;
                              grid-template-columns: 1fr 1fr;
                              gap: 20px;
                              margin-bottom: 30px;
                              font-size: 14px;
                            }
                            .info-label {
                              color: #64748b;
                              font-size: 11px;
                              text-transform: uppercase;
                              letter-spacing: 1px;
                              margin-bottom: 4px;
                            }
                            .items-table {
                              width: 100%;
                              border-collapse: collapse;
                              margin-bottom: 30px;
                            }
                            .items-table thead {
                              background: #f8fafc;
                              border-top: 1px solid #e2e8f0;
                              border-bottom: 1px solid #e2e8f0;
                            }
                            .items-table th {
                              padding: 12px;
                              text-align: left;
                              font-size: 11px;
                              color: #64748b;
                              text-transform: uppercase;
                              letter-spacing: 1px;
                              font-weight: 600;
                            }
                            .items-table td {
                              padding: 12px;
                              border-bottom: 1px solid #f1f5f9;
                              font-size: 14px;
                            }
                            .totals {
                              border-top: 2px solid #e2e8f0;
                              padding-top: 20px;
                              margin-top: 20px;
                            }
                            .total-row {
                              display: flex;
                              justify-content: space-between;
                              margin-bottom: 8px;
                              font-size: 14px;
                            }
                            .grand-total {
                              font-size: 18px;
                              font-weight: 700;
                              color: #0f172a;
                              margin-top: 10px;
                              padding-top: 10px;
                              border-top: 1px solid #e2e8f0;
                            }
                            .payment-info {
                              background: #f8fafc;
                              padding: 16px;
                              border-radius: 6px;
                              margin: 30px 0;
                              font-size: 14px;
                            }
                            .footer {
                              text-align: center;
                              margin-top: 40px;
                              padding-top: 20px;
                              border-top: 1px solid #e2e8f0;
                              font-size: 12px;
                              color: #64748b;
                            }
                            .watermark {
                              opacity: 0.1;
                              position: fixed;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%) rotate(-45deg);
                              font-size: 120px;
                              color: #0f172a;
                              pointer-events: none;
                              z-index: -1;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="receipt-container">
                            <div class="header">
                              <div class="store-name">${
                                settings.storeName
                              }</div>
                              <div class="document-title">OFFICIAL RECEIPT</div>
                              <div class="order-number">Order #${
                                lastOrder.id
                              }</div>
                            </div>
                            
                            <div class="info-grid">
                              <div>
                                <div class="info-label">Date</div>
                                <div>${new Date().toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}</div>
                              </div>
                              <div>
                                <div class="info-label">Time</div>
                                <div>${new Date().toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}</div>
                              </div>
                            </div>
                            
                            <table class="items-table">
                              <thead>
                                <tr>
                                  <th>Item</th>
                                  <th style="text-align: center">Qty</th>
                                  <th style="text-align: right">Price</th>
                                  <th style="text-align: right">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                ${lastOrder.items
                                  .map(
                                    (item) => `
                                  <tr>
                                    <td>${item.name}</td>
                                    <td style="text-align: center">${
                                      item.qty
                                    }</td>
                                    <td style="text-align: right">$${item.price.toFixed(
                                      2
                                    )}</td>
                                    <td style="text-align: right">$${(
                                      item.price * item.qty
                                    ).toFixed(2)}</td>
                                  </tr>
                                `
                                  )
                                  .join("")}
                              </tbody>
                            </table>
                            
                            <div class="totals">
                              <div class="total-row">
                                <span>Subtotal</span>
                                <span>$${
                                  lastOrder.subtotal?.toFixed(2) ||
                                  lastOrder.total.toFixed(2)
                                }</span>
                              </div>
                              <div class="total-row">
                                <span>Tax</span>
                                <span>$${(lastOrder.tax || 0).toFixed(2)}</span>
                              </div>
                              <div class="total-row grand-total">
                                <span>TOTAL</span>
                                <span>$${lastOrder.total.toFixed(2)}</span>
                              </div>
                            </div>
                            
                            <div class="payment-info">
                              <div class="info-label">Payment Method</div>
                              <div>${
                                lastOrder.paymentMethod || "Credit Card"
                              }</div>
                              <div style="margin-top: 8px; font-size: 12px; color: #475569;">
                                Transaction ID: TX-${Math.random()
                                  .toString(36)
                                  .substr(2, 9)
                                  .toUpperCase()}
                              </div>
                            </div>
                            
                            <div class="footer">
                              <div style="margin-bottom: 10px;">
                                Thank you for your business. This receipt is valid for tax purposes.<br>
                                Please retain this document for your records.
                              </div>
                              <div style="color: #94a3b8; font-size: 11px; margin-top: 15px;">
                                Generated by ShopSmart.ai • ${new Date().toLocaleDateString()} • ${
                      window.location.hostname
                    }
                              </div>
                            </div>
                          </div>
                          <div class="watermark">${settings.storeName}</div>
                          
                          <script>
                            window.onload = function() {
                              window.print();
                              setTimeout(() => window.close(), 1000);
                            }
                          </script>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                  }}
                >
                  Print Receipt
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-50 pointer-events-none">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 pointer-events-auto animate-in slide-in-from-right fade-in duration-300 border-l-4 ${
                n.type === "error"
                  ? "bg-gradient-to-r from-rose-50 to-white text-slate-800 border-rose-500"
                  : n.type === "success"
                  ? "bg-gradient-to-r from-emerald-50 to-white text-slate-800 border-emerald-500"
                  : n.type === "warning"
                  ? "bg-gradient-to-r from-amber-50 to-white text-slate-800 border-amber-500"
                  : "bg-gradient-to-r from-blue-50 to-white text-slate-800 border-blue-500"
              }`}
            >
              {n.type === "success" ? (
                <CheckCircle className="text-emerald-500" size={20} />
              ) : n.type === "error" ? (
                <AlertTriangle className="text-rose-500" size={20} />
              ) : n.type === "warning" ? (
                <AlertTriangle className="text-amber-500" size={20} />
              ) : (
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              )}
              <span className="font-medium text-sm">{n.msg}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
