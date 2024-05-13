// i literally don't care... thank god for vim
export const colorMap = new Map(
  Object.entries({
    black: 0,
    'dark gray 4': 1,
    'dark gray 3': 2,
    'dark gray 2': 3,
    'dark gray 1': 4,
    gray: 5,
    'light gray 1': 6,
    'light gray 2': 7,
    'light gray 3': 8,
    white: 9,
    'red berry': 10,
    red: 11,
    orange: 12,
    yellow: 13,
    green: 14,
    cyan: 15,
    'cornflower blue': 16,
    blue: 17,
    purple: 18,
    magenta: 19,
    'light red berry 3': 20,
    'light red 3': 21,
    'light orange 3': 22,
    'light yellow 3': 23,
    'light green 3': 24,
    'light cyan 3': 25,
    'light cornflower blue 3': 26,
    'light blue 3': 27,
    'light purple 3': 28,
    'light magenta 3': 29,
    'light red berry 2': 30,
    'light red 2': 31,
    'light orange 2': 32,
    'light yellow 2': 33,
    'light green 2': 34,
    'light cyan 2': 35,
    'light cornflower blue 2': 36,
    'light blue 2': 37,
    'light purple 2': 38,
    'light magenta 2': 39,
    'light red berry 1': 40,
    'light red 1': 41,
    'light orange 1': 42,
    'light yellow 1': 43,
    'light green 1': 44,
    'light cyan 1': 45,
    'light cornflower blue 1': 46,
    'light blue 1': 47,
    'light purple 1': 48,
    'light magenta 1': 49,
    'dark red berry 1': 50,
    'dark red 1': 51,
    'dark orange 1': 52,
    'dark yellow 1': 53,
    'dark green 1': 54,
    'dark cyan 1': 55,
    'dark cornflower blue 1': 56,
    'dark blue 1': 57,
    'dark purple 1': 58,
    'dark magenta 1': 59,
    'dark red berry 2': 60,
    'dark red 2': 61,
    'dark orange 2': 62,
    'dark yellow 2': 63,
    'dark green 2': 64,
    'dark cyan 2': 65,
    'dark cornflower blue 2': 66,
    'dark blue 2': 67,
    'dark purple 2': 68,
    'dark magenta 2': 69,
    'dark red berry 3': 70,
    'dark red 3': 71,
    'dark orange 3': 72,
    'dark yellow 3': 73,
    'dark green 3': 74,
    'dark cyan 3': 75,
    'dark cornflower blue 3': 76,
    'dark blue 3': 77,
    'dark purple 3': 78,
    'dark magenta 3': 79
  })
)

export const isSlides = () => {
  return window.location.href.startsWith('https://docs.google.com/presentation/d/')
}

export const getColorMapValue = (color: string, mode: 'text' | 'highlight'): number => {
  if (!color || !colorMap.has(color.toLowerCase())) {
    throw Error(`unknown color: ${color}`)
  }
  const value = colorMap.get(color.toLowerCase())
  if (value === null || value === undefined) {
    throw Error(`unknown color: ${color}`)
  }
  const slides = isSlides()
  if (mode === 'text' || slides) {
    return value
  } else {
    return value + 90
  }
}
