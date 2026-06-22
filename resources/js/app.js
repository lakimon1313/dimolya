const canvas = document.getElementById('forest-background');

if (canvas) {
    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const trees = [];
    const mist = [];
    const pointer = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let animationFrame = null;

    function seededRandom(seed) {
        const value = Math.sin(seed * 999) * 10000;

        return value - Math.floor(value);
    }

    function buildScene() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * pixelRatio);
        canvas.height = Math.floor(height * pixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        trees.length = 0;
        mist.length = 0;

        const treeCount = Math.max(36, Math.floor(width / 28));

        for (let index = 0; index < treeCount; index += 1) {
            const seed = index + 14;
            const depth = 0.18 + seededRandom(seed) * 0.82;
            const x = seededRandom(seed + 3) * width;
            const trunkHeight = height * (0.42 + depth * 0.5);
            const base = height + 24 + seededRandom(seed + 8) * 82;

            trees.push({
                x,
                base,
                depth,
                trunkHeight,
                trunkWidth: 1 + depth * 4.6,
                lean: (seededRandom(seed + 11) - 0.5) * 26,
                crown: 32 + depth * 88,
                phase: seededRandom(seed + 15) * Math.PI * 2,
            });
        }

        for (let index = 0; index < 5; index += 1) {
            mist.push({
                y: height * (0.18 + index * 0.14),
                speed: 0.12 + index * 0.045,
                offset: seededRandom(index + 44) * width,
                alpha: 0.05 + index * 0.014,
            });
        }
    }

    function drawTree(tree, time) {
        const wind = reducedMotion.matches ? 0 : Math.sin(time * 0.00028 + tree.phase) * (2.5 + tree.depth * 5);
        const parallax = pointer.x * (tree.depth - 0.5) * 16;
        const baseX = tree.x + parallax;
        const topX = baseX + tree.lean + wind;
        const topY = tree.base - tree.trunkHeight;

        context.lineCap = 'round';
        context.strokeStyle = `rgba(45, 57, 36, ${0.1 + tree.depth * 0.18})`;
        context.lineWidth = tree.trunkWidth;
        context.beginPath();
        context.moveTo(baseX, tree.base);
        context.lineTo(topX, topY);
        context.stroke();

        context.fillStyle = `rgba(84, 103, 61, ${0.035 + tree.depth * 0.055})`;

        for (let index = 0; index < 3; index += 1) {
            const crownY = topY + tree.crown * (0.5 + index * 0.32);
            const crownWidth = tree.crown * (1.8 - index * 0.34);

            context.beginPath();
            context.ellipse(topX, crownY, crownWidth, tree.crown * 0.72, 0, 0, Math.PI * 2);
            context.fill();
        }

        context.strokeStyle = `rgba(45, 57, 36, ${0.055 + tree.depth * 0.07})`;
        context.lineWidth = Math.max(0.8, tree.trunkWidth * 0.38);

        for (let index = 0; index < 7; index += 1) {
            const point = 0.2 + index * 0.085;
            const direction = index % 2 ? 1 : -1;
            const branchX = baseX + (topX - baseX) * point;
            const branchY = tree.base - tree.trunkHeight * point;
            const length = tree.crown * (0.55 + seededRandom(index + tree.depth * 20) * 0.32);

            context.beginPath();
            context.moveTo(branchX, branchY);
            context.lineTo(branchX + direction * length, branchY - length * 0.24);
            context.stroke();
        }
    }

    function drawMist(time) {
        context.save();
        context.globalCompositeOperation = 'screen';

        mist.forEach((layer, index) => {
            const drift = reducedMotion.matches ? layer.offset : (layer.offset + time * layer.speed) % (width + 520);
            const gradient = context.createLinearGradient(drift - 520, 0, drift + 520, 0);
            gradient.addColorStop(0, 'rgba(245, 242, 232, 0)');
            gradient.addColorStop(0.5, `rgba(245, 242, 232, ${layer.alpha})`);
            gradient.addColorStop(1, 'rgba(245, 242, 232, 0)');

            context.fillStyle = gradient;
            context.beginPath();
            context.ellipse(drift - 120, layer.y + pointer.y * (index + 1) * 8, 520, 52 + index * 10, 0, 0, Math.PI * 2);
            context.fill();
        });

        context.restore();
    }

    function draw(time = 0) {
        context.clearRect(0, 0, width, height);

        const sky = context.createLinearGradient(0, 0, 0, height);
        sky.addColorStop(0, '#f4f0e8');
        sky.addColorStop(0.42, '#d9decb');
        sky.addColorStop(1, '#6f7762');
        context.fillStyle = sky;
        context.fillRect(0, 0, width, height);

        context.fillStyle = 'rgba(255, 255, 255, 0.28)';
        context.beginPath();
        context.ellipse(width * 0.5, height * 0.12, width * 0.34, height * 0.18, 0, 0, Math.PI * 2);
        context.fill();

        trees
            .slice()
            .sort((first, second) => first.depth - second.depth)
            .forEach((tree) => drawTree(tree, time));

        drawMist(time);

        context.fillStyle = 'rgba(49, 57, 43, 0.24)';
        context.fillRect(0, height * 0.88, width, height * 0.12);

        if (!reducedMotion.matches) {
            animationFrame = window.requestAnimationFrame(draw);
        }
    }

    window.addEventListener('resize', () => {
        window.cancelAnimationFrame(animationFrame);
        buildScene();
        draw();
    });

    window.addEventListener('pointermove', (event) => {
        pointer.x = (event.clientX / Math.max(width, 1) - 0.5) * 2;
        pointer.y = (event.clientY / Math.max(height, 1) - 0.5) * 2;
    });

    buildScene();
    draw();
}
