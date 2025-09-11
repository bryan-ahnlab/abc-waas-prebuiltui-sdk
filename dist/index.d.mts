export { AbcWaasConfigType, AbcWaasContextType, AbcWaasProvider, UseLoginStatusType, UseLogoutStatusType, useAbcWaas, useLogin, useLogout } from 'abc-waas-core-sdk';
import * as react_jsx_runtime from 'react/jsx-runtime';

type UseLanguageType = "ko" | "en";

declare const useLanguage: () => {
    language: UseLanguageType;
    setLanguage: (newLanguage: UseLanguageType) => void;
};

declare function Login(): react_jsx_runtime.JSX.Element;

declare function Logout(): react_jsx_runtime.JSX.Element;

export { Login, Logout, type UseLanguageType, useLanguage };
