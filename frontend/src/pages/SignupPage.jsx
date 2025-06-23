import AuthForm from '../components/AuthForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#89a9d8]">
      <div className="bg-white shadow-md rounded-md px-8 py-10 w-full max-w-sm relative">

        {/* Top Right Dots */}
        <div className="absolute top-2 right-2 space-y-0.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-0.5">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-[3px] h-[3px] bg-blue-600 rounded-full" />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Left Dots */}
        <div className="absolute bottom-2 left-2 space-y-0.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-0.5">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-[3px] h-[3px] bg-blue-600 rounded-full" />
              ))}
            </div>
          ))}
        </div>

        {/* Logo and App Name */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="logo" className="w-8 h-8 mb-2" />
          <h1 className="text-xl text-black font-medium">DirectLink</h1>
        </div>

        <AuthForm />
      </div>
    </div>
  );
}
