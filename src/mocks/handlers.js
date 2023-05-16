// document
// https://mswjs.io/docs/getting-started/mocks/rest-api

// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
    rest.post('/login', (req, res, ctx) => {
      // Persist user's authentication in the session
      sessionStorage.setItem('is-authenticated', 'true')
  
      return res(
        // Respond with a 200 status code
        ctx.status(200),
      )
    }),
  
    rest.get('/user', (req, res, ctx) => {
      // Check if the user is authenticated in this session
      const isAuthenticated = sessionStorage.getItem('is-authenticated')
  
      if (!isAuthenticated) {
        // If not authenticated, respond with a 403 error
        return res(
          ctx.status(403),
          ctx.json({
            errorMessage: 'Not authorized',
          }),
        )
      }
  
      // If authenticated, return a mocked user details
      return res(
        ctx.status(200),
        ctx.json({
          username: 'admin',
        }),
      )
    }),

    rest.get('/test', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          text: 'testです',
        }),
      )
    }),

    // https://mswjs.io/docs/getting-started/integrate/node
    // Jest の jsdom のような DOM のような環境がない場合、NodeJS で絶対リクエスト URL を使用する必要があることに注意してください。
    rest.get('https://api.backend.dev/user', (req, res, ctx) => {
      return res(ctx.json({ firstName: 'John' }))
    }),
  ]