import React, {Fragment, useEffect, useRef, useState} from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ slideTimer, setSlideTimer ] = useState(false)
  const [ slideDuration ] = useState(3000)
  let timer = useRef(null);



  const moveToNext = () => {
    let next = activeIndex + 1 === catalogs.length ? 0 : activeIndex + 1
    setActiveIndex(next)
  }

  const moveToPrev = () => {
    let prev = activeIndex - 1 < 0 ? catalogs.length - 1: activeIndex -1;
    setActiveIndex(prev)
  }

  useEffect(() => {
    if (slideTimer) {
    timer.current = setTimeout(() => {
       moveToNext()
     }, slideDuration / 2)
    } else {
      clearTimeout(timer.current)
    }
  })

  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button 
              className="icon-only outlined"
              data-testid="prev-slide-btn"
              onClick={() => moveToPrev()}
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs 
                items={ catalogs } 
                currentIndex={ activeIndex }
                switchIndex={index => {
                  setActiveIndex(index)
                  if (slideTimer) {
                    clearTimeout(timer.current);
                    setSlideTimer(true)
                  }
                }}
              />
            <button 
              className="icon-only outlined"
              data-testid="next-slide-btn"
              onClick={() => moveToNext()}
            >
              <i className="material-icons">arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input 
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onChange={event => setSlideTimer(event.target.checked)}
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

