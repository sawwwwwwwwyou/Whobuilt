// Content map: maps article slugs to their full markdown content in multiple languages.
// Vite's ?raw suffix imports files as plain text strings.

import survivalGuideEn from '../../articles/fallas-survival-guide-2026-en.md?raw';
import survivalGuideEs from '../../articles/fallas-guia-supervivencia-2026-es.md?raw';
import topAppsEn from '../../articles/fallas-top-apps-2026-en.md?raw';
import topAppsEs from '../../articles/fallas-mejores-apps-2026-es.md?raw';

// Strip YAML frontmatter (everything between --- and ---) from markdown
function stripFrontmatter(md) {
    return md.replace(/^---[\s\S]*?---\s*/, '');
}

const articleContent = {
    'fallas-valencia-2026-survival-guide': {
        en: stripFrontmatter(survivalGuideEn),
        es: stripFrontmatter(survivalGuideEs),
    },
    'best-apps-for-las-fallas-2026': {
        en: stripFrontmatter(topAppsEn),
        es: stripFrontmatter(topAppsEs),
    },
};

export default articleContent;
