import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUploadFn } from "../../../api/Utils";
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddRoom = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState();
    // console.log(imagePreview);
    const [imageText, setImageText] = useState('Upload Image')
    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    )
    // post data form db
    const { mutateAsync } = useMutation({
        mutationFn: async roomData => {
            const { data } = await axiosSecure.post(`/add-room`, roomData)
            return data
        },
        onSuccess: () => {
            console.log('Data save at Mongodb');
            setLoading(false);
            navigate('/dashboard/my-listings')
            toast.success('Room added Successfully!')
        }
    })

    // handle dates range 
    const handleDates = range => {
        console.log(range);
        setDates(range.selection)
    }
    // Form handler
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = dates.endDate;
        const from = dates.startDate;
        const price = form.price.value;
        const guests = form.total_guest.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const bedrooms = form.bedrooms.value;
        const image = form.image.files[0];
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        }
        // image hosting
        try {
            const imageUrl = await imageUploadFn(image);
            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                guests,
                bathrooms,
                bedrooms,
                host,
                description,
                image: imageUrl,
            }
            console.table(roomData);

            await mutateAsync(roomData)

        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error.message)
        }

    }
    //   handle image change
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }

    return (
        <div>
            <Helmet>
                <title>Add Room | DashBoard</title>
            </Helmet>
            <AddRoomForm
                dates={dates}
                handleDates={handleDates}
                handleSubmit={handleSubmit}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                handleImage={handleImage}
                imageText={imageText}
                loading={loading}
            />
        </div>
    );
};

export default AddRoom;