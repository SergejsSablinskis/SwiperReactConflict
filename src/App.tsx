import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'

interface ICarouselProps extends SwiperProps {
  className?: string
  children: React.ReactNode[]
}
const Carousel: React.FC<ICarouselProps> = (props) => {
  const { children, className } = props

  return (
      <Swiper {...props}>
        {children.map((item, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <SwiperSlide key={key}>{item}</SwiperSlide>
        ))}
      </Swiper>
  )
}
function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Carousel>
          <span>1</span>
          <span>2</span>
        </Carousel>
      </div>
  );
}

export default App;
