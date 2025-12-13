"use client";
import { Shield, Info, Clock, TrendingDown, LucideIcon } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  icon: LucideIcon;
}

interface FaqSidebarProps {
  expandedFaq: number | null;
  setExpandedFaq: (index: number | null) => void;
}

export default function FaqSidebar({
  expandedFaq,
  setExpandedFaq,
}: FaqSidebarProps) {
  const faqItems: FaqItem[] = [
    {
      question:
        "What are the risks of engaging with the superCluster protocol?",
      answer:
        "The superCluster protocol carries smart contract risk, slashing risk, and other DeFi-related risks. Our protocol has been audited by multiple security firms, and we maintain insurance coverage to mitigate these risks.",
      icon: Shield,
    },
    {
      question: "What are withdrawals?",
      answer:
        "Withdrawals allow you to exchange your sUSDC/wsUSDC back to ETH after a waiting period. You can choose between using superCluster's withdrawal queue or swapping on DEXs for instant liquidity.",
      icon: Info,
    },
    {
      question: "How long does withdrawal take?",
      answer:
        "Withdrawal time depends on the exit queue and can range from 1-5 days to several weeks when using superCluster. For instant withdrawals, you can use DEXs with minimal slippage.",
      icon: Clock,
    },
    {
      question:
        "What is the difference between superCluster and DEX withdrawals?",
      answer:
        "superCluster withdrawals provide 1:1 rate but require waiting time. DEX withdrawals are instant but may have slight slippage depending on market conditions.",
      icon: TrendingDown,
    },
  ];

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <h3 className="text-2xl font-bold mb-6 text-white">Common Questions</h3>
        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedFaq === index;

            return (
              <div
                key={index}
                className="bg-white/10 border border-white/10 rounded overflow-hidden backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : index)}
                  className="w-full p-5 text-left flex items-start gap-3 hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm leading-snug">
                      {item.question}
                    </h4>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-300 leading-relaxed pl-11">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
