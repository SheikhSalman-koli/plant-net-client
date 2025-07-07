import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const PaymentForm = ({ totalPrice, closeModal, orderData , refetch}) => {
    const axiosSecure = useAxiosSecure()
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth()
    const [careError, setCardError] = useState('')
    const [proccesing, setProccesing] = useState(false)
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        const getClientSecret = async () => {
            const { data } = await axiosSecure.post('/create-intent', {
                quantity: orderData?.plantQuantity,
                id: orderData?.plantId
            })
            setClientSecret(data.clientSecret);
        }
        getClientSecret()
    }, [axiosSecure, orderData])

    const handleSubmit = async (event) => {
        setProccesing(true)
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        //step=> 1: validating the card
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setCardError(error.message)
            console.log('[error]', error);
        } else {
            setCardError('')
            console.log(paymentMethod);
        }

        //step=> 2: debite money from card
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                },
            },
        });

        if (result.error) {
            setError(result?.error?.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                // after payment TODO__ #1: save order data in db
                orderData.transectionId = result?.paymentIntent.id
                try {
                    // place order from here
                    const { data } =await axiosSecure.post('/orders', orderData)
                    // console.log(data);
                    if (data.insertedId) {
                        toast.success('your order placed successfully!')
                    }

                    await axiosSecure.patch(`/update-quatity/${orderData?.plantId}`,{
                        updatedQuantity: orderData?.plantQuantity,
                        status: 'decrease'
                    })
                    refetch()
                    
                } catch (erroe) {
                    toast.error(erroe.message)
                } finally {
                    setProccesing(false)
                    closeModal()
                }
                // ##2: update product quantity in db from parcelCollection
            }
        }


    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {careError && <p className='text-red-500 mb-2'>{careError}</p>}

            <div className='flex justify-between'>
                <button
                    className='btn bg-lime-500 text-white'
                    type="submit"
                    disabled={!stripe || proccesing || careError}>
                    {proccesing ?
                        <ClipLoader size={20} />
                        :
                        `Pay ${totalPrice}$`}
                </button>

                <button
                    onClick={closeModal}
                    type='button'
                    className='btn bg-red-400'>
                    close
                </button>
            </div>

        </form>
    )

};

export default PaymentForm;