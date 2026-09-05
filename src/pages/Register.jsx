import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          B4One <span className="text-indigo-600 font-light">Class</span>
        </h2>
        <h3 className="mt-4 text-xl font-bold text-gray-900">Create your account</h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-xl sm:px-10 animate-slide-in">
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                { value: 'student', label: 'Student' },
                { value: 'teacher', label: 'Teacher' }
              ]}
            />

            <Input
              label="Password"
              type="password"
              required
              placeholder="Create a password"
            />

            <Button type="button" className="w-full" onClick={() => alert('Registration is mocked in this demo. Use demo login.')}>
              Register
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
