// src/lib/tokenTools.ts
// Token mint / burn / metadata işlemleri (Base / EVM uyumlu)
import { ethers } from "ethers";

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function mint(address to, uint256 amount)",
  "function burn(uint256 amount)",
  "function burnFrom(address account, uint256 value)",
  "function approve(address spender, uint256 amount)",
  "function allowance(address owner, address spender) view returns (uint256)"
];

// ✅ Token Mint
export async function mintToken(
  rpcUrl: string,
  contract: string,
  to: string,
  amount: string,
  privateKey: string
) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const token = new ethers.Contract(contract, ERC20_ABI, wallet);
  const tx = await token.mint(to, ethers.parseUnits(amount, 18));
  return await tx.wait();
}

// 🔥 Token Burn
export async function burnToken(
  rpcUrl: string,
  contract: string,
  amount: string,
  privateKey: string
) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const token = new ethers.Contract(contract, ERC20_ABI, wallet);
  const tx = await token.burn(ethers.parseUnits(amount, 18));
  return await tx.wait();
}

// ⚙️ Metadata Update (Opsiyonel ERC721 / NFT için)
export async function updateMetadata(
  rpcUrl: string,
  contract: string,
  newURI: string,
  privateKey: string
) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const abi = ["function setBaseURI(string memory _uri) public"];
  const nft = new ethers.Contract(contract, abi, wallet);
  const tx = await nft.setBaseURI(newURI);
  return await tx.wait();
}

