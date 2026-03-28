import { forwardRef, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './VariableProximity.css';

function useAnimationFrame(callback) {
  useEffect(() => {
    let frameId;
    const loop = () => { callback(); frameId = requestAnimationFrame(loop); };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const update = (x, y) => {
      if (containerRef?.current) { const rect = containerRef.current.getBoundingClientRect(); positionRef.current = { x: x - rect.left, y: y - rect.top }; }
      else positionRef.current = { x, y };
    };
    const mouse = ev => update(ev.clientX, ev.clientY);
    const touch = ev => { const t = ev.touches[0]; update(t.clientX, t.clientY); };
    window.addEventListener('mousemove', mouse); window.addEventListener('touchmove', touch);
    return () => { window.removeEventListener('mousemove', mouse); window.removeEventListener('touchmove', touch); };
  }, [containerRef]);
  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const { label, fromFontVariationSettings, toFontVariationSettings, containerRef, radius = 50, falloff = 'linear', className = '', onClick, style, ...restProps } = props;
  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parse = str => new Map(str.split(',').map(s => s.trim()).map(s => { const [n, v] = s.split(' '); return [n.replace(/['"]/g, ''), parseFloat(v)]; }));
    const from = parse(fromFontVariationSettings); const to = parse(toFontVariationSettings);
    return Array.from(from.entries()).map(([axis, fromValue]) => ({ axis, fromValue, toValue: to.get(axis) ?? fromValue }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calcFalloff = (distance) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    if (falloff === 'exponential') return norm ** 2;
    if (falloff === 'gaussian') return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
    return norm;
  };

  useAnimationFrame(() => {
    if (!containerRef?.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
    lastPositionRef.current = { x, y };
    letterRefs.current.forEach((lr, i) => {
      if (!lr) return;
      const rect = lr.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - containerRect.left;
      const cy = rect.top + rect.height / 2 - containerRect.top;
      const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (d >= radius) { lr.style.fontVariationSettings = fromFontVariationSettings; return; }
      const f = calcFalloff(d);
      const settings = parsedSettings.map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * f}`).join(', ');
      interpolatedSettingsRef.current[i] = settings;
      lr.style.fontVariationSettings = settings;
    });
  });

  const words = label.split(' ');
  let letterIndex = 0;
  return (
    <span ref={ref} className={`${className} variable-proximity`} onClick={onClick} style={{ display: 'inline', ...style }} {...restProps}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(letter => {
            const ci = letterIndex++;
            return <motion.span key={ci} ref={el => { letterRefs.current[ci] = el; }} style={{ display: 'inline-block', fontVariationSettings: interpolatedSettingsRef.current[ci] }} aria-hidden="true">{letter}</motion.span>;
          })}
          {wi < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
