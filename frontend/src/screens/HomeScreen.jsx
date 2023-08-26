import { Row, Col } from 'react-bootstrap';
import { useGetSurveysQuery } from '../slices/surveyApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Survey from '../components/Survey';
import Meta from '../components/Meta';

const HomeScreen = () => {
  
  const { data, isLoading, error } = useGetSurveysQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Surveys</h1>
          <Row>
            {data.surveys.map((survey) => (
              <Col key={survey._id} sm={12} md={6} lg={4} xl={3}>
                <Survey survey={survey} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
