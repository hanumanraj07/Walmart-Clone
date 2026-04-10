import { Link } from 'react-router-dom'
import styles from './Success.module.css'

const recommendations = [
  {
    id: 1,
    title: 'Apple AirPods Pro (2nd Gen)',
    price: '$199.99',
    image: 'https://www.myimaginestore.com/media/catalog/product/cache/4a48ac28cbb6e9c41470e5be5a6d3043/m/t/mtjv3_av6_geo_in.jpeg'
  },
  {
    id: 2,
    title: 'Samsung 55" 4K Smart TV',
    price: '$447.99',
    image: 'https://mahajanelectronics.com/cdn/shop/files/81OARotaN2L._SL1500_ab2fef83-736d-4b2a-999e-0512d93e65a5.jpg?v=1760153328&width=1500'
  },
  {
    id: 3,
    title: 'Ninja Foodi Air Fry Oven',
    price: '$149.99',
    image: 'https://images-cdn.ubuy.co.in/6556a5fd45f58972ef6f57e2-ninja-foodi-8-in-1-xl-pro-air-fry.jpg'
  },
  {
    id: 4,
    title: 'LEGO Star Wars Set',
    price: '$129.99',
    image: 'https://m.media-amazon.com/images/I/71x3E5cJWDL._AC_SL1500_.jpg'
  }
]

function Success() {
  const orderNumber = 'WM-' + Math.random().toString().slice(2, 11)
  const orderDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className={styles.success}>
      <div className={styles.success__card}>
        <div className={styles.success__icon}>
          <div className={styles.success__icon_circle}>
            <svg className={styles.success__icon_check} viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="22" fill="none" stroke="white" strokeWidth="3" />
              <path d="M14 27 L22 35 L36 18" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <box-icon name="check" size="50px" color="white"></box-icon>
          </div>
        </div>

        <h1 className={styles.success__title}>Thank You For Your Order!</h1>
        <p className={styles.success__subtitle}>
          Your order has been placed successfully
        </p>

        <div className={styles.success__message}>
          <box-icon name="shield-check" size="24px"></box-icon>
          <p>Your order has been placed successfully and will be shipped soon. A confirmation email has been sent to your email address.</p>
        </div>

        <div className={styles.success__details}>
          <h2 className={styles.success__details_title}>Order Details</h2>
          
          <div className={styles.success__detail_row}>
            <span className={styles.success__detail_label}>Order Number:</span>
            <span className={`${styles.success__detail_value} ${styles['success__detail-value--highlight']}`}>
              #{orderNumber}
            </span>
          </div>
          
          <div className={styles.success__detail_row}>
            <span className={styles.success__detail_label}>Order Date:</span>
            <span className={styles.success__detail_value}>{orderDate}</span>
          </div>
          
          <div className={styles.success__detail_row}>
            <span className={styles.success__detail_label}>Total Amount:</span>
            <span className={styles.success__detail_value}>$104.17</span>
          </div>
          
          <div className={styles.success__detail_row}>
            <span className={styles.success__detail_label}>Estimated Delivery:</span>
            <span className={`${styles.success__detail_value} ${styles['success__detail-value--highlight']}`}>
              {deliveryDate}
            </span>
          </div>
          
          <div className={styles.success__detail_row}>
            <span className={styles.success__detail_label}>Shipping Address:</span>
            <span className={styles.success__detail_value}>123 Main St, Sacramento, CA 95829</span>
          </div>
        </div>

        <div className={styles.success__actions}>
          <button className={`${styles.success__btn} ${styles['success__btn--secondary']}`}>
            <box-icon name="map" size="20px"></box-icon>
            Track Your Order
          </button>
          <Link to="/" className={`${styles.success__btn} ${styles['success__btn--primary']}`}>
            <box-icon name="shopping-cart" size="20px"></box-icon>
            Continue Shopping
          </Link>
        </div>

        <div className={styles.success__steps}>
          <h3 className={styles.success__steps_title}>What's Next?</h3>
          <ul className={styles.success__steps_list}>
            <li className={styles.success__step}>
              You'll receive a shipping confirmation email with tracking information
            </li>
            <li className={styles.success__step}>
              Track your order status in your account
            </li>
            <li className={styles.success__step}>
              Contact customer service if you have any questions
            </li>
          </ul>
        </div>

        <div className={styles.success__recommendations}>
          <h3 className={styles.success__recommendations_title}>You May Also Like</h3>
          <div className={styles.success__recommendations_grid}>
            {recommendations.map(item => (
              <div key={item.id} className={styles.success__recommendation}>
                <div className={styles.success__recommendation_image}>
                  <img src={item.image} alt={item.title} />
                </div>
                <p className={styles.success__recommendation_title}>{item.title}</p>
                <p className={styles.success__recommendation_price}>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
