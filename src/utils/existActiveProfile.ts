export function ProfileValidation() {
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
