import React from 'react';
import "../styles/Popularbookserv.css";
import { FaStar } from 'react-icons/fa';
import { MdArrowForwardIos } from 'react-icons/md';


const services = [{
  id:1,
  title:'Pest control (includes untensil removal)',
  rating: '4.79',
  count: '105k',
  price: '₹1,098',
  image:'/src/assets/image.png',
},
{
  id: 2,
  title: 'At-home consultation',
  rating: '4.79',
  count: '46K',
  price: '₹49',
  image: '/src/assets/image.png',
},
{
  id: 3,
  title: 'At-home consultation',
  rating: '4.80',
  count: '3K',
  price: '₹49',
  image: '/src/assets/image.png',
},
{
  id: 4,
  title: 'Apartment pest control (includes utensil removal)',
  rating: '4.80',
  count: '34K',
  price: '₹1,498',
  image: '/src/assets/image.png',
},
{
  id: 5,
  title: 'Foam-jet AC service',
  rating: '4.79',
  count: '1.4M',
  price: '₹599',
  image: '/src/assets/image.png',
},
{
  id: 6,
  title: 'Foam-jet AC service',
  rating: '4.79',
  count: '1.4M',
  price: '₹599',
  image: '/src/assets/image.png',
},
{
  id: 7,
  title: 'Foam-jet AC service',
  rating: '4.79',
  count: '1.4M',
  price: '₹599',
  image: '/src/assets/image.png',
},
{
  id: 8,
  title: 'Foam-jet AC service',
  rating: '4.79',
  count: '1.4M',
  price: '₹599',
  image: '/src/assets/image.png',
},
{
  id: 9,
  title: 'Foam-jet AC service',
  rating: '4.79',
  count: '1.4M',
  price: '₹599',
  image: '/src/assets/image.png',
},
{
  id: 10,
  title: 'Foam-jet AC service',
  rating: '4.79',
  count: '1.4M',
  price: '₹599',
  image: '/src/assets/image.png',
},
];

const Popularbookserv = () => {
  const scrollRef = React.useRef();

  const scrollRight=()=> {
    scrollRef.current.scrollBy({left:300, behavior:'smooth'});
  };

  return (
    <div className="most-booked-container">
      <h2>Most booked services</h2>
        <div className="scroll-wrapper">
          <div className="service-scroll" ref={scrollRef}>
            {services.map(service => (
              <div className="service-card" key={service.id}>
                <img src={service.image} alt={service.title} />
                <h4>{service.title}</h4>
                <div className="rating">
                  <FaStar className='star'/>{service.rating}({service.count})
                </div>
                <div className="price">{service.price}</div>
              </div>
            ))}
          </div>
          <button className="arrow-button" onClick={scrollRight}>
            <MdArrowForwardIos/></button>
      </div>
      </div>
  );
};

export default Popularbookserv;
