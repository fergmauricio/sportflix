"use client";

import { useRouter } from "next/navigation";

export function Validations() {
  const router = useRouter();

  function handleValidation() {
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

  if (!handleValidation) {
    //window.location.href = "/";
    router.push(`/`);
  }

  return <></>;
}
