import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'

export const dadJokeToolDefinition = {
  name: 'dad_joke',
  // name: 'weather_tool', // intentional sabotage
  parameters: z.object({}),
  description: 'returns a random dad joke',
  // description: 'use this tool to get the weather', // intentional sabotage
}

type Args = z.infer<typeof dadJokeToolDefinition.parameters>

export const dadJoke: ToolFn<Args, string> = async ({ toolArgs }) => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })

  return (await res.json()).joke
}
