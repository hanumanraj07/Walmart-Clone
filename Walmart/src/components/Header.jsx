import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const categories = [
  { name: 'Electronics', icon: 'cpu' },
  { name: 'Grocery', icon: 'shopping-bag' },
  { name: 'Home', icon: 'home-alt' },
  { name: 'Clothing', icon: 'tshirt' },
  { name: 'Toys', icon: 'game-controller' },
  { name: 'Beauty', icon: 'spa' },
  { name: 'Sports', icon: 'football' },
  { name: 'Auto', icon: 'car' },
  { name: 'Patio', icon: 'sun' },
  { name: 'Books', icon: 'book-open' },
]

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [cartCount, setCartCount] = useState(2)
  const [isCartPop, setIsCartPop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isCartPop) {
      const timer = setTimeout(() => setIsCartPop(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isCartPop])

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1)
    setIsCartPop(true)
  }

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : ''}`}>
        <div className={styles.header__top}>
          <div className="container">
            <div className={styles['header__top-inner']}>
              <div className={styles.header__logo}>
                <Link to="/">
                  <img 
                    src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg" 
                    alt="Walmart" 
                  />
                </Link>
              </div>

              <div className={styles.header__search}>
                <div className={styles['header__search-input']}>
                  <input 
                    type="search" 
                    placeholder="Search everything at Walmart online and in store" 
                    aria-label="Search"
                  />
                </div>
                <button className={styles['header__search-btn']} type="submit">
                  <box-icon name="search-alt-2" size="20px"></box-icon>
                  <span>Search</span>
                </button>
              </div>

              <div className={styles.header__actions}>
                <Link to="/login" className={styles['header__action-btn']}>
                  <box-icon name="user" color="white" size="24px"></box-icon>
                  <div className={styles['header__action-text']}>
                    <small>Sign In</small>
                    <span>Account</span>
                  </div>
                </Link>

                <Link to="/cart" className={`${styles['header__action-btn']} ${styles.header__cart}`}>
                  <box-icon name="cart" color="white" size="24px"></box-icon>
                  <div className={styles['header__action-text']}>
                    <small>$104.17</small>
                    <span className={`${styles['header__cart-badge']} ${isCartPop ? styles['header__cart-badge--pop'] : ''}`}>
                      {cartCount}
                    </span>
                  </div>
                </Link>
              </div>

              <button 
                className={styles['header__menu-btn']}
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open menu"
              >
                <box-icon name="menu" size="24px"></box-icon>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.header__secondary}>
          <div className="container">
            <div className={styles.header__categories}>
              {categories.map((cat, index) => (
                <Link 
                  key={cat.name} 
                  to="/" 
                  className={`${styles['header__category-link']} ${index === 0 ? styles['header__category-link--active'] : ''}`}
                >
                  <box-icon name={cat.icon} size="16px"></box-icon>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div 
        className={`${styles['header__drawer-overlay']} ${isDrawerOpen ? styles['header__drawer-overlay--open'] : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className={`${styles.header__drawer} ${isDrawerOpen ? styles['header__drawer--open'] : ''}`}>
        <div className={styles['header__drawer-header']}>
          <span className={styles['header__drawer-title']}>Menu</span>
          <button 
            className={styles['header__drawer-close']}
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close menu"
          >
            <box-icon name="x" size="24px"></box-icon>
          </button>
        </div>

        <div className={styles['header__drawer-content']}>
          <div className={styles['header__drawer-section']}>
            <div className={styles['header__drawer-section-title']}>Shop Categories</div>
            {categories.map(cat => (
              <Link 
                key={cat.name} 
                to="/" 
                className={styles['header__drawer-link']}
                onClick={() => setIsDrawerOpen(false)}
              >
                <box-icon name={cat.icon} size="20px"></box-icon>
                {cat.name}
              </Link>
            ))}
          </div>

          <div className={styles['header__drawer-divider']} />

          <div className={styles['header__drawer-section']}>
            <div className={styles['header__drawer-section-title']}>Account</div>
            <Link 
              to="/login" 
              className={styles['header__drawer-link']}
              onClick={() => setIsDrawerOpen(false)}
            >
              <box-icon name="user" size="20px"></box-icon>
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className={styles['header__drawer-link']}
              onClick={() => setIsDrawerOpen(false)}
            >
              <box-icon name="user-plus" size="20px"></box-icon>
              Create Account
            </Link>
            <Link 
              to="/cart" 
              className={styles['header__drawer-link']}
              onClick={() => setIsDrawerOpen(false)}
            >
              <box-icon name="cart" size="20px"></box-icon>
              Cart ({cartCount})
            </Link>
          </div>

          <div className={styles['header__drawer-divider']} />

          <div className={styles['header__drawer-section']}>
            <div className={styles['header__drawer-section-title']}>Store Info</div>
            <Link to="/" className={styles['header__drawer-link']}>
              <box-icon name="store" size="20px"></box-icon>
              Store Directory
            </Link>
            <Link to="/" className={styles['header__drawer-link']}>
              <box-icon name="map-marker" size="20px"></box-icon>
              Sacramento, 95829
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
