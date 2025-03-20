import dayjs from "dayjs";

export const formatTimestamp =  (timestamp) => {
    const dt = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = dt.toLocaleDateString("en-US", options);
    const formattedTime = dt.toTimeString().slice(0, 5); 

    return `${formattedDate} • ${formattedTime}`;
};

export const formatScheduleTime =  (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
};
