import { Info } from "lucide-react";

export default function InfoBanner() {
  return (
    <div className="p-5 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white mb-1">
            How does the withdrawal process work?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            After the request is made, the operator will withdraw liquidity from
            the pilot and fund the Withdraw Manager contract. When the status
            changes to ready, you can make a claim to receive USDC.
          </p>
        </div>
      </div>
    </div>
  );
}
