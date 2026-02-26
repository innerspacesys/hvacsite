"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Phone,
  Mail,
  Snowflake,
  Flame,
  Wrench,
  ShieldCheck,
  Menu,
  X,
  MapPin,
  ArrowRight,
} from "lucide-react";
import styles from "./page.module.css";

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]")) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add(styles.revealIn);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.14 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function HomePage() {
  useRevealOnScroll();

  const [mobileOpen, setMobileOpen] = useState(false);

  // fake form
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // gallery
  const galleryImages = useMemo(
    () => [
      {
        src: "https://images.unsplash.com/photo-1599707835168-c1090658bfa6?auto=format&fit=crop&fm=jpg&q=80&w=2000",
        alt: "Commercial HVAC equipment",
      },
      {
        src: "https://plus.unsplash.com/premium_photo-1664298059861-1560b39fb890?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Residential HVAC service",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&fm=jpg&q=80&w=2000",
        alt: "Home comfort and thermostat",
      },
      { src: "/evergreenhvacvan.png", alt: "Evergreen HVAC van and team" },
    { src: "/workingonunit.png", alt: "HVAC technician servicing a unit" },
    ],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const len = galleryImages.length;
  const wrapIndex = (i: number) => (i + len) % len;

  const [swap, setSwap] = useState<"in" | "out">("in");

  const goNext = () => {
    setSwap("out");
    window.setTimeout(() => {
      setCurrentImageIndex((idx) => wrapIndex(idx + 1));
      setSwap("in");
    }, 220);
  };

  const goPrev = () => {
    setSwap("out");
    window.setTimeout(() => {
      setCurrentImageIndex((idx) => wrapIndex(idx - 1));
      setSwap("in");
    }, 220);
  };

  useEffect(() => {
    const id = window.setInterval(goNext, 6500);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToImage = (index: number) => {
    if (index === currentImageIndex) return;
    setSwap("out");
    window.setTimeout(() => {
      setCurrentImageIndex(index);
      setSwap("in");
    }, 220);
  };

  const areas = useMemo(
    () => ["Austin", "Round Rock", "Cedar Park", "Pflugerville", "Lakeway", "Georgetown", "Buda"],
    []
  );

  const onFakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(false);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSent(true);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={`${styles.max} ${styles.headerRow}`}>
          <a className={styles.brand} href="#">
            <div>
              <img src="/evergreenlogo.png" alt="Evergreen HVAC logo" width={72} height={72}/>
            </div>

            <div className={styles.brandText}>
              <div className={styles.brandName}>Evergreen HVAC</div>
              <div className={styles.brandTag}>Heating • Cooling • Repair</div>
            </div>
          </a>

          <nav className={styles.nav}>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#areas">Areas</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className={styles.headerCtas}>
            <a className={styles.smallBtn} href="tel:5125550199">
              <Phone size={16} />
              (512) 555-0199
            </a>
            <a className={`${styles.smallBtn} ${styles.primaryBtn}`} href="#contact">
              Get Estimate
            </a>
          </div>

          <button
            className={styles.mobileBtn}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className={styles.mobilePanel}>
            <div className={styles.mobileLinks}>
              <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
              <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
              <a href="#areas" onClick={() => setMobileOpen(false)}>Areas We Serve</a>
              <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
              <a href="tel:5125550199" onClick={() => setMobileOpen(false)}>Call (512) 555-0199</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={`${styles.max} ${styles.heroInner}`}>
          <div className={styles.heroLeft}>
            <div className={styles.heroKicker} data-reveal data-delay="0">
              <ShieldCheck size={16} />
              Licensed • Insured • Same-Day Options
            </div>

            <h1 className={styles.heroTitle} data-reveal data-delay="80">
              Comfort you can count on — <span className={styles.heroAccent}>year-round.</span>
            </h1>

            <p className={styles.heroSub} data-reveal data-delay="150">
              Fast repairs, clean installs, and honest maintenance for homes and small businesses
              across the Greater Austin area.
            </p>

            <div className={styles.heroCtas} data-reveal data-delay="220">
              <a className={`${styles.bigBtn} ${styles.bigPrimary} ${styles.sheen}`} href="#contact">
                Get a Free Estimate <ArrowRight size={18} />
              </a>
              <a className={`${styles.bigBtn} ${styles.bigGhost}`} href="tel:5125550199">
                <Phone size={18} /> Call Now
              </a>
            </div>

            <div className={styles.heroBadges} data-reveal data-delay="280">
              <span className={styles.badge}>Upfront pricing</span>
              <span className={styles.badge}>Clean & respectful techs</span>
              <span className={styles.badge}>Workmanship guarantee</span>
            </div>
          </div>

          <div className={`${styles.heroCard} ${styles.floatSlow}`} data-reveal data-delay="160">
            <img
              className={styles.heroImg}
              src="/evergreenhvacvan.png"
              alt="Evergreen HVAC service van and team"
            />
            <div className={styles.heroCardInner}>
              <p className={styles.heroMiniTitle}>People call us back</p>
              <p className={styles.heroMiniText}>
                “On time, explained everything clearly, and had the system running fast.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.max}>
          <h2 className={styles.h2} data-reveal data-delay="0">Services</h2>
          <p className={styles.lead} data-reveal data-delay="80">
            Everything you need to stay comfortable — emergency repairs, installs, and tune-ups.
          </p>

          <div className={styles.grid3}>
            <div className={`${styles.card} ${styles.cardHover}`} data-reveal data-delay="0">
              <div className={styles.icon}><Snowflake /></div>
              <div className={styles.cardTitle}>AC Repair & Replacement</div>
              <p className={styles.cardText}>
                Diagnostics, airflow issues, compressor/fan repairs, and high-efficiency replacements.
              </p>
            </div>

            <div className={`${styles.card} ${styles.cardHover}`} data-reveal data-delay="80">
              <div className={styles.icon}><Flame /></div>
              <div className={styles.cardTitle}>Heating Repair</div>
              <p className={styles.cardText}>
                Furnace and heat-pump service, safety checks, and performance tuning.
              </p>
            </div>

            <div className={`${styles.card} ${styles.cardHover}`} data-reveal data-delay="160">
              <div className={styles.icon}><Wrench /></div>
              <div className={styles.cardTitle}>Maintenance Plans</div>
              <p className={styles.cardText}>
                Seasonal tune-ups that prevent breakdowns, boost efficiency, and extend equipment life.
              </p>
            </div>
          </div>

          <div className={styles.grid2}>
  <div className={`${styles.mediaCard} ${styles.cardHover}`} data-reveal data-delay="220">
    <div className={styles.mediaImgWrap}>
      <img
        className={styles.mediaImg}
        src="/residential.png"
        alt="HVAC technician servicing a residential unit"
      />
    </div>
    <div className={styles.mediaBody}>
      <div className={styles.cardTitle}>Residential HVAC</div>
      <p className={styles.cardText}>
        Repairs, replacements, tune-ups, airflow fixes, thermostat installs, and honest maintenance for your home.
      </p>
      <div className={styles.miniList}>
        <span>• AC repair</span>
        <span>• Heat pump & furnace</span>
        <span>• Maintenance plans</span>
      </div>
    </div>
  </div>

  <div className={`${styles.mediaCard} ${styles.cardHover}`} data-reveal data-delay="300">
    <div className={styles.mediaImgWrap}>
      <img
        className={styles.mediaImg}
        src="/commercial.png"
        alt="HVAC technician servicing a commercial unit"
      />
    </div>
    <div className={styles.mediaBody}>
      <div className={styles.cardTitle}>Commercial HVAC</div>
      <p className={styles.cardText}>
        Rooftop units, small commercial systems, maintenance scheduling, and fast diagnostics to keep your business comfortable.
      </p>
      <div className={styles.miniList}>
        <span>• RTU service</span>
        <span>• Preventive maintenance</span>
        <span>• Priority scheduling</span>
      </div>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={styles.section}>
        <div className={styles.max}>
          <div className={styles.split}>
            <div data-reveal data-delay="0">
              <h2 className={styles.h2}>About Evergreen HVAC</h2>
              <p className={styles.lead}>
                We’re a local team that treats your home like our own. Clear communication,
                clean work, and long-term solutions — not quick band-aids.
              </p>
              <div className={styles.pills}>
                <span className={styles.pill}>Honest diagnostics</span>
                <span className={styles.pill}>Clean installs</span>
                <span className={styles.pill}>Energy-saving options</span>
                <span className={styles.pill}>Commercial friendly</span>
              </div>
            </div>

            <div className={`${styles.photoCard} ${styles.cardHover}`} data-reveal data-delay="120">
              <img
                className={styles.photo}
                src="https://images.unsplash.com/photo-1766788466565-768128d89ce4?auto=format&fit=crop&fm=jpg&q=80&w=1800"
                alt="Outdoor AC unit"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section id="areas" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.max}>
          <h2 className={styles.h2} data-reveal data-delay="0">
            <MapPin style={{ verticalAlign: "-6px" }} /> Areas We Serve
          </h2>
          <p className={styles.lead} data-reveal data-delay="90">
            Based in Austin, serving nearby communities with fast scheduling and reliable service.
          </p>

          <div className={styles.pills} data-reveal data-delay="150">
            {areas.map((a) => (
              <span key={a} className={styles.pill}>{a}</span>
            ))}
          </div>

          <div style={{ height: 18 }} />

          <div className={`${styles.photoCard} ${styles.cardHover}`} data-reveal data-delay="220">
            <img
              className={styles.photo}
              src="/workingonunit.png"
              alt="Commercial HVAC equipment"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={styles.section}>
        <div className={styles.max}>
          <h2 className={styles.h2} data-reveal data-delay="0">Recent Work</h2>
          <p className={styles.lead} data-reveal data-delay="90">
            Smooth transitions, clean visuals, and a “premium” feel.
          </p>

          <div className={styles.carouselWrap} data-reveal data-delay="160">
            <button className={styles.carouselBtn} onClick={goPrev} aria-label="Previous image">
              &#10094;
            </button>

            <div className={styles.carouselStage}>
              <img
                className={`${styles.carouselImg} ${swap === "out" ? styles.fadeOut : styles.fadeIn}`}
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                draggable={false}
              />
            </div>

            <button className={styles.carouselBtn} onClick={goNext} aria-label="Next image">
              &#10095;
            </button>
          </div>

          <div className={styles.carouselDots} data-reveal data-delay="220">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentImageIndex ? styles.activeDot : ""}`}
                onClick={() => goToImage(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.section}>
        <div className={styles.max}>
          <h2 className={styles.h2} data-reveal data-delay="0">Request an Estimate</h2>
          <p className={styles.lead} data-reveal data-delay="90">
            This demo form simulates sending so it feels real.
          </p>

          <div className={styles.formWrap} data-reveal data-delay="160">
            <form onSubmit={onFakeSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <div className={styles.label}>Full Name</div>
                  <input className={styles.input} placeholder="Jane Doe" required />
                </div>

                <div className={styles.field}>
                  <div className={styles.label}>Phone</div>
                  <input className={styles.input} placeholder="(512) 555-0123" required />
                </div>

                <div className={styles.field}>
                  <div className={styles.label}>Email</div>
                  <input className={styles.input} placeholder="jane@email.com" type="email" required />
                </div>

                <div className={styles.field}>
                  <div className={styles.label}>Service Needed</div>
                  <select className={styles.select} defaultValue="AC Repair">
                    <option>AC Repair</option>
                    <option>Heating Repair</option>
                    <option>New Install / Replacement</option>
                    <option>Maintenance</option>
                    <option>Commercial Service</option>
                  </select>
                </div>

                <div className={`${styles.field} ${styles.full}`}>
                  <div className={styles.label}>What’s happening?</div>
                  <textarea className={styles.textarea} placeholder="Short description…" required />
                </div>
              </div>

              <div className={styles.submitRow}>
                <button
                  className={`${styles.bigBtn} ${styles.bigPrimary} ${styles.sheen}`}
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send Request"} <Mail size={18} />
                </button>

                <div className={styles.fakeNote}>
                  You’ll see a confirmation below.
                </div>
              </div>

              {sent && <div className={styles.toast}>✅ Request received! We’ll contact you shortly (demo).</div>}
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.max} ${styles.footerInner}`}>
          <div>
            <div style={{ fontWeight: 900, color: "#fff" }}>Evergreen HVAC</div>
            <div className={styles.copy}>Heating • Cooling • Repair • Maintenance</div>
            <div className={styles.copy}>Austin, TX • (512) 555-0199</div>
          </div>

          <div className={styles.footerLinks}>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#areas">Areas</a>
            <a href="#contact">Contact</a>
          </div>

          <div className={styles.copy}>© {new Date().getFullYear()} Evergreen HVAC. Demo site.</div>
        </div>
      </footer>
    </div>
  );
}