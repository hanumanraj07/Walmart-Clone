import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Payment.module.css'

const cartItems = [
  {
    id: 1,
    title: 'Galaxy By Harvic 3-Pack Women\'s Loose Fit Fleece Jogger',
    price: '$31.47',
    image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1738873259-mhl-joggers-lulu-abc-667-67a519a2b11ed.jpg?crop=0.489xw:0.978xh;0.250xw,0.00321xh&resize=980:*'
  },
  {
    id: 2,
    title: 'Carote Nonstick Pots and Pans Set',
    price: '$64.98',
    image: 'https://images-cdn.ubuy.co.in/64edfb6c878a2d171a62e0bb-carote-nonstick-pots-and-pans-set-8-pcs.jpg'
  }
]

function Payment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })
  const [errors, setErrors] = useState({})

  const subtotal = 96.45
  const tax = 7.72
  const shipping = 0
  const total = 104.17

  const steps = [
    { number: 1, label: 'Shipping', completed: currentStep > 1 },
    { number: 2, label: 'Payment', completed: currentStep > 2 },
    { number: 3, label: 'Review', completed: false }
  ]

  const handleChange = (field) => (e) => {
    let value = e.target.value
    if (field === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19)
    }
    if (field === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})/, '$1/').slice(0, 5)
    }
    if (field === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    } else {
      window.location.href = '/success'
    }
  }

  return (
    <div className={styles.payment}>
      <div className="container">
        <div className={styles.payment__steps}>
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`${styles.payment__step} ${currentStep === step.number ? styles['payment__step--active'] : ''} ${step.completed ? styles['payment__step--completed'] : ''}`}
            >
              <div className={styles['payment__step-number']}>
                {step.completed ? (
                  <box-icon name="check" size="14px"></box-icon>
                ) : (
                  step.number
                )}
              </div>
              <span>{step.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.payment__layout}>
          <div className={styles.payment__main}>
            <button 
              className={styles.payment__summary_toggle}
              onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
            >
              <span>
                <box-icon name="receipt" size="20px"></box-icon>
                Order Summary - ${total}
              </span>
              <box-icon name={isSummaryExpanded ? 'chevron-up' : 'chevron-down'} size="20px"></box-icon>
            </button>

            {currentStep === 1 && (
              <form onSubmit={handleSubmit}>
                <div className={styles.payment__section}>
                  <h2 className={styles.payment__section_title}>
                    <box-icon name="map-marker" size="20px"></box-icon>
                    Shipping Address
                  </h2>

                  <div className={styles.payment__form}>
                    <div className={styles['payment__form-row']}>
                      <div className={styles.payment__field}>
                        <label className={styles.payment__label}>First Name</label>
                        <input
                          type="text"
                          className={styles.payment__input}
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleChange('firstName')}
                          required
                        />
                      </div>
                      <div className={styles.payment__field}>
                        <label className={styles.payment__label}>Last Name</label>
                        <input
                          type="text"
                          className={styles.payment__input}
                          placeholder="Smith"
                          value={formData.lastName}
                          onChange={handleChange('lastName')}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.payment__field}>
                      <label className={styles.payment__label}>Street Address</label>
                      <input
                        type="text"
                        className={styles.payment__input}
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={handleChange('address')}
                        required
                      />
                    </div>

                    <div className={styles['payment__form-row']}>
                      <div className={styles.payment__field}>
                        <label className={styles.payment__label}>City</label>
                        <input
                          type="text"
                          className={styles.payment__input}
                          placeholder="Sacramento"
                          value={formData.city}
                          onChange={handleChange('city')}
                          required
                        />
                      </div>
                      <div className={styles.payment__field}>
                        <label className={styles.payment__label}>State</label>
                        <input
                          type="text"
                          className={styles.payment__input}
                          placeholder="CA"
                          value={formData.state}
                          onChange={handleChange('state')}
                          required
                        />
                      </div>
                      <div className={styles.payment__field}>
                        <label className={styles.payment__label}>ZIP Code</label>
                        <input
                          type="text"
                          className={styles.payment__input}
                          placeholder="95829"
                          value={formData.zip}
                          onChange={handleChange('zip')}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.payment__nav}>
                  <Link to="/cart" className={`${styles.payment__btn} ${styles['payment__btn--secondary']}`}>
                    <box-icon name="arrow-left" size="20px"></box-icon>
                    Back to Cart
                  </Link>
                  <button type="submit" className={`${styles.payment__btn} ${styles['payment__btn--primary']}`}>
                    Continue to Payment
                    <box-icon name="arrow-right" size="20px"></box-icon>
                  </button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleSubmit}>
                <div className={styles.payment__section}>
                  <h2 className={styles.payment__section_title}>
                    <box-icon name="credit-card" size="20px"></box-icon>
                    Payment Method
                  </h2>

                  <div className={styles.payment__methods}>
                    <div 
                      className={`${styles.payment__method} ${paymentMethod === 'card' ? styles['payment__method--active'] : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <box-icon name="credit-card" size="32px" className={styles['payment__method-icon']}></box-icon>
                      <span className={styles['payment__method-name']}>Credit/Debit Card</span>
                    </div>
                    <div 
                      className={`${styles.payment__method} ${paymentMethod === 'paypal' ? styles['payment__method--active'] : ''}`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <box-icon type="logo" name="paypal" size="32px" className={styles['payment__method-icon']}></box-icon>
                      <span className={styles['payment__method-name']}>PayPal</span>
                    </div>
                    <div 
                      className={`${styles.payment__method} ${paymentMethod === 'walmart' ? styles['payment__method--active'] : ''}`}
                      onClick={() => setPaymentMethod('walmart')}
                    >
                      <box-icon name="wallet" size="32px" className={styles['payment__method-icon']}></box-icon>
                      <span className={styles['payment__method-name']}>Walmart Pay</span>
                    </div>
                  </div>

                  <div className={styles.payment__security}>
                    <box-icon name="shield" size="24px"></box-icon>
                    <p>Your payment information is secure and encrypted. We do not store your credit card details.</p>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className={styles.payment__form}>
                      <div className={styles.payment__field}>
                        <label className={styles.payment__label}>Card Number</label>
                        <input
                          type="text"
                          className={styles.payment__input}
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange('cardNumber')}
                          required
                        />
                      </div>

                      <div className={styles.payment__field}>
                        <label className={styles.payment__label}>Name on Card</label>
                        <input
                          type="text"
                          className={styles.payment__input}
                          placeholder="John Smith"
                          value={formData.cardName}
                          onChange={handleChange('cardName')}
                          required
                        />
                      </div>

                      <div className={styles['payment__form-row']}>
                        <div className={styles.payment__field}>
                          <label className={styles.payment__label}>Expiry Date</label>
                          <input
                            type="text"
                            className={styles.payment__input}
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleChange('expiry')}
                            required
                          />
                        </div>
                        <div className={styles.payment__field}>
                          <label className={styles.payment__label}>CVV</label>
                          <input
                            type="text"
                            className={styles.payment__input}
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleChange('cvv')}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.payment__nav}>
                  <button 
                    type="button"
                    className={`${styles.payment__btn} ${styles['payment__btn--secondary']}`}
                    onClick={() => setCurrentStep(1)}
                  >
                    <box-icon name="arrow-left" size="20px"></box-icon>
                    Back
                  </button>
                  <button type="submit" className={`${styles.payment__btn} ${styles['payment__btn--primary']}`}>
                    Review Order
                    <box-icon name="arrow-right" size="20px"></box-icon>
                  </button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <form onSubmit={handleSubmit}>
                <div className={styles.payment__section}>
                  <h2 className={styles.payment__section_title}>
                    <box-icon name="task" size="20px"></box-icon>
                    Review Your Order
                  </h2>

                  <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>Shipping Address</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zip}
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>Payment Method</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      Card ending in {formData.cardNumber.slice(-4) || '****'}
                    </p>
                  </div>
                </div>

                <div className={styles.payment__nav}>
                  <button 
                    type="button"
                    className={`${styles.payment__btn} ${styles['payment__btn--secondary']}`}
                    onClick={() => setCurrentStep(2)}
                  >
                    <box-icon name="arrow-left" size="20px"></box-icon>
                    Back
                  </button>
                  <button type="submit" className={`${styles.payment__btn} ${styles['payment__btn--primary']}`}>
                    Place Order
                    <box-icon name="check" size="20px"></box-icon>
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className={styles.payment__summary}>
            <h2 className={styles['payment__summary-title']}>Order Summary</h2>

            <div className={styles['payment__summary-items']}>
              {cartItems.map(item => (
                <div key={item.id} className={styles['payment__summary-item']}>
                  <div className={styles['payment__summary-image']}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles['payment__summary-item-info']}>
                    <p className={styles['payment__summary-item-title']}>{item.title}</p>
                    <p className={styles['payment__summary-item-price']}>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles['payment__summary-row']}>
              <span className={styles['payment__summary-label']}>Subtotal</span>
              <span className={styles['payment__summary-value']}>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles['payment__summary-row']}>
              <span className={styles['payment__summary-label']}>Shipping</span>
              <span className={`${styles['payment__summary-value']} ${shipping === 0 ? styles['cart__summary-value--free'] : ''}`}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className={styles['payment__summary-row']}>
              <span className={styles['payment__summary-label']}>Tax</span>
              <span className={styles['payment__summary-value']}>${tax.toFixed(2)}</span>
            </div>

            <div className={styles['payment__summary-total']}>
              <span>Total</span>
              <span className={styles['payment__summary-value']}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
