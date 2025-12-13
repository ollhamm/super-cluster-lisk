interface WithdrawHeaderProps {
  activeTab: string;
}

export default function WithdrawHeader({ activeTab }: WithdrawHeaderProps) {
  return (
    <div className="text-center mb-12 relative">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
          {activeTab === "claim" ? "Claim Withdrawals" : "Request Withdrawals"}
        </span>
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mx-auto">
        {activeTab === "claim"
          ? "View and claim your withdrawal requests"
          : "Submit withdrawal requests for your staked tokens"}
      </p>
    </div>
  );
}
