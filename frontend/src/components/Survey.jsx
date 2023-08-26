import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Survey = ({ survey }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Link to={`/survey/${survey._id}`}>
          <Card.Title as="div" className="survey-title">
            <strong>{survey.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">{survey.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Survey;
