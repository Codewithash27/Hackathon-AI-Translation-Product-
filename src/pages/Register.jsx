import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

export default function Register() {
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
            <span className="gradient-text">Join ClassSync</span>
          </h2>
          <p className="text-xs text-gray-600">Start your multilingual journey</p>
        </div>

        {/* Card - Compact */}
        <div className="premium-card-light py-6 px-6 animate-slide-in">
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Full Name"
              type="text"
              required
              placeholder="John Doe"
            />

            <Input
              label="Email"
              type="email"
              required
              placeholder="you@example.com"
            />

            <Select
              label="Role"
              required
              options={[
                { value: 'student', label: '👨‍🎓 Student' },
                { value: 'teacher', label: '👨‍🏫 Teacher' }
              ]}
            />

            <Input
              label="Password"
              type="password"
              required
              placeholder="Create password"
            />

            <Button 
              type="button" 
              className="w-full text-sm font-semibold py-2.5" 
              onClick={() => alert('Registration is mocked. Use demo login.')}
            >
              Create Account
            </Button>
          </form>

          {/* Footer - Compact */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
