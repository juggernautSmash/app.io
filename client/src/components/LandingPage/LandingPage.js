import React from 'react'
import './LandingPage.css'
import timeSheet from '../../assets/images/timeSheet.png'
import panCake from '../../assets/images/panCake.png'
import userIcon from '../../assets/images/userIcon.png'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 350,
        margin: 0,
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <>
            <Card id="inline" className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={timeSheet}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                         </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card id="inline" className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={panCake}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card id="inline" className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={userIcon}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}