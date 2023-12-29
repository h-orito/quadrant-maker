import ReactDOM from 'react-dom'

type PortalProps = {
  children: React.ReactNode
  target?: string
}

const Portal = ({ children, target }: PortalProps) => {
  if (typeof window === 'undefined') {
    return null
  }
  const element = document.querySelector(target ?? 'body')
  return element ? ReactDOM.createPortal(children, element) : null
}

export default Portal
