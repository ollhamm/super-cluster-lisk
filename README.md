# SuperCluster UI

Frontend application for SuperCluster Protocol – a DeFi protocol on Base Sepolia for wrapping, staking, and managing USDC with prefunding and withdrawal features.

## Features

- **Wallet Connection** – Connect with Web3Modal & Wagmi
- **USDC Wrapping & Staking** – Mint sUSDC/wsUSDC, stake, and earn yield
- **Withdrawals** – Request and claim withdrawals with onchain state
- **Faucet** – Get test USDC from the faucet
- **Responsive Design** – Mobile-first, modern UI

## Tech Stack

- **Next.js 15** – React framework
- **TypeScript** – Type safety
- **Tailwind CSS** – Utility-first styling
- **Wagmi** – Ethereum hooks
- **Viem** – Ethereum client
- **Web3Modal** – Wallet connection
- **Radix UI** – Accessible UI primitives

## Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Run development server**

```bash
npm run dev
```

3. **Open browser**
   Go to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app directory & routes
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   ├── error.tsx           # Error boundary
│   ├── not-found.tsx       # 404 page
│   └── (landing)/          # Landing page & sections
├── components/             # UI & feature components
│   ├── app/                # App-specific widgets (Navbar, Table, etc)
│   ├── landing/            # Landing page sections
│   ├── shared/             # Shared UI (Card, etc)
│   └── ui/                 # UI primitives (button, input, etc)
├── config/                 # App constants & config
├── hooks/                  # React hooks (staking, wrapping, etc)
├── lib/                    # Utilities
├── services/               # Web3, contracts, ABIs
│   └── web3/
│       ├── contracts/      # Contract ABIs & addresses
│       ├── utils/          # Web3 helpers
│       └── wagmi/          # Wagmi config/provider
└── public/                 # Static assets
```

## Contract Addresses

All contracts are deployed on **Base Sepolia** testnet. Replace with your own if needed.

- **SuperCluster**: `0x3F067D64D8C385D21a3758C3DF09f9351a1b898F`
- **Pilot**: `0x653ed979cBC7fAb7F8617E79FF6AF1Ebb74DFbb7`
- **MockUSDC**: `0x8Eb85dE429E456068d2fe78A0C76DF16A343a7CF`
- **Faucet**: `0x9D2b71a151514e1bD1793775F1cBbe4Da132B2B7`
- **sToken**: `0xE1203a255E1AaD5cE938F37b5093805248c54aB5`
- **wsToken**: `0x2913c280944E8c37561B57b646c3Ec7c7b300236`
- **WithdrawManager**: `0x0549e937F7aD5e6709d6CC3217A36B8b66985C46`

## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Protocol Overview

SuperCluster uses a prefunding model:

- **User margin** (USDC) + **protocol pool**
- **Leverage** for capital efficiency
- **Non-custodial**: user retains control
- **Auto-liquidation** after set period

## Development Status

This is a **Proof of Concept (PoC)**:

✅ **Phase 1**: Wallet Connection & Basic UI  
✅ **Phase 2**: Pool Features (Wrap/Stake/Withdraw)  
⏳ **Phase 3**: Advanced Flows & Analytics  
⏳ **Phase 4**: Testing & Polish
