import { Suspense } from 'react';
import VerifyContent from '@/components/VerifyContent';

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-[#0c0e14] text-white flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30 font-sans overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={<div className="text-slate-500 text-center">Loading verification...</div>}>
          <VerifyContent />
        </Suspense>
      </div>
    </div>
  );
}
