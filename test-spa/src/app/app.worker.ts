/// <reference lib="webworker" />

import { convertFilter } from "./_function/convert-filter.function";

addEventListener('message', ({data}) => {
data.filter? postMessage(convertFilter(data.value)) : postMessage(data.value);
});