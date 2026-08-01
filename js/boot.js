export function boot() {
    const bootScreen = document.getElementById("boot-screen");
    const desktop = document.getElementById("desktop");

    const lines = [
        "KelOS kernel v0.1.0",
        "Initializing memory manager...",
        "Loading kernel...",
        "Starting services...",
        "Mounting file systems...",
        "Probing devices...",
        "Launching desktop..."
    ];

    // Build the boot UI
    bootScreen.innerHTML = `
        <div class="boot-wrap">
            <h1 class="boot-title">KelOS</h1>
            <div class="boot-log" role="log" aria-live="polite"></div>
            <div class="boot-bar"><i></i></div>
        </div>
    `;

    const log = bootScreen.querySelector(".boot-log");
    const bar = bootScreen.querySelector(".boot-bar i");

    // Type out one line with a blinking cursor, then call onDone
    function typeLine(text, onDone) {
        const line = document.createElement("div");
        line.className = "boot-line";
        log.appendChild(line);

        let i = 0;
        (function tick() {
            if (i <= text.length) {
                line.textContent = text.slice(0, i) + "\u258C";
                i++;
                setTimeout(tick, 18 + Math.random() * 24);
            } else {
                line.textContent = text;
                onDone();
            }
        })();
    }

    let idx = 0;
    function step() {
        if (idx >= lines.length) {
            bar.style.width = "100%";
            finish();
            return;
        }
        bar.style.width = ((idx + 1) / lines.length) * 100 + "%";
        typeLine(lines[idx++], () => setTimeout(step, 240));
    }

    function finish() {
        bootScreen.classList.add("done");
        setTimeout(() => {
            bootScreen.remove();
            desktop.hidden = false;
        }, 650);
    }

    step();
}

