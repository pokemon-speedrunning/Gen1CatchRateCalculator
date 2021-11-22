import type { Config } from 'aleph/types'
import json from 'aleph/plugins/json.ts'

export default <Config>{
  basePath: '/Gen1CatchRateCalculator',
  build: {
    outputDir: '/docs',
  },
  plugins: [json()]
}
