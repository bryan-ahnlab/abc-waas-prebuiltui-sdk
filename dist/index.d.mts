export { AbcWaasProvider, useAbcWaas } from 'abc-waas-core-sdk';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface AbcWaasConfigType {
    API_WAAS_MYABCWALLET_URL: string;
    MW_MYABCWALLET_URL: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
}

declare function Login(): react_jsx_runtime.JSX.Element;

export { type AbcWaasConfigType, Login };
