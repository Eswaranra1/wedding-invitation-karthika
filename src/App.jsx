import { useEffect, useRef, useState } from "react";
import groom from "../assets/groom.jpeg";
import bride from "../assets/bride.jpeg";
import family from "../assets/elder brother.jpeg";
import WeddingStage from "./WeddingStage.jsx";

function Fireworks({ celebration, opening = false }) {
  const canvasRef = useRef(null);
  const celebrationRef = useRef(celebration);
  const openingRef = useRef(opening);

  useEffect(() => {
    celebrationRef.current = celebration;
  }, [celebration]);
  useEffect(() => {
    openingRef.current = opening;
  }, [opening]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let burstTimer;
    let particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createBurst = (
      x = Math.random() * width,
      y = 70 + Math.random() * height * 0.42,
      grand = false,
    ) => {
      if (reduceMotion) return;
      const mobile = width < 700;
      const count = mobile ? (grand ? 38 : 18) : grand ? 72 : 34;
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.12;
        const speed = (grand ? 1.8 : 1.15) + Math.random() * (grand ? 3.1 : 2);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.35,
          life: 1,
          decay: 0.008 + Math.random() * 0.008,
          size: 1 + Math.random() * 1.8,
          gold: Math.random() > 0.24,
        });
      }
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);
      if (!document.hidden && !reduceMotion) {
        particles = particles.filter((particle) => particle.life > 0);
        particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.018;
          particle.vx *= 0.992;
          particle.life -= particle.decay;
          context.globalAlpha = Math.max(0, particle.life);
          context.fillStyle = particle.gold ? "#d9b45b" : "#b83a3a";
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fill();
        });
      }
      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      createBurst(width * 0.16, height * 0.22);
      createBurst(width * 0.84, height * 0.28);
      burstTimer = window.setInterval(
        () => {
          const grand = celebrationRef.current > 0 || openingRef.current;
          if (celebrationRef.current > 0) {
            createBurst(
              width * (0.2 + Math.random() * 0.6),
              height * (0.16 + Math.random() * 0.35),
              true,
            );
          } else {
            createBurst(
              width * (0.08 + Math.random() * 0.84),
              height * (0.12 + Math.random() * 0.38),
              grand,
            );
          }
        },
        width < 700 ? 5200 : 3600,
      );
      animate();
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.clearInterval(burstTimer);
      window.cancelAnimationFrame(frame);
      particles = [];
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fireworks-canvas" aria-hidden="true" />
  );
}

function Lamp({ side }) {
  return (
    <div className={`lamp lamp-${side}`} aria-hidden="true">
      <div className="lamp-glow" />
      <img
        className="lamp-image"
        src={
          new URL(
            "../assets/Ornate Golden South Indian Oil Lamp.png",
            import.meta.url,
          ).href
        }
        alt=""
      />
      <span className="lamp-flame lamp-flame-left" />
      <span className="lamp-flame lamp-flame-center" />
      <span className="lamp-flame lamp-flame-right" />
    </div>
  );
}

function DecorativeBackground() {
  const stars = Array.from({ length: 38 }, (_, index) => index);
  const petals = Array.from({ length: 14 }, (_, index) => index);
  return (
    <>
      <div className="stars" aria-hidden="true">
        {stars.map((star) => (
          <i
            key={star}
            style={{
              "--x": `${(star * 29 + 7) % 100}%`,
              "--y": `${(star * 47 + 11) % 88}%`,
              "--delay": `${(star % 9) * 0.7}s`,
              "--duration": `${3.5 + (star % 5) * 0.8}s`,
            }}
          />
        ))}
      </div>
      <div className="petals" aria-hidden="true">
        {petals.map((petal) => (
          <i
            key={petal}
            className={petal % 3 === 0 ? "rose" : "jasmine"}
            style={{
              "--petal-x": `${(petal * 17 + 3) % 100}%`,
              "--petal-delay": `${(petal % 7) * -1.8}s`,
              "--petal-duration": `${10 + (petal % 5) * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="temple-border" aria-hidden="true">
        <div className="temple-border-inner" />
      </div>
    </>
  );
}

function RoyalPortraitFrame({ name, image }) {
  return (
    <div className="portrait-frame royal-frame">
      <img src={image} alt={name} />
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [celebration, setCelebration] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const openInvitation = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCelebration((value) => value + 1);
    window.setTimeout(() => {
      setOpened(true);
      setCelebration((value) => value + 1);
      window.setTimeout(() => setTransitioning(false), 900);
    }, 850);
  };

  const replay = () => {
    setOpened(false);
    setCelebration(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareOnWhatsApp = () => {
    const text = [
      "M. சந்தன குமார் ❤️ R. கார்த்திகா",
      "திருமண நாள்: 22-11-2026, ஞாயிற்றுக்கிழமை",
      "முகூர்த்த நேரம்: காலை 10:30 மணி முதல் 11:30 மணிக்குள்",
      "இடம்: பேட்டை செக்கிழார் ஸ்ரீ சந்தனமார் அம்மாள் சன்னதி, சுந்தர விநாயகர் கோவில் தெரு, சேனைத்தலைவர் மண்டபம், பேட்டை",
    ].join("\n");
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main className={`invitation ${opened ? "is-opened" : "is-closed"}`}>
      <Fireworks
        key={celebration}
        celebration={celebration}
        opening={!opened}
      />
      <DecorativeBackground />
      <WeddingStage />

      {!opened && (
        <section
          className="opening-screen"
          aria-label="Wedding invitation opening"
        >
          <div className="opening-arch">
            <svg
              className="temple-arch-line"
              viewBox="0 0 760 580"
              aria-hidden="true"
            >
              <path d="M190 540 V250 C190 118 296 42 380 42 C464 42 570 118 570 250 V540" />
              <path d="M215 540 V260 C215 140 306 72 380 72 C454 72 545 140 545 260 V540" />
              <path d="M380 42 L420 82 L380 122 L340 82 Z" />
              <path d="M166 540 H594" />
            </svg>
            <div className="gold-crest">✦</div>
            <div className="opening-palace" aria-hidden="true">
              <span className="palace-tower palace-tower-left" />
              <span className="palace-tower palace-tower-center" />
              <span className="palace-tower palace-tower-right" />
              <span className="palace-base" />
            </div>
            <p className="opening-blessing reveal">ஸ்ரீ முத்தாரம்மன் அருளால்</p>
            <p className="opening-event reveal-delay">
              <span>திருமண விழா</span>
            </p>
            <h1 className="opening-names reveal-later">
              <span className="opening-name">M. சந்தன குமார்</span>
              <span className="opening-heart" aria-label="இருவரின் காதல்">
                ❤️
              </span>
              <span className="opening-name">R. கார்த்திகா</span>
            </h1>
            <button
              className="open-button"
              type="button"
              onClick={openInvitation}
            >
              <span>அழைப்பிதழைத் திறக்கவும்</span>
              <small>Open Invitation</small>
            </button>
            <button
              className="skip-intro"
              type="button"
              onClick={openInvitation}
            >
              Skip Intro
            </button>
          </div>
          <Lamp side="left" />
          <Lamp side="right" />
          {transitioning && (
            <div className="opening-light-burst" aria-hidden="true" />
          )}
        </section>
      )}

      {opened && (
        <article className="invitation-card">
          <header className="topbar">
            <p>
              ஸ்ரீ முத்தாரம்மன் அருளால்
              <br />
              <span>With the divine blessings</span>
            </p>
            <span className="monogram">
              S<b>&</b> K
            </span>
          </header>

          <section className="hero">
            <div className="portrait groom-wrap">
              <RoyalPortraitFrame name="M. சந்தன குமார்" image={groom} />
              <p className="name-left">M. சந்தன குமார்</p>
            </div>

            <div className="center-copy">
              <p className="eyebrow">மணமக்கள்</p>
              <h1 className="couple-names">
                <span>M. சந்தன குமார்</span>
                <em>❤️</em>
                <span>R. கார்த்திகா</span>
              </h1>
              <div className="divider">
                <span />
              </div>
              <p className="title-ta">திருமண விழா</p>
              <p className="title-en">Wedding Celebration</p>
            </div>

            <div className="portrait bride-wrap">
              <RoyalPortraitFrame name="R. கார்த்திகா" image={bride} />
              <p className="name-right">R. கார்த்திகா</p>
            </div>
          </section>

          <section className="event-details" aria-label="Wedding details">
            <div className="event-card">
              <span className="event-label">திருமண நாள்</span>
              <strong>22-11-2026, ஞாயிற்றுக்கிழமை</strong>
              <small>Wedding Date</small>
            </div>
            <div className="event-card">
              <span className="event-label">முகூர்த்த நேரம்</span>
              <strong>காலை 10:30 மணி முதல் 11:30 மணிக்குள்</strong>
              <small>Muhurtham</small>
            </div>
          </section>

          <section className="venue-section" aria-label="Wedding venue">
            <span className="event-label">திருமண இடம்</span>
            <h2>பேட்டை செக்கிழார் ஸ்ரீ சந்தனமார் அம்மாள் சன்னதி</h2>
            <p>சுந்தர விநாயகர் கோவில் தெரு, சேனைத்தலைவர் மண்டபம், பேட்டை</p>
            <small>Wedding Venue</small>
          </section>

          <section className="family-info">
            <div className="family-grid">
              <div>
                <h2>மணமகன் குடும்பம்</h2>
                <p>
                  <span>மணமகன் தந்தை:</span> <strong>M. மந்திர மூர்த்தி</strong>
                </p>
                <p>
                  <span>மணமகன் தாய்:</span> <strong>M. முத்து லெட்சுமி</strong>
                </p>
              </div>
              <div>
                <h2>மணமகள் குடும்பம்</h2>
                <p>
                  <span>மணமகள் தந்தை:</span> <strong>R. இராம கிருஷ்ணன்</strong>
                </p>
                <p>
                  <span>மணமகள் தாய்:</span> <strong>R. இராதா அம்மாள்</strong>
                </p>
                <p>
                  <span>மணமகள் உடன்பிறப்பு:</span>{" "}
                  <strong>R. சந்தனபெருமாள்</strong>
                </p>
                <p>
                  <span>மணமகள் அண்ணி:</span> <strong>S. சத்யா</strong>
                </p>
              </div>
            </div>

            <div className="sibling-photo">
              <div className="portrait-frame sibling-frame">
                <img src={family} alt="R. சந்தன பெருமாள்" loading="lazy" />
              </div>
              <p>R. சந்தன பெருமாள்</p>
            </div>

            <div className="reception">
              <strong>வரவேற்பு | Reception</strong>
              <span>25-11-2026, புதன்கிழமை</span>
              <span>மாலை 5 மணி</span>
              <span>இடம்: மணமகள் இல்லம், உடன்குடி</span>
            </div>
          </section>

          <footer className="closing-screen">
            <Lamp side="left" />
            <Lamp side="right" />
            <p>பூரணமான தெய்வத்தின் அருளால்</p>
            <h2>M. சந்தன குமார் ❤️ R. கார்த்திகா</h2>
            <p>உங்கள் வருகையால் மணமக்களை வாழ்த்தி மகிழ எங்களுடன் அன்புடன் அழைக்கிறோம்...</p>
            <div className="closing-actions">
              <button type="button" onClick={shareOnWhatsApp}>
                WhatsApp மூலம் பகிரவும்
              </button>
              <button type="button" onClick={replay}>
                மீண்டும் பார்க்க
              </button>
            </div>
          </footer>
        </article>
      )}
    </main>
  );
}
