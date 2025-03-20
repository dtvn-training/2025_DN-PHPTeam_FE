import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ImagePlatform } from "../utils/Enum";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { convertToTitleCase } from "../utils/StringUtil";
import { getInteractionsByPostPlatform } from "../services/interactionService";
import { ToastContainer, toast } from 'react-toastify';

const Interaction = () => {
    const { postPlatformId } = useParams();
    const [postPlatform, setPostPlatform] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInteractions = async () => {
            try {
                const postPlatform = await getInteractionsByPostPlatform(postPlatformId);
                setPostPlatform(postPlatform || []);

                console.log({ postPlatform })
            } catch (error) {
                toast.error('Cannot fetch the interactions.', {
                    position: "top-right",
                    autoClose: 3000,
                });
                console.error("Cannot fetch the interactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInteractions();
    }, []);

    return (
        <div>
            <ToastContainer />
            {
                loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="bg-white p-4 rounded-lg flex items-center space-x-4">
                            <img src={ImagePlatform[postPlatform['platform']]} alt="platform" className="w-10 h-10" />
                            <div>
                                <h2 className="text-lg font-bold">{convertToTitleCase(postPlatform['platform'])} Platform</h2>
                                <p className="text-gray-500 text-sm">Interaction Analytics</p>
                            </div>
                        </div>

                        <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
                            <h3 className="text-md font-semibold mb-4">Interaction Statistics</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={postPlatform['interactions']}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="number_of_likes" stroke="#2563eb" name="Likes" />
                                    <Line type="monotone" dataKey="number_of_shares" stroke="#34d399" name="Shares" />
                                    <Line type="monotone" dataKey="number_of_comments" stroke="#8b5cf6" name="Comments" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Interaction;
