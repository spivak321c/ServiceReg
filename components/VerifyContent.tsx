'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  if (!email) {
    return (
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6">
        <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center mx-auto">
          <XCircle className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white mb-2">Invalid Ticket</h1>
          <p className="text-slate-400">No registration details found in this QR code.</p>
        </div>
        <Link 
          href="/"
          className="inline-flex items-center justify-center w-full h-14 bg-white text-black font-bold rounded-2xl hover:bg-indigo-50 transition-colors shadow-xl"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6">
      <div className="w-16 h-16 bg-indigo-500/20 text-indigo-300 rounded-xl flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-white mb-2">Verified!</h1>
        <p className="text-slate-400">
          Registration confirmed for:
          <br />
          <span className="font-medium text-white mt-2 block">{email}</span>
        </p>
      </div>
      <div className="pt-6 border-t border-white/10">
        <Link 
          href="/"
          className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          Register another guest
        </Link>
      </div>
    </div>
  );
}
