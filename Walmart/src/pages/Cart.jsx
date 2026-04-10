import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Cart.module.css'

const initialCartItems = [
  {
    id: 1,
    title: 'Galaxy By Harvic 3-Pack Women\'s Loose Fit Fleece Jogger Sweatpants',
    price: 31.47,
    quantity: 1,
    image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1738873259-mhl-joggers-lulu-abc-667-67a519a2b11ed.jpg?crop=0.489xw:0.978xh;0.250xw,0.00321xh&resize=980:*',
    seller: 'Walmart'
  },
  {
    id: 2,
    title: 'Carote Nonstick Pots and Pans Set, 8 Pcs For Kitchen Use',
    price: 64.98,
    quantity: 1,
    image: 'https://images-cdn.ubuy.co.in/64edfb6c878a2d171a62e0bb-carote-nonstick-pots-and-pans-set-8-pcs.jpg',
    seller: 'Carote Official'
  }
]

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [removingId, setRemovingId] = useState(null)
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setRemovingId(id)
    setTimeout(() => {
      setCartItems(items => items.filter(item => item.id !== id))
      setRemovingId(null)
    }, 300)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal >= 35 ? 0 : 5.99
  const total = subtotal + tax + shipping

  if (cartItems.length === 0) {
    return (
      <div className={styles.cart}>
        <div className="container">
          <div className={styles.cart__empty}>
            <div className={styles.cart__emptyIcon}>
              <box-icon name="cart" size="48px"></box-icon>
            </div>
            <h2 className={styles.cart__emptyTitle}>Your cart is empty</h2>
            <p className={styles.cart__emptyText}>
              Start shopping to add items to your cart
            </p>
            <Link to="/" className={styles.cart__emptyBtn}>
              <box-icon name="shopping-cart" size="20px"></box-icon>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cart}>
      <div className="container">
        <header className={styles.cart__header}>
          <h1 className={styles.cart__title}>
            Your Shopping Cart
            <span className={styles.cart__count}>({cartItems.length} items)</span>
          </h1>
        </header>

        <div className={styles.cart__layout}>
          <div className={styles.cart__items}>
            <div className={styles.cart__itemsHeader}>
              <h2 className={styles.cart__itemsTitle}>Items</h2>
            </div>

            <div className={styles.cart__itemsList}>
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  className={`${styles.cart__item} ${removingId === item.id ? styles.cart__itemRemoving : ''}`}
                >
                  <div className={styles.cart__itemImage}>
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className={styles.cart__itemDetails}>
                    <Link to="/" className={styles.cart__itemTitle}>
                      {item.title}
                    </Link>
                    <p className={styles.cart__itemMeta}>Sold by: {item.seller}</p>
                    <p className={styles.cart__itemPrice}>${item.price.toFixed(2)}</p>

                    <div className={styles.cart__itemActions}>
                      <div className={styles.cart__quantity}>
                        <button 
                          className={styles.cart__quantityBtn}
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          <box-icon name="minus" size="16px"></box-icon>
                        </button>
                        <span className={styles.cart__quantityValue}>{item.quantity}</span>
                        <button 
                          className={styles.cart__quantityBtn}
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <box-icon name="plus" size="16px"></box-icon>
                        </button>
                      </div>

                      <button className={styles.cart__itemLink}>
                        <box-icon name="heart" size="16px"></box-icon>
                        Save for later
                      </button>

                      <button 
                        className={styles.cart__itemRemove}
                        onClick={() => removeItem(item.id)}
                      >
                        <box-icon name="trash" size="16px"></box-icon>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.cart__summary} ${isSummaryExpanded ? styles.cart__summaryExpanded : ''}`}>
            <button 
              className={styles.cart__summaryToggle}
              onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
            >
              <span>
                <box-icon name="cart" size="20px"></box-icon>
                Order Summary
              </span>
              <box-icon name={isSummaryExpanded ? 'chevron-up' : 'chevron-down'} size="20px"></box-icon>
            </button>

            <div className={styles.cart__summaryContent}>
              <h2 className={styles.cart__summaryTitle}>Order Summary</h2>

              <div className={styles.cart__summaryRow}>
                <span className={styles.cart__summaryLabel}>Subtotal ({cartItems.length} items)</span>
                <span className={styles.cart__summaryValue}>${subtotal.toFixed(2)}</span>
              </div>

              <div className={styles.cart__summaryRow}>
                <span className={styles.cart__summaryLabel}>Shipping</span>
                <span className={`${styles.cart__summaryValue} ${shipping === 0 ? styles.cart__summaryValueFree : ''}`}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className={styles.cart__summaryRow}>
                <span className={styles.cart__summaryLabel}>Estimated Tax</span>
                <span className={styles.cart__summaryValue}>${tax.toFixed(2)}</span>
              </div>

              <div className={`${styles.cart__summaryRow} ${styles.cart__summaryRowTotal}`}>
                <span>Total</span>
                <span className={styles.cart__summaryValue}>${total.toFixed(2)}</span>
              </div>

              <Link to="/payment" className={styles.cart__btn}>
                <box-icon name="lock-alt" size="18px"></box-icon>
                Continue to Checkout
              </Link>

              <div className={styles.cart__summarySecure}>
                <box-icon name="shield-check" size="14px"></box-icon>
                Secure checkout
              </div>

              {subtotal < 35 && (
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', marginTop: 'var(--spacing-md)', textAlign: 'center' }}>
                  Add ${(35 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
