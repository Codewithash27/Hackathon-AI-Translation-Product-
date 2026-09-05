import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Classes from './pages/Classes';
import ClassDetails from './pages/ClassDetails';
import SubjectDetails from './pages/SubjectDetails';
import ChapterDetails from './pages/ChapterDetails';
import Lessons from './pages/Lessons';
import CreateLesson from './pages/CreateLesson';
import LessonDetails from './pages/LessonDetails';
import Translations from './pages/Translations';
import TranslationsDashboard from './pages/TranslationsDashboard';
import Terminology from './pages/Terminology';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Dashboard Routes */}
          <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/classes" element={<Classes />} />
            <Route path="/classes/:classId" element={<ClassDetails />} />
            
            <Route path="/subjects/:subjectId" element={<SubjectDetails />} />
            
            <Route path="/chapters/:chapterId" element={<ChapterDetails />} />
            
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:lessonId" element={<LessonDetails />} />
            
            {/* Teacher Only Routes */}
            <Route path="/lessons/create" element={
              <ProtectedRoute requiredRole="Teacher">
                <CreateLesson />
              </ProtectedRoute>
            } />
            
            <Route path="/lessons/:lessonId/translations" element={
              <ProtectedRoute requiredRole="Teacher">
                <Translations />
              </ProtectedRoute>
            } />
            
            <Route path="/translations" element={
              <ProtectedRoute requiredRole="Teacher">
                <TranslationsDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/terminology" element={
              <ProtectedRoute requiredRole="Teacher">
                <Terminology />
              </ProtectedRoute>
            } />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
