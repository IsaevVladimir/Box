import { connectWrapper } from '../../utils/socketWrapper';

export function connect() {
  return connectWrapper('https://localhost:5001/tablehub');
}
