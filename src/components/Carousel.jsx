import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './Carousel.css';

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, trackItemOffset, x, transition }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const rotateY = useTransform(x, range, [90, 0, -90], { clamp: false });

  return (
    <motion.div
      className="carousel-item"
      style={{ width: itemWidth, height: '100%', rotateY }}
      transition={transition}
    >
      <div className="carousel-item-header">
        <span className="carousel-icon-container">{item.icon}</span>
      </div>
      <div className="carousel-item-content">
        <div className="carousel-item-title">{item.title}</div>
        <p className="carousel-item-description">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Carousel({ items = [], baseWidth = 300, autoplay = false, autoplayDelay = 3000, pauseOnHover = false, loop = false }) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const el = containerRef.current;
      const enter = () => setIsHovered(true); const leave = () => setIsHovered(false);
      el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave);
      return () => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return;
    if (pauseOnHover && isHovered) return;
    const timer = setInterval(() => setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1)), autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const start = loop ? 1 : 0; setPosition(start); x.set(-start * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) { setIsAnimating(false); return; }
    const lastClone = itemsForRender.length - 1;
    if (position === lastClone) {
      setIsJumping(true); const t = 1; setPosition(t); x.set(-t * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); }); return;
    }
    if (position === 0) {
      setIsJumping(true); const t = items.length; setPosition(t); x.set(-t * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); }); return;
    }
    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const dir = offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1 : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1 : 0;
    if (dir === 0) return;
    setPosition(prev => Math.max(0, Math.min(prev + dir, itemsForRender.length - 1)));
  };

  const dragProps = loop ? {} : { dragConstraints: { left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0), right: 0 } };
  const activeIndex = items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  return (
    <div ref={containerRef} className="carousel-container" style={{ width: `${baseWidth}px` }}>
      <motion.div className="carousel-track" drag={isAnimating ? false : 'x'} {...dragProps}
        style={{ width: itemWidth, gap: `${GAP}px`, perspective: 1000, perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`, x }}
        onDragEnd={handleDragEnd} animate={{ x: -(position * trackItemOffset) }} transition={effectiveTransition}
        onAnimationStart={() => setIsAnimating(true)} onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem key={`${item?.id ?? index}-${index}`} item={item} index={index} itemWidth={itemWidth} trackItemOffset={trackItemOffset} x={x} transition={effectiveTransition} />
        ))}
      </motion.div>
      <div className="carousel-indicators-container">
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.div key={index} className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }} onClick={() => setPosition(loop ? index + 1 : index)} transition={{ duration: 0.15 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
