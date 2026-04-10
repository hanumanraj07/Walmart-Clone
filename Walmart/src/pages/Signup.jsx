import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Auth.module.css'

function getPasswordStrength(password) {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++
  
  if (strength <= 1) return 'weak'
  if (strength <= 2) return 'medium'
  return 'strong'
}

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [promotions, setPromotions] = useState(true)
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = {
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong'
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (!terms) newErrors.terms = 'You must agree to the terms'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    }
  }

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  return (
    <div className={styles.auth}>
      <div className={styles.auth__card}>
        <div className={styles.auth__logo}>
          <img 
            src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg" 
            alt="Walmart" 
          />
        </div>

        <div className={styles.auth__header}>
          <h1 className={styles.auth__title}>Create an account</h1>
          <p className={styles.auth__subtitle}>Sign up to enjoy a faster checkout and manage your orders</p>
        </div>

        <form className={styles.auth__form} onSubmit={handleSubmit}>
          <div className={styles.auth__field_row}>
            <div className={styles.auth__field}>
              <label htmlFor="firstName" className={styles.auth__label}>First name</label>
              <input
                type="text"
                id="firstName"
                className={`${styles.auth__input} ${errors.firstName ? styles['auth__input--error'] : ''}`}
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange('firstName')}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <span className={styles.auth__error}>
                  <box-icon name="error-circle" size="14px"></box-icon>
                  {errors.firstName}
                </span>
              )}
            </div>
            <div className={styles.auth__field}>
              <label htmlFor="lastName" className={styles.auth__label}>Last name</label>
              <input
                type="text"
                id="lastName"
                className={`${styles.auth__input} ${errors.lastName ? styles['auth__input--error'] : ''}`}
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange('lastName')}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <span className={styles.auth__error}>
                  <box-icon name="error-circle" size="14px"></box-icon>
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className={styles.auth__field}>
            <label htmlFor="email" className={styles.auth__label}>Email address</label>
            <input
              type="email"
              id="email"
              className={`${styles.auth__input} ${errors.email ? styles['auth__input--error'] : ''}`}
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange('email')}
              autoComplete="email"
            />
            {errors.email && (
              <span className={styles.auth__error}>
                <box-icon name="error-circle" size="14px"></box-icon>
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles.auth__field}>
            <label htmlFor="password" className={styles.auth__label}>Password</label>
            <div className={styles.auth__input_wrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`${styles.auth__input} ${errors.password ? styles['auth__input--error'] : ''}`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange('password')}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.auth__toggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <box-icon name={showPassword ? 'eye-off' : 'eye'} size="20px"></box-icon>
              </button>
            </div>

            {formData.password && (
              <div className={styles.auth__strength}>
                <div className={styles.auth__strength_bar}>
                  <div 
                    className={`${styles.auth__strength_fill} ${styles[`auth__strength_fill--${passwordStrength}`]}`}
                  />
                </div>
                <span className={styles.auth__strength_text}>
                  Password strength: {strengthLabels[passwordStrength]}
                </span>
              </div>
            )}

            {errors.password && (
              <span className={styles.auth__error}>
                <box-icon name="error-circle" size="14px"></box-icon>
                {errors.password}
              </span>
            )}

            <div className={styles.auth__requirements}>
              <h4 className={styles.auth__requirements_title}>Password Requirements:</h4>
              <ul className={styles.auth__requirements_list}>
                <li className={`${styles.auth__requirement} ${formData.password.length >= 8 ? styles['auth__requirement--met'] : ''}`}>
                  <box-icon name={formData.password.length >= 8 ? 'check-circle' : 'circle'} size="14px"></box-icon>
                  At least 8 characters
                </li>
                <li className={`${styles.auth__requirement} ${/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? styles['auth__requirement--met'] : ''}`}>
                  <box-icon name={/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'check-circle' : 'circle'} size="14px"></box-icon>
                  Contains uppercase and lowercase letters
                </li>
                <li className={`${styles.auth__requirement} ${/\d/.test(formData.password) ? styles['auth__requirement--met'] : ''}`}>
                  <box-icon name={/\d/.test(formData.password) ? 'check-circle' : 'circle'} size="14px"></box-icon>
                  Contains at least one number
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.auth__checkbox}>
            <input
              type="checkbox"
              id="promotions"
              checked={promotions}
              onChange={(e) => setPromotions(e.target.checked)}
            />
            <label htmlFor="promotions">
              Send me emails with tips, trends, promotions and more from Walmart (you can unsubscribe at any time)
            </label>
          </div>

          <div className={styles.auth__checkbox}>
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
            </label>
          </div>
          {errors.terms && (
            <span className={styles.auth__error}>
              <box-icon name="error-circle" size="14px"></box-icon>
              {errors.terms}
            </span>
          )}

          <button type="submit" className={styles.auth__btn} disabled={isLoading}>
            {isLoading ? (
              <>
                <box-icon name="loader" size="20px" animation="spin"></box-icon>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <div className={styles.auth__link}>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>

          <div className={styles.auth__benefits}>
            <h3 className={styles.auth__benefits_title}>Benefits of creating an account:</h3>
            <ul className={styles.auth__benefits_list}>
              <li className={styles.auth__benefit}>
                <box-icon name="check-circle" size="16px"></box-icon>
                Faster checkout with saved information
              </li>
              <li className={styles.auth__benefit}>
                <box-icon name="check-circle" size="16px"></box-icon>
                Track your orders and delivery status
              </li>
              <li className={styles.auth__benefit}>
                <box-icon name="check-circle" size="16px"></box-icon>
                Create and manage your shopping lists
              </li>
              <li className={styles.auth__benefit}>
                <box-icon name="check-circle" size="16px"></box-icon>
                Access exclusive deals and promotions
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
