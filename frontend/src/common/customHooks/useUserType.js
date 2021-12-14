import { useState } from 'react';

export default function useUserType() {
const getUserType = () => {
    const userTypeString = localStorage.getItem('userType');
    const userTypeToken = JSON.parse(userTypeString);
    return userTypeToken?.userType
    };

  const [userType, setUserType] = useState(getUserType());

  const saveUserType = userTypeToken => {
    localStorage.setItem('userType', JSON.stringify(userTypeToken));
    setUserType(userTypeToken.userType);
  };

  return {
    setUserType: saveUserType,
    userType
  }

}