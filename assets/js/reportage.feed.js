async function loadReportagen() {
    const container = document.getElementById('reportagen-feed');

    if (!container) return;

    try {
        const response = await fetch('https://blog.mellowlight.de/feed.xml');

        if (!response.ok) {
            throw new Error('Feed konnte nicht geladen werden');
        }

        const xmlText = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'application/xml');

        // Nur Beiträge aus "echte-hochzeiten"
        const entries = [...xml.querySelectorAll('entry')]
            .filter(entry =>
                [...entry.querySelectorAll('category')]
                    .some(category =>
                        category.getAttribute('term') === 'echte-hochzeiten'
                    )
            )
            .slice(0, 3);

        entries.forEach(entry => {

            const title =
                entry.querySelector('title')?.textContent.trim() || '';

            const link =
                entry.querySelector('link[rel="alternate"]')
                    ?.getAttribute('href') || '';

            const summary =
                entry.querySelector('summary')?.textContent.trim() || '';

            // media:content namespace-unabhängig suchen
            const media = [...entry.children]
                .find(el =>
                    el.localName === 'content' &&
                    el.getAttribute('medium') === 'image'
                );

            const imageUrl =
                media?.getAttribute('url') || '';

            const imageAlt =
                media?.getAttribute('title') || title;

            const card = document.createElement('article');
            card.className = 'hp__reportage-card';

            card.innerHTML = `
                <a
                    class="hp__reportage-card__image"
                    href="${link}"
                >
                    <img
                        src="${imageUrl}"
                        alt="${imageAlt}"
                        loading="lazy"
                        decoding="async"
                    >
                </a>

                <div class="hp__reportage-card__content">

                    <h3>
                        <a href="${link}">
                            ${title}
                        </a>
                    </h3>

                    <p>${summary}</p>

                    <a
                        class="hp__more"
                        href="${link}"
                    >
                        Ganze Reportage im Journal ansehen  &#x2197;
                    </a>

                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(
            'Reportagen konnten nicht geladen werden:',
            error
        );
    }
}

loadReportagen();