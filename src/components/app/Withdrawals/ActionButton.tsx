import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  isSubmitting: boolean;
  amount: string;
  selectedMethod: "superCluster" | "dex";
  onWithdraw: () => Promise<void>;
  onConnect: () => Promise<void>;
}

export default function ActionButton({
  isConnected,
  isConnecting,
  isSubmitting,
  amount,
  selectedMethod,
  onWithdraw,
  onConnect,
}: ActionButtonProps) {
  return (
    <>
      {isConnected ? (
        <Button
          onClick={onWithdraw}
          disabled={
            isSubmitting ||
            !amount ||
            Number(amount.trim()) <= 0 ||
            selectedMethod !== "superCluster"
          }
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-lg rounded shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isSubmitting ? "Processing..." : "Request Withdrawal"}
        </Button>
      ) : (
        <Button
          onClick={onConnect}
          disabled={isConnecting}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-lg rounded shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </>
  );
}
