import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'
import styles from './Home.module.css'
import cardStyles from '../components/ProductCard.module.css'

const heroSlides = [
  {
    id: 1,
    image: 'https://i5.walmartimages.com/dfw/4ff9c6c9-499a/k2-_24f36ecb-6980-4fcc-87e0-ddc72fed60ba.v1.jpg?odnHeight=300&odnWidth=1612&odnBg=&odnDynImageQuality=70',
    alt: 'Spring Savings Banner'
  },
  {
    id: 2,
    image: 'https://i5.walmartimages.com/dfw/4ff9c6c9-ad46/k2-_0a671c38-d307-447c-835e-7904ab143c26.v1.png',
    alt: 'Free Delivery Banner'
  },
  {
    id: 3,
    image: 'https://i5.walmartimages.com/dfw/4ff9c6c9-14e2/k2-_9d304ce6-96de-4331-b8ec-c5191226d378.v1.svg',
    alt: 'Walmart Plus Banner'
  }
]

const flashDealsProducts = [
  {
    id: 1,
    title: 'Galaxy By Harvic 3-Pack Women\'s Fleece Jogger',
    image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1738873259-mhl-joggers-lulu-abc-667-67a519a2b11ed.jpg?crop=0.489xw:0.978xh;0.250xw,0.00321xh&resize=980:*',
    currentPrice: '$31.47',
    originalPrice: '$34.97',
    discount: '10% OFF',
    rating: 4,
    ratingCount: '1,234',
    badge: 'Limited Deal',
    countdown: { hours: 5, minutes: 32 }
  },
  {
    id: 2,
    title: 'Carote Nonstick Pots and Pans Set, 8 Pcs Kitchen Cookware',
    image: 'https://images-cdn.ubuy.co.in/64edfb6c878a2d171a62e0bb-carote-nonstick-pots-and-pans-set-8-pcs.jpg',
    currentPrice: '$64.98',
    originalPrice: '$240.00',
    discount: '73% OFF',
    rating: 5,
    ratingCount: '3,456',
    badge: 'Best Seller',
    countdown: { hours: 3, minutes: 15 }
  },
  {
    id: 3,
    title: 'KingChii Wood Pellet Grill And Smoker 456 sq.in',
    image: 'https://m.media-amazon.com/images/I/81A1TDFEgLL._AC_UF894,1000_QL80_.jpg',
    currentPrice: '$234.84',
    originalPrice: '$397.70',
    discount: '41% OFF',
    rating: 5,
    ratingCount: '789',
    countdown: { hours: 8, minutes: 45 }
  },
  {
    id: 4,
    title: 'Kleenex Ultra Soft Facial Tissues, 4 Cube Boxes',
    image: 'https://m.media-amazon.com/images/I/717yl8UGUyL.jpg',
    currentPrice: '$15.29',
    originalPrice: '$17.99',
    discount: '15% OFF',
    rating: 5,
    ratingCount: '12,345',
    countdown: { hours: 2, minutes: 10 }
  }
]

const electronicsProducts = [
  {
    id: 5,
    title: 'Samsung 55" 4K UHD Smart TV with HDR and Alexa Built-in',
    image: 'https://mahajanelectronics.com/cdn/shop/files/81OARotaN2L._SL1500_ab2fef83-736d-4b2a-999e-0512d93e65a5.jpg?v=1760153328&width=1500',
    currentPrice: '$447.99',
    originalPrice: '$599.99',
    discount: '25% OFF',
    rating: 4,
    ratingCount: '4,321',
    badge: 'New'
  },
  {
    id: 6,
    title: 'Apple AirPods Pro (2nd Generation) with MagSafe',
    image: 'https://www.myimaginestore.com/media/catalog/product/cache/4a48ac28cbb6e9c41470e5be5a6d3043/m/t/mtjv3_av6_geo_in.jpeg',
    currentPrice: '$199.99',
    originalPrice: '$249.00',
    discount: '20% OFF',
    rating: 5,
    ratingCount: '8,765'
  },
  {
    id: 7,
    title: 'PlayStation 5 Console (PS5) with DualSense Wireless',
    image: 'https://store.sony.com.my/cdn/shop/files/PS5_2xDSWC_D_BNDL_RNDR_LT_PROD_RGB_ETCK_240206_1200x.jpg?v=1731259689',
    currentPrice: '$499.99',
    rating: 5,
    ratingCount: '9,876',
    badge: 'Best Seller'
  },
  {
    id: 8,
    title: 'Dell Inspiron 15 Laptop, Intel Core i5, 8GB RAM, 512GB SSD',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2dYw65-eBHCKckoAxGcaVHNltfeB0k3DPtQ&s',
    currentPrice: '$649.99',
    originalPrice: '$799.99',
    discount: '19% OFF',
    rating: 4,
    ratingCount: '2,345'
  }
]

const topPicksProducts = [
  {
    id: 9,
    title: 'Ninja Foodi 8-in-1 Digital Air Fry Oven',
    image: 'https://images-cdn.ubuy.co.in/6556a5fd45f58972ef6f57e2-ninja-foodi-8-in-1-xl-pro-air-fry.jpg',
    currentPrice: '$149.99',
    originalPrice: '$199.99',
    discount: '25% OFF',
    rating: 5,
    ratingCount: '5,432',
    badge: 'Top Pick'
  },
  {
    id: 10,
    title: 'Bissell CrossWave Cordless Max Wet Dry Vacuum Cleaner',
    image: 'https://m.media-amazon.com/images/I/81ycHIcQMfL._AC_UF350,350_QL80_.jpg',
    currentPrice: '$299.99',
    originalPrice: '$399.99',
    discount: '25% OFF',
    rating: 5,
    ratingCount: '3,210'
  },
  {
    id: 11,
    title: 'Keurig K-Classic Coffee Maker, Single Serve K-Cup Pod',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0RfOnj-a68YbTo_nIv3w4FLKntlbnwm86Kw&s',
    currentPrice: '$89.99',
    originalPrice: '$129.99',
    discount: '31% OFF',
    rating: 4,
    ratingCount: '7,654'
  },
  {
    id: 12,
    title: "Levi's Women's Classic Fit Denim Jacket",
    image: 'https://m.media-amazon.com/images/I/81Qz1ePXGGL._AC_UL1500_.jpg',
    currentPrice: '$54.99',
    originalPrice: '$79.50',
    discount: '31% OFF',
    rating: 4,
    ratingCount: '2,345'
  }
]

const categories = [
  { name: 'Electronics', icon: 'cpu' },
  { name: 'Grocery', icon: 'shopping-bag' },
  { name: 'Home', icon: 'home-alt' },
  { name: 'Clothing', icon: 'tshirt' },
  { name: 'Toys', icon: 'game-controller' },
  { name: 'Beauty', icon: 'spa' }
]

function ProductSection({ title, products, showCountdown, icon, linkText = 'View All' }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 260
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className={styles.home__products}>
      <div className={styles.home__sectionHeader}>
        <h2 className={styles.home__sectionTitle}>
          {icon && <box-icon name={icon} size="24px" className={styles.home__sectionTitleIcon} />}
          {title}
        </h2>
        <Link to="#" className={styles.home__sectionLink}>
          {linkText} <box-icon name="chevron-right" size="16px"></box-icon>
        </Link>
      </div>

      <div style={{ position: 'relative' }}>
        <div 
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {products.map(product => (
            <div 
              key={product.id} 
              style={{ flex: '0 0 240px', scrollSnapAlign: 'start' }}
            >
              <ProductCard product={product} showCountdown={showCountdown} />
            </div>
          ))}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '8px', 
          marginTop: '12px' 
        }}>
          <button
            onClick={() => scroll('left')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 150ms ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)'
              e.currentTarget.style.borderColor = 'var(--color-primary)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-white)'
              e.currentTarget.style.borderColor = 'var(--color-border)'
            }}
            aria-label="Previous"
          >
            <box-icon name="chevron-left" size="20px"></box-icon>
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 150ms ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)'
              e.currentTarget.style.borderColor = 'var(--color-primary)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-white)'
              e.currentTarget.style.borderColor = 'var(--color-border)'
            }}
            aria-label="Next"
          >
            <box-icon name="chevron-right" size="20px"></box-icon>
          </button>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <div className={styles.home}>
      <div className="container">
        <section className={styles.home__hero}>
          <Carousel slides={heroSlides} autoPlay interval={6000} />
        </section>

        <section className={styles.home__categories}>
          <div className={styles.home__categoryGrid}>
            {categories.map(cat => (
              <Link key={cat.name} to="/" className={styles.home__categoryCard}>
                <div className={styles.home__categoryIcon}>
                  <box-icon name={cat.icon} size="28px"></box-icon>
                </div>
                <span className={styles.home__categoryName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <ProductSection
          title="Flash Deals"
          products={flashDealsProducts}
          showCountdown
          icon="bolt"
          linkText="Shop All Deals"
        />

        <ProductSection
          title="Electronics"
          products={electronicsProducts}
          icon="devices"
          linkText="See All Electronics"
        />

        <section className={styles.home__banner}>
          <img
            src="https://i5.walmartimages.com/dfw/4ff9c6c9-499a/k2-_24f36ecb-6980-4fcc-87e0-ddc72fed60ba.v1.jpg?odnHeight=300&odnWidth=1612&odnBg=&odnDynImageQuality=70"
            alt="New Arrivals"
            className={styles.home__bannerImage}
          />
          <div className={styles.home__bannerContent}>
            <h2 className={styles.home__bannerTitle}>New Arrivals Just Dropped</h2>
            <p className={styles.home__bannerSubtitle}>Check out the latest products in every category</p>
            <Link to="#" className={styles.home__bannerBtn}>
              Shop Now <box-icon name="arrow-right" size="18px"></box-icon>
            </Link>
          </div>
        </section>

        <ProductSection
          title="Top Picks for You"
          products={topPicksProducts}
          icon="star"
          linkText="View All"
        />

        <section className={styles.home__features}>
          <div className={styles.home__featureCard}>
            <div className={styles.home__featureIcon}>
              <box-icon name="shopping-bag" size="36px"></box-icon>
            </div>
            <h3>Shop Deals</h3>
            <p>Find amazing discounts on thousands of products every day</p>
          </div>
          <div className={styles.home__featureCard}>
            <div className={styles.home__featureIcon}>
              <box-icon name="truck" size="36px"></box-icon>
            </div>
            <h3>Free Delivery</h3>
            <p>Get free shipping on orders over $35 with Walmart+</p>
          </div>
          <div className={styles.home__featureCard}>
            <div className={styles.home__featureIcon}>
              <box-icon name="refresh" size="36px"></box-icon>
            </div>
            <h3>Easy Returns</h3>
            <p>Return items in-store or schedule a pickup at your convenience</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
