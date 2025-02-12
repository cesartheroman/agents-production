import 'dotenv/config'

import { Index as UpstashIndex } from '@upstash/vector'
import { parse } from 'csv-parse/sync'
import fs from 'node:fs'
import path from 'node:path'
import ora from 'ora'

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})

// Function to index IMDB movie data
const indexMovieData = async () => {
  const spinner = ora('Reading movie data...').start()

  // Read and parse CSV file
  const csvPath = path.join(process.cwd(), 'src/rag/imdb_movie_dataset.csv')
  const csvData = fs.readFileSync(csvPath, 'utf-8')
  const movies = parse(csvData, { columns: true, skip_empty_lines: true })

  spinner.text = 'Starting movie indexing...'

  for (const movie of movies) {
    spinner.text = `Indexing movie ${movie.Title}`
    // Text should be whatever you want your users to be able to search for in order to give these results
    const text = `${movie.Title}, ${movie.Genre}, ${movie.Description}`

    try {
      await index.upsert({
        id: movie.Title,
        data: text,
        // metadata can be anything, ideally this is info you'd use in the app, ie. users could filter based on these
        metadata: {
          title: movie.Title,
          year: Number(movie.Year),
          genre: movie.Genre,
          director: movie.Director,
          actors: movie.Actors,
          rating: Number(movie.Rating),
          votes: Number(movie.Votes),
          revenue: Number(movie.Revenue),
          metascore: Number(movie.Metascore),
        },
      })
    } catch (err) {
      spinner.fail(`Error indexing movie: ${movie.Title}`)
      console.error(err)
    }
  }
}

indexMovieData()
