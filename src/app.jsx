import React, { useState } from 'react';

export default function App() {
  const [currentUserRole, setCurrentUserRole] = useState('gifter');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paymentProof, setPaymentProof] = useState('');

  const activeReceiver = {
    name: "Sarah Jenkins",
    tier: "$100 Gifting Circle",
    paymentMethods: [
      { type: "Zelle / Phone", handle: "+1 (555) 019-2834" },
      { type: "Venmo", handle: "@Sarah-Jenkins-Official" },
      { type: "Bank Transfer", handle: "Chase Bank - Acct: ***4921" }
    ]
  };

  const handleMarkAsPaid = (e) => {
    e.preventDefault();
    if (!paymentProof) {
      alert("Please enter a transaction reference or note.");
      return;
    }
    setPaymentStatus('paid_unconfirmed');
  };

  const handleConfirmReceipt = () => {
    setPaymentStatus('completed');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-800 border-b border-slate-700 py-4 px-6 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-amber-400">Chosen Investment Club</h1>
          <p className="text-xs text-slate-400">Direct Mutual Gifting & Circle Rotation</p>
        </div>
        <div className="bg-slate-700 px-3 py-1 rounded-lg text-xs flex items-center space-x-2">
          <span className="text-slate-300">View as:</span>
          <select 
            value={currentUserRole} 
            onChange={(e) => setCurrentUserRole(e.target.value)}
            className="bg-slate-800 text-amber-300 rounded px-2 py-1 outline-none font-medium cursor-pointer"
          >
            <option value="gifter">Gifter (Sender)</option>
            <option value="receiver">Receiver (Target)</option>
          </select>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 space-y-6">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="bg-amber-400/10 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/20">
              Active Circle #104
            </span>
            <h2 className="text-2xl font-bold mt-2">{activeReceiver.tier}</h2>
            <p className="text-sm text-slate-300 mt-1">
              Current Recipient: <span className="font-semibold text-white">{activeReceiver.name}</span>
            </p>
          </div>
          <div className="bg-slate-900/60 px-4 py-3 rounded-xl border border-slate-700 text-right w-full md:w-auto">
            <div className="text-xs text-slate-400">Status Stage</div>
            <div className="text-sm font-bold capitalize text-amber-400">
              {paymentStatus === 'pending' && 'Awaiting Payment'}
              {paymentStatus === 'paid_unconfirmed' && 'Pending Confirmation'}
              {paymentStatus === 'completed' && 'Cycle Completed ✓'}
            </div>
          </div>
        </div>

        {currentUserRole === 'gifter' && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-3">
              Step 1: Send Your Direct Gift
            </h3>
            {paymentStatus === 'pending' ? (
              <div className="space-y-6">
                <p className="text-sm text-slate-300">
                  Please transfer funds directly to <strong className="text-white">{activeReceiver.name}</strong> using one of their preferred methods below. Once done, submit your transaction details.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeReceiver.paymentMethods.map((m, idx) => (
                    <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-amber-400 font-medium uppercase tracking-wider">{m.type}</span>
                        <p className="text-sm font-mono font-bold mt-1 text-slate-100 select-all">{m.handle}</p>
                      </div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(m.handle)}
                        className="mt-3 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-3 rounded border border-slate-600 transition"
                      >
                        Copy Handle
                      </button>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleMarkAsPaid} className="space-y-4 pt-4 border-t border-slate-700">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Transaction Reference / Note / Hash
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ref #982341" 
                      value={paymentProof}
                      onChange={(e) => setPaymentProof(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition shadow-lg"
                  >
                    I Have Sent Payment
                  </button>
                </form>
              </div>
            ) : paymentStatus === 'paid_unconfirmed' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">⏳</div>
                <h4 className="text-lg font-bold text-white">Payment Proof Submitted</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  We have notified <strong className="text-white">{activeReceiver.name}</strong>. Once they verify receipt, your status will update.
                </p>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h4 className="text-lg font-bold text-emerald-400">Gift Confirmed Successfully!</h4>
              </div>
            )}
          </div>
        )}

        {currentUserRole === 'receiver' && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-3">
              Step 2: Incoming Payment & Verification
            </h3>
            {paymentStatus === 'pending' ? (
              <div className="text-center py-8 space-y-3">
                <h4 className="font-semibold text-slate-200">Waiting for Gifter</h4>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  The assigned gifter has not yet marked their payment as sent.
                </p>
              </div>
            ) : paymentStatus === 'paid_unconfirmed' ? (
              <div className="space-y-6">
                <div className="bg-amber-400/15 border border-amber-400/30 p-4 rounded-xl">
                  <h4 className="font-bold text-amber-400 text-sm">Action Required: Verify External Account</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    A gifter claims they sent funds. Please check your account handles and confirm receipt.
                  </p>
                </div>
                <button 
                  onClick={handleConfirmReceipt}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl transition shadow-lg"
                >
                  Confirm Receipt of Funds ✓
                </button>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <h4 className="text-lg font-bold text-emerald-400">Payment Confirmed</h4>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
