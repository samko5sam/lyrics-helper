import { useState } from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap';

function VocabularyReview({ wordBooks }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  // Open the vocabulary review modal
  const handleOpenReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => setShowReviewModal(false);

  // Open the detailed view of a selected word
  const handleOpenDetailModal = (content) => {
    setSelectedContent(content);
    setShowDetailModal(true);
  };
  const handleCloseDetailModal = () => setShowDetailModal(false);

  return (
    <>
      {/* Button to open the Vocabulary Review modal */}
      <Button variant="outline-secondary" onClick={handleOpenReviewModal} size='sm'>
        單字庫
      </Button>

      {/* Vocabulary Review Modal */}
      <Modal show={showReviewModal} onHide={handleCloseReviewModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>單字庫</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {wordBooks.map((book, index) => (
            <div key={index} className="mb-4">
              <h5>{book.name}</h5>
              <ListGroup variant="flush">
                {book.words.map((wordObj, idx) => (
                  <ListGroup.Item
                    key={idx}
                    className="d-flex justify-content-between align-items-center"
                    action
                    onClick={() => handleOpenDetailModal(wordObj.content[0])}
                  >
                    <span> {wordObj.content[0].original || wordObj.content[0].word || 'N/A'}</span>
                    <Badge bg="secondary">{wordObj.status}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseReviewModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Word Detail Modal */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>看更多</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedContent && selectedContent.original ? (
            <div>
              {/* Render phrase details */}
              <h5>Original:</h5>
              <p>{selectedContent.original}</p>
              <h5>Translation:</h5>
              <p>{selectedContent.translation}</p>
            </div>
          ) : selectedContent && selectedContent.word ? (
            <div>
              {/* Render word details */}
              <h5>Word:</h5>
              <p>{selectedContent.word}</p>
              {selectedContent.phonetic && (
                <>
                  <h5>Phonetic:</h5>
                  <p>{selectedContent.phonetic}</p>
                </>
              )}
              <h5>Meanings:</h5>
              <ul>
                {selectedContent.meanings.map((meaning, idx) => (
                  <li key={idx}>
                    <strong>{meaning.partOfSpeech}</strong>: {meaning.definitions[0].definition}
                    {meaning.definitions[0].example && (
                      <p><em>Example:</em> {meaning.definitions[0].example}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseDetailModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VocabularyReview;
