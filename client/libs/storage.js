class Store {
  constructor(store, namespace) {
    this.namespace = namespace
    this.store = window[store]
    this.data = {}
    this._storageHandle()
    this._destroy()
  }

  _storageHandle() {
    window.addEventListener('storage', e => {
      const { key, newValue } = e
      if (newValue === null) return false
      if (key === `${this.namespace}setLocalStorage`) {
        const data = JSON.parse(newValue)
        if (this.isEmpty(data)) {
          this.data = {}
        } else {
          for (let k in data) {
            let value = data[k]
            // try {
            //   value = value
            // } catch (e) {}
            this.data[k] = value
            this.store.setItem(k, value)
          }
        }
      } else if (key === `${this.namespace}getLocalStorage`) {
        this._setLocalStorgaeDataHandler()
      }
    })

    if (this.isEmpty(this.data)) {
      this._getLocalStorgaeDataHandler()
    }
  }

  _setLocalStorgaeDataHandler() {
    window.localStorage.setItem(
      `${this.namespace}setLocalStorage`,
      JSON.stringify(this.data)
    )
    window.localStorage.removeItem(`${this.namespace}setLocalStorage`)
  }

  _getLocalStorgaeDataHandler() {
    window.localStorage.setItem(`${this.namespace}getLocalStorage`, Date.now())
    window.localStorage.removeItem(`${this.namespace}getLocalStorage`)
  }

  set(key, value, fn) {
    this._setItem(key, value)

    fn && fn()
  }

  _setItem(key, value) {
    const setItemEvent = new Event('setItemEvent')
    setItemEvent.oldValue = this.get(key)
    setItemEvent.value = value
    setItemEvent.key = key
    window.dispatchEvent(setItemEvent)
    try {
      value = JSON.stringify(value)
    } catch (e) {
      // value = value
    }
    key = this.namespace + key
    this.store.setItem(key, value)
    this.data[key] = value
    this._setLocalStorgaeDataHandler()
  }

  watch(callback) {
    window.addEventListener('setItemEvent', callback, false)
  }

  get(key, fn) {
    if (!key) {
      throw new Error('沒有找到key!')
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象')
    }
    key = this.namespace + key
    let value = this.store.getItem(key)

    if (value) {
      try {
        value = JSON.parse(value)
      } catch (e) {
        // value = value
      }
      fn && fn()
      return value
    }
  }

  remove(key) {
    if (Array.isArray(key)) {
      key.forEach((item, index) => {
        this.store.removeItem(this.namespace + item)
        delete this.data[this.namespace + item]
      })
    } else if (typeof key === 'string') {
      this.store.removeItem(this.namespace + key)
      delete this.data[this.namespace + key]
    }

    this._setLocalStorgaeDataHandler()
  }

  removeByNamespace() {
    Object.keys(this.store).forEach(key => {
      if (key.startsWith(this.namespace)) {
        this.remove(key)
      }
    })
  }

  clear() {
    // this.store.clear()
    this.removeByNamespace()
    this.data = {}
    this._setLocalStorgaeDataHandler()
  }

  isEmpty(data) {
    return !Object.keys(data).length
  }

  _destroy() {
    window.addEventListener('unload', _ => {
      setTimeout(() => {
        this.removeByNamespace()
      }, 1000)
    })
  }
}

function storage(namespace = 'act_key_') {
  const store = new Store('sessionStorage', namespace)
  store.local = new Store('localStorage', 'local.' + namespace)
  return store
}

export default storage()
