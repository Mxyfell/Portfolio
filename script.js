window.addEventListener('load', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    document.body.insertBefore(canvas, document.body.firstChild);

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Стили для фона
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';

    let stars = [];
    const STARS_COUNT = 150; // Сколько звезд будет на экране

    class Star {
        constructor() {
            this.reset(true); // true означает случайное положение по всей высоте
        }

        reset(isInitial = false) {
            this.x = Math.random() * canvas.width;
            // Если это первый запуск, раскидываем по всему экрану, иначе — только новые
            this.y = isInitial ? Math.random() * canvas.height : Math.random() * canvas.height;
            
            this.size = Math.random() * 1.5 + 0.2; // Разный размер
            this.maxOpacity = Math.random() * 0.8 + 0.2;
            this.opacity = 0;
            
            // Скорость мерцания (у каждой звезды своя)
            this.blinkSpeed = Math.random() * 0.01 + 0.002;
            this.phase = Math.random() * Math.PI * 2; // Начальная точка в цикле мерцания
            
            // Очень медленное движение, чтобы небо "жило"
            this.vx = (Math.random() - 0.5) * 0.1;
            this.vy = (Math.random() - 0.5) * 0.1;
        }

        update() {
            // Звезда медленно "плывет"
            this.x += this.vx;
            this.y += this.vy;

            // Плавное мерцание через синус
            this.phase += this.blinkSpeed;
            this.opacity = (Math.sin(this.phase) + 1) / 2 * this.maxOpacity;

            // Если звезда уплыла за край, переносим её
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset(false);
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Создаем массив звезд сразу
    for (let i = 0; i < STARS_COUNT; i++) {
        stars.push(new Star());
    }

    function animate() {
        // Очищаем экран
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        requestAnimationFrame(animate);
    }

    animate();
});window.addEventListener('load', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    document.body.insertBefore(canvas, document.body.firstChild);

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Стили для фона
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';

    let stars = [];
    const STARS_COUNT = 150; // Сколько звезд будет на экране

    class Star {
        constructor() {
            this.reset(true); // true означает случайное положение по всей высоте
        }

        reset(isInitial = false) {
            this.x = Math.random() * canvas.width;
            // Если это первый запуск, раскидываем по всему экрану, иначе — только новые
            this.y = isInitial ? Math.random() * canvas.height : Math.random() * canvas.height;
            
            this.size = Math.random() * 1.5 + 0.2; // Разный размер
            this.maxOpacity = Math.random() * 0.8 + 0.2;
            this.opacity = 0;
            
            // Скорость мерцания (у каждой звезды своя)
            this.blinkSpeed = Math.random() * 0.01 + 0.002;
            this.phase = Math.random() * Math.PI * 2; // Начальная точка в цикле мерцания
            
            // Очень медленное движение, чтобы небо "жило"
            this.vx = (Math.random() - 0.5) * 0.1;
            this.vy = (Math.random() - 0.5) * 0.1;
        }

        update() {
            // Звезда медленно "плывет"
            this.x += this.vx;
            this.y += this.vy;

            // Плавное мерцание через синус
            this.phase += this.blinkSpeed;
            this.opacity = (Math.sin(this.phase) + 1) / 2 * this.maxOpacity;

            // Если звезда уплыла за край, переносим её
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset(false);
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Создаем массив звезд сразу
    for (let i = 0; i < STARS_COUNT; i++) {
        stars.push(new Star());
    }

    function animate() {
        // Очищаем экран
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        requestAnimationFrame(animate);
    }

    animate();
});
const aboutImage = document.querySelector('.about-image');

const clickSound = new Audio('XEXX.ogg');
aboutImage.addEventListener('click', () => {
    // Сбрасываем время в начало, чтобы звук можно было запустить снова, 
    // даже если он еще не доиграл до конца
    clickSound.currentTime = 0; 
    
    // Играем звук
    clickSound.play();
    
    // (Опционально) Добавим визуальный эффект при клике
    aboutImage.style.transform = 'scale(0.9)';
    setTimeout(() => {
        aboutImage.style.transform = '';
    }, 100);
});aboutImage.addEventListener('click', () => {
    clickSound.currentTime = 0; 
    
    clickSound.play();
    
    aboutImage.style.transform = 'scale(0.9)';
    setTimeout(() => {
        aboutImage.style.transform = '';
    }, 100);
});