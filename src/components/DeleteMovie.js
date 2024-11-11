import { Button } from "react-bootstrap";
import { Notyf } from "notyf";

export default function DeleteMovie({ movieId, fetchData }) {
    const notyf = new Notyf();

    const deleteMovie = (movieId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/deleteMovie/${movieId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Movie deleted successfully") {
                notyf.success("Movie deleted successfully");
                fetchData();
            } else {
                notyf.error("Movie not found or could not be deleted");
                fetchData();
            }
        })
        .catch(() => {
            notyf.error("Something went wrong");
        });
    }

    return (
        <Button variant="danger" size="sm" onClick={() => deleteMovie(movieId)}>
            Delete
        </Button>
    );
}