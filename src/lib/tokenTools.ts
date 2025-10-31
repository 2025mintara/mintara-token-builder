// src/lib/tokenTools.ts
// ✅ ERC-20 Token işlemleri: mint, burn, updateMetadata

import { ethers } from "ethers";

export async function getProviderAndSigner() {
  if (!window.ethereum) throw new Error("Metamask not found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return { provider, signer };
}

export async function mintToken(contractAddress: string, abi: any, amount: string) {
  const { signer } = await getProviderAndSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const tx = await contract.mint(await signer.getAddress(), ethers.parseUnits(amount));
  await tx.wait();
  return tx.hash;
}

export async function burnToken(contractAddress: string, abi: any, amount: string) {
  const { signer } = await getProviderAndSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const tx = await contract.burn(ethers.parseUnits(amount));
  await tx.wait();
  return tx.hash;
}

export async function updateMetadata(contractAddress: string, abi: any, newURI: string) {
  const { signer } = await getProviderAndSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const tx = await contract.updateMetadata(newURI);
  await tx.wait();
  return tx.hash;
}
