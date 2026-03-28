import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

const BlurText = ({
  text = '', delay = 200, className = '', animateBy = 'words', direction = 'top',
  threshold = 0.1, rootMargin = '0px', onAnimationComplete, stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(ref.current); } },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(() =>
    direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -30 } : { filter: 'blur(10px)', opacity: 0, y: 30 }, [direction]);
  const defaultTo = useMemo(() => ({ filter: 'blur(0px)', opacity: 1, y: 0 }), []);

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {elements.map((segment, index) => (
        <motion.span className="inline-block will-change-[transform,filter,opacity]" key={index}
          initial={defaultFrom} animate={inView ? defaultTo : defaultFrom}
          transition={{ duration: stepDuration, delay: (index * delay) / 1000, ease: 'easeOut' }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
