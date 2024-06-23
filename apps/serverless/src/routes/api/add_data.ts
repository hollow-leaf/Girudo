import type { HonoContext } from '../../types'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

const QuerySchema = z.object({
  key: z.string(),
  data: z.string(),
})

const ResponseSchema = z.object({
  message: z.string(),
})

const ResponseErrorSchema = z.object({
  error: z.literal('Invalid data!'),
})

const route = createRoute({
  method: 'post',
  path: '/add_data',
  request: { query: QuerySchema },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
          example: {
            message: 'Successfully added admin to the list of admins!',
          },
        },
      },
      description: 'The response when a user has been successfully added.',
    },
    401: {
      content: {
        'text/plain': { schema: z.literal('Unauthorized') },
      },
      description: 'The response when the request is unauthorized.',
    },
    500: {
      content: {
        'application/json': { schema: ResponseErrorSchema },
      },
      description: 'The response when a user cannot be added.',
    },
  },
})

export const add_data = new OpenAPIHono<HonoContext>().openapi(route, async (context) => {
  const key = context.req.query('key') as string
  const data = context.req.query('data')
  console.log(data)
  if (!data) {
    return context.json({ error: 'Invalid data!' } as const, 500)
  }

  await context.env.appkv.put(key, data)

  return context.json({ message: `Successfully added ${data} to the ${key}!` }, 200)
})
