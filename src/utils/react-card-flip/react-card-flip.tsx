import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'

import { ReactFlipCardProps, ReactFlipCardStyle } from './react-card-flip.types'

const getCardRotateDegFront = (isFlipped: boolean) => (isFlipped ? 180 : 0)
const getCardRotateDegBack = (isFlipped: boolean) => (isFlipped ? 0 : -180)

const defaultProps = {
  cardStyles: {
    back: {},
    front: {},
  },
  cardZIndex: 'auto',
  containerStyle: {},
  flipDirection: 'horizontal',
  flipSpeedBackToFront: 0.6,
  flipSpeedFrontToBack: 0.6,
  infinite: false,
  isFlipped: false,
}

const ReactCardFlip: React.FC<ReactFlipCardProps> = (props) => {
  const {
    cardStyles: { back, front },
    cardZIndex,
    containerStyle,
    containerClassName,
    flipDirection,
    flipSpeedFrontToBack,
    flipSpeedBackToFront,
    infinite,
  } = { ...defaultProps, ...props }

  const [isFlipped, setFlipped] = useState<boolean>(props.isFlipped as boolean)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (props.isFlipped !== isFlipped) {
      setFlipped(props.isFlipped as boolean)
      setRotation((c) => c + 180)
    }
  }, [props.isFlipped])

  const getContainerClassName = useMemo(() => {
    let className = 'react-card-flip'
    if (containerClassName) {
      className += ` ${containerClassName}`
    }
    return className
  }, [containerClassName])

  const getComponent = (key: 0 | 1) => {
    if (props.children.length !== 2) {
      throw new Error('Component ReactCardFlip requires 2 children to function')
    }
    return props.children[key]
  }

  const frontRotateY = `rotateY(${infinite ? rotation : getCardRotateDegFront(isFlipped)}deg)`
  const backRotateY = `rotateY(${infinite ? rotation + 180 : getCardRotateDegBack(isFlipped)}deg)`
  const frontRotateX = `rotateX(${infinite ? rotation : getCardRotateDegFront(isFlipped)}deg)`
  const backRotateX = `rotateX(${infinite ? rotation + 180 : getCardRotateDegBack(isFlipped)}deg)`

  const styles: ReactFlipCardStyle = {
    back: {
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      height: '100%',
      left: '0',
      position: isFlipped ? 'relative' : 'absolute',
      top: '0',
      transform: flipDirection === 'horizontal' ? backRotateY : backRotateX,
      transformStyle: 'preserve-3d',
      transition: `${flipSpeedFrontToBack}s`,
      width: '100%',
      ...back,
    },
    container: {
      perspective: '1000px',
      zIndex: `${cardZIndex}`,
    },
    flipper: {
      height: '100%',
      position: 'relative',
      width: '100%',
    },
    front: {
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      height: '100%',
      left: '0',
      position: isFlipped ? 'absolute' : 'relative',
      top: '0',
      transform: flipDirection === 'horizontal' ? frontRotateY : frontRotateX,
      transformStyle: 'preserve-3d',
      transition: `${flipSpeedBackToFront}s`,
      width: '100%',
      zIndex: '2',
      ...front,
    },
  }

  return (
    <div className={getContainerClassName} style={{ ...styles.container, ...containerStyle }}>
      <div className="react-card-flipper" style={styles.flipper}>
        <div className="react-card-front" style={styles.front}>
          {getComponent(0)}
        </div>

        <div className="react-card-back" style={styles.back}>
          {getComponent(1)}
        </div>
      </div>
    </div>
  )
}

export default ReactCardFlip
