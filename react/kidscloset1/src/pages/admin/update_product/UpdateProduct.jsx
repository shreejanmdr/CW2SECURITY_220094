import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleProduct, updateProduct} from '../../../apis/Api'
import { toast } from 'react-toastify'



const UpdateProduct = () => {
    // get id from url
    const {id} = useParams()

    // get product information (Backend)
    useEffect(() => {
        getSingleProduct(id).then((res)=>{
            console.log(res.data)

            //res->data(message,sucerss,product)->(pn,pp,pc)
            //res.data.product.productName

            setProductName(res.data.product.productName)
            setProductPrice(res.data.product.productPrice)
            setProductCategory(res.data.product.productCategory)
            setProductQuantity(res.data.product.productQuantity)
            setProductDescription(res.data.product.productDescription)
            setOldImage(res.data.product.productImage)

        }).catch((error)=>{
            console.log(error)
        })
        
        
    },[])


    
    // fill all the info in each fields

    // make a use state
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [productDescription, setProductDescription] = useState('')

    // state for image
    const [productNewImage, setProductNewImage] = useState(null)
    const [previewNewImage, setPreviewNewImage] = useState(null)
    const [oldImage, setOldImage] = useState('')

    // image upload handler
    const handleImage = (event) => {
        const file = event.target.files[0]
        setProductNewImage(file) // for backend
        setPreviewNewImage(URL.createObjectURL(file))
    }


    //update product
    const handleUpdate = (e) => {
        e.preventDefault()

        //make a form data
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('productPrice', productPrice)
        formData.append('productCategory', productCategory)
        formData.append('productQuantity', productQuantity)
        formData.append('productDescription', productDescription)
    

        if(productNewImage){
            formData.append('productImage', productNewImage)
        }
      

        //api call
        updateProduct(id,formData).then((res)=>{
            if(res.status===201){
                toast.success(res.data.message)   
            }  
            }).catch((error)=>{
               
                if(error.response.status===5000){
                    toast.error(error.response.data.message)
                }
                else if(error.response.status===400){
                    toast.error(error.response.data.message)
                }
            

            });
    }


    return (
        <>
            <div className='container mt-0  '
      style={{
        marginLeft: '250px',
        marginTop: '100px',
        width: '1280px',
        height: '780px',
        backgroundColor: '#0B80F460',
        padding: '20px',
    

      }}>

                <h2>Update product for < span className='text-primary '>'{productName}'</span></h2>

                <div className='d-flex gap-3 mt-3 '>
                    <form action="">
                        <label htmlFor="">Product Name</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} className='form-control' type="text" placeholder='Enter your product name' />

                        <label className='mt-2' htmlFor="">Product Price</label>
                        <input  value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className='form-control' type="number" placeholder='Enter your product name' />

                        <label className='mt-2'>Choose category</label>
                        <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
                        <option value="clothes">Clothes</option>
                                        <option value="Living & Care">Living & Care</option>
                                        <option value="Toys">Toys</option>
                                        <option value="Services">Services</option>
                                        <option value="Health & Beauty">Health & Beauty</option>
                                        <option value="Bedroom & Decor">Bedroom & Decor</option>
                        </select>

                        <label className="mt-2">Enter quantity</label>
                                    <textarea onChange={(e) => setProductQuantity(e.target.value)} className="form-control " type="number"></textarea>


                        <label className='mt-2'>Enter description</label>
                        <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='form-control'></textarea>

                        <label className='mt-2'>Choose product Image</label>
                        <input onChange={handleImage} type="file" className='form-control' />

                        <button onClick={handleUpdate} className='btn btn-primary w-100 mt-5'>Update Product</button>


                    </form>
                    <div className='image section mt-4'>
                        <h6>Previewing old img</h6>
                        <img  height={'200px'} width={'300px'} src={`https://localhost:5000/products/${oldImage}`} alt="preview image" className='img-fluid rounded-4 object-fit-cover' />
                   
                        {
                            previewNewImage && <>
                            <h6 className='mt-3'>Previewing new img</h6>
                            <img height={'200px'} width={'300px'} src={previewNewImage} alt="preview image" className='img-fluid rounded-4 object-fit-cover' />     
                            </>
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default UpdateProduct
