import { useState, useEffect, useCallback } from "react";
import { Search, ShoppingCart, Bot, Home, Heart, Bell, User, Menu } from "lucide-react";
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import HelpScreen from "./screens/HelpScreen";
import AccountScreen from "./screens/AccountScreen";
import ResearchOverlay from "./research/ResearchOverlay.jsx";
import { useResearchOptional } from "./research/ResearchContext.jsx";
import "./research/research.css";
import "./App.css";

const TAB_ICONS = {
  home: Home,
  favorites: Heart,
  notifications: Bell,
  account: User,
  menu: Menu,
};

const TABS = [
  { id: "home", label: "首頁" },
  { id: "favorites", label: "我的最愛" },
  { id: "notifications", label: "通知一覽" },
  { id: "account", label: "我的帳戶" },
  { id: "menu", label: "主選單" },
];

const NAV_TABS = ["WOMEN", "MEN", "KIDS", "BABY"];

const persist = (key, val) => { try { sessionStorage.setItem(key, val); } catch {} };
const restore = (key, fallback) => { try { return sessionStorage.getItem(key) || fallback; } catch { return fallback; } };

export default function App() {
  const research = useResearchOptional();
  const report = research?.reportEvent;

  const [activeTab, setActiveTab] = useState(() => restore("uq_tab", "home"));
  const [activeNav, setActiveNav] = useState(() => {
    const tab = restore("uq_tab", "home");
    if (tab === "home") return null;
    const nav = restore("uq_nav", "MEN");
    return nav || null;
  });
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [cart, setCart] = useState([]);
  const [overlay, setOverlay] = useState(null);
  // overlay: null | { type: 'product'|'cart'|'help'|'categoryList', data?: any }

  const handleSearch = (q) => {
    report?.("search", { query: q });
    setSearchQuery(q);
    setShowSearch(false);
  };

  const handleBack = () => {
    if (searchQuery) {
      setSearchQuery(null);
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  const switchTab = (id) => { persist("uq_tab", id); setActiveTab(id); };
  const switchNav = (nav) => { persist("uq_nav", nav || ""); setActiveNav(nav); };

  const openProduct = (product, meta = {}) => {
    report?.("product_open", {
      product,
      searchQuery: meta.searchQuery ?? searchQuery ?? undefined,
    });
    setOverlay({ type: "product", data: product });
  };
  const openCart = () => setOverlay({ type: "cart" });
  const openHelp = () => {
    report?.("help_open", {});
    setOverlay({ type: "help" });
  };
  const openCategoryList = (categoryName, navOverride) => {
    const nav = navOverride || activeNav || "WOMEN";
    report?.("category_open", { category: categoryName, nav });
    setOverlay({ type: "categoryList", data: { categoryName, nav } });
  };
  const closeOverlay = () => setOverlay(null);

  const addToCart = (item) => {
    report?.("cart_add", { color: item.selectedColor, item });
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (idx) => {
    report?.("cart_remove", {});
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const resetToHome = useCallback(() => {
    switchTab("home");
    switchNav(null);
    setOverlay(null);
    setShowSearch(false);
    setSearchQuery(null);
  }, []);

  const resetToMenu = useCallback(() => {
    switchTab("menu");
    switchNav("MEN");
    setOverlay(null);
    setShowSearch(false);
    setSearchQuery(null);
  }, []);

  useEffect(() => {
    research?.registerResetToHome?.(resetToHome);
    research?.registerResetToMenu?.(resetToMenu);
  }, [research, resetToHome, resetToMenu]);

  const showOverlay = overlay !== null;
  const showMainChrome = !showOverlay && !showSearch && !searchQuery;

  const renderContent = () => {
    if (overlay?.type === "product") {
      return (
        <ProductDetailScreen
          product={overlay.data}
          onBack={closeOverlay}
          onAddToCart={(item) => {
            addToCart(item);
            closeOverlay();
          }}
        />
      );
    }
    if (overlay?.type === "cart") {
      return (
        <CartScreen
          cart={cart}
          onBack={closeOverlay}
          onRemoveItem={removeFromCart}
        />
      );
    }
    if (overlay?.type === "help") {
      return <HelpScreen onBack={closeOverlay} />;
    }
    if (overlay?.type === "categoryList") {
      return (
        <SearchResultsScreen
          query={overlay.data.categoryName}
          navContext={overlay.data.nav}
          onBack={closeOverlay}
          onProductClick={openProduct}
        />
      );
    }
    if (searchQuery) {
      return (
        <SearchResultsScreen
          query={searchQuery}
          onBack={handleBack}
          onProductClick={openProduct}
        />
      );
    }
    if (showSearch) {
      return (
        <SearchScreen
          onBack={() => setShowSearch(false)}
          onSearch={handleSearch}
          onOpenHelp={openHelp}
        />
      );
    }
    if (activeTab === "account") {
      return <AccountScreen onOpenHelp={openHelp} />;
    }
    if (activeTab === "menu") {
      return (
        <CategoryScreen
          activeNav={activeNav || "MEN"}
          onCategoryClick={openCategoryList}
        />
      );
    }
    return <HomeScreen />;
  };

  return (
    <div className="app-root">
      <div className="phone-frame">
        {/* Status Bar */}
        <div className="status-bar">
          <span className="status-time">1:41</span>
          <div className="status-icons">
            <span>▲▲▲</span>
            <span>WiFi</span>
            <span>61%</span>
          </div>
        </div>

        {/* Header — hidden on search screens and overlays */}
        {showMainChrome && (
          <header className="uq-header">
            <div
              className="uq-logo"
              style={{ cursor: "pointer" }}
              onClick={() => { switchTab("home"); switchNav(null); setOverlay(null); setShowSearch(false); setSearchQuery(null); }}
            >
              <img
                src="https://images.seeklogo.com/logo-png/16/2/uniqlo-logo-png_seeklogo-168431.png"
                alt="UNIQLO"
                style={{ height: 48, width: "auto", display: "block" }}
              />
            </div>
            <div className="header-icons">
              <button className="icon-btn" onClick={openHelp} aria-label="智能客服">
                <Bot size={22} strokeWidth={1.5} />
              </button>
              <button className="icon-btn" onClick={() => setShowSearch(true)} aria-label="搜尋">
                <Search size={22} strokeWidth={1.5} />
              </button>
              <button className="icon-btn" style={{ position: "relative" }} onClick={openCart} aria-label="購物車">
                <ShoppingCart size={22} strokeWidth={1.5} />
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </button>
            </div>
          </header>
        )}

        {/* Nav Tabs — outside scroll area, always visible */}
        {showMainChrome && activeTab !== "account" && (
          <nav className={`uq-nav ${activeTab === "home" ? "home-idle" : ""}`}>
            {NAV_TABS.map((tab) => (
              <button
                key={tab}
                className={`nav-item ${activeTab !== "home" && activeNav === tab ? "active" : ""}`}
                onClick={() => {
                  if (activeNav === tab && activeTab === "menu") return;
                  switchNav(tab);
                  switchTab("menu");
                }}
              >
                {{ WOMEN: "女裝", MEN: "男裝", KIDS: "童裝", BABY: "嬰兒" }[tab]}
              </button>
            ))}
            {activeTab !== "home" && activeNav && (
              <span
                className="nav-indicator"
                style={{
                  width: `${100 / NAV_TABS.length}%`,
                  transform: `translateX(${NAV_TABS.indexOf(activeNav) * 100}%)`,
                }}
              />
            )}
          </nav>
        )}

        {/* Screen Content */}
        <main className="screen-content" style={showOverlay ? { display: "flex", flexDirection: "column" } : {}}>
          {renderContent()}
        </main>

        {/* Bottom Tab Bar — hidden when overlay is open */}
        {!showOverlay && (
          <nav className="tab-bar">
            {TABS.map((tab) => {
              const Icon = TAB_ICONS[tab.id];
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`tab-item ${isActive ? "active" : ""}`}
                  onClick={() => {
                    switchTab(tab.id);
                    setShowSearch(false);
                    setSearchQuery(null);
                    if (tab.id === "home") switchNav(null);
                    if (tab.id === "menu" && !activeNav) switchNav("MEN");
                  }}
                >
                  <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                  <span className="tab-label">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}
        <ResearchOverlay />
      </div>
    </div>
  );
}
