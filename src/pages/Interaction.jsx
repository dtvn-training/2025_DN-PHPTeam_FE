import { useParams, useNavigate } from "react-router-dom";
import { ImagePlatform } from "../utils/Enum";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { convertToTitleCase } from "../utils/StringUtil";

const Interaction = () => {
    const { postPlatformId } = useParams();
    const navigate = useNavigate();

    const postPlatform = {
        "platform": "TWITTER",
        "interactions": [
            { date: "Jan 1", likes: 200, shares: 150, comments: 100 },
            { date: "Jan 2", likes: 400, shares: 180, comments: 200 },
            { date: "Jan 3", likes: 350, shares: 120, comments: 90 },
            { date: "Jan 4", likes: 600, shares: 250, comments: 300 },
            { date: "Jan 5", likes: 500, shares: 200, comments: 220 },
            { date: "Jan 6", likes: 700, shares: 320, comments: 400 },
            { date: "Jan 7", likes: 650, shares: 300, comments: 380 },
            { date: "Jan 8", likes: 800, shares: 350, comments: 420 },
            { date: "Jan 9", likes: 750, shares: 330, comments: 390 },
            { date: "Jan 10", likes: 1000, shares: 400, comments: 500 }
        ]
    }; // exemplar sample

    return (
        <div>
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
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="likes" stroke="#2563eb" name="Likes" />
                        <Line type="monotone" dataKey="shares" stroke="#34d399" name="Shares" />
                        <Line type="monotone" dataKey="comments" stroke="#8b5cf6" name="Comments" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Interaction;
