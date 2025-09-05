import * as LocalAuthentication from "expo-local-authentication";

export const authenticateUser = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    throw new Error("Biometric authentication not available");
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate to access Safe Wallet",
    fallbackLabel: "Use Passcode",
  });

  if (!result.success) {
    throw new Error("Authentication failed");
  }

  return true;
};
