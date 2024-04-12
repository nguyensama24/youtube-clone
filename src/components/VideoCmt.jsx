
import { React, useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { Box, Stack } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ChannelsCommentCard } from './'
const VideoCmt = () => {
    const [comments, setComments] = useState([])
    // const [comment, setComment] = useState(null)
    // const [authorChannelId, setAuthorChannelId] = useState([])
    const { id } = useParams();
    // console.log(comments);
    useEffect(() => {

        fetchFromAPI(`commentThreads?part=snippet&videoId=${id}&maxResults=50`)
            .then((data) => setComments(data?.items))

        // fetchFromAPI(`comments?part=snippet&id=UgwFtTIpoLvNaz3bcvF4AaABAg`)
        //     .then((data) => setComment(data.items))
    }, [])


    return (
        <Stack direction="column" flexWrap="wrap" justifyContent="start" gap={2}>
            {comments.map((item, idx) => (
                <Box key={idx}>

                    {item.snippet.topLevelComment.snippet && <ChannelsCommentCard commentsDetail={item} />}
                </Box>
            ))}
        </Stack>
        // <></>
    )
}

export default VideoCmt