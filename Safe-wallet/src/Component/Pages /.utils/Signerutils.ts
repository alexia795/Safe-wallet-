export const SIGNER_ADDRESS = "0xFDf84a0e7D07bC56f7De56696fc409704cC83a24";

export const isSignerAuthorized = (address: string) => {
  return address.toLowerCase() === SIGNER_ADDRESS.toLowerCase();
};
