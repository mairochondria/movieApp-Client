import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function MovieCard({movieProp}) {
    const {title, director, year, description, _id} = movieProp

    return (   

        <Card className="d-flex flex-column h-100">
            <Card.Body className="d-flex flex-column">
                <div className="mt-3 text-center">
                    <Card.Title className="text-primary">{title}</Card.Title>
                </div>
                <div className="mt-3 text-center">
                    <Card.Text>Director:<br />{director}</Card.Text>
                    <Card.Text>Year:<br />{year}</Card.Text>
                    <Card.Text>Description:<br />{description}</Card.Text>
                </div>


            </Card.Body>
            <Card.Footer>
                <div className="mt-2">
                    <Link className="btn btn-primary w-100" to={`/movies/${_id}`}>
                        Details
                    </Link>
                </div>
            </Card.Footer>
        </Card>
    )
}

MovieCard.propTypes = {
    movieProp: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    })
}