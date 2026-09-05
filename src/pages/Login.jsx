import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import ErrorMessage from '../components/ErrorMessage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'teacher') {
      setEmail('teacher@classsync.com');
      setPassword('teacher123');
    } else {
      setEmail('student@classsync.com');
      setPassword('student123');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-50 to-blue-50 flex items-center justify-center px-4 py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Header - Compact */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 mb-3">
            <span className="text-xl font-bold text-white">CS</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">
            <span className="gradient-text">ClassSync</span>
          </h2>
          <p className="text-xs text-gray-600">One Class. Five Languages.</p>
        </div>

        {/* Card - Compact */}
        <div className="premium-card-light py-6 px-6 animate-slide-in">
          
          <ErrorMessage message={error} />

          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-2 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-700 font-medium">
                Remember me
              </label>
            </div>

            <Button type="submit" className="w-full text-sm font-semibold py-2.5" isLoading={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Section - Inline */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-600 font-medium mb-3 uppercase tracking-wide">Quick Demo</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => handleDemoLogin('teacher')}
                className="text-xs font-semibold py-2"
              >
                👨‍🏫 Teacher
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => handleDemoLogin('student')}
                className="text-xs font-semibold py-2"
              >
                👨‍🎓 Student
              </Button>
            </div>
          </div>
          
          {/* Footer - Compact */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
