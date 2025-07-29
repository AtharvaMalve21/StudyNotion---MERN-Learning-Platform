import React, { useEffect, useState } from "react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import axios from "axios";
import { toast } from "react-hot-toast";


// import { FaStar } from "react-icons/fa"
// import { Autoplay, FreeMode, Pagination } from "swiper"
// import ReactStars from "react-rating-stars-component"
// import { Swiper, SwiperSlide } from "swiper/react"



function ReviewSlider() {

    const [reviews, setReviews] = useState([]);


    const URI = import.meta.env.VITE_BACKEND_URI;


    const fetchReviewDetails = async () => {
        try {

            const { data } = await axios.get(URI + "/api/review");

            console.log(data);

            if (data.success) {
                setReviews(data.data);
            }



        } catch (err) {
            toast.error(err.response?.data.message)
        }
    }


    useEffect(() => {
        fetchReviewDetails()
    }, []);


    return (
        <div className="text-white">
            <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                {
                    reviews.length > 0 ? reviews.map((review) => (
                        <div key={review._id}>
                            <p>{review.body}</p>
                            <p>{review.rating}</p>
                        </div>
                    )) : <p>No Reviews Added Yet!</p>
                }
            </div>
        </div>
    )
}

export default ReviewSlider