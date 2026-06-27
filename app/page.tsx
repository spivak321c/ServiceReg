'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mockQrCode, setMockQrCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');
    setMockQrCode(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (data.mocked && data.qrCode) {
        setMockQrCode(data.qrCode);
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  const resetForm = () => {
    setEmail('');
    setStatus('idle');
    setMockQrCode(null);
  };

  return (
    <main className="min-h-screen bg-[#0c0e14] text-white flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30 font-sans overflow-hidden relative">
      {/* Mesh Gradient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-blue-500/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full backdrop-blur-lg border border-white/20 flex items-center justify-center mb-8 text-indigo-400">
                  <Ticket className="w-6 h-6" />
                </div>
                
                <h1 className="text-3xl font-semibold tracking-tight mb-2">Register</h1>
                <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                  Enter your email to secure your spot. We'll send a unique QR code ticket straight to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest opacity-60 ml-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full pl-12 pr-6 h-14 bg-black/20 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        required
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-fuchsia-400 text-sm font-medium"
                    >
                      {errorMessage}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full h-14 bg-white text-black font-bold rounded-2xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 group shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        Get Ticket
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-indigo-500/20 text-indigo-300 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-semibold tracking-tight mb-2">You're on the list!</h2>
                
                {mockQrCode ? (
                  <div className="mt-8 mb-6 flex flex-col items-center">
                    <p className="text-sm text-slate-400 mb-4 bg-black/20 p-4 rounded-2xl border border-white/10 text-left">
                      <span className="font-semibold block mb-1 text-white">Developer Mode</span>
                      No RESEND_API_KEY detected in environment. Here is your generated ticket preview:
                    </p>
                    <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-3xl shadow-lg backdrop-blur-md">
                      <Image 
                        src={mockQrCode} 
                        alt="Your QR Code Ticket" 
                        width={200} 
                        height={200}
                        className="rounded-xl"
                        unoptimized
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 mb-8 leading-relaxed mt-4">
                    We've sent your unique QR code ticket to <br/><span className="font-medium text-white">{email}</span>. <br/>Please have it ready at the entrance.
                  </p>
                )}

                <button
                  onClick={resetForm}
                  className="mt-4 text-sm font-medium text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Register another person
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <p className="text-center text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium mt-8">
          Powered by Minimalist Events
        </p>
      </div>
    </main>
  );
}
