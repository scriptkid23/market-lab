
# Market Lab

Market Lab is a blockchain-based NFT marketplace where users can connect their wallets, view NFT listings, and simulate NFT transactions. The project leverages web3 libraries (such as Wagmi) to handle wallet connections and transactions, and integrates with WalletConnect and Alchemy to interact with blockchain networks.

Repository: [https://github.com/scriptkid23/market-lab](https://github.com/scriptkid23/market-lab)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/scriptkid23/market-lab.git
   cd market-lab
   ```

2. **Install Dependencies**

   We use Yarn as our package manager. Install dependencies by running:

   ```bash
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env` file at the root of the project and add the following variables:

   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=17fa5b7382673b035829cd2831bf4662
   NEXT_PUBLIC_ALCHEMY_ID=lrZgX5wykeQZhBzCCc_gsjjhFlYzNxhY
   NEXT_PUBLIC_ADDRESS_SELLER=0xe3Bb87C766d7537ba75D0214232eFB4a22A6eDcd
   ```

4. **Start the Development Server**

   Launch the project with:

   ```bash
   yarn dev
   ```

## Challenges Faced During Development

- **State Management:**  
  Managing the state for NFT data, wallet connections, and transaction statuses across the application demanded a robust state management solution to avoid inconsistencies.


## AI Tools Used in the Project

The development process was significantly enhanced by leveraging AI tools:

- **v0.dev, ChatGPT:**  
  Used for generating code snippets, troubleshooting development challenges, and drafting documentation.

- **GitHub Copilot:**  
  Assisted with auto-completion and code generation, which accelerated development and helped maintain consistent code quality.

## License

This project is licensed under the [MIT License](LICENSE).

---