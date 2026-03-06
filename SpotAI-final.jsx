import { useState, useRef, useEffect } from "react";

const BACKEND_URL = "https://jomeme.vercel.app";

// ── Utility ──────────────────────────────────────────────────────────────────
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ── Grid background ───────────────────────────────────────────────────────────
function GridBg() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, overflow: "hidden",
      background: "linear-gradient(135deg, #020408 0%, #050d14 50%, #020610 100%)"
    }}>
      {/* horizontal + vertical grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,220,180,0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,220,180,0.045) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px"
      }} />
      {/* radial glow center */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: 900, height: 600,
        background: "radial-gradient(ellipse, rgba(0,210,160,0.07) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      {/* corner accent blobs */}
      <div style={{
        position: "absolute", bottom: -120, right: -120,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,140,255,0.06) 0%, transparent 65%)"
      }} />
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ onGetStarted }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: 64,
      background: "rgba(2,6,12,0.85)",
      backdropFilter: "blur(18px)",
      borderBottom: "1px solid rgba(0,210,160,0.12)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #00d4a0, #0080ff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16
        }}>📍</div>
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20,
          color: "#e8fff8", letterSpacing: "-0.5px"
        }}>SpotAI<span style={{ color: "#00d4a0" }}>.com</span></span>
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["Features", "Pricing", "API", "Docs"].map(item => (
          <a key={item} href="#" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            color: "rgba(200,240,230,0.55)", textDecoration: "none",
            transition: "color 0.2s"
          }}
            onMouseEnter={e => e.target.style.color = "#00d4a0"}
            onMouseLeave={e => e.target.style.color = "rgba(200,240,230,0.55)"}
          >{item}</a>
        ))}
        <button onClick={onGetStarted} style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
          padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(0,210,160,0.5)",
          background: "transparent", color: "#00d4a0", cursor: "pointer",
          transition: "all 0.2s"
        }}
          onMouseEnter={e => { e.target.style.background = "rgba(0,210,160,0.12)"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; }}
        >Try Free →</button>
      </div>
    </nav>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function Hero({ onGetStarted }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 2200);
    return () => clearInterval(t);
  }, []);
  const labels = ["Street Photos", "Landmarks", "City Scenes", "Any Location"];

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "100px 24px 60px", position: "relative", zIndex: 1, textAlign: "center"
    }}>
      {/* badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 16px", borderRadius: 40,
        border: "1px solid rgba(0,210,160,0.25)",
        background: "rgba(0,210,160,0.06)",
        marginBottom: 36,
        animation: "fadeSlideDown 0.7s ease both"
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4a0", display: "inline-block", boxShadow: "0 0 8px #00d4a0" }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(0,210,160,0.9)", letterSpacing: "0.5px" }}>
          AI-Powered Geo-Location — Now Live
        </span>
      </div>

      {/* headline */}
      <h1 style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: "clamp(42px, 7vw, 88px)", lineHeight: 1.05,
        color: "#e8fff8", margin: "0 0 12px",
        letterSpacing: "-2px",
        animation: "fadeSlideDown 0.7s 0.1s ease both", opacity: 0
      }}>
        Drop a Photo.<br />
        <span style={{
          background: "linear-gradient(90deg, #00d4a0, #0099ff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>Get the Location.</span>
      </h1>

      {/* animated label */}
      <div style={{
        height: 36, overflow: "hidden", marginBottom: 28,
        animation: "fadeSlideDown 0.7s 0.2s ease both", opacity: 0
      }}>
        {labels.map((label, i) => (
          <p key={label} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 22,
            color: "rgba(180,240,220,0.6)", margin: 0, height: 36,
            transform: `translateY(${(i - (tick % labels.length)) * 36}px)`,
            transition: "transform 0.5s cubic-bezier(.22,1,.36,1)"
          }}>Analyze {label}</p>
        ))}
      </div>

      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 17,
        color: "rgba(180,240,220,0.45)", maxWidth: 520, lineHeight: 1.7,
        margin: "0 auto 44px",
        animation: "fadeSlideDown 0.7s 0.3s ease both", opacity: 0
      }}>
        Upload any street photo and SpotAI instantly returns the exact coordinates, Google Maps pin, and nearby landmarks — powered by advanced vision AI.
      </p>

      {/* CTA buttons */}
      <div style={{
        display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
        animation: "fadeSlideDown 0.7s 0.4s ease both", opacity: 0
      }}>
        <button onClick={onGetStarted} style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16,
          padding: "16px 40px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg, #00d4a0, #0088ee)",
          color: "#020c14", cursor: "pointer",
          boxShadow: "0 0 32px rgba(0,210,160,0.28), 0 4px 16px rgba(0,0,0,0.4)",
          transition: "all 0.22s"
        }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 48px rgba(0,210,160,0.4), 0 8px 24px rgba(0,0,0,0.5)"; }}
          onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 0 32px rgba(0,210,160,0.28), 0 4px 16px rgba(0,0,0,0.4)"; }}
        >Try SpotAI Free →</button>
        <button style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16,
          padding: "16px 40px", borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.04)", color: "rgba(200,240,230,0.7)",
          cursor: "pointer", transition: "all 0.22s"
        }}
          onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.04)"; }}
        >Watch Demo</button>
      </div>

      {/* stat pills */}
      <div style={{
        display: "flex", gap: 24, marginTop: 64, flexWrap: "wrap", justifyContent: "center",
        animation: "fadeSlideDown 0.7s 0.55s ease both", opacity: 0
      }}>
        {[
          { val: "98.4%", label: "Accuracy Rate" },
          { val: "<2s", label: "Response Time" },
          { val: "190+", label: "Countries" },
          { val: "Free", label: "To Start" }
        ].map(s => (
          <div key={s.val} style={{
            padding: "12px 24px", borderRadius: 10,
            border: "1px solid rgba(0,210,160,0.12)",
            background: "rgba(0,210,160,0.04)",
            textAlign: "center"
          }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#00d4a0" }}>{s.val}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(180,240,220,0.45)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Upload / Analyze Section ───────────────────────────────────────────────────
function UploadSection() {
  const [dragOver, setDragOver] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
    setResult(null);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const analyze = async () => {
    if (!image) return;
    setAnalyzing(true); setError(null); setResult(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64,
          mediaType: image.split(";")[0].split(":")[1],
          message: "Analyze this photo and identify the exact location."
        })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      const parsed = data.result;
      setResult(parsed);
    } catch (err) {
      setError("Could not analyze image. Please try a clearer street photo.");
    }
    setAnalyzing(false);
  };

  const reset = () => { setImage(null); setImageFile(null); setResult(null); setError(null); };

  const confColor = result
    ? result.confidence_pct >= 75 ? "#00d4a0"
      : result.confidence_pct >= 50 ? "#f0c040"
        : "#ff6060"
    : "#00d4a0";

  return (
    <section id="upload" style={{
      maxWidth: 900, margin: "0 auto", padding: "20px 24px 100px",
      position: "relative", zIndex: 1
    }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)",
          color: "#e8fff8", margin: "0 0 12px", letterSpacing: "-1px"
        }}>Try It Right Now</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(180,240,220,0.45)", margin: 0 }}>
          Upload any street photo and watch SpotAI locate it instantly
        </p>
      </div>

      {/* Upload card */}
      {!image ? (
        <div
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragOver ? "#00d4a0" : "rgba(0,210,160,0.25)"}`,
            borderRadius: 20,
            padding: "72px 40px",
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "rgba(0,210,160,0.05)" : "rgba(0,210,160,0.02)",
            transition: "all 0.25s",
            boxShadow: dragOver ? "0 0 40px rgba(0,210,160,0.12)" : "none"
          }}>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])} />
          <div style={{ fontSize: 52, marginBottom: 20 }}>📸</div>
          <p style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22,
            color: "#e8fff8", margin: "0 0 10px"
          }}>Drop your photo here</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(180,240,220,0.4)", margin: "0 0 28px" }}>
            or click to browse — JPG, PNG, WEBP supported
          </p>
          <div style={{
            display: "inline-block", padding: "10px 28px", borderRadius: 8,
            border: "1px solid rgba(0,210,160,0.35)",
            background: "rgba(0,210,160,0.08)",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#00d4a0"
          }}>Browse Files</div>
        </div>
      ) : (
        <div style={{
          borderRadius: 20, overflow: "hidden",
          border: "1px solid rgba(0,210,160,0.2)",
          background: "rgba(2,14,22,0.8)"
        }}>
          {/* top bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(0,210,160,0.1)",
            background: "rgba(0,210,160,0.03)"
          }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(0,210,160,0.7)" }}>
              📂 {imageFile?.name || "uploaded_photo.jpg"}
            </span>
            <button onClick={reset} style={{
              background: "none", border: "none", color: "rgba(180,240,220,0.4)",
              cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif"
            }}>✕ Remove</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: result ? "1fr 1fr" : "1fr", gap: 0 }}>
            {/* Image preview */}
            <div style={{ padding: 24 }}>
              <img src={image} alt="uploaded" style={{
                width: "100%", borderRadius: 12, objectFit: "cover",
                maxHeight: 340, border: "1px solid rgba(0,210,160,0.12)"
              }} />
            </div>

            {/* Result panel */}
            {result && (
              <div style={{ padding: 24, borderLeft: "1px solid rgba(0,210,160,0.1)" }}>
                {/* Location header */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>📍</span>
                    <span style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20,
                      color: "#e8fff8"
                    }}>{result.city}</span>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                    color: "rgba(180,240,220,0.55)", margin: 0
                  }}>{result.region && result.region + ", "}{result.country}</p>
                </div>

                {/* Confidence */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10, marginBottom: 20
                }}>
                  <div style={{
                    flex: 1, height: 6, borderRadius: 3,
                    background: "rgba(255,255,255,0.08)"
                  }}>
                    <div style={{
                      height: "100%", borderRadius: 3,
                      width: `${result.confidence_pct}%`,
                      background: `linear-gradient(90deg, ${confColor}, ${confColor}99)`,
                      transition: "width 1s ease",
                      boxShadow: `0 0 8px ${confColor}66`
                    }} />
                  </div>
                  <span style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: 14, color: confColor, minWidth: 36
                  }}>{result.confidence_pct}%</span>
                </div>

                {/* Coordinates */}
                <div style={{
                  padding: "14px 16px", borderRadius: 10, marginBottom: 16,
                  background: "rgba(0,210,160,0.06)",
                  border: "1px solid rgba(0,210,160,0.15)",
                  fontFamily: "'DM Mono', 'Courier New', monospace", fontSize: 13
                }}>
                  <div style={{ color: "rgba(0,210,160,0.6)", fontSize: 11, marginBottom: 4, letterSpacing: 1 }}>COORDINATES</div>
                  <div style={{ color: "#00d4a0" }}>LAT: <span style={{ color: "#e8fff8" }}>{result.lat?.toFixed(6)}</span></div>
                  <div style={{ color: "#00d4a0" }}>LNG: <span style={{ color: "#e8fff8" }}>{result.lng?.toFixed(6)}</span></div>
                </div>

                {/* Reasoning */}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: "rgba(180,240,220,0.5)", lineHeight: 1.6,
                  margin: "0 0 16px",
                  padding: "12px 14px", borderRadius: 8,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)"
                }}>💡 {result.reasoning}</p>

                {/* Landmarks */}
                {result.landmarks_nearby?.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                      color: "rgba(0,210,160,0.5)", letterSpacing: 1, marginBottom: 8
                    }}>NEARBY LANDMARKS</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {result.landmarks_nearby.map(l => (
                        <span key={l} style={{
                          padding: "4px 10px", borderRadius: 20, fontSize: 12,
                          background: "rgba(0,210,160,0.08)",
                          border: "1px solid rgba(0,210,160,0.18)",
                          fontFamily: "'DM Sans', sans-serif",
                          color: "rgba(0,210,160,0.8)"
                        }}>📌 {l}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: 10 }}>
                  <a href={result.maps_url} target="_blank" rel="noreferrer" style={{
                    flex: 1, display: "block", textAlign: "center",
                    padding: "11px", borderRadius: 8, fontSize: 13,
                    background: "linear-gradient(135deg, #00d4a0, #0088ee)",
                    color: "#020c14", fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    textDecoration: "none"
                  }}>🗺 Open in Maps</a>
                  <button onClick={reset} style={{
                    padding: "11px 16px", borderRadius: 8, fontSize: 13,
                    border: "1px solid rgba(0,210,160,0.25)",
                    background: "transparent", color: "rgba(0,210,160,0.8)",
                    fontFamily: "'Syne', sans-serif", fontWeight: 600, cursor: "pointer"
                  }}>New Photo</button>
                </div>
              </div>
            )}
          </div>

          {/* Analyze button */}
          {!result && (
            <div style={{ padding: "0 24px 24px" }}>
              {error && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: "#ff6060", marginBottom: 12,
                  padding: "10px 14px", borderRadius: 8,
                  background: "rgba(255,80,80,0.07)", border: "1px solid rgba(255,80,80,0.2)"
                }}>⚠️ {error}</p>
              )}
              <button onClick={analyze} disabled={analyzing} style={{
                width: "100%", padding: "16px", borderRadius: 12, border: "none",
                background: analyzing
                  ? "rgba(0,210,160,0.2)"
                  : "linear-gradient(135deg, #00d4a0, #0088ee)",
                color: analyzing ? "#00d4a0" : "#020c14",
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16,
                cursor: analyzing ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                boxShadow: analyzing ? "none" : "0 0 28px rgba(0,210,160,0.25)"
              }}>
                {analyzing ? (
                  <>
                    <span style={{
                      display: "inline-block", width: 16, height: 16,
                      border: "2px solid rgba(0,210,160,0.4)",
                      borderTopColor: "#00d4a0",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite"
                    }} />
                    Scanning location...
                  </>
                ) : "🔍 Analyze Location"}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────
function Features() {
  const feats = [
    { icon: "🌍", title: "Global Coverage", desc: "Trained on millions of geo-tagged images spanning 190+ countries and all major cities." },
    { icon: "⚡", title: "Under 2 Seconds", desc: "Real-time analysis returns precise coordinates and a Google Maps link almost instantly." },
    { icon: "📐", title: "Exact Coordinates", desc: "Get decimal degrees, DMS format, and a direct link to drop a pin on any map platform." },
    { icon: "🏛️", title: "Landmark Detection", desc: "Identifies nearby points of interest, street names, and architectural context." },
    { icon: "🔒", title: "Privacy First", desc: "Photos are analyzed in-memory — never stored, never sold. Your data stays yours." },
    { icon: "🔌", title: "API Access", desc: "Integrate SpotAI into your own app with our clean REST API. SDKs for JS & Python." }
  ];
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(28px,4vw,44px)", color: "#e8fff8",
          margin: "0 0 12px", letterSpacing: "-1px"
        }}>Everything You Need</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(180,240,220,0.4)", margin: 0 }}>
          Precision geo-location powered by advanced vision AI
        </p>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20
      }}>
        {feats.map(f => (
          <div key={f.title} style={{
            padding: "28px 26px", borderRadius: 16,
            border: "1px solid rgba(0,210,160,0.1)",
            background: "rgba(0,210,160,0.03)",
            transition: "all 0.25s"
          }}
            onMouseEnter={e => {
              e.currentTarget.style.border = "1px solid rgba(0,210,160,0.3)";
              e.currentTarget.style.background = "rgba(0,210,160,0.06)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = "1px solid rgba(0,210,160,0.1)";
              e.currentTarget.style.background = "rgba(0,210,160,0.03)";
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18,
              color: "#e8fff8", margin: "0 0 8px"
            }}>{f.title}</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              color: "rgba(180,240,220,0.45)", margin: 0, lineHeight: 1.65
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: "Free", price: "$0", period: "/forever",
      features: ["5 photos / day", "Coordinates + Map link", "Basic confidence score", "Web app access"],
      cta: "Get Started", highlight: false
    },
    {
      name: "Pro", price: "$9.99", period: "/month",
      features: ["Unlimited photos", "API access (1k calls/mo)", "High accuracy model", "Priority processing", "Bulk upload", "Export CSV / JSON"],
      cta: "Start Pro", highlight: true
    },
    {
      name: "Business", price: "$49", period: "/month",
      features: ["10k API calls/month", "White-label embed", "Custom subdomain", "SLA 99.9%", "Dedicated support", "Team accounts"],
      cta: "Contact Sales", highlight: false
    }
  ];
  return (
    <section style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px 120px", position: "relative", zIndex: 1 }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(28px,4vw,44px)", color: "#e8fff8",
          margin: "0 0 12px", letterSpacing: "-1px"
        }}>Simple Pricing</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(180,240,220,0.4)", margin: 0 }}>
          Start free. Scale when ready.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 20 }}>
        {plans.map(p => (
          <div key={p.name} style={{
            borderRadius: 18, padding: "32px 28px",
            border: p.highlight ? "1px solid rgba(0,210,160,0.5)" : "1px solid rgba(255,255,255,0.07)",
            background: p.highlight ? "rgba(0,210,160,0.06)" : "rgba(255,255,255,0.02)",
            boxShadow: p.highlight ? "0 0 40px rgba(0,210,160,0.1)" : "none",
            position: "relative"
          }}>
            {p.highlight && (
              <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                padding: "4px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: "linear-gradient(135deg, #00d4a0, #0088ee)",
                color: "#020c14", fontFamily: "'Syne', sans-serif", letterSpacing: 0.5
              }}>MOST POPULAR</div>
            )}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(0,210,160,0.7)", marginBottom: 8 }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 38, color: "#e8fff8" }}>{p.price}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(180,240,220,0.35)" }}>{p.period}</span>
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              {p.features.map(f => (
                <li key={f} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  color: "rgba(180,240,220,0.65)", padding: "7px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  display: "flex", alignItems: "center", gap: 8
                }}>
                  <span style={{ color: "#00d4a0", fontSize: 12 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button style={{
              width: "100%", padding: "13px", borderRadius: 10,
              border: p.highlight ? "none" : "1px solid rgba(0,210,160,0.25)",
              background: p.highlight ? "linear-gradient(135deg, #00d4a0, #0088ee)" : "transparent",
              color: p.highlight ? "#020c14" : "#00d4a0",
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
              cursor: "pointer"
            }}>{p.cta}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      position: "relative", zIndex: 1,
      borderTop: "1px solid rgba(0,210,160,0.08)",
      padding: "32px 40px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 12,
      background: "rgba(2,6,12,0.5)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>📍</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#e8fff8" }}>
          SpotAI<span style={{ color: "#00d4a0" }}>.com</span>
        </span>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(180,240,220,0.3)", margin: 0 }}>
        © 2025 SpotAI. Geo-location intelligence for everyone.
      </p>
      <div style={{ display: "flex", gap: 20 }}>
        {["Privacy", "Terms", "API Docs"].map(t => (
          <a key={t} href="#" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            color: "rgba(180,240,220,0.35)", textDecoration: "none"
          }}>{t}</a>
        ))}
      </div>
    </footer>
  );
}

// ── CSS keyframes injected globally ──────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const uploadRef = useRef();

  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{globalCSS}</style>
      <GridBg />
      <Navbar onGetStarted={scrollToUpload} />
      <Hero onGetStarted={scrollToUpload} />
      <UploadSection />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}
