// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  infinite: false,
  gestureOrientation: 'vertical',
  normalizeWheel: true,
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Connect GSAP to Lenis
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- Custom Cursor ---
const cursor = document.getElementById('custom-cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1
  });
  gsap.to(follower, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3
  });
});

// Cursor Interactions
const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, .stat-card, .value-item');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { scale: 1.5, background: '#00F5FF' });
    gsap.to(follower, { scale: 2, borderColor: '#00F5FF' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { scale: 1, background: '#00F5FF' });
    gsap.to(follower, { scale: 1, borderColor: '#00F5FF' });
  });
});

// --- Hero Animation ---
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

heroTl
  .to('.hero-tag', { opacity: 1, y: 0, delay: 0.5 })
  .to('.hero h1 .word', { y: 0, opacity: 1, stagger: 0.1 }, '-=0.8')
  .to('.hero p', { y: 0, opacity: 1 }, '-=0.8')
  .to('.hero-cta-group', { y: 0, opacity: 1 }, '-=0.8');

// --- Navbar Scroll Effect ---
ScrollTrigger.create({
  start: 'top -80',
  onEnter: () => document.getElementById('navbar').classList.add('scrolled'),
  onLeaveBack: () => document.getElementById('navbar').classList.remove('scrolled'),
});

// --- Stats Counter Animation ---
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
  const target = parseInt(stat.getAttribute('data-target'));
  
  ScrollTrigger.create({
    trigger: stat,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(stat, {
        innerText: target,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: 'power2.out',
        onUpdate: function() {
          stat.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString() + (target > 100 ? '+' : '%');
        }
      });
    }
  });
});

// --- Section Reveal Animations ---
const sections = document.querySelectorAll('section:not(.hero)');
sections.forEach(section => {
  gsap.from(section.querySelectorAll('h2, p, .value-item, .member-card'), {
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out'
  });
});

// --- Three.js Background Experience ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas'), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create a field of stars/particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: 0x00F5FF,
  transparent: true,
  opacity: 0.5
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// Mouse track for particles
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
});

function animate() {
  requestAnimationFrame(animate);
  
  particlesMesh.rotation.y += 0.001;
  particlesMesh.rotation.x += 0.0005;
  
  // Subtle parallax
  gsap.to(particlesMesh.rotation, {
    y: mouseX * 0.5,
    x: mouseY * 0.5,
    duration: 2
  });
  
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Magnetic Button Effect ---
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});
