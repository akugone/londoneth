import { CredentialType, IDKitWidget } from '@worldcoin/idkit';
import { useAccount, useQuery } from 'wagmi';
import type { ISuccessResult } from '@worldcoin/idkit';

import { useState } from 'react';

export default function WorldCoinButton({
    onAuthenticated,
}: {
    onAuthenticated: (authenticated: boolean) => void;
}) {
    const { address } = useAccount();
    const [privateState, setPrivateState] = useState(false);
    function setPrivate() {
        console.log('privateState', privateState);
        // TODO: handle private change from Lint
        setPrivateState(!privateState);
    }

    const onSuccess = (result: ISuccessResult) => {
        console.log('Result ', result);
        // Update authentication state
        onAuthenticated(true);
    };

    const handleProof = async (result: ISuccessResult) => {
        const reqBody = {
            merkle_root: result.merkle_root,
            nullifier_hash: result.nullifier_hash,
            proof: result.proof,
            credential_type: result.credential_type,
            action: process.env.NEXT_PUBLIC_WLD_ACTION_NAME,
            signal: '',
            userAddress: address,
        };
        fetch('/api/worldcoin/verify-worldcoin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        }).then(async (res: Response) => {
            if (res.status == 200) {
                console.log('Successfully verified credential.');
            } else {
                throw (
                    new Error('Error: ' + (await res.json()).code) ??
                    'Unknown error.'
                );
            }
        });
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'left',
                    justifyContent: 'left',
                    minHeight: '2vh',
                }}
            >
                <div className="flex flex-col ">
                    <div className="ml-3 mb-4 block text-blue-600 bg-black hover:bg-redpraha rounded-xl px-5 py-2.5 text-center">
                        <IDKitWidget
                            action={
                                process.env.NEXT_PUBLIC_WLD_ACTION_NAME?.toString() ??
                                ''
                            }
                            onSuccess={onSuccess}
                            handleVerify={handleProof}
                            app_id={
                                process.env.NEXT_PUBLIC_WLD_APP_ID?.toString() ??
                                ''
                            }
                            credential_types={[
                                CredentialType.Orb,
                                CredentialType.Phone,
                            ]}
                        >
                            {({ open }) => (
                                <button
                                    className="text-white hover:text-black  font-medium"
                                    onClick={open}
                                >
                                    Verify with World ID
                                </button>
                            )}
                        </IDKitWidget>
                    </div>
                </div>
            </div>
        </div>
    );
}
