import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';

const UserView = ({ moviesData }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (Array.isArray(moviesData) && moviesData.length > 0) {
            const moviesArr = moviesData.map((movie) => (
                <Col xs={12} sm={6} md={4} key={movie._id} className="d-flex mb-4">
                    <div className="d-flex flex-column flex-grow-1">
                        <MovieCard movieProp={movie} />
                    </div>
                </Col>
            ));
            setMovies(moviesArr);
        } else {
            setMovies([]);  // Clear movies if data is empty or not an array
        }
    }, [moviesData]);

    return (
        <Row>
            {movies.length > 0 ? movies : <div>No movies available</div>}  {/* Fallback for empty data */}
        </Row>
    );
};

export default UserView;