export const loadContract = async (file: File) => {
  const content = await file.text();
  const parsed = JSON.parse(content);
  return {
    name: parsed.contractName || "Unnamed",
    version: parsed.version || "1.0",
    abi: parsed.abi,
    bytecode: parsed.bytecode,
  };
};
