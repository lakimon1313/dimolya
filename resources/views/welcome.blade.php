<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f4f0e8">
    <title>Оля + Діма | Запрошення</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <canvas id="forest-background" aria-hidden="true"></canvas>

    <main class="invite-page">
        <section class="invite-hero" aria-labelledby="invite-title">
            <article class="invite-card invite-card-main">
                <div class="rule rule-top"></div>
                <div class="rule rule-short"></div>

                <p class="invite-kicker">Запрошуємо вас розділити з нами</p>
                <h1 id="invite-title" class="invite-title">
                    один із найщасливіших днів<br>
                    нашого життя
                    <span aria-hidden="true">♥</span>
                </h1>

                <div class="event-date" aria-label="Дата весілля">17.09.2026</div>
                <div class="event-time">13:00</div>

                <div class="rule rule-tiny"></div>

                <p class="event-place">Ресторан "Флоріан"</p>

                <section class="dress-code" aria-label="Дрес-код">
                    <h2>Дрес - код</h2>
                    <p>
                        Для нас буде особливо приємно,<br>
                        якщо у своїх образах ви підтримаєте<br>
                        кольорову палітру нашого свята.
                    </p>
                    <div class="palette" aria-hidden="true">
                        <span style="--swatch: #141412"></span>
                        <span style="--swatch: #614532"></span>
                        <span style="--swatch: #8c7467"></span>
                        <span style="--swatch: #ddd5c3"></span>
                        <span style="--swatch: #eadfd6"></span>
                        <span style="--swatch: #a5b499"></span>
                        <span style="--swatch: #536238"></span>
                    </div>
                </section>

                <figure class="photo-heart">
                    <div class="heart-back heart-back-left"></div>
                    <div class="heart-back heart-back-right"></div>
                    <img
                        src="/images/olya-dima-childhood.jpg"
                        alt="Дитяче фото Олі та Діми"
                        fetchpriority="high"
                    >
                    <span class="small-heart" aria-hidden="true">♡</span>
                </figure>
            </article>
        </section>

        <section class="rsvp-section" aria-labelledby="rsvp-title">
            <div class="rsvp-copy">
                <p>RSVP</p>
                <h2 id="rsvp-title">Підтвердіть, будь ласка, вашу присутність</h2>
            </div>

            <div class="form-frame">
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfJ-kO8SP-Abkk3ZmGjLCKKkUBbv61h2i8J-J2aX79vTRRh-w/viewform?embedded=true"
                    width="640"
                    height="720"
                    title="Форма підтвердження присутності"
                >Loading...</iframe>
            </div>
        </section>
    </main>
</body>
</html>
