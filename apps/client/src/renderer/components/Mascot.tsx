// The Steward — Holdfast's portly bearded king, standing watch atop his keep.
// Used in empty states throughout the app.

interface Props {
  size?: number;
  className?: string;
}

export default function Mascot({ size = 160, className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 100 122"
      width={size}
      height={size * 1.22}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="The Steward, Holdfast's bearded king"
    >
      <defs>
        {/* Stone — top-lit, dark below */}
        <linearGradient id="stoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8e8478" />
          <stop offset="55%" stopColor="#5e5448" />
          <stop offset="100%" stopColor="#2e2820" />
        </linearGradient>

        {/* Stone block edge — lit top, dark bottom */}
        <linearGradient id="merlonGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9e9488" />
          <stop offset="100%" stopColor="#4e4438" />
        </linearGradient>

        {/* Robe — deep royal red */}
        <linearGradient id="robeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a83020" />
          <stop offset="100%" stopColor="#4a1008" />
        </linearGradient>

        {/* Gold — for crown, trim, scepter */}
        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6dc88" />
          <stop offset="50%" stopColor="#c8922a" />
          <stop offset="100%" stopColor="#5a3a10" />
        </linearGradient>

        {/* Skin — warm, slightly ruddy */}
        <radialGradient id="skinGrad" cx="0.5" cy="0.4" r="0.65">
          <stop offset="0%" stopColor="#ecc09a" />
          <stop offset="100%" stopColor="#a86c48" />
        </radialGradient>

        {/* Beard — silvery white */}
        <linearGradient id="beardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4ece0" />
          <stop offset="100%" stopColor="#988e7c" />
        </linearGradient>

        {/* Jewel — ruby */}
        <radialGradient id="rubyGrad" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0%" stopColor="#f08070" />
          <stop offset="60%" stopColor="#b02820" />
          <stop offset="100%" stopColor="#4a0c08" />
        </radialGradient>

        {/* Jewel — sapphire */}
        <radialGradient id="sapphireGrad" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0%" stopColor="#70a0e0" />
          <stop offset="60%" stopColor="#2848a0" />
          <stop offset="100%" stopColor="#0c1a48" />
        </radialGradient>

        {/* Flag — house banner */}
        <linearGradient id="flagGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5a1408" />
          <stop offset="100%" stopColor="#a83020" />
        </linearGradient>

        {/* Stone block clip — for fitting block texture */}
        <clipPath id="wallClip">
          <rect x="10" y="92" width="80" height="30" />
        </clipPath>
      </defs>

      {/* ── Background flagpole + banner (peeks above fort behind king) ── */}
      <line x1="84" y1="68" x2="84" y2="92" stroke="#3a2410" strokeWidth="1.2" />
      <path
        d="M84,70 L94,72 L91,76 L94,80 L84,78 Z"
        fill="url(#flagGrad)"
        stroke="#3a0a04"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      {/* Banner crest — gold dot */}
      <circle cx="88" cy="75" r="1" fill="url(#goldGrad)" />
      {/* Pole finial */}
      <circle cx="84" cy="68" r="1.2" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.3" />

      {/* ── Fort main wall ── */}
      <rect x="10" y="92" width="80" height="30" fill="url(#stoneGrad)" stroke="#1c1610" strokeWidth="1" />

      {/* Stone block courses */}
      <g clipPath="url(#wallClip)" stroke="#1c1610" strokeWidth="0.6" opacity="0.85" fill="none">
        {/* Horizontal mortar lines */}
        <line x1="10" y1="100" x2="90" y2="100" />
        <line x1="10" y1="108" x2="90" y2="108" />
        <line x1="10" y1="116" x2="90" y2="116" />
        {/* Top row vertical seams (offset) */}
        <line x1="22" y1="92" x2="22" y2="100" />
        <line x1="38" y1="92" x2="38" y2="100" />
        <line x1="54" y1="92" x2="54" y2="100" />
        <line x1="70" y1="92" x2="70" y2="100" />
        {/* Second row (staggered) */}
        <line x1="14" y1="100" x2="14" y2="108" />
        <line x1="30" y1="100" x2="30" y2="108" />
        <line x1="46" y1="100" x2="46" y2="108" />
        <line x1="62" y1="100" x2="62" y2="108" />
        <line x1="78" y1="100" x2="78" y2="108" />
        {/* Third row */}
        <line x1="22" y1="108" x2="22" y2="116" />
        <line x1="38" y1="108" x2="38" y2="116" />
        <line x1="54" y1="108" x2="54" y2="116" />
        <line x1="70" y1="108" x2="70" y2="116" />
        {/* Fourth row */}
        <line x1="14" y1="116" x2="14" y2="122" />
        <line x1="30" y1="116" x2="30" y2="122" />
        <line x1="46" y1="116" x2="46" y2="122" />
        <line x1="62" y1="116" x2="62" y2="122" />
        <line x1="78" y1="116" x2="78" y2="122" />
      </g>

      {/* Wall highlight along top edge */}
      <line x1="10" y1="92.5" x2="90" y2="92.5" stroke="#b8ae9c" strokeWidth="0.6" opacity="0.7" />

      {/* Arched doorway at center bottom */}
      <path d="M44,122 L44,114 Q44,110 50,110 Q56,110 56,114 L56,122 Z" fill="#1c1006" stroke="#0a0604" strokeWidth="0.6" />
      {/* Door wood texture */}
      <line x1="47" y1="111" x2="47" y2="122" stroke="#3a2410" strokeWidth="0.4" opacity="0.7" />
      <line x1="50" y1="110.5" x2="50" y2="122" stroke="#3a2410" strokeWidth="0.4" opacity="0.7" />
      <line x1="53" y1="111" x2="53" y2="122" stroke="#3a2410" strokeWidth="0.4" opacity="0.7" />
      {/* Door iron studs */}
      <circle cx="46" cy="115" r="0.5" fill="#7a6850" />
      <circle cx="54" cy="115" r="0.5" fill="#7a6850" />
      <circle cx="46" cy="119" r="0.5" fill="#7a6850" />
      <circle cx="54" cy="119" r="0.5" fill="#7a6850" />

      {/* Arrow slits on wall */}
      <rect x="20" y="103" width="1.5" height="6" fill="#0a0604" />
      <rect x="78.5" y="103" width="1.5" height="6" fill="#0a0604" />

      {/* ── Merlons (battlements) on top of the wall ── */}
      {/* Four merlons with crenels between; king stands in the widest center crenel */}
      <g>
        {/* Merlon 1 (far left) */}
        <rect x="10" y="82" width="12" height="10" fill="url(#merlonGrad)" stroke="#1c1610" strokeWidth="0.9" />
        <line x1="10" y1="82.5" x2="22" y2="82.5" stroke="#b8ae9c" strokeWidth="0.5" opacity="0.7" />
        <line x1="10" y1="87" x2="22" y2="87" stroke="#1c1610" strokeWidth="0.4" opacity="0.6" />
        <line x1="16" y1="82" x2="16" y2="87" stroke="#1c1610" strokeWidth="0.4" opacity="0.6" />

        {/* Merlon 2 */}
        <rect x="28" y="82" width="12" height="10" fill="url(#merlonGrad)" stroke="#1c1610" strokeWidth="0.9" />
        <line x1="28" y1="82.5" x2="40" y2="82.5" stroke="#b8ae9c" strokeWidth="0.5" opacity="0.7" />
        <line x1="28" y1="87" x2="40" y2="87" stroke="#1c1610" strokeWidth="0.4" opacity="0.6" />
        <line x1="34" y1="82" x2="34" y2="87" stroke="#1c1610" strokeWidth="0.4" opacity="0.6" />

        {/* Merlon 3 */}
        <rect x="60" y="82" width="12" height="10" fill="url(#merlonGrad)" stroke="#1c1610" strokeWidth="0.9" />
        <line x1="60" y1="82.5" x2="72" y2="82.5" stroke="#b8ae9c" strokeWidth="0.5" opacity="0.7" />
        <line x1="60" y1="87" x2="72" y2="87" stroke="#1c1610" strokeWidth="0.4" opacity="0.6" />
        <line x1="66" y1="82" x2="66" y2="87" stroke="#1c1610" strokeWidth="0.4" opacity="0.6" />

        {/* Merlon 4 (far right) */}
        <rect x="78" y="82" width="12" height="10" fill="url(#merlonGrad)" stroke="#1c1610" strokeWidth="0.9" />
        <line x1="78" y1="82.5" x2="90" y2="82.5" stroke="#b8ae9c" strokeWidth="0.5" opacity="0.7" />
        <line x1="78" y1="87" x2="90" y2="87" stroke="#1c1610" strokeWidth="0.4" opacity="0.6" />
        <line x1="84" y1="82" x2="84" y2="87" stroke="#1c1610" strokeWidth="0.4" opacity="0.6" />
      </g>

      {/* ── KING ── */}
      {/* Boots — wide stance on wall top, between merlons */}
      <path d="M40,84 Q39,89 38,92 L46,92 Q46,89 46,84 Z" fill="#2a1408" stroke="#0a0604" strokeWidth="0.6" strokeLinejoin="round" />
      <path d="M54,84 Q54,89 54,92 L62,92 Q61,89 60,84 Z" fill="#2a1408" stroke="#0a0604" strokeWidth="0.6" strokeLinejoin="round" />
      {/* Boot cuffs */}
      <ellipse cx="42" cy="84" rx="4" ry="1.2" fill="#3a2410" stroke="#1c1006" strokeWidth="0.4" />
      <ellipse cx="58" cy="84" rx="4" ry="1.2" fill="#3a2410" stroke="#1c1006" strokeWidth="0.4" />
      {/* Boot soles */}
      <rect x="36" y="91" width="11" height="1.5" fill="#0a0604" />
      <rect x="53" y="91" width="11" height="1.5" fill="#0a0604" />

      {/* Legs — under robe, only stockings show */}
      <rect x="42" y="78" width="4" height="7" fill="#d8c8a8" stroke="#7a6850" strokeWidth="0.4" />
      <rect x="54" y="78" width="4" height="7" fill="#d8c8a8" stroke="#7a6850" strokeWidth="0.4" />

      {/* Royal robe — wide, pear-shaped, hangs over belt */}
      <path
        d="M30,48 Q26,60 25,76 Q24,82 30,84 L70,84 Q76,82 75,76 Q74,60 70,48 Q70,46 50,46 Q30,46 30,48 Z"
        fill="url(#robeGrad)"
        stroke="#3a0808"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Robe shadow on flanks */}
      <path d="M30,58 Q26,72 26,80" stroke="#3a0808" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M70,58 Q74,72 74,80" stroke="#3a0808" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Robe trim — gold band along hem */}
      <path d="M30,82 Q24,82 24,76 L26,76 Q27,80 30,80 L70,80 Q73,80 74,76 L76,76 Q76,82 70,82 Z" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.4" />

      {/* Robe central trim — gold strip down the front */}
      <rect x="48" y="48" width="4" height="34" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.4" />
      {/* Gem buttons */}
      <circle cx="50" cy="54" r="1.3" fill="url(#rubyGrad)" stroke="#5a1810" strokeWidth="0.3" />
      <circle cx="50" cy="62" r="1.3" fill="url(#sapphireGrad)" stroke="#1c3a58" strokeWidth="0.3" />
      <circle cx="50" cy="70" r="1.3" fill="url(#rubyGrad)" stroke="#5a1810" strokeWidth="0.3" />
      <circle cx="50" cy="78" r="1.3" fill="url(#sapphireGrad)" stroke="#1c3a58" strokeWidth="0.3" />

      {/* Belt — across the belly */}
      <rect x="26" y="68" width="48" height="4" fill="#3a1c10" stroke="#0a0604" strokeWidth="0.5" />
      {/* Buckle */}
      <rect x="46" y="67" width="8" height="6" rx="0.6" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.5" />
      <rect x="48" y="69" width="4" height="2" fill="none" stroke="#5a3a10" strokeWidth="0.4" />
      <circle cx="50" cy="70" r="0.6" fill="#5a3a10" />

      {/* Left arm — hand on hip */}
      <path d="M30,50 Q22,58 22,68 Q22,73 28,72" fill="url(#robeGrad)" stroke="#3a0808" strokeWidth="1" strokeLinejoin="round" />
      {/* Left cuff */}
      <path d="M22,68 Q22,72 28,72 L29,68 Z" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.4" />
      {/* Left hand on hip */}
      <ellipse cx="27" cy="70" rx="3" ry="2.4" fill="url(#skinGrad)" stroke="#7a4828" strokeWidth="0.5" />
      {/* Knuckle lines */}
      <path d="M25,71 L29,71" stroke="#7a4828" strokeWidth="0.3" opacity="0.6" />

      {/* Right arm — extended, holding scepter */}
      <path d="M70,50 Q78,58 78,70 Q78,75 73,76" fill="url(#robeGrad)" stroke="#3a0808" strokeWidth="1" strokeLinejoin="round" />
      <path d="M78,70 Q78,75 73,76 L72,72 Z" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.4" />
      {/* Right hand grasping scepter */}
      <ellipse cx="74" cy="74" rx="3" ry="2.5" fill="url(#skinGrad)" stroke="#7a4828" strokeWidth="0.5" />
      {/* Thumb wrap */}
      <path d="M73,72 Q76,73 76,76" fill="none" stroke="#7a4828" strokeWidth="0.6" />

      {/* Scepter — shaft + ornate head */}
      <rect x="73.4" y="48" width="1.4" height="28" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.3" />
      {/* Scepter cross-bar grip */}
      <rect x="71" y="58" width="6" height="1.4" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.3" />
      {/* Scepter orb */}
      <circle cx="74.1" cy="44" r="3" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.5" />
      {/* Orb cross */}
      <rect x="73.7" y="40" width="0.8" height="4" fill="#5a3a10" />
      <rect x="72.5" y="41.8" width="3.2" height="0.8" fill="#5a3a10" />
      {/* Orb jewel */}
      <circle cx="74.1" cy="44" r="1.2" fill="url(#rubyGrad)" />

      {/* Ermine collar — white fur with black tail spots */}
      <path
        d="M30,46 Q32,42 38,41 Q44,40 50,40 Q56,40 62,41 Q68,42 70,46 L70,50 Q60,52 50,52 Q40,52 30,50 Z"
        fill="#f4ece0"
        stroke="#7a6e58"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* Ermine spots */}
      <g fill="#1c0e04">
        <ellipse cx="35" cy="46" rx="0.8" ry="0.6" />
        <ellipse cx="40" cy="48" rx="0.8" ry="0.6" />
        <ellipse cx="46" cy="45" rx="0.8" ry="0.6" />
        <ellipse cx="50" cy="49" rx="0.8" ry="0.6" />
        <ellipse cx="55" cy="46" rx="0.8" ry="0.6" />
        <ellipse cx="60" cy="48" rx="0.8" ry="0.6" />
        <ellipse cx="65" cy="46" rx="0.8" ry="0.6" />
      </g>
      {/* Spot details — small lines below each */}
      <g stroke="#1c0e04" strokeWidth="0.4" opacity="0.7">
        <line x1="35" y1="47" x2="35" y2="48" />
        <line x1="40" y1="49" x2="40" y2="50" />
        <line x1="46" y1="46" x2="46" y2="47" />
        <line x1="55" y1="47" x2="55" y2="48" />
        <line x1="60" y1="49" x2="60" y2="50" />
        <line x1="65" y1="47" x2="65" y2="48" />
      </g>

      {/* ── Beard (hangs from face over chest and belly) ── */}
      <path
        d="M40,38 Q38,46 36,54 Q35,62 38,68 Q44,72 50,73 Q56,72 62,68 Q65,62 64,54 Q62,46 60,38 Q55,40 50,40 Q45,40 40,38 Z"
        fill="url(#beardGrad)"
        stroke="#7a7060"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Beard texture — wavy curls */}
      <g stroke="#a89c84" strokeWidth="0.55" fill="none" opacity="0.85" strokeLinecap="round">
        <path d="M40,46 Q42,50 40,54" />
        <path d="M43,52 Q45,56 43,60" />
        <path d="M47,48 Q49,52 47,56" />
        <path d="M50,55 Q52,60 50,65" />
        <path d="M53,48 Q55,52 53,56" />
        <path d="M57,52 Q59,56 57,60" />
        <path d="M60,46 Q62,50 60,54" />
        <path d="M44,62 Q47,66 44,70" />
        <path d="M56,62 Q53,66 56,70" />
      </g>
      {/* Beard bottom highlight */}
      <path d="M40,68 Q50,72 60,68" fill="none" stroke="#f4ece0" strokeWidth="0.6" opacity="0.6" />

      {/* ── Mustache (covers upper lip) ── */}
      <path
        d="M42,38 Q46,40 50,39 Q54,40 58,38 Q57,42 53,42 Q50,41 47,42 Q43,42 42,38 Z"
        fill="url(#beardGrad)"
        stroke="#7a7060"
        strokeWidth="0.55"
        strokeLinejoin="round"
      />
      {/* Mustache curl detail */}
      <path d="M43,39 Q42,41 43,41" fill="none" stroke="#7a7060" strokeWidth="0.4" />
      <path d="M57,39 Q58,41 57,41" fill="none" stroke="#7a7060" strokeWidth="0.4" />

      {/* ── Head/face ── */}
      <ellipse cx="50" cy="32" rx="10" ry="11" fill="url(#skinGrad)" stroke="#7a4828" strokeWidth="0.8" />
      {/* Forehead highlight */}
      <ellipse cx="50" cy="26" rx="6" ry="2" fill="#f4d8b4" opacity="0.45" />

      {/* Rosy cheeks */}
      <ellipse cx="42" cy="35" rx="2.2" ry="1.6" fill="#d0604c" opacity="0.5" />
      <ellipse cx="58" cy="35" rx="2.2" ry="1.6" fill="#d0604c" opacity="0.5" />

      {/* Nose — bulbous, ruddy */}
      <ellipse cx="50" cy="35" rx="2.2" ry="2.8" fill="#d0786c" stroke="#7a3818" strokeWidth="0.5" />
      <ellipse cx="50" cy="36.2" rx="1.4" ry="1.4" fill="#b04838" opacity="0.6" />
      {/* Nostrils */}
      <ellipse cx="49" cy="37" rx="0.4" ry="0.6" fill="#3a1408" />
      <ellipse cx="51" cy="37" rx="0.4" ry="0.6" fill="#3a1408" />
      {/* Nose highlight */}
      <ellipse cx="49" cy="33.5" rx="0.6" ry="0.8" fill="#f4d8b4" opacity="0.7" />

      {/* Eyes — small, jolly */}
      <ellipse cx="45" cy="31" rx="1.4" ry="1" fill="#fff" stroke="#3a1408" strokeWidth="0.4" />
      <ellipse cx="55" cy="31" rx="1.4" ry="1" fill="#fff" stroke="#3a1408" strokeWidth="0.4" />
      <circle cx="45.2" cy="31.2" r="0.7" fill="#3a2410" />
      <circle cx="55.2" cy="31.2" r="0.7" fill="#3a2410" />
      {/* Eye shine */}
      <circle cx="44.9" cy="30.9" r="0.3" fill="#fff" />
      <circle cx="54.9" cy="30.9" r="0.3" fill="#fff" />
      {/* Smile crinkles at outer corners */}
      <path d="M42,31 Q41,30 41,29" stroke="#7a4828" strokeWidth="0.4" fill="none" opacity="0.7" />
      <path d="M42,31 Q41,32 41.5,33" stroke="#7a4828" strokeWidth="0.4" fill="none" opacity="0.7" />
      <path d="M58,31 Q59,30 59,29" stroke="#7a4828" strokeWidth="0.4" fill="none" opacity="0.7" />
      <path d="M58,31 Q59,32 58.5,33" stroke="#7a4828" strokeWidth="0.4" fill="none" opacity="0.7" />

      {/* Eyebrows — bushy, white */}
      <path d="M41,28 Q45,25.5 49,28" stroke="#f4ece0" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M51,28 Q55,25.5 59,28" stroke="#f4ece0" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Brow shadow */}
      <path d="M42,28.5 Q45,26.5 48,28.5" stroke="#a89c84" strokeWidth="0.6" fill="none" opacity="0.7" />
      <path d="M52,28.5 Q55,26.5 58,28.5" stroke="#a89c84" strokeWidth="0.6" fill="none" opacity="0.7" />

      {/* Hair tufts at sides (peeking from under crown) */}
      <path d="M40,28 Q37,31 38,36 Q40,38 41,36" fill="url(#beardGrad)" stroke="#7a7060" strokeWidth="0.5" />
      <path d="M60,28 Q63,31 62,36 Q60,38 59,36" fill="url(#beardGrad)" stroke="#7a7060" strokeWidth="0.5" />

      {/* Ears */}
      <ellipse cx="40" cy="33" rx="1.6" ry="2.2" fill="url(#skinGrad)" stroke="#7a4828" strokeWidth="0.5" />
      <ellipse cx="60" cy="33" rx="1.6" ry="2.2" fill="url(#skinGrad)" stroke="#7a4828" strokeWidth="0.5" />
      <path d="M40,33 Q40.6,34 40,35" fill="none" stroke="#7a4828" strokeWidth="0.4" />
      <path d="M60,33 Q59.4,34 60,35" fill="none" stroke="#7a4828" strokeWidth="0.4" />

      {/* ── Crown ── */}
      {/* Crown band */}
      <path d="M37,20 L63,20 L63,26 Q50,28 37,26 Z" fill="url(#goldGrad)" stroke="#5a3a10" strokeWidth="0.7" strokeLinejoin="round" />
      {/* Crown band detailing — engraved line */}
      <path d="M38,23 Q50,24.5 62,23" fill="none" stroke="#5a3a10" strokeWidth="0.4" opacity="0.8" />
      {/* Crown highlight */}
      <path d="M38,21 Q50,22 62,21" fill="none" stroke="#fbe49a" strokeWidth="0.5" opacity="0.8" />

      {/* Crown points — fleur-de-lis style spikes */}
      <path
        d="M37,20 L37,12 L41,17 L45,8 L50,16 L55,8 L59,17 L63,12 L63,20 Z"
        fill="url(#goldGrad)"
        stroke="#5a3a10"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Spike tip highlights */}
      <path d="M37,14 L37,18" stroke="#fbe49a" strokeWidth="0.4" opacity="0.7" />
      <path d="M45,10 L45,15" stroke="#fbe49a" strokeWidth="0.4" opacity="0.7" />
      <path d="M50,18 L50,17" stroke="#fbe49a" strokeWidth="0.4" opacity="0.7" />
      <path d="M55,10 L55,15" stroke="#fbe49a" strokeWidth="0.4" opacity="0.7" />
      <path d="M63,14 L63,18" stroke="#fbe49a" strokeWidth="0.4" opacity="0.7" />

      {/* Crown jewels along the band */}
      <circle cx="43" cy="23" r="1.5" fill="url(#rubyGrad)" stroke="#5a1810" strokeWidth="0.35" />
      <circle cx="50" cy="23.5" r="1.7" fill="url(#sapphireGrad)" stroke="#1c3a58" strokeWidth="0.35" />
      <circle cx="57" cy="23" r="1.5" fill="url(#rubyGrad)" stroke="#5a1810" strokeWidth="0.35" />
      {/* Jewel shine */}
      <circle cx="42.5" cy="22.5" r="0.4" fill="#fff" opacity="0.85" />
      <circle cx="49.5" cy="22.7" r="0.45" fill="#fff" opacity="0.85" />
      <circle cx="56.5" cy="22.5" r="0.4" fill="#fff" opacity="0.85" />

      {/* Ground shadow under fort */}
      <ellipse cx="50" cy="122" rx="44" ry="1.2" fill="#000" opacity="0.55" />
    </svg>
  );
}
