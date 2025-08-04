import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

// Mock the API service
vi.mock('../services/api', () => ({
  photoApi: {
    getPhotos: vi.fn().mockResolvedValue([
      {
        id: 1,
        title: 'Test Photo',
        url: 'https://example.com/photo.jpg',
        thumbnailUrl: 'https://example.com/thumb.jpg',
        album: {
          id: 1,
          title: 'Test Album',
          user: {
            id: 1,
            name: 'Test User',
            username: 'testuser',
            email: 'test@example.com',
            address: {
              street: 'Test Street',
              suite: 'Test Suite',
              city: 'Test City',
              zipcode: '12345',
              geo: {
                lat: '0',
                lng: '0'
              }
            },
            phone: '123-456-7890',
            website: 'test.com',
            company: {
              name: 'Test Company',
              catchPhrase: 'Test Phrase',
              bs: 'Test BS'
            }
          }
        }
      }
    ])
  }
}))

describe('App', () => {
  it('renders the application title', () => {
    render(<App />)
    expect(screen.getByText('MetaPhoto')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<App />)
    expect(screen.getByText('Photo Library Manager')).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    render(<App />)
    expect(screen.getByText('Loading photos...')).toBeInTheDocument()
  })
}) 