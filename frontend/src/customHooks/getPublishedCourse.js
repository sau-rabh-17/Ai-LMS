import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";

const getPublishedCourse = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const getCourseData = async () => {

            try {

                const result = await axios.get(
                    serverUrl + "/api/course/getpublished",
                    {
                        withCredentials: true,
                    }
                );

                console.log(result.data);

                dispatch(setCourseData(result.data));

            } catch (err) {

                console.log("Error fetching published courses");

                console.log(err);

                console.log(err.response);

                console.log(err.response?.data);

                console.log(err.response?.status);
            }
        };

        getCourseData();

    }, [dispatch]);

    return null;
};

export default getPublishedCourse;