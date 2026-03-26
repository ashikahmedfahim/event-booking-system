import React, { useEffect } from 'react'
import './Events.css'
import Modal from '../components/Modal';
import AuthContext from '../context/auth-context';

const Events = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const authContext = React.useContext(AuthContext);
  const titleRef = React.useRef();
  const descriptionRef = React.useRef();
  const priceRef = React.useRef();
  const dateRef = React.useRef();

  const handleCreateEvent = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveEvent = async () => {
    setIsModalOpen(false);
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const price = parseFloat(priceRef.current.value);
    const date = dateRef.current.value;
    const creator = authContext.userId;

    if (title.trim().length === 0 || description.trim().length === 0 || isNaN(price) || price < 0 || date.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!, $creator: ID!) {
          createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date, creator: $creator}) {  
            _id
          }
        }
      `,
      variables: {
        title,
        description,
        price,
        date,
        creator
      }
    };

    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authContext.token}`
      },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    if (data.data && data.data.createEvent) {
      fetchEvents();
    }
  }

  const fetchEvents = async () => {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `
    };
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    if (data.data && data.data.events) {
      setEvents(data.data.events);
    }
  }

  const handleBookEvent = async (eventId) => {
    const requestBody = {
      query: `
        mutation BookEvent($eventId: ID!, $userId: ID!) {
          bookEvent(eventId: $eventId, userId: $userId) {
            _id
          }
        }
      `,
      variables: {
        eventId,
        userId: authContext.userId
      }
    };

    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authContext.token}`
      },  
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    if (data.data && data.data.bookEvent) {
      alert('Event booked successfully!');
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className='events-container'>
      <h1>Share your own events!</h1>
      <button className='events-button' onClick={handleCreateEvent}>
        Create Event
      </button>
      {isModalOpen && <Modal title="Create Event" onClose={handleCloseModal} onSave={handleSaveEvent}>
        <form className='event-form'>
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' ref={titleRef} />
          </div>
          <div className='form-control'>
            <label htmlFor='description'>Description</label>
            <textarea id='description' rows='4' ref={descriptionRef}></textarea>
          </div>
          <div className='form-control'>
            <label htmlFor='price'>Price</label>
            <input type='number' id='price' min={0} ref={priceRef} />
          </div>
          <div className='form-control'>
            <label htmlFor='date'>Date</label>
            <input type='date' id='date' ref={dateRef} />
          </div>
        </form>
      </Modal>}
      <div className='events-list'>
        {events.map(event => (
          <div key={event._id} className='event-item'>
            <div>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>Price: ${event.price}</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Creator: {event.creator.email}</p>
            </div>
            <div>
              {authContext.userId !== event.creator._id && <button className='book-button' onClick={() => handleBookEvent(event._id)}>
                Book Event
              </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events