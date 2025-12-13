"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { AlertTriangle, ExternalLink, Check, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

import { NETWORK_INFO } from "@/services/web3/contracts/addresses";
import { useWithdrawRequests } from "../hooks/withdrawRequest";
import { useWithdrawActions } from "../hooks/ActionWithdraw";
import { useWithdrawalBalances } from "@/hooks/useTokenBalance";

// Component imports
import WithdrawHeader from "@/components/app/Withdrawals/Header";
import TabSelector from "@/components/app/Withdrawals/TabSelector";
import WithdrawCard from "@/components/app/Withdrawals/WithdrawCard";
import ActionButton from "@/components/app/Withdrawals/ActionButton";
import TransactionInfo from "@/components/app/Withdrawals/TransactionInfo";
import InfoBanner from "@/components/app/Withdrawals/InfoBanner";
import RequestsList from "@/components/app/Withdrawals/RequestsList";
import FaqSidebar from "@/components/app/Withdrawals/FaqSidebar";

export default function WithdrawalsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"superCluster" | "dex">(
    "superCluster"
  );
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeTab = pathname === "/app/withdraw/claim" ? "claim" : "request";

  const { open } = useWeb3Modal();
  const { address, isConnected, isConnecting } = useAccount();

  // custom hooks
  const {
    usdcFormatted,
    sTokenFormatted,
    refetchAll: refetchBalances,
  } = useWithdrawalBalances();

  const {
    isLoading: isLoadingRequests,
    fetchRequests,
    readyToClaimCount,
    pendingRequestsCount,
    claimedCount,
    totalClaimableAmount,
    totalPendingAmount,
    displayRequests,
  } = useWithdrawRequests();

  const {
    requestWithdraw,
    isSubmitting,
    requestError,
    requestTxHash,
    latestRequestId,
    claimWithdraw,
    claimingId,
    claimError,
  } = useWithdrawActions();

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (activeTab === "claim" && address) {
      fetchRequests();
    }
  }, [activeTab, address, fetchRequests]);

  const handleTabChange = (tab: "request" | "claim") => {
    router.push(`/app/withdraw/${tab}`);
  };

  const handleMaxClick = () => {
    const numValue = parseFloat(sTokenFormatted || "0");
    setAmount(numValue.toFixed(4));
  };

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnect = async () => {
    try {
      await open();
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected) {
      await handleConnect();
      return;
    }

    if (selectedMethod !== "superCluster") {
      return;
    }

    const loadingToast = toast.loading("Waiting for wallet confirmation...");

    try {
      await requestWithdraw(amount);
      toast.success("Withdrawal request submitted successfully!", {
        id: loadingToast,
      });
      setAmount("");
      await Promise.all([fetchRequests(), refetchBalances()]);
    } catch (error) {
      console.error("Withdrawal error:", error);

      // Check if user rejected the transaction
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const isUserRejection =
        errorMessage.includes("User denied") ||
        errorMessage.includes("User rejected") ||
        errorMessage.includes("user rejected");

      if (isUserRejection) {
        // Silently dismiss the loading toast
        toast.dismiss(loadingToast);
      } else {
        // Show error toast for real errors
        toast.error(errorMessage || "Failed to submit withdrawal request", {
          id: loadingToast,
        });
      }
    }
  };
  const handleClaim = async (id: bigint) => {
    const loadingToast = toast.loading("Waiting for wallet confirmation...");

    try {
      await claimWithdraw(id);
      toast.success("USDC claimed successfully!", {
        id: loadingToast,
      });
      await Promise.all([fetchRequests(), refetchBalances()]);
    } catch (error) {
      console.error("Claim error:", error);

      // Check if user rejected the transaction
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const isUserRejection =
        errorMessage.includes("User denied") ||
        errorMessage.includes("User rejected") ||
        errorMessage.includes("user rejected");

      if (isUserRejection) {
        // Silently dismiss the loading toast
        toast.dismiss(loadingToast);
      } else {
        // Show error toast for real errors
        toast.error(errorMessage || "Failed to claim USDC", {
          id: loadingToast,
        });
      }
    }
  };

  const requestExplorerUrl =
    requestTxHash && NETWORK_INFO.explorer
      ? `${NETWORK_INFO.explorer}/tx/${requestTxHash}`
      : null;

  return (
    <div className="min-h-screen text-white pb-24">
      <div className="max-w-7xl mx-auto">
        <WithdrawHeader activeTab={activeTab} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === "request" ? (
              <>
                <WithdrawCard
                  amount={amount}
                  setAmount={setAmount}
                  isConnected={isConnected}
                  isSubmitting={isSubmitting}
                  sTokenFormatted={sTokenFormatted}
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  handleMaxClick={handleMaxClick}
                  address={address}
                  copied={copied}
                  handleCopyAddress={handleCopyAddress}
                  readyToClaimCount={readyToClaimCount}
                  pendingRequestsCount={pendingRequestsCount}
                  totalClaimableAmount={totalClaimableAmount}
                >
                  {requestError && (
                    <div className="mb-4 flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{requestError}</span>
                    </div>
                  )}

                  {latestRequestId && (
                    <div className="mb-4 flex items-start gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p>
                          Withdrawal request successfully created. Request ID:{" "}
                          <span className="font-semibold">
                            #{latestRequestId}
                          </span>
                        </p>
                        <p>
                          Monitor the status in the tab{" "}
                          <button
                            className="underline font-medium"
                            onClick={() => handleTabChange("claim")}
                          >
                            Claim
                          </button>
                          .
                        </p>
                      </div>
                    </div>
                  )}

                  {requestTxHash && requestExplorerUrl && (
                    <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
                      <ExternalLink className="w-4 h-4" />
                      <Link
                        href={requestExplorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-200"
                      >
                        View transactions in the explorer
                      </Link>
                    </div>
                  )}

                  <ActionButton
                    isConnected={isConnected}
                    isConnecting={isConnecting}
                    isSubmitting={isSubmitting}
                    amount={amount}
                    selectedMethod={selectedMethod}
                    onWithdraw={handleWithdraw}
                    onConnect={handleConnect}
                  />
                </WithdrawCard>

                <TransactionInfo />
                <InfoBanner />
              </>
            ) : isConnected ? (
              <RequestsList
                displayRequests={displayRequests}
                claimingId={claimingId}
                handleClaim={handleClaim}
                isLoadingRequests={isLoadingRequests}
                usdcFormatted={usdcFormatted}
                fetchRequests={fetchRequests}
                claimError={claimError}
                readyToClaimCount={readyToClaimCount}
                totalClaimableAmount={totalClaimableAmount}
                totalPendingAmount={totalPendingAmount}
                claimedCount={claimedCount}
              />
            ) : (
              <div className="bg-white/10 border border-white/10 rounded p-12 backdrop-blur-sm text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-500/20 rounded flex items-center justify-center">
                  <Wallet className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Connect Your Wallet
                </h3>
                <p className="text-slate-400 mb-8">
                  Connect your wallet to view and claim withdrawal requests
                </p>
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold h-12 px-8 rounded shadow-lg shadow-blue-500/25"
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              </div>
            )}
          </div>

          <FaqSidebar
            expandedFaq={expandedFaq}
            setExpandedFaq={setExpandedFaq}
          />
        </div>
      </div>
    </div>
  );
}
