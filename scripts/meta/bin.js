let config = {
  imageSmoothing: true,
  size: {
    width: 1000,
    height: 1000,
  },
  metadata: 'eec669dfd567f0f57899522e8a720e703359cfc748adc04ff9c026094a85f645i0',
  fallbackImage: 'e3e932692c8209250207433c01abbec31cf763e7684bbebbbeff7b23fa406994i0',
  key: '50572aca00b709c3660cedd992b11839cb531b8415bc7fe2c47d036baf4f2301i0',
}

window.setCSS = function (style) {
  const css = Object.entries(style)
    .map(([selector, props]) => {
      props = Object.entries(props)
        .map(([key, value]) => {
          key = key.replaceAll(/[A-Z]/g, (x) => `-${x.toLowerCase()}`)
          return `${key}:${value}`
        })
        .join(';')
      return `${selector}{${props}}`
    })
    .join('')
  document.head.appendChild(document.createElement('style')).innerHTML = css
}

window.getConfig = function (defaults) {
  function setDefaults(obj, defaults) {
    for (let [key, value] of Object.entries(defaults)) {
      if (obj[key] === undefined) {
        obj[key] = value
      } else if (typeof value === 'object') {
        setDefaults(obj[key], value)
      }
    }
  }
  setDefaults(config, defaults)
  return config
}

const { render, fallback, metadata, key } = getConfig({
  render: '6290c80fbc141e896d471ab8819b2d5f697cbeddb38bc6caae03151a5731f94di0',
  fallback: '88c20bd281c9aa03b64fd2d7b9ad6dea45c28a5fa4910f440403ab25d045cc94i0',
})

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', process)
} else {
  process()
}

async function process() {
  try {
    let data = await loadMetadataAsBlob()
    data = await decrypt(data)
    data = await decompress(data)
    data = JSON.parse(new TextDecoder('utf-8').decode(data))

    console.log(data)
    let allTraits = data[0]
      .map(([trait_type, traits]) => traits.map(([value, id]) => ({ trait_type, value, id })))
      .flat()
    let traits = data[1][8487].map((i) => allTraits[i])

    console.log(traits)

    // window.token_id = [...script.attributes].map(attr => parseInt(attr.name)).find(name => !isNaN(name))
    // let allTraits = data[0].map(([trait_type, traits]) => traits.map(([value, id]) => ({ trait_type, value, id }))).flat()
    // window.traits = data[1][token_id].map(i => allTraits[i])
  } catch (e) {
    console.error(e)
    window.error = e
  }
}

async function loadMetadataAsBlob() {
  if (metadata.match(/^[\da-fA-F]{64}i\d+$/)) {
    let data_request = await fetch(`https://ord-mirror.magiceden.dev/content/${metadata}`)
    if (!data_request.ok) {
      throw new Error('failed to load data')
    }
    return await data_request.blob()
  } else {
    try {
      return new Blob([Uint8Array.from(atob(metadata), (c) => c.charCodeAt(0))])
    } catch {
      return new Blob([metadata])
    }
  }
}

async function decompress(data) {
  try {
    const ds = new DecompressionStream('gzip')
    const decompressedStream = data.stream().pipeThrough(ds)
    return await new Response(decompressedStream).arrayBuffer()
  } catch {
    return await data.arrayBuffer()
  }
}

async function decrypt(data) {
  if (key == null) return data

  let keyRequest = await fetch(`https://ord-mirror.magiceden.dev/content/${key}`)
  if (!keyRequest.ok) throw new Error('failed to load key')

  let keyData = await keyRequest.arrayBuffer()
  let importedKey = await crypto.subtle.importKey('raw', keyData.slice(12), { name: 'AES-GCM' }, false, ['decrypt'])
  data = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: keyData.slice(0, 12) },
    importedKey,
    await data.arrayBuffer(),
  )
  return new Blob([data])
}
