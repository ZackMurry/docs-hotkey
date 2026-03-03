type Severity = 'debug' | 'info' | 'warn' | 'error'

var DOCS_HOTKEY_LOGGING_SEVERITY: Severity = 'info'

const severityMap: Record<Severity, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}

const log = (msg: string, severity: Severity = 'info') => {
  if ((severityMap[severity] ?? 1) >= (severityMap[DOCS_HOTKEY_LOGGING_SEVERITY] ?? 1)) {
    console.log(`[Docs Hotkey] ${severity}: ${msg}`)
  }
}

export default log
