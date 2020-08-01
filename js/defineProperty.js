let obj = {}
let song = '发如雪'
obj.singer = 'zhou'

Object.defineProperty(obj, 'music', {
  configurable: true,
  enumerable: true,
  get() {
    return song
  },
  set(val) {
    song = val
  }
})

console.log(obj);
delete obj.music
console.log(obj);

obj.music = 'music'

console.log(obj);


