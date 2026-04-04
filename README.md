# ⚡ Gas Tracker Dashboard  : https://gas-price-tracker-nine.vercel.app/

A real-time Web3 gas price tracker for Ethereum, Polygon, and Arbitrum networks with MetaMask integration, transaction simulation, and comprehensive analytics.

## 🌟 Features

### 💰 Multi-Chain Gas Tracking
- **Real-time gas prices** for Ethereum, Polygon, and Arbitrum
- **Live updates** every 5 seconds with price variations
- **USD cost calculations** for different transaction types
- **Historical price charts** with interactive visualization

### 🔗 MetaMask Integration
- **One-click wallet connection** with robust detection
- **Real-time balance tracking** across multiple networks
- **Account and network change handling**
- **Secure connection management**

### 📊 Transaction Simulation
- **Gas cost calculator** for different transaction types:
  - ETH transfers (21,000 gas)
  - ERC-20 token transfers (65,000 gas)
  - DEX swaps (150,000 gas)
  - NFT minting (85,000 gas)
- **Real-time cost estimates** in USD
- **Priority fee optimization** (Slow/Standard/Fast)

### 🚨 Price Alerts
- **Custom gas price alerts** with threshold settings
- **Above/below price notifications**
- **Network-specific alert management**
- **Real-time alert monitoring**

### 📈 Analytics & Visualization
- **Interactive price charts** with Chart.js integration
- **Network performance metrics** (block time, base fees)
- **Transaction activity tracking**
- **Historical data analysis**

### 🎨 Modern UI/UX
- **Responsive design** works on desktop and mobile
- **Card-based layout** with clean, modern styling
- **Real-time loading indicators**
- **Toast notifications** for user feedback

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MetaMask browser extension
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/gas-tracker.git
cd gas-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Install additional dependencies**
```bash
npm install ethers zustand
npm install -D tailwindcss postcss autoprefixer
```

4. **Initialize Tailwind CSS**
```bash
npx tailwindcss init -p
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

### Next.js Version
```
gas-tracker/
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── public/
│   ├── favicon.ico
│   └── icons/
│       ├── ethereum-icon.svg
│       ├── polygon-icon.svg
│       ├── arbitrum-icon.svg
│       └── metamask-icon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── WalletConnector.tsx
│   │   ├── ChainSelector.tsx
│   │   ├── GasPriceWidget.tsx
│   │   ├── SimulationInput.tsx
│   │   ├── ComparisonTable.tsx
│   │   └── CandlestickChart.tsx
│   ├── store/
│   │   └── gasStore.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
```

### Single File Version
For simpler deployment, use the single `app.js` file with basic HTML structure:
```
simple-gas-tracker/
├── index.html
├── app.js
├── styles.css
└── README.md
```

## ⚙️ Configuration

### Environment Variables
Create a `.env.local` file for API keys (optional):
```env
NEXT_PUBLIC_ETH_MAINNET_RPC="https://mainnet.infura.io/v3/YOUR_KEY"
NEXT_PUBLIC_POLYGON_RPC="https://polygon-rpc.com"
NEXT_PUBLIC_ARBITRUM_RPC="https://arb1.arbitrum.io/rpc"
```

### Network Configuration
The app supports these networks by default:
- **Ethereum Mainnet** (Chain ID: 1)
- **Polygon** (Chain ID: 137)
- **Arbitrum** (Chain ID: 42161)

## 📖 Usage Guide

### Connecting Your Wallet
1. Click **"Connect MetaMask"** button
2. Approve the connection in MetaMask popup
3. Your address and balances will be displayed
4. Switch networks in MetaMask to see different balances

### Monitoring Gas Prices
- **View real-time prices** for Slow/Standard/Fast transactions
- **Switch networks** using the network selector buttons
- **Monitor USD costs** calculated automatically
- **Track price changes** with visual indicators

### Simulating Transactions
1. Select **transaction type** (Transfer, ERC-20, Swap, NFT)
2. Enter **amount** in ETH/tokens
3. Choose **gas priority** (Slow/Standard/Fast)
4. View **estimated costs** and **gas limits**
5. Results update automatically as you change inputs

### Setting Price Alerts
1. Enter **threshold price** in Gwei
2. Choose **alert type** (Above/Below)
3. Click **"Set Alert"**
4. Receive notifications when thresholds are met

## 🛠️ Technical Stack

### Frontend Framework
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **React 18** with hooks and modern patterns

### Styling
- **Tailwind CSS** for utility-first styling
- **Custom CSS** for enhanced animations
- **Responsive design** with mobile-first approach

### Web3 Integration
- **ethers.js v6** for blockchain interactions
- **MetaMask provider** for wallet connections
- **Multi-network support** with automatic switching

### State Management
- **Zustand** for lightweight state management
- **React hooks** for local component state
- **Real-time updates** with intervals and WebSocket support

### Data Visualization
- **Chart.js** for interactive gas price charts
- **Real-time data updates** with smooth animations
- **Historical data tracking** and analysis

## 📱 Browser Compatibility

- ✅ **Chrome 90+** (Recommended)
- ✅ **Firefox 88+**
- ✅ **Safari 14+**
- ✅ **Edge 90+**
- ✅ **Brave Browser**

## 🔧 Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting and Type Checking
```bash
npm run lint
npm run type-check
```

### Testing MetaMask Connection
Open browser console and run:
```javascript
debugMetaMask()
```

## 🐛 Troubleshooting

### Common Issues

**MetaMask Not Detected**
- Ensure MetaMask extension is installed and enabled
- Refresh the page after installing MetaMask
- Check browser console for detection logs

**Connection Fails**
- Make sure MetaMask is unlocked
- Try disconnecting and reconnecting
- Clear browser cache and cookies

**Gas Prices Not Updating**
- Check network connection
- Verify RPC endpoints are accessible
- Look for rate limiting messages in console

**Charts Not Displaying**
- Ensure Chart.js is properly loaded
- Check for JavaScript errors in console
- Verify canvas element exists in DOM

### Debug Commands
```javascript
// Check MetaMask status
window.ethereum

// Debug gas tracker state
GasTrackerApp.state

// Force balance refresh
GasTrackerApp.wallet.fetchBalances()
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Add proper error handling for all Web3 interactions
- Test MetaMask integration across different browsers
- Maintain responsive design principles
- Add comments for complex blockchain logic

## 🔒 Security Considerations

- **Never store private keys** in the application
- **Validate all user inputs** before processing
- **Use secure RPC endpoints** for production
- **Implement proper error handling** for failed transactions
- **Rate limit API calls** to prevent abuse

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MetaMask** for Web3 wallet integration
- **Ethers.js** for blockchain connectivity
- **Chart.js** for data visualization
- **Tailwind CSS** for responsive styling
- **Next.js** for the React framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#🐛-troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/yourusername/gas-tracker/issues)
3. Create a new issue with detailed information
4. Join our community discussions

## 🔗 Links

- **Live Demo**: [https://your-demo-url.com](https://your-demo-url.com)
- **Documentation**: [https://your-docs-url.com](https://your-docs-url.com)
- **Bug Reports**: [GitHub Issues](https://github.com/yourusername/gas-tracker/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/gas-tracker/discussions)

---

**Made with ❤️ for the Web3 community**

*Stay updated with real-time gas prices and optimize your transaction costs!*
