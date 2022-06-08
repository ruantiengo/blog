import app from './config/app'
import { env } from './config/env'

app.listen(env.PORT, () => {
  console.log(`Running on port ${env.PORT}`)
})
