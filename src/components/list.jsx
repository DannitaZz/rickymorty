import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ListItem from '@mui/material/ListItem';

export default function List({ currentData }) {
    const checkData = (data, key) => {
        try {
            return data[key]
        }
        catch {
            return 'loading'
        }
    }
    return (
        <>
            <div className='fade-in' style={{ width: '100vw', display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'center' }}>
                {currentData && currentData.map((char, i) => {
                    return (
                        <div key={`div_${Number(checkData(char, 'id'))}`}>
                            <Card key={`${checkData(char, 'id')}`} sx={{ display: { xs: 'none', sm: 'block', height: '400px' }, maxWidth: 600, margin: '10px' }}>
                                <CardMedia
                                    component="img"
                                    height="300px"
                                    image={`https://rickandmortyapi.com/api/character/avatar/${Number(checkData(char, 'id'))}.jpeg`}
                                    alt={checkData(char, 'name')}
                                    sx={{
                                        height: '250px',
                                        align: 'center',
                                        margin: '0px',
                                        padding: '0px',
                                        border: '0px',
                                        objectFit: 'contain',
                                    }}
                                />
                                <CardContent>

                                    <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
                                        {checkData(char, 'name')}
                                    </Typography>
                                    <Stack sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        textAlign: 'center',
                                        margin: '0px',
                                        padding: '0px',
                                        border: '0px'
                                    }}>
                                        <Typography gutterBottom variant="p" component="div" sx={{ color: 'gray' }}>
                                            Species: {checkData(char, 'species')}
                                        </Typography>
                                        <Typography gutterBottom variant="p" component="div" sx={{ color: 'gray' }}>
                                            Status: {checkData(char, 'status')}
                                        </Typography>
                                        <Typography gutterBottom variant="p" component="div" sx={{ color: 'gray' }}>
                                            Gender: {checkData(char, 'gender')}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                            <ListItem key={`char_${checkData(char, 'id')}`} alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper', height: '130px', display: { xs: 'flex', sm: 'none' } }} >
                                <Card sx={{ display: 'flex', width: '93vw', height: '125px' }} key={checkData(char, 'id')}>
                                    <CardContent sx={{ flex: '1 1 auto', flexDirection: 'row' }}>
                                        <Stack sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            margin: '0px',
                                            padding: '0px',
                                            border: '0px',
                                            marginLeft: '5px'
                                        }}>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {checkData(char, 'name')}
                                            </Typography>
                                            <Typography gutterBottom variant="p" component="div" sx={{ color: 'gray' }}>
                                                {checkData(char, 'status')}
                                            </Typography>
                                        </Stack>
                                        <Stack sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            textAlign: 'center'
                                        }}>
                                            <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                                Species: {checkData(char, 'species')}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{}}>
                                                Gender: {checkData(char, 'gender')}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: '30vw',
                                            objectFit: 'contain',
                                        }}
                                        image={`https://rickandmortyapi.com/api/character/avatar/${Number(checkData(char, 'id'))}.jpeg`}
                                        alt={checkData(char, 'name')}
                                    />
                                </Card>
                            </ListItem>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

