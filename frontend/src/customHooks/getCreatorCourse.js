import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";

const GetCreatorCourse = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {

        const creatorCourse = async () => {
            try {

                const result = await axios.get(
                    serverUrl + "/api/course/getcreatorcourses",
                    {
                        withCredentials: true,
                    }
                );

                console.log(result.data);

                dispatch(setCreatorCourseData(result.data));

            } catch (err) {

                console.log(err);

                console.log(err.response);

                console.log(err.response?.data);

            }
        };

        if (userData) {
            creatorCourse();
        }

    }, [userData]);

    return null;
};

export default GetCreatorCourse;