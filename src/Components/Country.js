import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
    root: {
        //background: 'red',
        textAlign: 'center',
        marginTop: '10px'
    },
    formControl: {
        width: '40%',
        marginBottom: '10px'
    }

}));


export const Country = ({ handleCountryChange }) => {
    const classes = useStyles();
    const url = 'https://api.thevirustracker.com/free-api?countryTotals=ALL';
    const [countries, setCountries] = useState([]);

    useEffect(() => {

        async function getCountries() {
            const response = await fetch(url);
            const { countryitems } = await response.json();
            //console.log(countryitems[0])
            //console.log(Object.keys(countryitems[0]))
            delete countryitems[0].stat;
            
            const Countries = Object.keys(countryitems[0]).map((key, ind) => {

                return [
                    countryitems[0][key].title,
                    countryitems[0][key].code
                ];
            })
            //console.log(Countries)
            setCountries(Countries);

        }

        getCountries();

    }, [])

    return (
        <Grid>
            <Grid item xs={12} className={classes.root}>
                <FormControl className={classes.formControl}>
                    <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value === "global" ? e.target.value : e.target.value)}>
                        <option value="global">Global</option>
                        {countries.map((country, ind) => <option key={ind} value={country[1]}>{country[0]}</option>)}
                    </NativeSelect>
                </FormControl>
            </Grid>
            

        </Grid>
    )
}
