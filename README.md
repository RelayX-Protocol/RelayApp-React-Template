# relayapp-react-template

A RelayApp frontend template built with React 18 + TypeScript + Vite, using relayx-api for message communication.

## Features

- Complete relayx-api usage examples
- Dynamic forms and real-time result display
- React 18 + TypeScript + Ant Design
- Component-based architecture, easy to extend

## Tech Stack

- Node.js: 20.0 or higher
- React 18 + TypeScript + Vite
- Ant Design 5.x
- [relayx-api](https://www.npmjs.com/package/relayx-api)

## Quick Start

```bash
git clone https://github.com/RelayX-Protocol/RelayApp-React-Template.git
cd RelayApp-React-Template

# Install dependencies
npm install

# Start development
npm run dev
```

## Basic Usage

```javascript
import { RelayXClient } from 'relayx-api';

const relayx = new RelayXClient();

// API call example
const response = await relayx.getLanguage();
console.log('Current language:', response.result);
```

## Output Directory Configuration

In production builds, the project uses the environment variable VITE_RELAYAPP_ADDRESS to control the build output directory.

### Environment Configuration File

Configure the production RelayApp address in the .env.production file:

```bash
VITE_RELAYAPP_ADDRESS=your_relayapp_address
```

### Production Build Output

After running npm run build, files are output directly to the RelayApp address directory:

```
{VITE_RELAYAPP_ADDRESS}/
├── index.html
├── assets/
├── icon.png
└── ...
```

## Build

```bash
npm run build
```

## Documentation

For more details, please refer to the [RelayApp Development Documentation](https://relayx.gitbook.io/docs/).

## License

MIT
