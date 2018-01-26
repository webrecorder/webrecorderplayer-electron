import config from 'config';
import { fromJS } from 'immutable';
import { rts } from 'helpers/utils';

const CTRLS_SET_MODE = 'wr/ctrls/SET_MODE';
const CTRLS_SET_EXTRACTABLE = 'wr/ctrls/SET_EXTRACTABLE';
const CTRLS_SET_ALL_SOURCES = 'wr/ctrls/SET_ALL_SOURCES';
const CTRLS_SET_SOURCES = 'wr/ctrls/SET_SOURCES';
const CTRLS_SET_URL = 'wr/ctrls/CTRLS_SET_URL';
const CTRLS_SET_TS = 'wr/ctrls/CTRLS_SET_TS';
const CTRLS_SET_TITLE = 'wr/ctrls/CTRLS_SET_TITLE';
const CTRLS_SET_URL_TS = 'wr/ctrls/CTRLS_SET_URL_TS';
const CTRLS_SET_WEBVIEW_LOADING = 'wr/ctrls/CTRLS_SET_WEBVIEW_LOADING';
const CTRLS_CONFIG_PROXY = 'wr/ctrls/CTRLS_CONFIG_PROXY';
const CTRLS_CONFIG_PROXY_SUCCESS = 'wr/ctrls/CTRLS_CONFIG_PROXY_SUCCESS';
const CTRLS_CONFIG_PROXY_FAIL = 'wr/ctrls/CTRLS_CONFIG_PROXY_FAIL';

const CTRLS_GET_ARCHIVES = 'wr/ctrls/ARCHIVES';
const CTRLS_GET_ARCHIVES_SUCCESS = 'wr/ctrls/ARCHIVES_SUCCESS';
const CTRLS_GET_ARCHIVES_FAIL = 'wr/ctrls/ARCHIVES_FAIL';


const initialState = fromJS({
  mode: null,
  extractable: null,
  archivesLoading: false,
  archivesAccessed: null,
  archives: [],
  archiveSources: [],
  webviewLoading: true
});

export default function controls(state = initialState, action = {}) {
  switch(action.type) {
    case CTRLS_GET_ARCHIVES:
      return state.set('archivesLoading', true);
    case CTRLS_GET_ARCHIVES_SUCCESS:
      return state.merge({
        archivesLoading: false,
        archivesAccessed: action.accessed,
        archives: action.result
      });
    case CTRLS_GET_ARCHIVES_FAIL:
      return state.merge({
        archivesLoading: false,
        error: action.error
      });

    case CTRLS_SET_MODE:
      return state.set('mode', action.mode);
    case CTRLS_SET_EXTRACTABLE:
      return state.merge({
        extractable: action.extractable
      });
    case CTRLS_SET_SOURCES:
      return state.set('archiveSources', action.sources);
    case CTRLS_SET_ALL_SOURCES:
      return state.setIn(['extractable', 'allSources'], action.useAllSourcesBool);
    case CTRLS_SET_URL:
      return state.set('url', action.url);
    case CTRLS_SET_TS:
      return state.set('timestamp', action.ts);
    case CTRLS_SET_TITLE:
      return state.set('title', action.title);
    case CTRLS_SET_URL_TS:
      return state.merge({
        url: action.url,
        timestamp: action.ts,
        title: action.title
      });
    case CTRLS_SET_WEBVIEW_LOADING:
      return state.set('webviewLoading', action.bool);

    default:
      return state;
  }
}

export function getArchives(host = '') {
  return {
    types: [CTRLS_GET_ARCHIVES, CTRLS_GET_ARCHIVES_SUCCESS, CTRLS_GET_ARCHIVES_FAIL],
    accessed: Date.now(),
    promise: client => client.get(`${rts(host)}${config.apiPath}/client_archives`)
  };
}

export function configureProxy(user, coll, ts, host = '') {
  return {
    types: [CTRLS_CONFIG_PROXY, CTRLS_CONFIG_PROXY_SUCCESS, CTRLS_CONFIG_PROXY_FAIL],
    promise: client => client.get(`${rts(host)}${config.apiPath}/update_remote_browser/@INIT?user=${user}&coll=${coll}&timestamp=${ts}`)
  };
}

export function setExtractable(extractable) {
  return {
    type: CTRLS_SET_EXTRACTABLE,
    extractable
  };
}

export function setMode(mode) {
  return {
    type: CTRLS_SET_MODE,
    mode
  };
}

export function setAllSourcesOption(useAllSourcesBool) {
  return {
    type: CTRLS_SET_ALL_SOURCES,
    useAllSourcesBool
  };
}

export function setActiveSources(sources) {
  return {
    type: CTRLS_SET_SOURCES,
    sources
  };
}

export function updateUrl(url) {
  return {
    type: CTRLS_SET_URL,
    url
  };
}

export function updateTimestamp(ts) {
  return {
    type: CTRLS_SET_TS,
    ts
  };
}

export function updateTitle(title) {
  return {
    type: CTRLS_SET_TITLE,
    title
  };
}

export function updateUrlAndTimestamp(url, ts, title) {
  return {
    type: CTRLS_SET_URL_TS,
    url,
    ts,
    title
  };
}

export function webviewLoading(bool) {
  return {
    type: CTRLS_SET_WEBVIEW_LOADING,
    bool
  }
}