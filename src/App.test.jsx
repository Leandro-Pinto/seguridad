import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  it('renders the App component', () => {
    render(<App />)
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument()
  })

  it('renders the button with initial count', () => {
    render(<App />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('count is 0')
  })

  it('increments count when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button')
    
    await user.click(button)
    expect(button).toHaveTextContent('count is 1')
    
    await user.click(button)
    expect(button).toHaveTextContent('count is 2')
  })

  it('renders Vite logo', () => {
    render(<App />)
    const viteImg = screen.getByAltText('Vite logo')
    expect(viteImg).toBeInTheDocument()
  })

  it('renders React logo', () => {
    render(<App />)
    const reactImg = screen.getByAltText('React logo')
    expect(reactImg).toBeInTheDocument()
  })

  it('renders help text', () => {
    render(<App />)
    // Text is split across elements, so we check for the paragraph containing the text
    const paragraph = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && content.includes('Edit') && content.includes('save to test HMR')
    })
    expect(paragraph).toBeInTheDocument()
    // Verify the code element is inside
    expect(screen.getByText('src/App.jsx')).toBeInTheDocument()
  })

  it('renders click instructions', () => {
    render(<App />)
    expect(screen.getByText(/Click on the Vite and React logos to learn more/i)).toBeInTheDocument()
  })
})
