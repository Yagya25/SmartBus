import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function DecryptedText({
  text, speed = 50, maxIterations = 10, sequential = false, revealDirection = 'start',
  useOriginalCharsOnly = false, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '', parentClassName = '', encryptedClassName = '', animateOn = 'hover', ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
  const containerRef = useRef(null);

  const availableChars = useMemo(() =>
    useOriginalCharsOnly ? Array.from(new Set(text.split(''))).filter(c => c !== ' ') : characters.split(''),
    [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback((orig, revealed) =>
    orig.split('').map((c, i) => c === ' ' ? ' ' : revealed.has(i) ? orig[i] : availableChars[Math.floor(Math.random() * availableChars.length)]).join(''),
    [availableChars]);

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set());
    setIsAnimating(true);
  }, []);

  const resetToPlainText = useCallback(() => {
    setIsAnimating(false); setRevealedIndices(new Set()); setDisplayText(text); setIsDecrypted(true);
  }, [text]);

  useEffect(() => {
    if (animateOn !== 'view') return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting && !hasAnimated) { triggerDecrypt(); setHasAnimated(true); } });
    }, { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (!isAnimating) return;
    let iteration = 0;
    const interval = setInterval(() => {
      if (sequential) {
        setRevealedIndices(prev => {
          if (prev.size < text.length) {
            const next = new Set(prev);
            const idx = revealDirection === 'end' ? text.length - 1 - prev.size : prev.size;
            next.add(idx);
            setDisplayText(shuffleText(text, next));
            return next;
          }
          clearInterval(interval); setIsAnimating(false); setIsDecrypted(true); return prev;
        });
      } else {
        setDisplayText(shuffleText(text, revealedIndices));
        iteration++;
        if (iteration >= maxIterations) { clearInterval(interval); setIsAnimating(false); setDisplayText(text); setIsDecrypted(true); }
      }
    }, speed);
    return () => clearInterval(interval);
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText, revealedIndices]);

  useEffect(() => { setDisplayText(text); setIsDecrypted(true); }, [text]);

  const animateProps = animateOn === 'hover' ? { onMouseEnter: triggerDecrypt, onMouseLeave: resetToPlainText } : {};

  return (
    <motion.span className={parentClassName} ref={containerRef} style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }} {...animateProps} {...props}>
      <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const revealed = revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return <span key={index} className={revealed ? className : encryptedClassName}>{char}</span>;
        })}
      </span>
    </motion.span>
  );
}
