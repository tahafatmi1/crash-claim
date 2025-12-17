import React, { useEffect } from "react";

interface TrustedFormProviderProps {
  children: React.ReactNode;
}

export const TrustedFormProvider = ({ children }: TrustedFormProviderProps) => {
  useEffect(() => {
    if ((window as any).xxTrustedForm) {
      // Already loaded, skip
      return;
    }

    const tf = document.createElement("script");
    tf.type = "text/javascript";
    tf.async = true;
    tf.src =
      (document.location.protocol === "https:" ? "https" : "http") +
      "://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=" +
      new Date().getTime() +
      Math.random();
    document.head.appendChild(tf);

    // Cleanup if component unmounts (optional)
    return () => {
      // Do not remove script to prevent TrustedForm "lock" issues
    };
  }, []);

  return <>{children}</>;
};
