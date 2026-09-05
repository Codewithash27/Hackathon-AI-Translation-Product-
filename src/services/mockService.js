/**
 * Mock Service Layer
 * -----------------
 * All functions simulate API calls using local mock data.
 * Replace this file with real API calls when a backend is available.
 */

import { classes } from '../data/classes';
import { subjects } from '../data/subjects';
import { chapters } from '../data/chapters';
import { lessons as lessonsData } from '../data/lessons';
import { translations as translationsData } from '../data/translations';
import { terminology as terminologyData } from '../data/terminology';
import { languages } from '../data/languages';
import { users } from '../data/users';

// Simulate network delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Mutable copies so local state changes persist during session ──
const getLocalData = (key, defaultData) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultData;
};

const saveLocalData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

let _lessons = getLocalData('b4one_lessons', [...lessonsData]);
let _translations = getLocalData('b4one_translations', [...translationsData]);
let _terminology = getLocalData('b4one_terminology', [...terminologyData]);

let _nextLessonId = Math.max(0, ..._lessons.map(l => l.id)) + 1;
let _nextTranslationId = Math.max(0, ..._translations.map(t => t.id)) + 1;
let _nextTerminologyId = Math.max(0, ..._terminology.map(t => t.id)) + 1;

// ── Auth ──
export async function loginUser(email, password) {
  await delay(500);
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  const { password: _, ...safeUser } = user;
  return safeUser;
}

// ── Classes ──
export async function getClasses() {
  await delay();
  return classes;
}

export async function getClassById(id) {
  await delay();
  return classes.find((c) => c.id === Number(id)) || null;
}

// ── Subjects ──
export async function getSubjects(classId) {
  await delay();
  if (classId) return subjects.filter((s) => s.classId === Number(classId));
  return subjects;
}

export async function getSubjectById(id) {
  await delay();
  return subjects.find((s) => s.id === Number(id)) || null;
}

// ── Chapters ──
export async function getChapters(subjectId) {
  await delay();
  if (subjectId) return chapters.filter((c) => c.subjectId === Number(subjectId));
  return chapters;
}

export async function getChapterById(id) {
  await delay();
  return chapters.find((c) => c.id === Number(id)) || null;
}

// ── Lessons ──
export async function getLessons(filters = {}) {
  await delay();
  let result = [..._lessons];
  if (filters.chapterId) result = result.filter((l) => l.chapterId === Number(filters.chapterId));
  if (filters.subjectId) result = result.filter((l) => l.subjectId === Number(filters.subjectId));
  if (filters.classId) result = result.filter((l) => l.classId === Number(filters.classId));
  if (filters.status) result = result.filter((l) => l.status === filters.status);
  return result;
}

export async function getLessonById(id) {
  await delay();
  return _lessons.find((l) => l.id === Number(id)) || null;
}

export async function createLesson(lessonData) {
  await delay(600);
  const newLesson = {
    id: _nextLessonId++,
    ...lessonData,
    status: 'Draft',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };
  _lessons.push(newLesson);
  saveLocalData('b4one_lessons', _lessons);
  return newLesson;
}

export async function updateLesson(id, updates) {
  await delay(400);
  const idx = _lessons.findIndex((l) => l.id === Number(id));
  if (idx === -1) throw new Error('Lesson not found');
  _lessons[idx] = { ..._lessons[idx], ...updates, updatedAt: new Date().toISOString().split('T')[0] };
  saveLocalData('b4one_lessons', _lessons);
  return _lessons[idx];
}

// ── Translations ──
export async function getTranslations(lessonId) {
  await delay();
  if (lessonId) return _translations.filter((t) => t.lessonId === Number(lessonId));
  return _translations;
}

export async function getTranslationById(id) {
  await delay();
  return _translations.find((t) => t.id === Number(id)) || null;
}

/**
 * Simulate AI translation generation.
 * In production, replace with a real API call to an AI translation service.
 */
export async function generateTranslation(lessonId, languageCode) {
  // Simulate AI processing time
  await delay(1500);

  const lesson = _lessons.find((l) => l.id === Number(lessonId));
  if (!lesson) throw new Error('Lesson not found');

  const lang = languages.find((l) => l.code === languageCode);
  if (!lang) throw new Error('Language not supported');

  // Check if translation already exists
  const existing = _translations.find(
    (t) => t.lessonId === Number(lessonId) && t.language === languageCode
  );
  if (existing) return existing;

  // Generate mock translation
  const mockTranslations = {
    mr: {
      titlePrefix: '',
      titleSuffix: ' (मराठी अनुवाद)',
      contentPrefix: '[मराठी] ',
    },
    hi: {
      titlePrefix: '',
      titleSuffix: ' (हिन्दी अनुवाद)',
      contentPrefix: '[हिन्दी] ',
    },
    gu: {
      titlePrefix: '',
      titleSuffix: ' (ગુજરાતી અનુવાદ)',
      contentPrefix: '[ગુજરાતી] ',
    },
    ta: {
      titlePrefix: '',
      titleSuffix: ' (தமிழ் மொழிபெயர்ப்பு)',
      contentPrefix: '[தமிழ்] ',
    },
  };

  const mt = mockTranslations[languageCode];
  const newTranslation = {
    id: _nextTranslationId++,
    lessonId: Number(lessonId),
    language: languageCode,
    translatedTitle: `${lesson.title}${mt.titleSuffix}`,
    translatedContent: `${mt.contentPrefix}${lesson.content}`,
    status: 'Generated',
    validated: false,
    terminologyIssues: ['Auto-generated — needs terminology review'],
    createdAt: new Date().toISOString().split('T')[0],
  };

  _translations.push(newTranslation);
  saveLocalData('b4one_translations', _translations);
  return newTranslation;
}

export async function validateTerminology(translationId) {
  await delay(800);
  const idx = _translations.findIndex((t) => t.id === Number(translationId));
  if (idx === -1) throw new Error('Translation not found');

  // Simulate terminology validation
  const hasIssues = Math.random() > 0.7;
  _translations[idx] = {
    ..._translations[idx],
    validated: !hasIssues,
    terminologyIssues: hasIssues
      ? ['Some terms may need manual review']
      : [],
  };
  saveLocalData('b4one_translations', _translations);
  return _translations[idx];
}

export async function reviewTranslation(translationId) {
  await delay(500);
  const idx = _translations.findIndex((t) => t.id === Number(translationId));
  if (idx === -1) throw new Error('Translation not found');
  _translations[idx] = {
    ..._translations[idx],
    status: 'Reviewed',
    validated: true,
    terminologyIssues: [],
  };
  saveLocalData('b4one_translations', _translations);
  return _translations[idx];
}

export async function publishTranslation(translationId) {
  await delay(500);
  const idx = _translations.findIndex((t) => t.id === Number(translationId));
  if (idx === -1) throw new Error('Translation not found');
  _translations[idx] = {
    ..._translations[idx],
    status: 'Published',
  };
  saveLocalData('b4one_translations', _translations);
  return _translations[idx];
}

// ── Terminology ──
export async function getTerminology(filters = {}) {
  await delay();
  let result = [..._terminology];
  if (filters.subject) result = result.filter((t) => t.subject === filters.subject);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.englishTerm.toLowerCase().includes(q) ||
        Object.values(t.translations).some((tr) => tr.term.toLowerCase().includes(q))
    );
  }
  return result;
}

// ── Languages ──
export async function getLanguages() {
  await delay(100);
  return languages;
}

// ── Dashboard Stats ──
export async function getDashboardStats(role) {
  await delay(400);
  const allTranslations = _translations;
  if (role === 'Teacher') {
    return {
      totalClasses: classes.length,
      totalSubjects: subjects.length,
      totalLessons: _lessons.length,
      translationsGenerated: allTranslations.length,
      pendingReview: allTranslations.filter((t) => t.status === 'Generated' || t.status === 'Reviewed').length,
      published: allTranslations.filter((t) => t.status === 'Published').length,
      recentActivity: [
        { id: 1, action: 'Published Hindi translation', target: 'Introduction to Rational Numbers', time: '2 hours ago', icon: '🌐' },
        { id: 2, action: 'Created new lesson', target: 'Properties of Rational Numbers', time: '5 hours ago', icon: '📝' },
        { id: 3, action: 'Reviewed Marathi translation', target: 'Force and Pressure', time: '1 day ago', icon: '✅' },
        { id: 4, action: 'Generated Tamil translation', target: 'Linear Equations', time: '1 day ago', icon: '🤖' },
        { id: 5, action: 'Validated terminology', target: 'Science Chapter 3', time: '2 days ago', icon: '🔍' },
      ],
    };
  }
  return {
    availableClasses: classes.length,
    totalSubjects: subjects.length,
    publishedLessons: _lessons.filter((l) => l.status === 'Published').length,
    currentLanguage: 'English',
    recentActivity: [
      { id: 1, action: 'Read lesson', target: 'Introduction to Rational Numbers', time: '1 hour ago', icon: '📖' },
      { id: 2, action: 'Switched language', target: 'Hindi', time: '2 hours ago', icon: '🌐' },
      { id: 3, action: 'Completed chapter', target: 'Rational Numbers', time: '1 day ago', icon: '🎯' },
    ],
  };
}
