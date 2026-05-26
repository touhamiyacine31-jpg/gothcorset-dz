/* ============================================================
   Gothic decorative SVG elements
   All stroke-only, low opacity, scroll-reveal handled in CSS.
   ============================================================ */

// ---- Chandelier --------------------------------------------------
function ChandelierDivider() {
  return (
    <div className="divider divider--chandelier" data-reveal style={{"--target-opacity": 0.2}}>
      <svg viewBox="0 0 1600 280" width="100%" height="220" preserveAspectRatio="xMidYMin meet"
           fill="none" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round">
        {/* horizontal ceiling line */}
        <line x1="0" y1="2" x2="1600" y2="2" />
        {/* chain */}
        <g transform="translate(800 2)">
          <line x1="0" y1="0" x2="0" y2="36" />
          {/* chain links */}
          {[8,16,24,32].map((y,i)=>(
            <ellipse key={i} cx="0" cy={y} rx="3" ry="2.4" />
          ))}
          {/* crown / canopy */}
          <path d="M-46 38 L0 60 L46 38 Z" />
          <line x1="-46" y1="38" x2="46" y2="38" />
          {/* central rod */}
          <line x1="0" y1="60" x2="0" y2="190" />
          {/* upper tier */}
          <path d="M-110 92 Q0 70 110 92" />
          <path d="M-110 92 Q-130 110 -110 130" />
          <path d="M110 92 Q130 110 110 130" />
          {/* upper candles + arms */}
          {[-110,-72,-36,0,36,72,110].map((x,i)=>(
            <g key={i} transform={`translate(${x} 92)`}>
              <line x1="0" y1="0" x2="0" y2="-22"/>
              <path d="M-4 -22 Q0 -32 4 -22 L4 -16 L-4 -16 Z" />
              <line x1="0" y1="-32" x2="0" y2="-38" />
            </g>
          ))}
          {/* main ring */}
          <ellipse cx="0" cy="150" rx="200" ry="42" />
          <ellipse cx="0" cy="150" rx="200" ry="14" />
          {/* drops from ring */}
          {Array.from({length:11}).map((_,i)=>{
            const t = (i/10);
            const x = -190 + t*380;
            const y = 150 + Math.sin(t*Math.PI)*40;
            return <g key={i} transform={`translate(${x} ${y})`}>
              <line x1="0" y1="0" x2="0" y2="14"/>
              <path d="M-3 14 Q0 24 3 14 Q0 22 0 26 Z" />
            </g>;
          })}
          {/* lower tier candles */}
          {[-180,-130,-80,-40,0,40,80,130,180].map((x,i)=>(
            <g key={i} transform={`translate(${x} 130)`}>
              <line x1="0" y1="0" x2="0" y2="-18"/>
              <path d="M-3 -18 Q0 -26 3 -18 L3 -13 L-3 -13 Z" />
              <line x1="0" y1="-26" x2="0" y2="-32" />
              <path d="M-2 -32 Q0 -36 2 -32" />
            </g>
          ))}
          {/* bottom pendant */}
          <line x1="0" y1="192" x2="0" y2="220"/>
          <path d="M-10 220 Q0 240 10 220 Q0 250 0 256 Z" />
          {/* small ornaments hanging */}
          <line x1="-150" y1="170" x2="-150" y2="200" />
          <circle cx="-150" cy="206" r="6" />
          <line x1="150" y1="170" x2="150" y2="200" />
          <circle cx="150" cy="206" r="6" />
          <line x1="-80" y1="178" x2="-80" y2="208" />
          <path d="M-86 208 Q-80 220 -74 208 Z" />
          <line x1="80" y1="178" x2="80" y2="208" />
          <path d="M74 208 Q80 220 86 208 Z" />
          {/* decorative scrolls on ring */}
          <path d="M-200 150 q-22 -10 -10 -28" />
          <path d="M200 150 q22 -10 10 -28" />
          <path d="M-200 150 q-22 10 -10 28" />
          <path d="M200 150 q22 10 10 28" />
        </g>
      </svg>
    </div>
  );
}

// ---- Rose Window (rotates) --------------------------------------
function RoseWindow({ color = "#8B0000", size = 900 }) {
  // build a gothic rosette with multiple ring patterns
  const cx = 200, cy = 200, R = 190;
  const pet = (rings, count, rIn, rOut) => Array.from({length: count}).map((_, i) => {
    const a = (i / count) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * rIn;
    const y1 = cy + Math.sin(a) * rIn;
    const x2 = cx + Math.cos(a) * rOut;
    const y2 = cy + Math.sin(a) * rOut;
    return <line key={`${rings}-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });
  const arcPet = (count, rad, lobe) => Array.from({length: count}).map((_, i) => {
    const a = (i / count) * Math.PI * 2;
    const next = ((i + 1) / count) * Math.PI * 2;
    const mid = (a + next) / 2;
    const x1 = cx + Math.cos(a) * rad;
    const y1 = cy + Math.sin(a) * rad;
    const x2 = cx + Math.cos(next) * rad;
    const y2 = cy + Math.sin(next) * rad;
    const mx = cx + Math.cos(mid) * (rad + lobe);
    const my = cy + Math.sin(mid) * (rad + lobe);
    return <path key={`a-${i}`} d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} />;
  });
  return (
    <svg className="rosewindow" viewBox="0 0 400 400" width={size} height={size}
         fill="none" stroke={color} strokeWidth="0.8">
      {/* concentric rings */}
      <circle cx={cx} cy={cy} r={R} />
      <circle cx={cx} cy={cy} r={R - 18} />
      <circle cx={cx} cy={cy} r={R - 56} />
      <circle cx={cx} cy={cy} r={R - 96} />
      <circle cx={cx} cy={cy} r={R - 140} />
      <circle cx={cx} cy={cy} r={14} />
      <circle cx={cx} cy={cy} r={6} />

      {/* outer spokes */}
      {pet("outer", 24, R - 18, R)}
      {/* outer trefoil arcs */}
      <g>{arcPet(12, R - 30, 14)}</g>
      <g>{arcPet(12, R - 60, 12)}</g>

      {/* mid spokes */}
      {pet("mid", 16, R - 96, R - 56)}

      {/* inner petals (8) */}
      {Array.from({length: 8}).map((_, i) => {
        const a = (i / 8) * 360;
        return (
          <g key={`p-${i}`} transform={`rotate(${a} ${cx} ${cy})`}>
            <path d={`M${cx} ${cy - 14} Q${cx + 18} ${cy - 40} ${cx} ${cy - 96} Q${cx - 18} ${cy - 40} ${cx} ${cy - 14} Z`} />
            <line x1={cx} y1={cy - 14} x2={cx} y2={cy - 96} />
          </g>
        );
      })}

      {/* tiny circle ornaments at edge */}
      {Array.from({length: 12}).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
        const x = cx + Math.cos(a) * (R - 8);
        const y = cy + Math.sin(a) * (R - 8);
        return <circle key={`o-${i}`} cx={x} cy={y} r={3} />;
      })}

      {/* cross at center */}
      <g>
        <line x1={cx} y1={cy - 16} x2={cx} y2={cy + 16} />
        <line x1={cx - 16} y1={cy} x2={cx + 16} y2={cy} />
      </g>
    </svg>
  );
}

// ---- Bat wings + arch ---------------------------------------
function BatWingsDivider() {
  return (
    <div className="divider divider--wings" data-reveal>
      <svg viewBox="0 0 1600 260" width="100%" height="220" preserveAspectRatio="xMidYMid meet"
           fill="none" stroke="#E8E0D0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* central pointed arch */}
        <g transform="translate(800 30)">
          <path d="M-60 200 V70 Q0 -20 60 70 V200" />
          <path d="M-44 200 V76 Q0 6 44 76 V200" />
          {/* trefoil at apex */}
          <circle cx="0" cy="38" r="6" />
          <circle cx="-10" cy="48" r="4" />
          <circle cx="10" cy="48" r="4" />
          {/* base line */}
          <line x1="-80" y1="200" x2="80" y2="200" />
        </g>

        {/* left wing */}
        <g transform="translate(800 130)">
          <path d="M-72 0
                   Q-160 -36 -260 -30
                   Q-340 -12 -420 24
                   Q-360 30 -300 28
                   Q-240 26 -180 36
                   Q-140 44 -100 38
                   Q-86 36 -72 28
                   Z" />
          {/* wing finger creases */}
          <path d="M-72 8 Q-180 -10 -300 4" />
          <path d="M-72 16 Q-180 8 -260 18" />
          <path d="M-72 22 Q-160 22 -220 28" />
          {/* scallops on lower edge */}
          <path d="M-420 24 Q-380 38 -340 22 Q-300 38 -260 22 Q-220 38 -180 26 Q-140 38 -100 32" />
        </g>

        {/* right wing (mirror) */}
        <g transform="translate(800 130) scale(-1 1)">
          <path d="M-72 0
                   Q-160 -36 -260 -30
                   Q-340 -12 -420 24
                   Q-360 30 -300 28
                   Q-240 26 -180 36
                   Q-140 44 -100 38
                   Q-86 36 -72 28
                   Z" />
          <path d="M-72 8 Q-180 -10 -300 4" />
          <path d="M-72 16 Q-180 8 -260 18" />
          <path d="M-72 22 Q-160 22 -220 28" />
          <path d="M-420 24 Q-380 38 -340 22 Q-300 38 -260 22 Q-220 38 -180 26 Q-140 38 -100 32" />
        </g>

        {/* hairline horizon */}
        <line x1="80" y1="240" x2="1520" y2="240" strokeDasharray="2 6" />
      </svg>
    </div>
  );
}

// ---- Gothic arch row (cathedral ceiling) --------------------
function ArchRow({ width = 1600, archCount = 14, height = 80, color = "#C9A96E", opacity = 0.22 }) {
  const aw = width / archCount;
  const arches = Array.from({length: archCount}).map((_, i) => {
    const x = i * aw;
    return (
      <g key={i} transform={`translate(${x} 0)`}>
        {/* pointed arch */}
        <path d={`M2 ${height} V${height*0.35} Q${aw/2} -${height*0.15} ${aw-2} ${height*0.35} V${height}`} />
        {/* inner arch */}
        <path d={`M${aw*0.18} ${height} V${height*0.45} Q${aw/2} ${height*0.0} ${aw*0.82} ${height*0.45} V${height}`} />
        {/* trefoil dot */}
        <circle cx={aw/2} cy={height*0.18} r="2.4" />
        {/* divider columns */}
        <line x1="0" y1={height} x2="0" y2={height*0.3} />
      </g>
    );
  });
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none"
         fill="none" stroke={color} strokeWidth="1" strokeLinecap="round"
         style={{opacity, display:"block"}}>
      <line x1="0" y1={height} x2={width} y2={height} />
      {arches}
    </svg>
  );
}

// ---- Tiny inline icons (decor on hero / quotes) -------------
function CrossIcon({size=18}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M12 2 V22 M5 7 H19 M8 12 H16" />
  </svg>;
}

Object.assign(window, { ChandelierDivider, RoseWindow, BatWingsDivider, ArchRow, CrossIcon });
