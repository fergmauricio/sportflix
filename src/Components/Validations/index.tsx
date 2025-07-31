"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Validations() {
  const router = useRouter();

  useEffect(() => {
    function handleValidation() {
      if (typeof window === "undefined") return false;

      const profileData = localStorage.getItem("activeProfile");

      if (!profileData?.trim()) {
        return false;
      }

      try {
        const parsedData = JSON.parse(profileData);
        if (Object.keys(parsedData).length === 0) {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
    }

    if (!handleValidation()) {
      router.push("/");
    }
  }, [router]);

  return null;
}
