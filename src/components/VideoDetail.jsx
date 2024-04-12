import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, colors, CardMedia, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader, VideoCmt } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { BorderColor } from "@mui/icons-material";
import { demoProfilePicture } from "../utils/constants";

const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
            .then((data) => setVideoDetail(data.items[0]))

        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then((data) => setVideos(data.items))
    }, [id]);

    if (!videoDetail?.snippet) return <Loader />;

    const { snippet: { title, channelId, channelTitle, description, thumbnails: { high: { url } } }, statistics: { viewCount, likeCount } } = videoDetail;

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: "column", md: "row" }}>
                <Box flex={1}>
                    <Box sx={{ width: "100%", top: "86px" }}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
                        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                            {title}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
                            <Link to={`/channel/${channelId}`}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'row', color: '#fff', gap: "15px" }}  >
                                    <CardMedia
                                        image={url || demoProfilePicture}
                                        alt={channelTitle}
                                        sx={{ borderRadius: '50%', height: '45px', width: '45px', border: '1px solid #e3e3e3' }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                        <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff">
                                            {channelTitle}
                                            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                                        </Typography>
                                    </Box>

                                </CardContent>
                            </Link>
                            <Stack direction="row" gap="20px" alignItems="center">
                                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>

                        </Stack>
                        <Stack sx={{ backgroundColor: "#1E1E1E", borderRadius: '10px' }}>
                            <Typography color="#fff" variant="h9" p={4}>
                                {description}
                            </Typography>
                        </Stack>
                        <Stack>
                            <VideoCmt id={id} />
                        </Stack>
                    </Box>

                </Box>
                <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
                    <Videos videos={videos} direction="column" />
                </Box>
            </Stack >
        </Box >
    );
};

export default VideoDetail;