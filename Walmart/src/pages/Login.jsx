import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Auth.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
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
          <h1 className={styles.auth__title}>Sign in to your account</h1>
          <p className={styles.auth__subtitle}>Access your orders, lists, and account information</p>
        </div>

        <form className={styles.auth__form} onSubmit={handleSubmit}>
          <div className={styles.auth__field}>
            <label htmlFor="email" className={styles.auth__label}>Email address</label>
            <div className={styles.auth__input_wrapper}>
              <input
                type="email"
                id="email"
                className={`${styles.auth__input} ${errors.email ? styles['auth__input--error'] : ''}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
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
            {errors.password && (
              <span className={styles.auth__error}>
                <box-icon name="error-circle" size="14px"></box-icon>
                {errors.password}
              </span>
            )}
          </div>

          <div className={styles.auth__checkbox}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Keep me signed in</label>
          </div>

          <button type="submit" className={styles.auth__btn} disabled={isLoading}>
            {isLoading ? (
              <>
                <box-icon name="loader" size="20px" animation="spin"></box-icon>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <div className={styles.auth__link}>
            <Link to="#">Forgot password?</Link>
          </div>

          <div className={styles.auth__divider}>or</div>

          <Link to="/" className={styles.auth__btn} style={{ backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>
            Continue as Guest
          </Link>

          <div className={styles.auth__link}>
            New to Walmart? <Link to="/signup">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
