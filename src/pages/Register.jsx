import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

export default function Register() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30">
            <span className="text-2xl font-bold text-white">B4</span>
          </div>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
          <span className="gradient-text">Create Account</span>
        </h2>
        <p className="mt-3 text-lg text-gray-700 font-semibold">
          Join B4One Class Today
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Start teaching or learning in multiple languages
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="premium-card-light py-8 px-6 sm:px-10 animate-slide-in">
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Full Name"
              type="text"
              required
              placeholder="John Doe"
            />

            <Input
              label="Email address"
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
              placeholder="Create a password"
            />

            <Button 
              type="button" 
              className="w-full text-base font-semibold py-2.5" 
              onClick={() => alert('Registration is mocked in this demo. Use demo login.')}
            >
              Register
            </Button>
          </form>

          <div className="mt-7 text-center">
            <p className="text-sm text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
