import React, { useState, useContext, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import AddMovie from './AddMovie';
import UpdateMovie from './UpdateMovie';
import DeleteMovie from './DeleteMovie';

const AdminView = ({ moviesData, fetchData }) => {
    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState([]);
    const [showAddMovie, setShowAddMovie] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Array.isArray(moviesData) && moviesData.length > 0) {
            const moviesList = moviesData.map((movie) => (
                <tr key={movie._id}>
                    <td>{movie.title.toUpperCase()}</td>
                    <td>{movie.director}</td>
                    <td>{movie.year}</td>
                    <td>{movie.description}</td>
                    <td>{movie.genre}</td>
                    <td className="text-center">
                        <UpdateMovie movie={movie} fetchData={fetchData} />
                    </td>
                    <td className="text-center">
                        <DeleteMovie movieId={movie._id} fetchData={fetchData} />
                    </td>
                </tr>
            ));
            setMovies(moviesList);
        } else {
            setMovies([]);
        }
        setLoading(false);
    }, [moviesData]);

    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>
            <div className="text-center mb-4">
                <Button variant="primary" className="me-2" onClick={() => setShowAddMovie(true)}>
                    Add Movie
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="bg-secondary">Title</th>
                        <th className="bg-secondary">Director</th>
                        <th className="bg-secondary">Year</th>
                        <th className="bg-secondary">Description</th>
                        <th className="bg-secondary">Genre</th>
                        <th className="bg-secondary" colSpan="2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {movies.length > 0 ? (
                        movies
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No movies available
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <AddMovie show={showAddMovie} onHide={() => setShowAddMovie(false)} fetchData={fetchData} />
        </>
    );
};

export default AdminView;