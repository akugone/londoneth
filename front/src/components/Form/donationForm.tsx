'use client';

import {
    useChainId,
    useAccount,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import * as Yup from 'yup';
import Loading from '../Loading';
import { useState } from 'react';
import { getConfig } from '@/config/config';
import { NetworkEnum } from '@/types/config';
import { abi } from '@/abis/ProofOfGive';
import { walletClient } from '../../config/viemConfig';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import SubmitButton from './SubmitButton';
import { QuestionMarkCircle } from 'heroicons-react';
import { postToIPFS } from '../../utils/ipfs';
import { wagmiContractConfig } from '@/config/wagmiConfigPog';
import { useHackathon } from '@/hooks/useHackathon';

interface IFormValues {
    handle: string;
    donationType: 'clothes' | 'tokens';
    clotheDescription: string;
    image_url?: string;
    about?: string;
    donationAmount?: number; // Used only for token donations
}

const validationSchema = Yup.object({
    handle: Yup.string().required('Handle is required'),
    donationType: Yup.string().required('Donation type is required'),
    clotheDescription: Yup.string().when('donationType', {
        is: 'clothes',
        then: Yup.string().required(
            'Clothes donation clotheDescription is required'
        ),
        otherwise: Yup.string().notRequired(),
    }),
    donationAmount: Yup.number().when('donationType', {
        is: 'tokens',
        then: Yup.number()
            .required('Donation amount is required')
            .min(1, 'Donation amount must be at least 1'),
        otherwise: Yup.number().notRequired(),
    }),
});

function DonationForm({ callback }: { callback?: () => void }) {
    const account = useAccount();
    const [tokenDonation, setTokenDonation] = useState(0);
    const [isOpen, setOpen] = useState(false);

    const {
        data: hash,
        isSuccess,
        isLoading,
        writeAsync,
    } = useContractWrite({
        ...wagmiContractConfig,
        functionName: 'mintPoG',
    });

    const { hackathonId } = useHackathon();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransaction({
            hash: hash,
        });

    // log wallet address
    console.log('Wallet Address:', account.address);

    if (!account) {
        return <Loading />;
    }

    const initialValues: IFormValues = {
        handle: '',
        donationType: 'clothes', // Default to clothes as an example
        clotheDescription: '',
        image_url: '',
        about: '',
        donationAmount: undefined,
    };

    const onSubmit = async (
        values: IFormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        if (account) {
            const uri = await postToIPFS(
                JSON.stringify({
                    image_url: values.image_url,
                    clotheDescription: values.clotheDescription,
                    about: values.about,
                    //if donation amount is different than 0, it means it's a token donation
                    tokenDonation: values.donationAmount
                        ? values.donationAmount
                        : 0,
                })
            );
            console.log('URI:', uri);
            //console log handle
            console.log('handle:', values.handle);

            const res = await writeAsync({
                args: [
                    account.address as `0x${string}`,
                    BigInt(1),
                    BigInt(1),
                    BigInt(1),
                    values.handle,
                    uri,
                ],
            });
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, setFieldValue, values }) => (
                <Form className="space-y-4 bg-white p-6 rounded-lg shadow w-full">
                    {/* Handle Field */}
                    <div className="form-group">
                        <label
                            htmlFor="handle"
                            className="text-gray-700 font-semibold"
                        >
                            Handle
                        </label>
                        <Field
                            type="text"
                            id="handle"
                            name="handle"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Your unique handle"
                        />
                        <ErrorMessage
                            name="handle"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    {/* Picture URL Field */}
                    <div className="form-group">
                        <label
                            htmlFor="image_url"
                            className="text-gray-700 font-semibold"
                        >
                            Picture URL
                        </label>
                        <Field
                            type="text"
                            id="image_url"
                            name="image_url"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="http://example.com/image.jpg"
                        />
                        <div className="mt-2">
                            {values.image_url && (
                                <img
                                    className="max-w-full h-auto rounded-lg shadow"
                                    src={values.image_url}
                                    alt="Preview"
                                />
                            )}
                        </div>
                        <ErrorMessage
                            name="image_url"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    {/* About Field */}
                    <div className="form-group">
                        <label
                            htmlFor="about"
                            className="text-gray-700 font-semibold"
                        >
                            About
                        </label>
                        <Field
                            as="textarea"
                            id="about"
                            name="about"
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Tell us more about you or your donation..."
                        />
                        <ErrorMessage
                            name="about"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    {/* Donation Type Selection */}
                    <div className="form-group flex items-center space-x-4">
                        <label className="flex items-center">
                            <Field
                                type="radio"
                                name="donationType"
                                value="clothes"
                                className="form-radio h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-gray-700">
                                Clothes Donation
                            </span>
                        </label>
                        <label className="flex items-center">
                            <Field
                                type="radio"
                                name="donationType"
                                value="tokens"
                                className="form-radio h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-gray-700">
                                Token Donation
                            </span>
                        </label>
                    </div>

                    {/* Conditional Fields */}
                    {values.donationType === 'clothes' && (
                        <div className="form-group">
                            <label
                                htmlFor="clotheDescription"
                                className="text-gray-700 font-semibold"
                            >
                                Clothes Donation
                            </label>

                            <Field
                                as="textarea"
                                id="clotheDescription"
                                name="clotheDescription"
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Describe the clothes you are donating"
                            />

                            <ErrorMessage
                                name="clotheDescription"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                    )}

                    {values.donationType === 'tokens' && (
                        <div className="form-group">
                            <label
                                htmlFor="donationAmount"
                                className="text-gray-700 font-semibold"
                            >
                                Donation Amount
                            </label>
                            <Field
                                type="number"
                                id="donationAmount"
                                name="donationAmount"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter your donation amount"
                            />
                            <ErrorMessage
                                name="donationAmount"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            isSubmitting
                                ? 'bg-gray-500'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Donate'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default DonationForm; // Ensure this matches your function/component name.
