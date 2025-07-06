import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../Form/PaymentForm'

const stripePromise = loadStripe(import.meta.env.VITE_PABLISHABLE_KEY);

const PurchaseModal = ({ closeModal, isOpen, plant }) => {

  const { photo, name, category, price, _id, seller, quantity } = plant
  const { user } = useAuth()

  const [seletedQuentity, setSeletedQuentity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)
  const [orderData, setOrderData] = useState({
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL
    },
    seller,
    plantId: _id,
    plantName: name,
    plantImage: photo,
    plantCategory: category,
    plantQuantity: 1,
    plantPrice: price
  })

  const handleQuentity = value => {
    const totalSelectedQuantity = parseInt(value)
    if (totalSelectedQuantity > quantity) {
      return toast.error('you can not parches more than avilable!')
    }
    const calculatedPrice = totalSelectedQuantity * price
    setSeletedQuentity(totalSelectedQuantity)
    setTotalPrice(calculatedPrice)

    setOrderData(prev => {
      return {
        ...prev,
        plantQuantity: totalSelectedQuantity,
        plantPrice: calculatedPrice
      }
    })
  }

  useEffect(() => {
    setOrderData(prev => {
      return {
        ...prev,
        customer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        }
      }
    })
  }, [user])

  // console.log(orderData);

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none '
      onClose={closeModal}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-lg font-medium text-center leading-6 text-gray-900'
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Plant: {name}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Category: {category}r</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Customer: {user?.email}</p>
            </div>

            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Price per pice: $ {price}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Available Quantity: {quantity}</p>
            </div>
            <hr className='mt-2' />
            <div >
              <input
                value={seletedQuentity}
                min={1}
                onChange={e => handleQuentity(e.target.value)}
                className='mt-2 border-2 px-3 py-1'
                type="number"
              />
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>seleted Quantity: {seletedQuentity}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>totla price: {totalPrice}</p>
            </div>

            <Elements stripe={stripePromise}>
              <PaymentForm
                totalPrice={totalPrice}
                closeModal={closeModal}
                orderData={orderData}
              ></PaymentForm>
            </Elements>

          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PurchaseModal
