import { useState } from 'react';

export default function usePrivacyToken() {
const getPrivacyToken = () => {
    const privacyTokenString = localStorage.getItem('privacyToken');
    const userPrivacyToken = JSON.parse(privacyTokenString);
    return userPrivacyToken?.privacyToken
    };

  const [privacyToken, setPrivacyToken] = useState(getPrivacyToken());

  const savePrivacyToken = userPrivacyToken => {
    localStorage.setItem('privacyToken', JSON.stringify(userPrivacyToken));
    setPrivacyToken(userPrivacyToken.privacyToken);
  };

  return {
    setPrivacyToken: savePrivacyToken,
    privacyToken
  }

}