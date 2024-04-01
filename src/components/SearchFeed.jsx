import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Videos } from "./"

import { fetchFromAPI } from '../utils/fetchFromAPI'

const SearchFeed = () => {

    const [videos, setVideos] = useState([])
    const { searchTerm } = useParams();
    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
            .then((data) => setVideos(data.items))

    }, [searchTerm])


    return (
        <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
            <Typography variant='h4' fontWeight="bold" mb={2} sx={{ color: 'white' }}>
                Search Result for: <span style={{ color: '#F31503' }}>{searchTerm}</span> videos
            </Typography>

            <Box display="flex" p="2">
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videos} />

            </Box>
        </Box>
    )
}

export default SearchFeed