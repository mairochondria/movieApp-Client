import {useState, useEffect, useContext} from 'react';
import UserContext from '../context/UserContext';
import AdminView from '../components/AdminView'; 
import UserView from '../components/UserView';

export default function Movie() {
    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState([]);

    const fetchData = () => {
        let fetchURL = `${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`;

        fetch( fetchURL, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => res.json())
        .then(data => {
            setMovies(data.movies)
        })
    }

    useEffect(() => {
        if (user) {
            console.log(user);
            fetchData();
        }
    }, [user]);

    return (
        <>
            {!user.isAdmin && (
                <h1 className="text-center my-4">Movies</h1>
            )}
            <div className="mt-5 mx-auto">
                {user !== null && user.isAdmin ? (
                    <AdminView moviesData={movies} fetchData={fetchData}/>
                ) : (
                    <UserView moviesData={movies} />
                )}
            </div>
        </>
    )
}