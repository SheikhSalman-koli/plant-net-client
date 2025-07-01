
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { uploadImage } from '../../../Api/Utils'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'
import toast from 'react-hot-toast'
import { useState } from 'react'


const AddPlant = () => {

  const {user} = useAuth()
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit =async(e) => {
    e.preventDefault()
    setIsUploading(true)
    const form = e.target
    const name = form.name.value
    const category = form.category.value
    const description = form.description.value
    const price = form.price.value
    const quantity = form.quantity.value

    const image = form.image.files[0]

   try{
     const photo = await uploadImage(image)
    const sellerInfo = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL
    }
    
    const plantData = { 
      name, 
      category, 
      description, 
      price, 
      quantity, 
      photo,
      seller: sellerInfo
    }
    // console.log( plantData);

    const {data} =await axios.post(`${import.meta.env.VITE_API_URL}/plants`, plantData)
    if(data.insertedId){
      toast.success('plant data added successfully!')
    }
    form.reset()
   }catch(error){
      console.log(error);
   } finally {
    setIsUploading(false)
   }
    

  }

  return (
    <div>
      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit} isUploading={isUploading}/>
    </div>
  )
}

export default AddPlant
