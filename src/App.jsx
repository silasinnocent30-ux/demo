import { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Everyday Tote",
    category: "Accessories",
    price: 48,
    rating: "4.9",
    reviews: 128,
    badge: "Bestseller",
    color: "Clay",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Form Ceramic Set",
    category: "Home",
    price: 36,
    rating: "4.8",
    reviews: 86,
    badge: "New",
    color: "Oat",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Everyday Runner",
    category: "Apparel",
    price: 92,
    rating: "4.9",
    reviews: 204,
    badge: "",
    color: "Sage",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Studio Headphones",
    category: "Tech",
    price: 128,
    rating: "4.7",
    reviews: 64,
    badge: "Staff pick",
    color: "Stone",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Weekend Camera",
    category: "Tech",
    price: 74,
    rating: "4.8",
    reviews: 92,
    badge: "",
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Minimal Watch",
    category: "Accessories",
    price: 110,
    rating: "4.9",
    reviews: 157,
    badge: "Almost gone",
    color: "Moss",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Soft Knit Throw",
    category: "Home",
    price: 68,
    rating: "4.8",
    reviews: 73,
    badge: "",
    color: "Cream",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Daily Carry Pack",
    category: "Accessories",
    price: 84,
    rating: "4.7",
    reviews: 51,
    badge: "",
    color: "Olive",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = ["All things", "Accessories", "Home", "Apparel", "Tech"];
const FREE_SHIPPING_AT = 150;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function HeartIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={filled ? "heart-filled" : ""}
    >
      <path d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
    </svg>
  );
}

function ProductCard({ product, onAdd, isFavorite, onToggleFavorite }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img className="product-image" src={product.image} alt={product.name} />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
          type="button"
          aria-label={`${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(product.id)}
        >
          <HeartIcon filled={isFavorite} />
        </button>
        <button
          className="quick-add"
          type="button"
          onClick={() => onAdd(product)}
        >
          Add to bag <span aria-hidden="true">+</span>
        </button>
      </div>
      <div className="product-info">
        <div>
          <p className="product-name">{product.name}</p>
          <p className="product-color">{product.color}</p>
        </div>
        <p className="product-price">${product.price}</p>
      </div>
      <div className="product-rating">
        <span aria-label={`${product.rating} out of 5 stars`}>★★★★★</span>
        <span>{product.rating} ({product.reviews})</span>
      </div>
    </article>
  );
}

function CartDrawer({ items, onClose, onQuantityChange, onRemove }) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const remainingForShipping = Math.max(FREE_SHIPPING_AT - subtotal, 0);
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_AT) * 100, 100);

  return (
    <div className="cart-layer">
      <button
        className="cart-scrim"
        type="button"
        aria-label="Close shopping bag"
        onClick={onClose}
      />
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="cart-heading">
          <div>
            <p className="eyebrow">YOUR GOOD THINGS</p>
            <h2>Your bag <span>({itemCount})</span></h2>
          </div>
          <button
            className="close-button"
            type="button"
            aria-label="Close shopping bag"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-bag-icon"><BagIcon /></div>
            <h3>A little room for something good.</h3>
            <p>Your bag is taking a well-deserved breather.</p>
            <button className="button button-dark" type="button" onClick={onClose}>
              Keep exploring
            </button>
          </div>
        ) : (
          <>
            <div className="shipping-note">
              <p>
                {remainingForShipping > 0
                  ? `You're $${remainingForShipping} away from free shipping`
                  : "You've unlocked free shipping"}
              </p>
              <div className="shipping-track">
                <span style={{ width: `${shippingProgress}%` }} />
              </div>
            </div>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item-details">
                    <div className="cart-item-title">
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.color}</p>
                      </div>
                      <strong>${item.price * item.quantity}</strong>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-control" aria-label={`Quantity of ${item.name}`}>
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => onQuantityChange(item.id, -1)}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => onQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-button"
                        type="button"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="subtotal-row">
                <span>Subtotal</span>
                <strong>${subtotal}</strong>
              </div>
              <p>Shipping and taxes calculated at checkout.</p>
              <button
                className="button button-dark checkout-button"
                type="button"
                onClick={() => window.alert("Checkout is coming soon. Thanks for shopping with us!")}
              >
                Continue to checkout <span aria-hidden="true">→</span>
              </button>
              <button className="continue-shopping" type="button" onClick={onClose}>
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All things");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [subscribed, setSubscribed] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All things" || product.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        `${product.name} ${product.category} ${product.color}`
          .toLowerCase()
          .includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "price-low") return filtered.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-high") return filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [activeCategory, search, sortOrder]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(productId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function toggleFavorite(productId) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(productId)
        ? currentFavorites.filter((id) => id !== productId)
        : [...currentFavorites, productId],
    );
  }

  function subscribe(event) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <>
      <div className="announcement">
        <span>GOOD THINGS, MADE TO LAST.</span>
        <span className="announcement-divider">✳</span>
        <span>FREE SHIPPING ON ORDERS OVER $150</span>
      </div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="morrow home">
          morrow<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-active" href="#shop">Shop all</a>
          <a href="#shop" onClick={() => setActiveCategory("Home")}>Home</a>
          <a href="#shop" onClick={() => setActiveCategory("Apparel")}>Wear</a>
          <a href="#story">Our story</a>
        </nav>
        <div className="header-actions">
          <label className="search-box">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search"
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <button
            className="cart-button"
            type="button"
            aria-label={`Open shopping bag, ${cartCount} items`}
            onClick={() => setIsCartOpen(true)}
          >
            <BagIcon />
            <span>Bag</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2200&q=90"
            alt="Warm, sunlit shop with a thoughtful selection of everyday pieces"
          />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span /> THE EVERYDAY EDIT — VOL. 04</p>
            <h1>Make room<br />for <em>the good.</em></h1>
            <p className="hero-description">
              Thoughtful pieces for slower mornings, longer weekends, and
              everything in between.
            </p>
            <a className="button button-light" href="#shop">
              Find your everyday <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-index"><span>01</span> / 03</div>
          <div className="hero-side-note">OBJECTS FOR THE IN-BETWEEN</div>
        </section>

        <section className="intro-strip" id="story">
          <span className="intro-mark">✳</span>
          <p>Less, but better. <span>More of what matters.</span></p>
          <a href="#shop">A little about us <span aria-hidden="true">↗</span></a>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A FEW OF OUR FAVORITE THINGS</p>
              <h2>Good by <em>design.</em></h2>
            </div>
            <p className="section-aside">
              Useful, considered, and a little bit lovely.<br />
              Meet the pieces you'll reach for on repeat.
            </p>
          </div>
          <div className="shop-controls">
            <div className="category-list" role="group" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "category-active" : ""}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="sort-control">
              <span>Sort by</span>
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span>✳</span>
              <h3>No good things found.</h3>
              <p>Try another search or choose a different category.</p>
              <button
                className="button button-dark"
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All things");
                }}
              >
                See everything
              </button>
            </div>
          )}
          <div className="shop-bottom">
            <span>01 — 08</span>
            <a href="#shop">You're all caught up <span aria-hidden="true">✳</span></a>
            <span>MADE FOR THE LONG HAUL</span>
          </div>
        </section>

        <section className="quote-section">
          <span className="quote-star">✳</span>
          <p className="eyebrow">A NOTE FROM US</p>
          <blockquote>
            “The best things don't ask for attention.<br />
            They just make every day a little better.”
          </blockquote>
          <span className="quote-attribution">THE MORROW WAY</span>
        </section>

        <section className="newsletter">
          <div>
            <p className="eyebrow">A GOOD THING IN YOUR INBOX</p>
            <h2>A little note from <em>morrow.</em></h2>
            <p>New finds, thoughtful reads, and 10% off your first order.</p>
          </div>
          <form className="newsletter-form" onSubmit={subscribe}>
            {subscribed ? (
              <p className="subscribed-message">You're on the list. See you soon! ✳</p>
            ) : (
              <>
                <label className="visually-hidden" htmlFor="newsletter-email">Your email address</label>
                <input id="newsletter-email" type="email" placeholder="Your email address" required />
                <button type="submit" aria-label="Subscribe">Join us <span aria-hidden="true">↗</span></button>
              </>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#top">morrow<span>.</span></a>
        <p>Here's to the everyday.</p>
        <div className="footer-links">
          <a href="#shop">Instagram ↗</a>
          <a href="#shop">Contact</a>
          <a href="#top">© Morrow 2025</a>
        </div>
      </footer>

      {isCartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setIsCartOpen(false)}
          onQuantityChange={changeQuantity}
          onRemove={(productId) =>
            setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
          }
        />
      )}
    </>
  );
}

export default App;
