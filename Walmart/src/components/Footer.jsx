import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const footerLinks = {
  shop: [
    { name: 'All Departments', href: '#' },
    { name: 'Store Directory', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Our Company', href: '#' },
    { name: 'Sell on Walmart.com', href: '#' },
    { name: 'Help', href: '#' },
  ],
  customer: [
    { name: 'Product Recalls', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Tax Exempt Program', href: '#' },
    { name: 'Get the Walmart App', href: '#' },
    { name: 'Sign-up for Email', href: '#' },
  ],
  legal: [
    { name: 'Terms of Use', href: '#' },
    { name: 'Privacy & Security', href: '#' },
    { name: 'California Supply Chain Act', href: '#' },
    { name: 'Your Privacy Choices', href: '#' },
    { name: 'Notice at Collection', href: '#' },
  ],
  about: [
    { name: 'Pharmacy', href: '#' },
    { name: 'Walmart Business', href: '#' },
    { name: 'Safety Data Sheet', href: '#' },
    { name: 'Request My Personal Information', href: '#' },
    { name: 'Brand Shop Directory', href: '#' },
  ]
}

function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__main}>
        <div className="container">
          <div className={styles.footer__grid}>
            <div className={styles.footer__section}>
              <h3>Shop</h3>
              <ul>
                {footerLinks.shop.map(link => (
                  <li key={link.name}>
                    <Link to={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footer__section}>
              <h3>Customer Service</h3>
              <ul>
                {footerLinks.customer.map(link => (
                  <li key={link.name}>
                    <Link to={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footer__section}>
              <h3>Legal & Policies</h3>
              <ul>
                {footerLinks.legal.map(link => (
                  <li key={link.name}>
                    <Link to={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footer__section}>
              <h3>About Walmart</h3>
              <ul>
                {footerLinks.about.map(link => (
                  <li key={link.name}>
                    <Link to={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.footer__section} ${styles['footer__newsletter']}`}>
              <h3>Stay Connected</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                Subscribe to our newsletter for the latest deals and updates.
              </p>
              <form className={styles['footer__newsletter-form']} onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  className={styles['footer__newsletter-input']}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                />
                <button type="submit" className={styles['footer__newsletter-btn']}>
                  Subscribe
                </button>
              </form>

              <div className={styles.footer__social}>
                <a href="#" className={styles['footer__social-link']} aria-label="Facebook">
                  <box-icon type="logo" name="facebook" size="20px" />
                </a>
                <a href="#" className={styles['footer__social-link']} aria-label="Twitter">
                  <box-icon type="logo" name="twitter" size="20px" />
                </a>
                <a href="#" className={styles['footer__social-link']} aria-label="Instagram">
                  <box-icon type="logo" name="instagram" size="20px" />
                </a>
                <a href="#" className={styles['footer__social-link']} aria-label="YouTube">
                  <box-icon type="logo" name="youtube" size="20px" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <div className="container">
          <div className={styles['footer__bottom-inner']}>
            <p className={styles.footer__copyright}>
              &copy; 2024 Walmart. All Rights Reserved.
            </p>
            <div className={styles.footer__links}>
              <Link to="#" className={styles.footer__link}>
                <box-icon name="globe" size="16px" />
                United States
              </Link>
              <Link to="#" className={styles.footer__link}>
                English
              </Link>
              <Link to="#" className={styles.footer__link}>
                <box-icon name="flag" size="16px" />
                United States
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
