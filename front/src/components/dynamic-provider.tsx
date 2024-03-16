// 'use client';
//
// import {DynamicContextProvider} from '@dynamic-labs/sdk-react-core';
// import {EthereumWalletConnectors} from "@dynamic-labs/ethereum";
// import {PropsWithChildren} from "react";
//
// export const DynamicProvider = ({children}: PropsWithChildren) => {
//
//     return (
//         <DynamicContextProvider
//             settings={{
//                 environmentId: process.env.DYNAMIC_ENVIRONMENT_ID,
//                 walletConnectors: [EthereumWalletConnectors],
//             }}>
//             {children}
//         </DynamicContextProvider>
//     );
// };
