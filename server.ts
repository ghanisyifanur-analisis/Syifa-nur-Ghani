import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// AI Route: Enhance GitHub Profile & README with High Thinking mode (gemini-4-argon)
app.post('/api/ai/enhance-readme', async (req, res) => {
  const { profileName, currentBio, focusAreas, techStack, style } = req.body;

  const demoEnhanced = {
    greeting: `👋 Hi, I’m @${profileName || 'ghanisyifanur-analisis'}`,
    interestedIn:
      'Full Stack Web Development (Laravel, React), Cross-Platform Mobile Apps (Flutter), and High-Performance Cloud Architecture',
    learning:
      'Next.js 15, Advanced Flutter State Management (Bloc/Riverpod), Distributed Microservices & AI Engineering',
    collaborating:
      'High-Impact Web Applications, Scalable Fintech / Business Systems, Open Source Software and Automation Tools',
    reachingOut:
      'ghanisyifanur@gmail.com | Portfolio: sahir.my.id / rizqighaniadinat.my.id | Location: Bekasi, Jawa Barat',
    suggestedBio:
      'Full Stack & Mobile Developer | Building robust web architectures and seamless mobile experiences with Laravel, Flutter & TypeScript',
    techStack: ['Laravel', 'Flutter', 'TypeScript', 'React', 'PHP', 'Node.js', 'MySQL', 'Docker', 'TailwindCSS'],
  };

  if (!ai) {
    return res.json({
      success: true,
      isDemo: true,
      enhancedReadme: demoEnhanced,
    });
  }

  const prompt = `You are a world-class GitHub profile architect and senior software engineer.
Analyze and generate an elite, professional, and authentic GitHub Profile README and bio tailored for:
Username: ${profileName || 'ghanisyifanur-analisis'}
Current Bio: ${currentBio || 'Full Stack & Mobile Developer | Data & System Analyst'}
Focus Areas: ${focusAreas || 'Full Stack Web, Flutter, Mobile, REST APIs, System Analysis'}
Tech Stack: ${techStack || 'Laravel, Flutter, PHP, Dart, TypeScript, React, MySQL'}
Target Style: ${style || 'Professional and clean, identical to top-tier developer showcases like @maoneart'}

Format requirements (strict JSON):
{
  "greeting": "👋 Hi, I’m @...",
  "interestedIn": "bullet text",
  "learning": "bullet text",
  "collaborating": "bullet text",
  "reachingOut": "bullet text",
  "suggestedBio": "concise profile sidebar bio under 160 characters",
  "techStack": ["array", "of", "technologies"]
}`;

  try {
    // Helper with timeout to prevent hanging on slow reasoning models
    const callWithTimeout = async (promise: Promise<any>, timeoutMs: number) => {
      let timeoutHandle: any;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutHandle = setTimeout(() => reject(new Error('Model reasoning timed out')), timeoutMs);
      });
      return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutHandle));
    };

    let responseText = '';

    try {
      // Primary: gemini-4-argon with thinkingLevel: ThinkingLevel.HIGH
      const argonPromise = ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          responseMimeType: 'application/json',
          systemInstruction:
            'You are a senior tech profile consultant. Provide compelling, precise, and authentic GitHub profile content formatted strictly as valid JSON.',
        },
      });
      const response = await callWithTimeout(argonPromise, 8000);
      responseText = response.text || '';
    } catch (argonErr: any) {
      console.warn('gemini-4-argon call failed or timed out; falling back to gemini-3.8-flash:', argonErr?.message);
      
      const flashPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          responseMimeType: 'application/json',
          systemInstruction:
            'You are a senior tech profile consultant. Provide compelling, precise, and authentic GitHub profile content formatted strictly as valid JSON.',
        },
      });
      const fallbackResponse = await callWithTimeout(flashPromise, 6000);
      responseText = fallbackResponse.text || '';
    }

    const parsed = JSON.parse(responseText.trim());
    return res.json({
      success: true,
      enhancedReadme: parsed,
    });
  } catch (error: any) {
    console.warn('Falling back to curated enhanced profile:', error?.message);
    return res.json({
      success: true,
      isFallback: true,
      enhancedReadme: demoEnhanced,
    });
  }
});

// AI Route: Senior Data Science & MLOps Advisor with High Thinking mode
app.post('/api/ai/data-science-advisor', async (req, res) => {
  const { query, topic, datasetName, modelName } = req.body;

  const defaultAdvisorResponse = {
    title: `Senior Data Science Architecture & Analysis: ${topic || 'Model & Statistical Diagnosis'}`,
    executiveSummary:
      `Rigorous statistical evaluation of ${datasetName || 'Enterprise Telemetry'} indicates high predictive viability. Model latency remains within sub-15ms p95 targets, while PR-AUC is optimized for class-imbalanced decision boundaries.`,
    technicalInsights: [
      {
        heading: 'Model Generalization & Regularization',
        detail:
          'Tree-depth and column subsampling (colsample_bytree = 0.82) effectively prevent leaf-level overfitting. To preserve calibration across probability tails, isotonic regression or Platt scaling should be validated on the holdout fold.',
      },
      {
        heading: 'Drift & Population Stability (PSI)',
        detail:
          'Continuous telemetry monitoring tracks covariate drift using Population Stability Index (PSI). A threshold alert is calibrated at PSI >= 0.20 to initiate automated retraining with warm-started weights.',
      },
      {
        heading: 'A/B Experimentation Guardrails',
        detail:
          'Before 100% production rollout, execute a 2-week canary A/B test with 10% traffic allocation. Apply CUPED variance reduction using pre-experiment 30-day activity features to reduce required sample size by ~35%.',
      },
    ],
    recommendedActions: [
      'Enable Triton Inference dynamic batching (max_batch_size: 64) for peak throughput efficiency.',
      'Log SHAP tree explainer feature contributions into Feast Feature Store for auditability.',
      'Deploy Evidently AI statistical drift monitors with automated Slack/PagerDuty Webhook alerts.',
    ],
    codeSnippet: `# Production Canary Rollout & Evaluation
import numpy as np
from sklearn.metrics import brier_score_loss, roc_auc_score

def evaluate_production_canary(y_true, y_prob_prod, y_prob_challenger):
    prod_auc = roc_auc_score(y_true, y_prob_prod)
    challenger_auc = roc_auc_score(y_true, y_prob_challenger)
    brier_prod = brier_score_loss(y_true, y_prob_prod)
    brier_challenger = brier_score_loss(y_true, y_prob_challenger)
    
    return {
        "prod_auc": round(prod_auc, 4),
        "challenger_auc": round(challenger_auc, 4),
        "brier_diff": round(brier_prod - brier_challenger, 4),
        "promote_challenger": challenger_auc > prod_auc and brier_challenger <= brier_prod
    }`,
  };

  if (!ai) {
    return res.json({
      success: true,
      isDemo: true,
      advice: defaultAdvisorResponse,
    });
  }

  const prompt = `You are a Principal / Senior Data Scientist and MLOps Architect at a top-tier tech enterprise.
Provide deep, rigorous, and statistically sound technical guidance for:
User Query: ${query || 'How to optimize model deployment and statistical experimentation?'}
Topic Focus: ${topic || 'Predictive Modeling & Statistical Inference'}
Target Dataset: ${datasetName || 'Enterprise Telemetry & Churn'}
Reference Model: ${modelName || 'LightGBM / XGBoost'}

Provide your response in strict JSON:
{
  "title": "Concise Executive Title",
  "executiveSummary": "Concise high-level summary for engineering leads & stakeholders (2-3 sentences)",
  "technicalInsights": [
    {
      "heading": "Insight Heading",
      "detail": "Deep technical explanation with specific metrics, statistical reasoning, or architectural patterns"
    }
  ],
  "recommendedActions": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2",
    "Specific actionable recommendation 3"
  ],
  "codeSnippet": "Production-grade Python/PySpark/SQL snippet relevant to the inquiry"
}`;

  try {
    const callWithTimeout = async (promise: Promise<any>, timeoutMs: number) => {
      let timeoutHandle: any;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutHandle = setTimeout(() => reject(new Error('Model reasoning timed out')), timeoutMs);
      });
      return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutHandle));
    };

    let responseText = '';
    try {
      const argonPromise = ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
          responseMimeType: 'application/json',
          systemInstruction:
            'You are a Principal Data Scientist and Machine Learning Systems Architect. Respond with elite statistical precision and production-grade engineering practices strictly formatted as JSON.',
        },
      });
      const response = await callWithTimeout(argonPromise, 8000);
      responseText = response.text || '';
    } catch (argonErr: any) {
      console.warn('gemini-4-argon call failed or timed out; falling back to gemini-3.8-flash:', argonErr?.message);
      const flashPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
          responseMimeType: 'application/json',
          systemInstruction:
            'You are a Principal Data Scientist and Machine Learning Systems Architect. Respond with elite statistical precision and production-grade engineering practices strictly formatted as JSON.',
        },
      });
      const fallbackResponse = await callWithTimeout(flashPromise, 6000);
      responseText = fallbackResponse.text || '';
    }

    const parsed = JSON.parse(responseText.trim());
    return res.json({
      success: true,
      advice: parsed,
    });
  } catch (error: any) {
    console.warn('Falling back to curated senior data science advice:', error?.message);
    return res.json({
      success: true,
      isFallback: true,
      advice: defaultAdvisorResponse,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
