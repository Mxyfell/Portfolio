/* ==========================================================================
   MXYFELL PORTFOLIO — INTERACTIVE SCRIPT
   - Cosmic Starfield Canvas
   - Avatar Click Audio & Pulse
   - Sound FX Toggle
   - Safe Discord SDK Handling
   - Smooth Scroll & Helpers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. STARFIELD PARTICLES BACKGROUND
    // -------------------------------------------------------------------------
    const canvas = document.getElementById('space-canvas') || (() => {
        const c = document.createElement('canvas');
        c.id = 'space-canvas';
        c.className = 'starfield-canvas';
        document.body.insertBefore(c, document.body.firstChild);
        return c;
    })();

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let stars = [];
    const STARS_COUNT = 160;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Star {
        constructor() {
            this.reset(true);
        }

        reset(isInitial = false) {
            this.x = Math.random() * width;
            this.y = isInitial ? Math.random() * height : -5;
            this.size = Math.random() * 1.6 + 0.3;
            this.maxOpacity = Math.random() * 0.75 + 0.25;
            this.opacity = Math.random() * this.maxOpacity;
            this.blinkSpeed = Math.random() * 0.02 + 0.005;
            this.phase = Math.random() * Math.PI * 2;
            this.vx = (Math.random() - 0.5) * 0.15;
            this.vy = Math.random() * 0.25 + 0.05; // Gentle downward drift
            
            // Subtle color tint: mostly white with occasional warm crimson stars
            const isRed = Math.random() < 0.18;
            this.color = isRed ? '231, 84, 74' : '255, 255, 255';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.phase += this.blinkSpeed;
            this.opacity = ((Math.sin(this.phase) + 1) / 2) * this.maxOpacity;

            if (this.x < -10 || this.x > width + 10 || this.y > height + 10) {
                this.reset(false);
            }
        }

        draw() {
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initStars() {
        resizeCanvas();
        stars = [];
        for (let i = 0; i < STARS_COUNT; i++) {
            stars.push(new Star());
        }
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    initStars();

    let animationFrameId;
    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].draw();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // -------------------------------------------------------------------------
    // 2. AUDIO & AVATAR CLICK INTERACTION
    // -------------------------------------------------------------------------
    const clickSound = new Audio('XEXX.ogg');
    let soundEnabled = true;

    // Check localStorage preference
    try {
        const savedPref = localStorage.getItem('mxyfell_sound_enabled');
        if (savedPref !== null) {
            soundEnabled = savedPref === 'true';
        }
    } catch (e) {}

    const audioToggleBtn = document.getElementById('audio-toggle');
    function updateAudioButtonState() {
        if (!audioToggleBtn) return;
        audioToggleBtn.textContent = soundEnabled ? '🔊' : '🔇';
        audioToggleBtn.setAttribute('title', soundEnabled ? 'Sound FX Enabled (Click to Mute)' : 'Sound FX Muted (Click to Unmute)');
    }

    if (audioToggleBtn) {
        updateAudioButtonState();
        audioToggleBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            try {
                localStorage.setItem('mxyfell_sound_enabled', String(soundEnabled));
            } catch (e) {}
            updateAudioButtonState();
            showToast(soundEnabled ? 'Sound FX enabled 🔊' : 'Sound FX muted 🔇');
        });
    }

    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.addEventListener('click', () => {
            if (soundEnabled) {
                try {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(err => {
                        console.log('Audio autoplay policy note:', err);
                    });
                } catch (e) {}
            }

            // Punchy visual feedback
            const img = aboutImage.querySelector('img');
            if (img) {
                img.style.transform = 'scale(0.92)';
                setTimeout(() => {
                    img.style.transform = '';
                }, 140);
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. TOAST NOTIFICATION UTILITY
    // -------------------------------------------------------------------------
    const toast = document.getElementById('toast');
    let toastTimeout = null;

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    // -------------------------------------------------------------------------
    // 4. BACK TO TOP
    // -------------------------------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // -------------------------------------------------------------------------
    // 5. DISCORD EMBEDDED SDK INITIALIZATION (SAFE)
    // -------------------------------------------------------------------------
    try {
        if (window.discordSdk && window.location.search.includes('frame_id')) {
            const discordSdk = new window.discordSdk.DiscordSDK("ТВОЙ_CLIENT_ID_БОТА");
            discordSdk.ready().then(() => {
                console.log("Sgenov Discord Activity ready!");
            }).catch(e => {
                console.warn("Discord SDK frame error:", e);
            });
        }
    } catch (e) {
        console.log("Discord SDK standby");
    }
});
