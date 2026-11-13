const HERO_PATTERN_MATRIX: Array<Array<"l" | "d" | "s">> = [
  ["s", "d", "s", "l", "l", "l"],
  ["s", "l", "s", "d", "s", "l"],
  ["l", "s", "l", "l", "s", "d"],
  ["s", "l", "d", "d", "l", "l"],
  ["d", "l", "d", "l", "d", "l"],
  ["d", "s", "l", "d", "s", "d"],
]

export default function HeroPixelBackground() {
  return (
    <div className="mc-hero-bg-layer" aria-hidden="true">
      <svg
        className="mc-hero-bg-svg"
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
      >
        <defs>
          {/* Smooth Stone Block (16x16) */}
          <g id="mc-block-l">
            <rect width="16" height="16" fill="#7e7e7e" />
            <path fill="#a2a290" d="M0 0h1v1H0z" />
            <path fill="#b4b4b4" d="M1 0h1v1H1zM3 0h7v1H3zM11 0h2v1H11zM14 0h1v1H14zM0 2h1v1H0zM0 4h1v1H0zM0 5h1v1H0zM0 6h1v1H0zM0 7h1v1H0zM0 8h1v1H0zM0 9h1v1H0zM0 10h1v1H0zM0 11h1v1H0zM0 12h1v1H0zM0 13h1v1H0zM0 14h1v1H0z" />
            <path fill="#a2a2a2" d="M2 0h1v1H2zM10 0h1v1H10zM13 0h1v1H13zM9 2h1v1H9zM0 3h1v1H0zM4 3h1v1H4zM11 8h2v1H11zM5 10h1v1H5zM13 12h1v1H13z" />
            <path fill="#9090a2" d="M15 0h1v1H15zM10 6h1v1H10zM0 15h1v1H0z" />
            <path fill="#b4b4a2" d="M0 1h1v1H0z" />
            <path fill="#909090" d="M1 1h1v1H1zM5 1h1v1H5zM7 1h1v1H7zM14 1h1v1H14zM3 2h3v1H3zM10 2h2v1H10zM3 3h1v1H3zM5 3h1v1H5zM8 3h1v1H8zM12 3h1v1H12zM3 4h1v1H3zM6 4h4v1H6zM4 6h1v1H4zM7 6h3v1H7zM11 6h2v1H11zM3 7h1v1H3zM12 7h1v1H12zM2 8h2v1H2zM9 8h2v1H9zM13 8h2v1H13zM11 9h1v1H11zM13 9h1v1H13zM3 10h2v1H3zM6 10h1v1H6zM10 10h2v1H10zM8 11h2v1H8zM12 11h2v1H12zM2 12h4v1H2zM14 12h1v1H14zM3 13h1v1H3zM10 13h2v1H10zM5 14h2v1H5z" />
            <path fill="#6c6c6c" d="M8 1h1v1H8zM12 1h1v1H12zM15 5h1v1H15zM9 7h1v1H9zM15 7h1v1H15zM1 11h1v1H1zM10 12h1v1H10z" />
            <path fill="#7e9090" d="M10 1h1v1H10zM1 2h2v1H1zM6 2h1v1H6zM12 2h1v1H12zM10 3h2v1H10zM14 3h1v1H14zM1 4h2v1H1zM4 4h1v1H4zM14 4h1v1H14zM8 5h1v1H8zM14 7h1v1H14zM5 8h1v1H5zM7 8h2v1H7zM8 9h1v1H8zM12 9h1v1H12zM14 9h1v1H14zM1 10h1v1H1zM12 10h1v1H12zM3 11h5v1H3zM10 11h2v1H10zM1 12h1v1H1zM6 12h1v1H6zM12 12h1v1H12zM1 13h2v1H1zM8 13h2v1H8zM14 13h1v1H14z" />
            <path fill="#5a5a6c" d="M15 1h1v1H15zM2 15h8v1H2zM12 15h4v1H12z" />
            <path fill="#5a5a5a" d="M15 2h1v1H15zM15 3h1v1H15zM15 4h1v1H15zM15 6h1v1H15zM15 8h1v1H15zM15 9h1v1H15zM15 10h1v1H15zM15 11h1v1H15zM15 12h1v1H15zM15 13h1v1H15zM15 14h1v1H15z" />
            <path fill="#7e7e90" d="M1 3h1v1H1zM10 5h2v1H10zM1 6h3v1H1zM1 8h1v1H1zM6 8h1v1H6zM3 9h2v1H3zM2 10h1v1H2zM13 10h1v1H13zM10 14h1v1H10z" />
            <path fill="#6c6c7e" d="M2 3h1v1H2zM1 15h1v1H1zM10 15h2v1H10z" />
            <path fill="#7e907e" d="M4 5h1v1H4zM6 6h1v1H6zM1 9h1v1H1zM7 9h1v1H7zM14 10h1v1H14zM7 14h3v1H7zM14 14h1v1H14z" />
            <path fill="#6c7e6c" d="M9 5h1v1H9z" />
            <path fill="#6c7e7e" d="M14 6h1v1H14zM10 7h1v1H10zM14 11h1v1H14z" />
            <path fill="#90907e" d="M13 14h1v1H13z" />
          </g>

          {/* Deepslate / Dark Stone Block (16x16) */}
          <g id="mc-block-d">
            <rect width="16" height="16" fill="#404040" />
            <path fill="#606060" d="M0 0h5v1H0zM11 0h2v1H11zM0 1h2v1H0zM14 1h1v1H14zM0 3h1v1H0zM0 11h1v1H0zM1 14h1v1H1z" />
            <path fill="#505050" d="M5 0h6v1H5zM11 1h2v1H11zM4 2h2v1H4zM12 2h1v1H12zM10 3h5v1H10zM2 4h3v1H2zM9 4h4v1H9zM0 5h1v1H0zM0 6h1v1H0zM2 6h1v1H2zM7 6h1v1H7zM11 6h3v1H11zM0 7h1v1H0zM6 7h5v1H6zM0 8h1v1H0zM0 9h1v1H0zM2 9h2v1H2zM6 9h1v1H6zM8 9h3v1H8zM13 9h2v1H13zM0 10h1v1H0zM3 10h6v1H3zM10 10h5v1H10zM1 11h3v1H1zM12 12h1v1H12zM4 13h2v1H4zM7 13h4v1H7zM3 14h2v1H3zM9 14h1v1H9zM13 14h1v1H13z" />
            <path fill="#707070" d="M13 0h2v1H13zM0 13h1v1H0zM0 14h1v1H0z" />
            <path fill="#5a5a5a" d="M15 0h1v1H15zM15 2h1v1H15zM15 3h1v1H15z" />
            <path fill="#504858" d="M15 1h1v1H15zM15 4h1v1H15zM15 5h1v1H15z" />
            <path fill="#605060" d="M0 2h1v1H0zM10 6h1v1H10zM12 9h1v1H12zM11 12h1v1H11zM7 15h5v1H7z" />
            <path fill="#504050" d="M6 2h1v1H6zM8 4h1v1H8zM12 7h2v1H12zM12 8h1v1H12zM5 9h1v1H5zM12 11h1v1H12zM9 12h1v1H9zM13 12h1v1H13zM3 13h1v1H3zM11 13h1v1H11zM13 13h1v1H13z" />
            <path fill="#403040" d="M8 2h1v1H8zM1 8h1v1H1zM1 12h1v1H1z" />
            <path fill="#405040" d="M14 2h1v1H14z" />
            <path fill="#403030" d="M1 3h1v1H1z" />
            <path fill="#606050" d="M0 4h1v1H0z" />
            <path fill="#404050" d="M13 4h1v1H13zM11 7h1v1H11zM7 8h1v1H7zM9 10h1v1H9zM11 11h1v1H11zM14 13h1v1H14z" />
            <path fill="#504040" d="M1 6h1v1H1zM3 6h1v1H3z" />
            <path fill="#505060" d="M8 6h2v1H8zM11 9h1v1H11zM6 15h1v1H6zM13 15h1v1H13z" />
            <path fill="#484058" d="M15 6h1v1H15zM15 7h1v1H15zM15 8h1v1H15zM15 9h1v1H15zM15 10h1v1H15zM15 11h1v1H15z" />
            <path fill="#584e58" d="M0 12h1v1H0zM1 15h1v1H1zM3 15h1v1H3z" />
            <path fill="#585050" d="M10 12h1v1H10z" />
            <path fill="#504850" d="M15 12h1v1H15zM15 13h1v1H15zM12 15h1v1H12zM14 15h2v1H14z" />
          </g>

          {/* Scaffolding / Golden Lattice Block (16x16) */}
          <g id="mc-block-s">
            <rect width="16" height="16" fill="#a87054" />
            <path fill="#c4c454" d="M0 0h1v1H0zM2 0h1v1H2zM13 0h1v1H13zM0 2h1v1H0z" />
            <path fill="#e0c470" d="M1 0h1v1H1zM3 0h1v1H3zM7 0h1v1H7zM0 1h1v1H0zM14 1h1v1H14zM0 7h1v1H0zM14 8h1v1H14zM1 14h1v1H1z" />
            <path fill="#8c7038" d="M4 0h1v1H4zM10 0h1v1H10zM12 0h1v1H12zM6 1h1v1H6zM8 1h1v1H8zM5 2h1v1H5zM7 2h1v1H7zM11 2h1v1H11zM2 3h1v1H2zM14 3h1v1H14zM0 4h1v1H0zM13 4h1v1H13zM2 5h1v1H2zM14 5h1v1H14zM2 7h1v1H2zM14 7h1v1H14zM0 8h2v1H0zM0 10h1v1H0zM13 10h1v1H13zM14 11h1v1H14zM0 12h1v1H0zM8 13h1v1H8zM10 13h1v1H10zM12 13h1v1H12zM3 14h1v1H3zM5 14h1v1H5zM7 14h1v1H7zM11 14h1v1H11z" />
            <path fill="#c4a854" d="M5 0h1v1H5zM9 0h1v1H9zM11 0h1v1H11zM2 1h2v1H2zM7 1h1v1H7zM9 1h1v1H9zM13 1h1v1H13zM1 2h1v1H1zM1 3h1v1H1zM14 4h1v1H14zM0 5h1v1H0zM14 6h1v1H14zM1 7h1v1H1zM0 9h2v1H0zM0 11h1v1H0zM1 13h1v1H1zM4 14h1v1H4zM6 14h1v1H6z" />
            <path fill="#a87038" d="M6 0h1v1H6zM10 1h1v1H10zM12 1h1v1H12zM3 4h1v1H3zM5 4h1v1H5zM0 6h1v1H0zM7 6h1v1H7zM10 6h1v1H10zM12 6h1v1H12zM9 7h1v1H9zM3 8h1v1H3zM7 10h1v1H7zM1 12h1v1H1zM7 12h1v1H7zM11 12h2v1H11z" />
            <path fill="#8c7054" d="M8 0h1v1H8zM3 2h1v1H3zM9 2h1v1H9zM12 3h1v1H12zM15 3h1v1H15zM15 5h1v1H15zM1 6h1v1H1zM13 6h1v1H13zM15 7h1v1H15zM13 8h1v1H13zM2 9h1v1H2zM15 9h1v1H15zM2 11h1v1H2zM15 11h1v1H15zM3 12h1v1H3zM13 12h1v1H13zM4 13h1v1H4zM6 13h1v1H6zM3 15h1v1H3zM5 15h1v1H5zM7 15h1v1H7zM9 15h3v1H9z" />
            <path fill="#e0c454" d="M14 0h1v1H14zM1 1h1v1H1zM0 3h1v1H0zM14 12h1v1H14zM0 13h1v1H0zM14 13h1v1H14zM0 14h1v1H0zM8 14h1v1H8zM12 14h3v1H12z" />
            <path fill="#e0c48c" d="M15 0h1v1H15zM15 14h1v1H15zM0 15h1v1H0zM14 15h1v1H14z" />
            <path fill="#c4a870" d="M15 1h1v1H15zM14 2h2v1H14zM14 10h1v1H14zM15 12h1v1H15zM15 13h1v1H15zM2 14h1v1H2zM10 14h1v1H10zM1 15h2v1H1zM8 15h1v1H8zM12 15h2v1H12z" />
            <path fill="#70381c" d="M2 2h1v1H2zM13 2h1v1H13zM2 10h1v1H2z" />
            <path fill="#705438" d="M4 2h1v1H4zM12 2h1v1H12zM13 3h1v1H13zM3 13h1v1H3zM5 13h1v1H5zM9 13h1v1H9z" />
            <path fill="#220863" d="M4 3h1v1H4zM6 3h1v1H6zM8 3h1v1H8zM10 3h1v1H10zM12 3h1v1H12zM4 5h1v1H4zM6 5h1v1H6zM8 5h1v1H8zM10 5h1v1H10zM12 5h1v1H12zM4 7h1v1H4zM6 7h1v1H6zM8 7h1v1H8zM10 7h1v1H10zM12 7h1v1H12zM4 9h1v1H4zM6 9h1v1H6zM8 9h1v1H8zM10 9h1v1H10zM12 9h1v1H12zM4 11h1v1H4zM6 11h1v1H6zM8 11h1v1H8zM10 11h1v1H10zM12 11h1v1H12z" />
            <path fill="#c48c54" d="M7 4h1v1H7zM9 4h1v1H9zM11 5h1v1H11zM9 6h1v1H9zM3 7h1v1H3zM5 8h1v1H5zM7 8h1v1H7zM9 8h1v1H9zM11 8h1v1H11zM5 10h1v1H5zM11 10h1v1H11zM4 12h1v1H4zM6 12h1v1H6zM8 12h1v1H8zM10 12h1v1H10z" />
            <path fill="#c48c70" d="M3 5h1v1H3zM5 5h1v1H5zM7 5h1v1H7zM6 6h1v1H6zM3 9h1v1H3zM9 9h1v1H9zM5 11h1v1H5zM11 11h1v1H11z" />
            <path fill="#8c5438" d="M2 4h1v1H2zM13 5h1v1H13zM2 6h1v1H2zM2 8h1v1H2zM13 11h1v1H13zM2 12h1v1H2zM11 13h1v1H11z" />
          </g>

          {/* 6x6 Periodic Block Wall Pattern with #220863 Grid Grout */}
          <pattern
            id="mc-hero-wall"
            width="102"
            height="102"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(4.6)"
          >
            <rect width="102" height="102" fill="#220863" />
            {HERO_PATTERN_MATRIX.map((row, rowIdx) =>
              row.map((blockType, colIdx) => (
                <use
                  key={`${rowIdx}-${colIdx}`}
                  href={`#mc-block-${blockType}`}
                  x={colIdx * 17}
                  y={rowIdx * 17}
                />
              ))
            )}
          </pattern>

          {/* Edge Vignette matching the reference backdrop */}
          <radialGradient id="mc-hero-vignette" cx="50%" cy="48%" r="65%">
            <stop offset="28%" stopColor="#090514" stopOpacity="0.38" />
            <stop offset="72%" stopColor="#080412" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#07040d" stopOpacity="0.92" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#mc-hero-wall)" />
        <rect width="100%" height="100%" fill="#0b0518" fillOpacity="0.48" />
        <rect width="100%" height="100%" fill="url(#mc-hero-vignette)" />
      </svg>
    </div>
  )
}

