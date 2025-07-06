
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { uploadImage } from '../../../Api/Utils'
import axios from 'axios'

import toast from 'react-hot-toast'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'


const AddPlant = () => {

  const { user } = useAuth()
  const [isUploading, setIsUploading] = useState(false)
  const [imageUpload, setImageUpload] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    const form = e.target
    const name = form.name.value
    const category = form.category.value
    const description = form.description.value
    const price = form.price.value
    const quantity = form.quantity.value

    // const image = form.image.files[0]

    try {

      const sellerInfo = {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL
      }

      const plantData = {
        name,
        category,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        photo: imageUpload,
        seller: sellerInfo
      }
      // console.log( plantData);
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/plants`, plantData)
      if (data.insertedId) {
        toast.success('plant data added successfully!')
      }
      form.reset()
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false)
    }

  }

  const handleUploadImage = async e => {
    e.preventDefault()
    const image = e.target.files[0]
    const photo = await uploadImage(image)
    setImageUpload(photo)
  }

  return (
    <div>
      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        isUploading={isUploading}
        imageUpload={imageUpload}
        handleUploadImage={handleUploadImage}
      />
    </div>
  )
}

export default AddPlant
