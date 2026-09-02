import * as THREE from 'three';

// Texture singletons cache to prevent expensive Canvas2D loop re-runs
let gasGiantTextureCache: THREE.CanvasTexture | null = null;
let terrestrialTextureCache: THREE.CanvasTexture | null = null;
let cloudsTextureCache: THREE.CanvasTexture | null = null;
let ringTextureCache: THREE.CanvasTexture | null = null;
let starGlowTextureCache: THREE.CanvasTexture | null = null;

// Procedural texture generator for high-res gas giant planet surface
export function createGasGiantTexture(): THREE.CanvasTexture {
  if (gasGiantTextureCache) return gasGiantTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep space planetary base gradient
  const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  baseGrad.addColorStop(0, '#102236');     // Deep indigo/navy polar region
  baseGrad.addColorStop(0.15, '#1e3a5f');  // Subdued cyan-blue
  baseGrad.addColorStop(0.3, '#2d5a7b');   // Muted teal-blue
  baseGrad.addColorStop(0.42, '#a85d43');  // Warm subtle orange band
  baseGrad.addColorStop(0.5, '#c97852');   // Soft terracotta
  baseGrad.addColorStop(0.58, '#8c486a');  // Subtle dusty pink band
  baseGrad.addColorStop(0.7, '#244b6e');   // Deep ocean azure
  baseGrad.addColorStop(0.85, '#18344e');  // Lower temperate blue
  baseGrad.addColorStop(1, '#0c1a29');     // South polar deep blue
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Layered turbulent atmospheric bands
  for (let y = 0; y < canvas.height; y += 2) {
    const normY = y / canvas.height;
    const bandFreq = Math.sin(normY * Math.PI * 18) * 0.5 + Math.cos(normY * Math.PI * 32) * 0.25;
    
    // Choose band color family
    let r = 30, g = 60, b = 90;
    if (normY > 0.35 && normY < 0.65) {
      // Equatorial warm orange / soft pink bands
      const t = (normY - 0.35) / 0.3;
      r = 180 + Math.sin(t * Math.PI) * 45;
      g = 100 + Math.sin(t * Math.PI * 2) * 30;
      b = 110 + Math.cos(t * Math.PI) * 35;
    } else {
      // Polar & temperate blue / cyan bands
      r = 20 + Math.sin(normY * 10) * 15;
      g = 60 + Math.cos(normY * 12) * 25;
      b = 110 + Math.sin(normY * 8) * 35;
    }

    ctx.fillStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${0.12 + Math.abs(bandFreq) * 0.15})`;
    
    // Draw wavy stream
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= canvas.width; x += 16) {
      const wave = Math.sin(x * 0.02 + normY * 10) * 4 + Math.cos(x * 0.05) * 2;
      ctx.lineTo(x, y + wave);
    }
    ctx.lineTo(canvas.width, y + 3);
    ctx.lineTo(0, y + 3);
    ctx.closePath();
    ctx.fill();
  }

  // Giant storm vortex (like Great Red Spot / Celestial Cyclone)
  const stormX = canvas.width * 0.62;
  const stormY = canvas.height * 0.52;
  const stormGrad = ctx.createRadialGradient(stormX, stormY, 5, stormX, stormY, 45);
  stormGrad.addColorStop(0, 'rgba(235, 125, 80, 0.85)'); // Warm orange core
  stormGrad.addColorStop(0.4, 'rgba(200, 90, 110, 0.6)'); // Pinkish vortex fringe
  stormGrad.addColorStop(0.8, 'rgba(100, 60, 120, 0.3)'); // Purple boundary
  stormGrad.addColorStop(1, 'rgba(30, 60, 90, 0)');
  ctx.fillStyle = stormGrad;
  ctx.beginPath();
  ctx.ellipse(stormX, stormY, 55, 26, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Fine atmospheric ripples & vortices
  for (let i = 0; i < 60; i++) {
    const rx = Math.random() * canvas.width;
    const ry = canvas.height * 0.2 + Math.random() * (canvas.height * 0.6);
    const rad = 4 + Math.random() * 14;
    const isWarm = Math.random() > 0.5;
    ctx.fillStyle = isWarm 
      ? `rgba(240, 140, 90, ${0.15 + Math.random() * 0.2})` 
      : `rgba(90, 170, 220, ${0.15 + Math.random() * 0.2})`;
    ctx.beginPath();
    ctx.ellipse(rx, ry, rad * 2, rad, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  gasGiantTextureCache = texture;
  return texture;
}

// Procedural texture for terrestrial / earth-like futuristic world
export function createTerrestrialTexture(): THREE.CanvasTexture {
  if (terrestrialTextureCache) return terrestrialTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep ocean gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#0a192f');
  oceanGrad.addColorStop(0.5, '#0d2547');
  oceanGrad.addColorStop(1, '#081426');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Procedural continents & islands
  ctx.fillStyle = '#1e4835'; // Deep emerald landmass
  const seedContinents = [
    { x: 200, y: 220, rx: 140, ry: 90, tilt: 0.2 },
    { x: 380, y: 320, rx: 110, ry: 130, tilt: -0.1 },
    { x: 620, y: 190, rx: 180, ry: 100, tilt: 0.15 },
    { x: 780, y: 310, rx: 130, ry: 110, tilt: -0.25 },
    { x: 890, y: 240, rx: 70, ry: 50, tilt: 0.3 }
  ];

  seedContinents.forEach(c => {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.rx, c.ry, c.tilt, 0, Math.PI * 2);
    ctx.fill();

    // Mountainous & desert ridges on land
    const ridgeGrad = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, c.rx * 0.8);
    ridgeGrad.addColorStop(0, '#7c5a38'); // Mountain peaks / warm desert
    ridgeGrad.addColorStop(0.6, '#2e6347'); // Green forests
    ridgeGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = ridgeGrad;
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.rx * 0.75, c.ry * 0.75, c.tilt, 0, Math.PI * 2);
    ctx.fill();
  });

  // Polar ice caps
  const polarGradN = ctx.createLinearGradient(0, 0, 0, 70);
  polarGradN.addColorStop(0, 'rgba(230, 245, 255, 0.95)');
  polarGradN.addColorStop(0.7, 'rgba(180, 220, 245, 0.7)');
  polarGradN.addColorStop(1, 'rgba(100, 180, 220, 0)');
  ctx.fillStyle = polarGradN;
  ctx.fillRect(0, 0, canvas.width, 70);

  const polarGradS = ctx.createLinearGradient(0, canvas.height - 70, 0, canvas.height);
  polarGradS.addColorStop(0, 'rgba(100, 180, 220, 0)');
  polarGradS.addColorStop(0.3, 'rgba(180, 220, 245, 0.7)');
  polarGradS.addColorStop(1, 'rgba(230, 245, 255, 0.95)');
  ctx.fillStyle = polarGradS;
  ctx.fillRect(0, canvas.height - 70, canvas.width, 70);

  // Subtle glowing futuristic night-side city grids
  ctx.fillStyle = 'rgba(240, 180, 100, 0.35)'; // Warm golden-orange city clusters
  for (let i = 0; i < 80; i++) {
    const cx = (i * 37) % canvas.width;
    const cy = 120 + ((i * 53) % (canvas.height - 240));
    ctx.fillRect(cx, cy, 2, 2);
    ctx.fillRect(cx + 3, cy + 1, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  terrestrialTextureCache = texture;
  return texture;
}

// Procedural dynamic cloud layer for planets (with alpha transparency)
export function createCloudsTexture(): THREE.CanvasTexture {
  if (cloudsTextureCache) return cloudsTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Soft atmospheric cloud bands and storm spirals
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  for (let i = 0; i < 70; i++) {
    const cx = Math.random() * canvas.width;
    const cy = 40 + Math.random() * (canvas.height - 80);
    const rw = 40 + Math.random() * 120;
    const rh = 12 + Math.random() * 30;
    const rot = (Math.random() - 0.5) * 0.3;

    const cloudGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rw);
    cloudGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    cloudGrad.addColorStop(0.5, 'rgba(240, 248, 255, 0.35)');
    cloudGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = cloudGrad;

    ctx.beginPath();
    ctx.ellipse(cx, cy, rw, rh, rot, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  cloudsTextureCache = texture;
  return texture;
}

// Procedural planetary ring texture with fine micro-grooves
export function createRingTexture(): THREE.CanvasTexture {
  if (ringTextureCache) return ringTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(0.12, 'rgba(120, 180, 230, 0.15)'); // Soft cyan-blue inner ring
  grad.addColorStop(0.28, 'rgba(240, 160, 110, 0.65)'); // Warm orange central dense ring
  grad.addColorStop(0.48, 'rgba(220, 130, 160, 0.45)'); // Pinkish dust division (Cassini-like)
  grad.addColorStop(0.55, 'rgba(40, 70, 110, 0.1)');   // Dark gap
  grad.addColorStop(0.68, 'rgba(245, 175, 120, 0.55)'); // Bright outer A-ring
  grad.addColorStop(0.88, 'rgba(140, 200, 240, 0.3)');  // Pale blue faint outer edge
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Micro grooves (thousands of ice particle bands)
  for (let x = 30; x < canvas.width - 30; x += 3) {
    const alpha = (Math.sin(x * 0.4) * 0.5 + 0.5) * 0.3;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(x, 0, 1.5, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  ringTextureCache = texture;
  return texture;
}

// Glowing star particle sprite
export function createStarGlowTexture(): THREE.CanvasTexture {
  if (starGlowTextureCache) return starGlowTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const center = 64;
  const grad = ctx.createRadialGradient(center, center, 0, center, center, 64);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.15, 'rgba(200, 235, 255, 0.9)');
  grad.addColorStop(0.35, 'rgba(120, 180, 255, 0.4)');
  grad.addColorStop(0.7, 'rgba(80, 130, 240, 0.1)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  starGlowTextureCache = texture;
  return texture;
}
