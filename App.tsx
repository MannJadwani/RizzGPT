import React, { useState, useRef } from 'react';
import { RizzMode } from './types';
import { generateGenericLine, generateChatReply, generateScreenshotReply } from './services/geminiService';
import AIButton from './components/AIButton';
import ModeToggle from './components/ModeToggle';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [mode, setMode] = useState<RizzMode>(RizzMode.GENERIC);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [chatInput, setChatInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(''); // Clear previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    try {
      let output = '';
      if (mode === RizzMode.GENERIC) {
        output = await generateGenericLine();
      } else if (mode === RizzMode.CHAT_HISTORY) {
        if (!chatInput.trim()) {
            output = "Please paste some chat history first!";
        } else {
            output = await generateChatReply(chatInput);
        }
      } else if (mode === RizzMode.SCREENSHOT) {
        if (!selectedImage) {
            output = "Please upload a screenshot first!";
        } else {
            output = await generateScreenshotReply(selectedImage);
        }
      }
      setResult(output);
    } catch (error) {
      setResult("Oops! My rizz machine broke. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    switch (mode) {
        case RizzMode.CHAT_HISTORY: return "Generate Reply";
        case RizzMode.SCREENSHOT: return "Analyze & Reply";
        default: return "Generate Rizz";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 font-sans text-slate-800" role="main">
      
      {/* Header Section */}
      <header className="text-center mb-10 w-full max-w-2xl mx-auto">
        <p className="text-gray-500 font-medium uppercase tracking-widest text-xs mb-4">
          AI Dating Assistant
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 mb-2">
          RizzGPT
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
           Your charming AI wingman for perfectly crafted replies.
        </p>
      </header>

      {/* Main Card */}
      <main className="w-full max-w-md mx-auto z-10">
        <ModeToggle currentMode={mode} setMode={(m) => {
            setMode(m);
            setResult('');
            setSelectedImage(null);
            setChatInput('');
        }} />

        {/* Input Areas */}
        <div className="min-h-[120px] transition-all duration-300">
            {mode === RizzMode.GENERIC && (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400 italic">
                    <p>Press the button to generate instant charm.</p>
                </div>
            )}

            {mode === RizzMode.CHAT_HISTORY && (
                <textarea
                    className="w-full h-32 p-4 rounded-3xl border border-gray-200 bg-white/60 focus:bg-white focus:ring-2 focus:ring-violet-500/50 focus:outline-none resize-none shadow-sm transition-all placeholder:text-gray-400 text-gray-700"
                    placeholder="Paste the conversation here..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    aria-label="Chat history input for AI reply generation"
                />
            )}

            {mode === RizzMode.SCREENSHOT && (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                        w-full h-48 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all
                        ${selectedImage ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-violet-400 bg-white/40 hover:bg-white/60'}
                    `}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden"
                        aria-label="Upload screenshot for AI analysis"
                    />
                    
                    {selectedImage ? (
                        <div className="relative w-full h-full p-2">
                            <img 
                                src={selectedImage} 
                                alt="Uploaded screenshot preview for AI analysis" 
                                className="w-full h-full object-cover rounded-2xl opacity-90" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl opacity-0 hover:opacity-100 transition">
                                <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur">Change Image</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            </div>
                            <p className="text-sm font-semibold text-gray-600">Upload Screenshot</p>
                            <p className="text-xs text-gray-400 mt-1">Tap to browse</p>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Action Button */}
        <AIButton 
            onClick={handleGenerate} 
            isLoading={loading} 
            text={getButtonText()} 
        />

        {/* Results */}
        <ResultCard text={result} />
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="fixed top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed -bottom-8 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>
      
    </div>
  );
};

export default App;