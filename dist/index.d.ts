import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

interface AbcWaasConfigType {
    API_WAAS_MYABCWALLET_URL: string;
    MW_MYABCWALLET_URL: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
}

interface Props {
    config: AbcWaasConfigType;
    children: ReactNode;
}
declare const AbcWaasProvider: ({ config, children }: Props) => react_jsx_runtime.JSX.Element;

declare function Login(): react_jsx_runtime.JSX.Element;

export { type AbcWaasConfigType, AbcWaasProvider, Login };
