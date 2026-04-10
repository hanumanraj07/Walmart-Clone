import { useState } from 'react'
import styles from './Carousel.module.css'

function Carousel({ slides, autoPlay = true, interval = 5000 }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = (index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 400)
  }

  const goToNext = () => {
    const nextIndex = (currentSlide + 1) % slides.length
    goToSlide(nextIndex)
  }

  const goToPrev = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length
    goToSlide(prevIndex)
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__track}>
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`${styles.carousel__slide} ${index === currentSlide ? styles['carousel__slide--active'] : ''}`}
            style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
          >
            <img src={slide.image} alt={slide.alt || slide.title} className={styles.carousel__image} />
            {slide.content && (
              <div className={styles.carousel__content}>
                {slide.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <button 
        className={`${styles.carousel__arrow} ${styles['carousel__arrow--prev']}`}
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        <box-icon name="chevron-left" size="32px" color="white" />
      </button>

      <button 
        className={`${styles.carousel__arrow} ${styles['carousel__arrow--next']}`}
        onClick={goToNext}
        aria-label="Next slide"
      >
        <box-icon name="chevron-right" size="32px" color="white" />
      </button>

      <div className={styles.carousel__dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.carousel__dot} ${index === currentSlide ? styles['carousel__dot--active'] : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
