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
      setEmail('teacher@b4one.com');
      setPassword('teacher123');
    } else {
      setEmail('student@b4one.com');
      setPassword('student123');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          B4One <span className="text-indigo-600 font-light">Class</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          One Class. Five Languages.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Teach once. Learn anywhere.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-xl sm:px-10 animate-slide-in">
          
          <ErrorMessage message={error} />

          <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full" isLoading={loading}>
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => handleDemoLogin('teacher')}
                className="text-xs sm:text-sm"
              >
                Login as Teacher
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => handleDemoLogin('student')}
                className="text-xs sm:text-sm"
              >
                Login as Student
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
