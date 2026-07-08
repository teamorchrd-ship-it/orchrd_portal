const COLORS = ['#E53935', '#2E7D32', '#1565C0', '#F9A825', '#8E24AA'];
const PIECES = Array.from({ length: 18 }, (_, i) => i);

export default function Confetti() {
  return (
    <div className="confetti-burst" aria-hidden="true">
      {PIECES.map(i => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.25;
        const drift = (Math.random() - 0.5) * 80;
        return (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              background: COLORS[i % COLORS.length],
              '--drift': `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}
