export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  email: string | null;
  followers: number;
  following: number;
  public_repos: number;
  statusEmoji: string;
  statusText: string;
  readme: {
    greeting: string;
    interestedIn: string;
    learning: string;
    collaborating: string;
    reachingOut: string;
    statsImage: string;
    techStack?: string[];
  };
  pinnedRepos: GitHubRepo[];
  totalContributions: number;
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
  topics?: string[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = empty, 4 = darkest green
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export const LANGUAGE_COLORS: Record<string, string> = {
  HTML: '#e34c26',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  CSS: '#563d7c',
  Python: '#3572A5',
  Markdown: '#083fa1',
  Blade: '#f7523f',
  Vue: '#41b883',
};

export const PROFILES: Record<string, GitHubProfile> = {
  'ghanisyifanur-analisis': {
    login: 'ghanisyifanur-analisis',
    name: 'Ghani Syifa Nur (Rizqi Ghani Adinata)',
    avatar_url: 'https://avatars.githubusercontent.com/u/346345610?v=4',
    bio: 'Senior Data Scientist & ML Architect | Predictive Modeling, Explainable AI (XAI), Production MLOps & Distributed Analytics',
    company: 'Indonesia',
    location: 'Jawa Barat, Bekasi',
    blog: 'https://rizqighaniadinata.my.id',
    email: 'ghanisyifanur@gmail.com',
    followers: 84,
    following: 12,
    public_repos: 12,
    statusEmoji: '🔬',
    statusText: 'MLOps, XAI & Real-Time Inference',
    readme: {
      greeting: "👋 Hi, I’m @ghanisyifanur-analisis (Rizqi Ghani Adinata)",
      interestedIn: 'Senior Data Science, Explainable AI (SHAP), Production MLOps (Triton/Feast), Distributed Analytics (PySpark/Polars), and Real-Time Predictive Modeling',
      learning: 'Gemini 4 Argon High-Thinking Systems, Graph Neural Networks, and Causal Inference in Online Controlled Experiments (A/B Testing)',
      collaborating: 'High-Impact Enterprise ML Systems, Sub-15ms Real-Time Fraud & Churn Engines, and Scalable MLOps Platforms',
      reachingOut: 'ghanisyifanur@gmail.com / Portfolio: https://rizqighaniadinata.my.id',
      statsImage: 'https://ghchart.rshah.org/maoneart',
      techStack: ['Python', 'PySpark', 'Polars', 'LightGBM', 'PyTorch', 'Scikit-Learn', 'Docker', 'FastAPI', 'MLflow', 'PostgreSQL', 'TypeScript', 'React'],
    },
    pinnedRepos: [
      {
        id: '1',
        name: 'enterprise-churn-xai-mlops',
        description: 'End-to-end customer churn prediction engine with Optuna-tuned LightGBM, SHAP feature attributions, Triton serving (<12ms p95), and Population Stability Index (PSI) drift telemetry.',
        isPrivate: false,
        language: 'Python',
        languageColor: LANGUAGE_COLORS.Python,
        stars: 38,
        forks: 9,
        updatedAt: 'Updated 2 days ago',
        topics: ['data-science', 'mlops', 'xai-shap', 'lightgbm', 'fastapi'],
      },
      {
        id: '2',
        name: 'realtime-fraud-streaming-pipeline',
        description: 'Sub-20ms payment fraud detection architecture combining Kafka, PySpark Structured Streaming, and Focal Loss Neural Networks for extreme 0.8% imbalanced risk scoring.',
        isPrivate: false,
        language: 'Python',
        languageColor: LANGUAGE_COLORS.Python,
        stars: 27,
        forks: 6,
        updatedAt: 'Updated 3 days ago',
        topics: ['fraud-detection', 'pyspark', 'streaming', 'pytorch', 'distributed-systems'],
      },
      {
        id: '3',
        name: 'ab-testing-bayesian-framework',
        description: 'Production experimentation framework with Frequentist & Bayesian hypothesis testing, automated MDE sample size power calculators, and CUPED variance reduction.',
        isPrivate: false,
        language: 'Python',
        languageColor: LANGUAGE_COLORS.Python,
        stars: 19,
        forks: 4,
        updatedAt: 'Updated last week',
        topics: ['ab-testing', 'statistics', 'bayesian', 'power-analysis', 'experimentation'],
      },
      {
        id: '4',
        name: 'automated-eda-profiler',
        description: 'Ultra-fast exploratory data analysis & statistical profiling library powered by Polars LazyFrames, Pearson correlation heatmaps, and Tukey outlier detection.',
        isPrivate: false,
        language: 'Python',
        languageColor: LANGUAGE_COLORS.Python,
        stars: 15,
        forks: 3,
        updatedAt: 'Updated last week',
        topics: ['eda', 'polars', 'data-profiling', 'statistics', 'visualization'],
      },
      {
        id: '5',
        name: 'flutter-agro-analytics',
        description: 'Cross-platform mobile application for real-time field data telemetry, sensor synchronization, and analytics reports.',
        isPrivate: false,
        language: 'Dart',
        languageColor: LANGUAGE_COLORS.Dart,
        stars: 14,
        forks: 2,
        updatedAt: 'Updated 2 weeks ago',
        topics: ['flutter', 'dart', 'mobile', 'analytics'],
      },
      {
        id: '6',
        name: 'laravel-api-gateway',
        description: 'Scalable RESTful microservices gateway with JWT authentication, role-based access control, and Redis caching.',
        isPrivate: false,
        language: 'PHP',
        languageColor: LANGUAGE_COLORS.PHP,
        stars: 11,
        forks: 1,
        updatedAt: 'Updated 2 weeks ago',
        topics: ['laravel', 'php', 'rest-api', 'jwt'],
      },
    ],
    totalContributions: 642,
  },
  'maoneart': {
    login: 'maoneart',
    name: 'Hermawan',
    avatar_url: 'https://avatars.githubusercontent.com/u/32331568?v=4',
    bio: 'MaoneArt Development',
    company: 'Indonesia',
    location: 'Jawa Barat, Bekasi',
    blog: 'https://www.maoneart.my.id',
    email: null,
    followers: 1,
    following: 2,
    public_repos: 36,
    statusEmoji: '🏠',
    statusText: 'Home office',
    readme: {
      greeting: "👋 Hi, I’m @maoneart",
      interestedIn: '[Isi minat Anda, contoh: Web Development, UI/UX Design, Open Source]',
      learning: '[Isi hal yang sedang dipelajari, contoh: React, TypeScript, Python]',
      collaborating: '[Isi proyek impian, contoh: Innovative Web Apps, Creative Tech]',
      reachingOut: '[Isi email atau media sosial, contoh: email@domain.com / Twitter @username]',
      statsImage: 'https://ghchart.rshah.org/maoneart',
      techStack: ['Laravel', 'PHP', 'Flutter', 'JavaScript', 'Node.js', 'HTML5', 'CSS3'],
    },
    pinnedRepos: [
      {
        id: 'm1',
        name: 'maoneart.github.io',
        description: 'Personal GitHub Pages portfolio and responsive developer profile showcase.',
        isPrivate: false,
        language: 'HTML',
        languageColor: LANGUAGE_COLORS.HTML,
        stars: 0,
        forks: 0,
        updatedAt: 'Updated Oct 2026',
        topics: ['portfolio', 'html', 'github-pages'],
      },
      {
        id: 'm2',
        name: 'KaidoBotzV.2.0.1',
        description: 'High-speed WhatsApp multi-device bot utilizing baileys and automated workflow scripting.',
        isPrivate: false,
        language: 'JavaScript',
        languageColor: LANGUAGE_COLORS.JavaScript,
        stars: 0,
        forks: 0,
        updatedAt: 'Updated Sep 2022',
        topics: ['bot', 'javascript', 'automation'],
      },
      {
        id: 'm3',
        name: 'KaidoBotzV2',
        description: 'Version 2 release of the automated modular bot client with plugin architecture.',
        isPrivate: false,
        language: 'JavaScript',
        languageColor: LANGUAGE_COLORS.JavaScript,
        stars: 0,
        forks: 0,
        updatedAt: 'Updated Apr 2022',
        topics: ['bot', 'javascript'],
      },
    ],
    totalContributions: 511,
  },
};

/**
 * Deterministic generation of 52 weeks of contributions matching GitHub's calendar layout
 */
export function generateContributionWeeks(seed: number = 42, activeMultiplier: number = 1.0): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  const baseDate = new Date(2026, 9, 23); // Oct 23, 2026
  
  // Back up 52 weeks (approx 364 days)
  const startDate = new Date(baseDate);
  startDate.setDate(baseDate.getDate() - 364);

  // Align with Monday
  const dayOfWeek = startDate.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startDate.setDate(startDate.getDate() + diffToMonday);

  let current = new Date(startDate);

  // Generate 52 weeks
  for (let w = 0; w < 52; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = current.toISOString().split('T')[0];
      
      // Seeded pseudorandom logic with clusters (like maoneart's chart in August-October)
      const month = current.getMonth();
      const pseudoVal = Math.sin(seed * (w * 7 + d) + 1.5) * 10000;
      const rand = pseudoVal - Math.floor(pseudoVal);

      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      // Higher activity in late summer/autumn (August, September, October)
      const isHighSeason = month >= 7 && month <= 9;
      const threshold = isHighSeason ? 0.35 : 0.85;

      if (rand > threshold) {
        if (rand > 0.95 && isHighSeason) {
          count = Math.floor(rand * 14) + 6;
          level = 4;
        } else if (rand > 0.8) {
          count = Math.floor(rand * 8) + 3;
          level = 3;
        } else if (rand > 0.6) {
          count = Math.floor(rand * 5) + 2;
          level = 2;
        } else {
          count = 1;
          level = 1;
        }
      }

      // Jan/May occasional green spots matching maoneart screenshot
      if ((month === 0 && d === 1 && (w === 9 || w === 10)) || (month === 4 && d === 0 && w === 29)) {
        count = 3;
        level = 2;
      }

      days.push({
        date: dateStr,
        count,
        level,
      });

      current.setDate(current.getDate() + 1);
    }
    weeks.push({ days });
  }

  return weeks;
}

/**
 * Format markdown for user README
 */
export function buildProfileMarkdown(profile: GitHubProfile): string {
  const techBadges = profile.readme.techStack
    ? profile.readme.techStack
        .map(
          (t) =>
            `![${t}](https://img.shields.io/badge/${encodeURIComponent(t)}-24292e?style=for-the-badge&logo=${encodeURIComponent(
              t.toLowerCase()
            )}&logoColor=white)`
        )
        .join(' ')
    : '';

  return `# ${profile.readme.greeting}

- 👀 **Interested in:** ${profile.readme.interestedIn}
- 🌱 **Currently learning:** ${profile.readme.learning}
- 💞️ **Looking to collaborate on:** ${profile.readme.collaborating}
- 📫 **How to reach me:** ${profile.readme.reachingOut}

---

### 📊 GitHub Stats
<p align="left">
  <a href="https://github.com/${profile.login}">
    <img src="${profile.readme.statsImage}" alt="${profile.name} Github Stats" />
  </a>
</p>

${
  techBadges
    ? `### 🛠 Tech Stack & Tools
<p align="left">
  ${techBadges}
</p>`
    : ''
}
`;
}
