'use client';

import MovieDetailsComponent from "../../../components/Movie Details/MovieDetails"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const Details = ({params}: { params: { id: number } }) => {
    return (
        <>
            <MovieDetailsComponent movieId={params}/>
        </>
    )
} 

export default withPageAuthRequired(Details);