import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import WandIcon from './icons/WandIcon';
import CodeIcon from './icons/CodeIcon';
import DownloadIcon from './icons/DownloadIcon';

interface LandingPageProps {
  onLogin: () => void; // This will be used for both login and signup for now
}

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-gray-800 p-3 rounded-full border border-gray-700">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-gray-50">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased overflow-y-auto" style={{background: 'radial-gradient(ellipse at top, #1e293b, #09090b)'}}>
      <header className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <SparklesIcon className="w-8 h-8 text-indigo-400" />
             <span className="text-xl font-bold tracking-wider">CodeCraft AI</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onLogin} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={onLogin} className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-lg hover:bg-indigo-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-indigo-500">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 text-center">
        {/* Hero Section */}
        <section className="pt-40 pb-24">
          <div className="inline-block bg-purple-500/10 text-purple-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-purple-500/20">
            Powered by Gemini AI
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Turn Your Game Ideas Into Reality. <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">Instantly.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            CodeCraft AI empowers you to prototype and build complete HTML5 games using natural language. No complex setup, just pure creativity.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
             <button
              onClick={onLogin}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-indigo-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-indigo-500"
            >
              Start Crafting for Free
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why You'll Love CodeCraft AI</h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto">From instant generation to one-click export, we've built the tools you need to bring ideas to life faster than ever.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<WandIcon className="w-6 h-6 text-green-400"/>} title="Describe & Generate">
              Simply type out your game concept. From "a classic Snake game" to "a top-down space shooter", the only limit is your imagination.
            </FeatureCard>
            <FeatureCard icon={<CodeIcon className="w-6 h-6 text-blue-400"/>} title="Preview & Edit">
              Instantly playtest your game in the browser. Tweak the generated HTML, CSS, and JavaScript to perfect your creation.
            </FeatureCard>
            <FeatureCard icon={<DownloadIcon className="w-6 h-6 text-orange-400"/>} title="Export & Share">
              Download your game as a single, self-contained HTML file. It's ready to be hosted anywhere or shared with friends.
            </FeatureCard>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">From Idea to Game in 3 Simple Steps</h2>
            <div className="relative">
                {/* Dotted line for desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-repeat-x" style={{backgroundImage: 'linear-gradient(to right, #4f46e5 40%, transparent 50%)', backgroundSize: '20px 1px'}}></div>
                
                <div className="grid md:grid-cols-3 gap-12 relative">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-800 border-2 border-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-400 mb-6 z-10">1</div>
                        <h3 className="font-bold text-xl mb-2">Describe Your Vision</h3>
                        <p className="text-gray-400">Write a prompt describing the game you want to create. Be as simple or detailed as you like.</p>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="w-16 h-16 bg-gray-800 border-2 border-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-400 mb-6 z-10">2</div>
                        <h3 className="font-bold text-xl mb-2">Instant Generation</h3>
                        <p className="text-gray-400">Our AI analyzes your prompt and generates the complete code for your game in seconds.</p>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="w-16 h-16 bg-gray-800 border-2 border-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-400 mb-6 z-10">3</div>
                        <h3 className="font-bold text-xl mb-2">Play, Tweak & Export</h3>
                        <p className="text-gray-400">Test your game, edit the code live, and download your creation as a single file.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to Build Your Masterpiece?</h2>
             <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Sign up now and start creating your first AI-generated game in under a minute. It's free to get started.</p>
             <button
              onClick={onLogin}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-indigo-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-indigo-500"
            >
              Sign Up and Start Crafting
            </button>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CodeCraft AI. All Rights Reserved.</p>
      </footer>

      {/* Adding some keyframe animations for the hero section */}
      <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0; /* Start hidden */
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
