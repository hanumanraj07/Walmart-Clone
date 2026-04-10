import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'

function StarRating({ rating, count }) {
  return (
    <div className={styles.card__rating}>
      <div className={styles['card__stars']}>
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= rating) {
            return <box-icon key={star} name="star" type="solid" size="14px" className={`${styles.card__star} ${styles['card__star--filled']}`} />
          } else if (star - 0.5 <= rating) {
            return (
              <span key={star} className={`${styles['card__star']} ${styles['card__star--half']}`}>
                <box-icon name="star-half" type="solid" size="14px" className={styles['card__star--half-filled']} />
              </span>
            )
          } else {
            return <box-icon key={star} name="star" size="14px" className={styles.card__star} />
          }
        })}
      </div>
      <span className={styles['card__rating-count']}>({count})</span>
    </div>
  )
}

function CountdownTimer({ hours, minutes }) {
  return (
    <div className={styles.card__countdown}>
      <box-icon name="time" size="12px"></box-icon>
      {hours}h {minutes}m left
    </div>
  )
}

function ProductCard({ 
  product, 
  showCountdown = false,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false 
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart(product.id)
    }
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onToggleWishlist) {
      onToggleWishlist(product.id)
    }
  }

  return (
    <article className={styles.card} style={{ opacity: imageLoaded ? 1 : 0 }}>
      <div className={styles['card__image-wrapper']}>
        <img 
          src={product.image} 
          alt={product.title}
          className={styles.card__image}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {product.badge && (
          <span className={`${styles.card__badge} ${product.badge === 'Limited Deal' ? styles['card__badge--limited'] : ''} ${product.badge === 'New' ? styles['card__badge--new'] : ''}`}>
            {product.badge}
          </span>
        )}

        <button 
          className={`${styles.card__wishlist} ${isWishlisted ? styles['card__wishlist--active'] : ''}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <box-icon 
            name={isWishlisted ? "heart" : "heart"} 
            type={isWishlisted ? "solid" : "regular"}
            size="18px"
            color={isWishlisted ? "#e60000" : "#666"}
          />
        </button>

        <div className={styles.card__overlay}>
          <button className={styles['card__add-btn']} onClick={handleAddToCart}>
            <box-icon name="cart-plus" size="18px"></box-icon>
            Add to Cart
          </button>
        </div>
      </div>

      <div className={styles.card__content}>
        <h3 className={styles.card__title}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>

        <div className={styles.card__price}>
          <span className={styles['card__price-current']}>{product.currentPrice}</span>
          {product.originalPrice && (
            <span className={styles['card__price-original']}>{product.originalPrice}</span>
          )}
          {product.discount && (
            <span className={styles['card__price-discount']}>{product.discount}</span>
          )}
        </div>

        <StarRating rating={product.rating || 4} count={product.ratingCount || '1,234'} />

        {showCountdown && product.countdown && (
          <CountdownTimer hours={product.countdown.hours} minutes={product.countdown.minutes} />
        )}
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles['card--skeleton']}`}>
      <div className={styles['card__image-wrapper']} />
      <div className={styles.card__content}>
        <div className={`${styles['skeleton-line']} ${styles['skeleton-line--title']}`} />
        <div className={`${styles['skeleton-line']} ${styles['skeleton-line--price']}`} />
        <div className={`${styles['skeleton-line']} ${styles['skeleton-line--rating']}`} />
      </div>
    </div>
  )
}

export default ProductCard
