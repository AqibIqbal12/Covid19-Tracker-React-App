import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { getName } from 'country-list';
import CountUp from 'react-countup';
import flag from 'country-code-emoji';
import { trackPromise } from 'react-promise-tracker';

const useStyles = makeStyles((theme) => ({
    card: {
        // minWidth: 275,
        maxWidth: '300px',
        //backgroundColor: 'yellow',

        margin: '0 auto',
        marginTop: '0px',
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        borderBottom: '10px solid rgba(0, 0, 255, 0.5)'
    },
    title: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    pos: {
        marginBottom: 12,
    },

}));

export default function OutlinedCard({ data, country }) {
    const classes = useStyles();
    const url = 'https://api.thevirustracker.com/free-api?global=stats';
    const [globaldata, setGlobalData] = useState({});

   
    useEffect(() => {

        async function getGlobalData() {
            const response = await fetch(url);
            const { results } = await response.json();
            delete results[0].source;
            delete results[0].total_unresolved;
            //console.log(results[0])
            setGlobalData(results[0]);

        }
        trackPromise(
        getGlobalData()
        );

    }, [])


    if (Object.keys(data).length === 0) {
        return (
            <>

                <h1 style={{ textAlign: 'center' }}>Global Condition</h1>
                <h1 style={{ textAlign: 'center', fontSize: '200px', marginTop: '-25px' }}>
                    <span role="img" aria-label="worldEmoji">🌎</span>
                </h1>

                <Grid container spacing={2} style={{ marginTop: '-140px' }}>
                    {
                        Object.keys(globaldata).map((key, ind) => {

                            return (
                                <Grid item xs={12} sm={6} lg={3} key={ind}>
                                    <Card className={classes.card} variant="outlined">
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" variant="h1" gutterBottom>
                                                {key.replace(/_/g, ' ')}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {/* {console.log(globaldata[key])} */}
                                                {/* {globaldata[key].toString()} */}
                                                <CountUp start={0} end={globaldata[key]} duration={2.75} separator="," />

                                            </Typography>

                                        </CardContent>
                                    </Card>

                                </Grid>

                            )
                        })

                    }

                </Grid>
            </>
        );
    }
    else {

        //console.log(flag(country))
        return (
            <>
                <h1 style={{ textAlign: 'center' }}>
                    {country === "global" ? "Global Condition" : "Corona Stats In " + getName(country)}
                </h1>
                <h1 style={{ textAlign: 'center', fontSize: '200px', marginTop: '-25px' }}>
                    {country === "global" ? '🌎' : flag(country)}
                </h1>
                <Grid container spacing={2} style={{ marginTop: '-140px' }}>

                    {
                        Object.keys(data).map((key, ind) => {

                            return (
                                <Grid item xs={12} sm={6} lg={3} key={ind}>
                                    <Card className={classes.card} variant="outlined">
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" variant="h1" gutterBottom>
                                                {key.replace(/_/g, ' ')}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {/* {console.log(globaldata[key])} */}
                                                {/* {globaldata[key].toString()} */}
                                                <CountUp start={0} end={data[key]} duration={2.75} separator="," />

                                            </Typography>

                                        </CardContent>
                                    </Card>

                                </Grid>
                            )
                        })

                    }

                </Grid>
            </>
        );

    }


}
