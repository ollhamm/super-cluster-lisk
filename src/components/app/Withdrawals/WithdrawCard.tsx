"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Clock,
  Zap,
  Wallet,
  FileText,
  Settings,
  CheckCircle2,
  Clock10Icon,
  Copy,
  Check,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WithdrawCardProps {
  amount: string;
  setAmount: (amount: string) => void;
  isConnected: boolean;
  isSubmitting: boolean;
  sTokenFormatted: string;
  selectedMethod: "superCluster" | "dex";
  setSelectedMethod: (method: "superCluster" | "dex") => void;
  handleMaxClick: () => void;
  address?: string;
  copied: boolean;
  handleCopyAddress: () => void;
  readyToClaimCount: number;
  pendingRequestsCount: number;
  totalClaimableAmount: string;
  children?: React.ReactNode;
}

export default function WithdrawCard({
  amount,
  setAmount,
  isConnected,
  isSubmitting,
  sTokenFormatted,
  selectedMethod,
  setSelectedMethod,
  handleMaxClick,
  address,
  copied,
  handleCopyAddress,
  readyToClaimCount,
  pendingRequestsCount,
  totalClaimableAmount,
  children,
}: WithdrawCardProps) {
  return (
    <div className="bg-white/10 border border-white/10 rounded p-8 backdrop-blur-sm mb-6">
      {/* amount */}
      <div className="mb-6">
        <label className="text-sm text-slate-300 mb-2 block">
          Amount to be withdrawn
        </label>
        <div className="relative">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded p-4 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Image
                src="/susdc.png"
                alt="sUSDC"
                width={48}
                height={48}
                className="flex-shrink-0 rounded-full"
              />
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!isConnected || isSubmitting}
                className="bg-transparent border-none text-3xl font-semibold focus-visible:ring-0 p-1 h-auto text-white placeholder:text-slate-600 min-w-0 disabled:opacity-60"
              />
            </div>
            <button
              onClick={handleMaxClick}
              disabled={!isConnected || isSubmitting}
              className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-400 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              MAX
            </button>
          </div>
        </div>
      </div>

      {/* method */}
      <div className="mb-6">
        <label className="text-sm text-slate-300 mb-3 block">
          Withdrawal method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedMethod("superCluster")}
            disabled={!isConnected || isSubmitting}
            className={`p-5 rounded border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedMethod === "superCluster"
                ? "border-blue-500 bg-blue-900/20"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">
                  superCluster Queue
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === "superCluster"
                    ? "border-blue-400"
                    : "border-slate-500"
                }`}
              >
                {selectedMethod === "superCluster" && (
                  <div className="w-2.5 h-2.5 bg-blue-400 rounded-full" />
                )}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Rate:</span>
                <span className="text-white font-medium">1 : 1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated duration:</span>
                <span className="text-white font-medium">3–10 days</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedMethod("dex")}
            disabled
            className="p-5 rounded border-2 border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold text-white">
                  DEX Instant (Coming Soon)
                </span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-500" />
            </div>
            <p className="text-sm text-slate-400">
              Instant swaps via DEX with third-party liquidity. This feature is
              not yet available.
            </p>
          </button>
        </div>
      </div>

      {isConnected && address && (
        <div className="mb-6 p-5 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-400 font-medium">
                  sUSDC balance
                </span>
              </div>
              <div className="text-2xl font-bold text-white">
                {sTokenFormatted} sUSDC
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium block">
                Wallet address
              </span>
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-2 text-sm font-mono text-white hover:text-blue-400 transition-colors group"
              >
                <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-400 font-medium">
                  My requests
                </span>
              </div>
              <TooltipProvider>
                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 cursor-help">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="text-2xl font-bold text-white">
                          {readyToClaimCount.toString().padStart(2, "0")}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 border-slate-700">
                      <p className="text-sm text-white font-medium">
                        Ready to claim
                      </p>
                      <p className="text-xs text-slate-400">
                        Complete the claim in the Claim tab
                      </p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="h-8 w-px bg-slate-600" />

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 cursor-help">
                        <Clock10Icon className="w-5 h-5 text-amber-400" />
                        <span className="text-2xl font-bold text-white">
                          {pendingRequestsCount.toString().padStart(2, "0")}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 border-slate-700">
                      <p className="text-sm text-white font-medium">Waiting</p>
                      <p className="text-xs text-slate-400">
                        In the operator queue
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-400 font-medium">
                  Total claimable
                </span>
              </div>
              <div className="text-2xl font-bold text-white">
                {totalClaimableAmount} USDC
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Button - Will be passed as children */}
      {children}
    </div>
  );
}
