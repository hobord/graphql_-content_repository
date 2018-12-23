import * as PHPUnserialize from 'php-unserialize'

export function metatagConvert(drupalMetatags) {
  const metatags = [];
  if (drupalMetatags) {
    drupalMetatags = PHPUnserialize.unserialize(drupalMetatags)

    for (var key in drupalMetatags) {
      metatags.push({
        name: key,
        value: drupalMetatags[key]
      })
    }

    drupalMetatags = metatags
  }
  return metatags
}
