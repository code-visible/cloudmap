import source from '../testdata/prom.json';
import { SourceMap } from '../resource/resource';
import type { Source } from '../protocol/map';

const data = new SourceMap();
data.parseSource(source as Source);

export default data;