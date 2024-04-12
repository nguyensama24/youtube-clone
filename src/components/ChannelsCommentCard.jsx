import React from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelsCommentCard = ({ commentsDetail }) => {

    return (

        <Box
            sx={{
                width: { xs: '100%', md: '100%' },

            }}
        >
            {/* <Link to={`/channel/${commentsDetail?.snippet?.topLevelComment?.id}`}> */}
            <CardContent sx={{ display: 'flex', flexDirection: 'row', color: '#fff', gap: "15px" }}  >
                <CardMedia
                    image={commentsDetail?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || demoProfilePicture}
                    alt={commentsDetail?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                    sx={{ borderRadius: '50%', height: '45px', width: '45px', border: '1px solid #e3e3e3' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', color: '#fff', width: { xs: '100%', md: '100%' }, }}>
                    <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff"  >
                        {commentsDetail?.snippet?.topLevelComment?.snippet?.authorDisplayName}{' '}

                    </Typography>
                    <Typography variant="h7">
                        {commentsDetail?.snippet?.topLevelComment?.snippet?.textOriginal
                        }{' '}

                    </Typography>
                </Box>

            </CardContent>
            {/* </Link> */}
        </Box>
    );
}
export default ChannelsCommentCard;