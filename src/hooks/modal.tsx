import { useCallback, useRef } from 'react'
import usePortal from 'src/hooks/portal'

function parseCSSText(cssText: string) {
  const cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, ' ').replace(/\s+/g, ' ')
  const style = {}
  const rule = (cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [])[2] || cssTxt
  const cssToJs = (s: string) => s.replace(/\W+\w/g, (match: string) => match.slice(-1).toUpperCase())
  const properties = rule.split(';').map((o) => o.split(':').map((x) => x && x.trim()))
  // eslint-disable-next-line no-restricted-syntax,@typescript-eslint/ban-ts-comment
  for (const [property, value] of properties) {
    // @ts-ignore
    style[cssToJs(property)] = value
  }
  return style
}

interface ModalProps extends ReturnType<typeof usePortal> {
  background?: string
}

export const useModal = ({ onOpen, onClose, background, ...config }: ModalProps = {}) => {
  const modalStyle = `
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
  `

  const backgroundStyle = `
    position: absolute;
    background: ${background || 'transparent'};
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
  `

  const modal = useRef()
  const { isOpen, togglePortal, openPortal, closePortal, Portal } = usePortal({
    onOpen(event) {
      const { portal } = event
      portal.current.style.cssText = background ? backgroundStyle : modalStyle
      if (onOpen) onOpen(event)
    },
    onClose(event) {
      const { portal } = event
      portal.current.removeAttribute('style')
      if (onClose) onClose(event)
    },
    onPortalClick() {
      const clickingOutsideModal = modal && modal.current
      // const clickingOutsideModal = (modal && modal.current && !modal.current.contains(target));
      if (clickingOutsideModal) {
        closePortal()
      }
    },
    ...config,
  })

  const ModalWithBackground = useCallback(
    (props: any) => (
      <Portal>
        <div ref={modal} style={parseCSSText(modalStyle)} {...props} />
      </Portal>
    ),
    [modalStyle],
  )

  const Modal = background ? ModalWithBackground : Portal

  return Object.assign([openPortal, closePortal, isOpen, Modal, togglePortal], {
    Modal,
    toggleModal: togglePortal,
    openModal: openPortal,
    closeModal: closePortal,
    isOpen,
  })
}
